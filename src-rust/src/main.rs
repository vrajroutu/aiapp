use axum::{
    routing::post,
    Router,
    Json,
    http::{StatusCode, Method},
    extract::State,
};
use serde::{Deserialize, Serialize};
use async_openai::{
    Client,
    types::{CreateChatCompletionRequestArgs, ChatCompletionRequestMessage, Role},
};
use tower_http::cors::{CorsLayer, Any};
use std::sync::Arc;

#[derive(Clone)]
struct AppState {
    openai_client: Client,
}

#[derive(Deserialize)]
struct ChatRequest {
    messages: Vec<ChatMessage>,
}

#[derive(Deserialize, Serialize)]
struct ChatMessage {
    role: String,
    content: String,
}

#[tokio::main]
async fn main() {
    // Load environment variables
    dotenvy::dotenv().ok();
    
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Create OpenAI client
    let openai_client = Client::new();
    let state = Arc::new(AppState { openai_client });

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_methods([Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/api/chat", post(handle_chat))
        .with_state(state)
        .layer(cors);

    // Start server
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3001").await.unwrap();
    tracing::info!("Server running on http://127.0.0.1:3001");
    axum::serve(listener, app).await.unwrap();
}

async fn handle_chat(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ChatRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let messages: Vec<ChatCompletionRequestMessage> = request.messages
        .into_iter()
        .map(|msg| ChatCompletionRequestMessage {
            role: match msg.role.as_str() {
                "user" => Role::User,
                "assistant" => Role::Assistant,
                "system" => Role::System,
                _ => Role::User,
            },
            content: msg.content,
            name: None,
            function_call: None,
        })
        .collect();

    let request = CreateChatCompletionRequestArgs::default()
        .model("gpt-4-turbo-preview")
        .messages(messages)
        .build()
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let response = state.openai_client.chat().create(request).await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let reply = response.choices.first()
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(serde_json::json!({
        "role": "assistant",
        "content": reply.message.content.clone().unwrap_or_default()
    })))
}

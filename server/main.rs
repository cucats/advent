use core::str;
use std::process::Command;

use axum::{
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};

mod puzzle;

#[derive(Deserialize)]
struct Submission {
    code: String,
}

#[derive(Serialize)]
struct GradeResponse {
    score: i32,
    msg: Option<String>,
    stdout: String,
    stderr: String,
}

async fn handle_submit(
    Json(payload): Json<Submission>,
) -> (StatusCode, Json<Option<GradeResponse>>) {
    let code = payload.code;

    let output = match Command::new("isolate").arg("--init").output() {
        Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(None)),
        Ok(output) => output,
    };

    let sandbox_path = str::from_utf8(&output.stdout).expect("UTF-8").trim();
    let user_code_path = format!("{}/box/user.py", sandbox_path);
    let test_runner_path = format!("{}/box/test.py", sandbox_path);

    if let Err(_) = std::fs::write(&user_code_path, code) {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(None));
    }
    if let Err(_) = std::fs::write(&test_runner_path, generate_test_runner_code()) {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(None));
    }

    let output = match Command::new("isolate")
        .args(&["--run", "--", "/usr/bin/python3", "/box/test.py"])
        .output()
    {
        Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(None)),
        Ok(output) => output,
    };

    let stdout = String::from_utf8(output.stdout).expect("UTF-8");
    let stderr = String::from_utf8(output.stderr).expect("UTF-8");

    if let Err(_) = Command::new("isolate").arg("--cleanup").output() {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(None));
    }

    (
        StatusCode::OK,
        Json(Some(GradeResponse {
            score: 1, // TODO
            msg: Some("Ok lol".to_string()),
            stdout,
            stderr,
        })),
    )
}

fn generate_test_runner_code() -> String {
    let mut test_runner = String::new();
    test_runner.push_str(&format!("import sys\n"));
    test_runner.push_str(&format!("sys.path.append('/tmp')\n"));
    test_runner.push_str(&format!("from user import fizzbuzz\n"));
    test_runner.push_str(&format!("print('testing user code')\n"));
    test_runner.push_str(&format!("print(fizzbuzz(3))\n"));
    test_runner
}

async fn root() -> &'static str {
    return "Hello";
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/api/submit", post(handle_submit));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:7878")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

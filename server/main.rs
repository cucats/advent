use core::str;
use std::process::Command;

use axum::{http::StatusCode, routing::post, Json, Router};
use serde::{Deserialize, Serialize};

mod puzzle;

#[derive(Deserialize)]
struct Submission {
    code: String,
}

#[derive(Serialize)]
struct GradeResponse {
    score: usize,
    total: usize,
    msg: Option<String>,
}

struct TestCase<'a>(&'a str, &'a str);

const TEST_CASES: &[TestCase] = &[
    TestCase("1", "1"),
    TestCase("2", "2"),
    TestCase("3", "Fizz"),
    TestCase("4", "4"),
    TestCase("5", "Buzz"),
    TestCase("15", "FizzBuzz"),
    TestCase("16", "16"),
    TestCase("30", "FizzBuzz"),
    TestCase("33", "Fizz"),
    TestCase("50", "Buzz"),
];

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

    if let Err(_) = Command::new("isolate").arg("--cleanup").output() {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(None));
    }

    let score = 1; // TODO

    (
        StatusCode::OK,
        Json(Some(GradeResponse {
            score,
            total: TEST_CASES.len(),
            msg: None,
        })),
    )
}

fn generate_test_runner_code() -> String {
    let mut test_runner = String::new();
    test_runner.push_str(&format!("import sys\n"));
    test_runner.push_str(&format!("sys.path.append('/tmp')\n"));
    test_runner.push_str(&format!("from user import fizzbuzz\n",));
    test_runner.push_str("\n");
    for TestCase(input, _) in TEST_CASES {
        test_runner.push_str(&format!(
            "try:\n    print(fizzbuzz({input}))\nexcept:\n    print('Error')\n",
        ));
    }
    test_runner
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/api/submit", post(handle_submit));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:7878")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

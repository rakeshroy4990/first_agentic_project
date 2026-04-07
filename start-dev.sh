#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

BACKEND_PORT="${BACKEND_PORT:-8080}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"

BACKEND_PID=""
FRONTEND_PID=""

kill_port_if_used() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" || true)"

  if [[ -n "$pids" ]]; then
    echo "Port $port is in use. Killing process(es): $pids"
    kill -15 $pids 2>/dev/null || true
    sleep 1

    local still_running
    still_running="$(lsof -ti tcp:"$port" || true)"
    if [[ -n "$still_running" ]]; then
      echo "Force killing process(es) on port $port: $still_running"
      kill -9 $still_running 2>/dev/null || true
    fi
  fi
}

cleanup() {
  echo
  echo "Shutting down services..."
  [[ -n "$BACKEND_PID" ]] && kill "$BACKEND_PID" 2>/dev/null || true
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null || true
  wait 2>/dev/null || true
}

trap cleanup EXIT INT TERM

if [[ ! -x "$BACKEND_DIR/gradlew" ]]; then
  echo "Error: backend/gradlew not found or not executable."
  exit 1
fi

if [[ ! -f "$FRONTEND_DIR/package.json" ]]; then
  echo "Error: frontend/package.json not found."
  exit 1
fi

echo "Checking and freeing ports..."
kill_port_if_used "$BACKEND_PORT"
kill_port_if_used "$FRONTEND_PORT"

echo "Starting Spring Boot API on port $BACKEND_PORT..."
(
  cd "$BACKEND_DIR"
  ./gradlew bootRun
) &
BACKEND_PID=$!

echo "Starting Vue UI on port $FRONTEND_PORT..."
(
  cd "$FRONTEND_DIR"
  npm run dev -- --port "$FRONTEND_PORT"
) &
FRONTEND_PID=$!

echo
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both."

wait

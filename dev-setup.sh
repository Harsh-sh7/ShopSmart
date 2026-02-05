#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting development environment setup..."

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# ---- Git ----
if ! command_exists git; then
  echo "❌ Git is not installed."
  exit 1
fi

# ---- Node ----
if ! command_exists node; then
  echo "❌ Node.js is not installed."
  echo "👉 Install from https://nodejs.org/"
  exit 1
fi

# ---- npm ----
if ! command_exists npm; then
  echo "❌ npm is not installed."
  exit 1
fi

echo "✅ All required tools are available."

# ---- Install dependencies ----
if [ -f package.json ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "⚠️ package.json not found. Skipping dependency install."
fi

# ---- Environment file ----
if [ ! -f .env ] && [ -f .env.example ]; then
  echo "📝 Creating .env file from .env.example"
  cp .env.example .env
fi

echo "✅ Dev setup completed."

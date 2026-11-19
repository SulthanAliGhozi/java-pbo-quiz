#!/usr/bin/env bash
# Script peluncur Java OOP Quiz
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "☕ Menjalankan Java OOP Master Quiz..."
xdg-open "http://localhost:5173" 2>/dev/null || xdg-open "$DIR/dist/index.html" 2>/dev/null

bun run preview --host 0.0.0.0 --port 5173

#!/bin/bash
cd "$(dirname "$0")"
echo "=========================================="
echo "   LANCEMENT AUTOMATIQUE DE CPC CONNECT"
echo "=========================================="
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/2] Installation des modules en cours..."
    npm install
    echo ""
fi

echo "[2/2] Démarrage du serveur local..."
echo "L'application démarre sur http://localhost:3000"
echo ""

if which xdg-open > /dev/null; then
  xdg-open http://localhost:3000 &
elif which open > /dev/null; then
  open http://localhost:3000 &
fi

npm run dev

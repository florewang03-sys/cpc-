@echo off
title Lancement CPC Connect
echo ==========================================
echo    LANCEMENT AUTOMATIQUE DE CPC CONNECT
echo ==========================================
echo.

if not exist node_modules (
    echo [1/2] Installation des modules en cours...
    call npm install
    echo.
)

echo [2/2] Demarrage du serveur local...
echo.
echo Votre application va s'ouvrir dans quelques secondes sur http://localhost:3000
echo Pour arreter l'application, fermez simplement cette fenetre.
echo.
start http://localhost:3000
call npm run dev
pause

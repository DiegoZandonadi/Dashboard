@echo off
echo ====================================
echo   Iniciando Backend do Dashboard
echo ====================================
echo.

cd backend

echo Verificando dependencias...
pip install -q fastapi uvicorn websockets

echo.
echo Iniciando servidor FastAPI...
echo Backend estara disponivel em: http://localhost:8000
echo.

python main.py

pause

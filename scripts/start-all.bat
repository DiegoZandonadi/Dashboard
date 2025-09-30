@echo off
echo ========================================
echo   Dashboard Interativo - Inicializacao
echo ========================================
echo.

REM Iniciar backend em nova janela
start "Dashboard Backend" cmd /k "cd /d %~dp0\..\backend && python -m venv venv 2>nul && call venv\Scripts\activate && pip install -r requirements.txt && python main.py"

REM Aguardar 3 segundos para o backend iniciar
echo Aguardando backend iniciar...
timeout /t 3 /nobreak > nul

REM Iniciar frontend em nova janela
start "Dashboard Frontend" cmd /k "cd /d %~dp0\..\frontend && npm install && npm run dev"

echo.
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause > nul

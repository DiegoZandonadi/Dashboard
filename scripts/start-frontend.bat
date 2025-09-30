@echo off
echo Iniciando Frontend do Dashboard...
cd frontend

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo Instalando dependências...
    call npm install
)

REM Iniciar servidor de desenvolvimento
echo Iniciando servidor de desenvolvimento...
call npm run dev

pause

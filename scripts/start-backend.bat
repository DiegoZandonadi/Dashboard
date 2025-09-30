@echo off
echo Iniciando Backend do Dashboard...
cd backend

REM Verificar se o ambiente virtual existe
if not exist "venv" (
    echo Criando ambiente virtual...
    python -m venv venv
)

REM Ativar ambiente virtual
call venv\Scripts\activate

REM Instalar dependências
echo Instalando dependências...
pip install -r requirements.txt

REM Iniciar servidor
echo Iniciando servidor FastAPI...
python main.py

pause

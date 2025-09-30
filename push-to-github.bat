@echo off
echo ========================================
echo   Enviando Dashboard para GitHub
echo ========================================
echo.

REM Verificar se é repositório Git
if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    echo.
)

REM Verificar remote
echo Verificando remote...
git remote -v
echo.

REM Adicionar todos os arquivos
echo Adicionando arquivos...
git add .
echo.

REM Fazer commit
echo Fazendo commit...
git commit -m "feat: Dashboard Interativo - Analise de Dados em Tempo Real

- Interface moderna com React TypeScript
- Backend com Python FastAPI
- Graficos interativos com Recharts
- Dados em tempo real via WebSocket
- Sistema de relatorios personalizados
- Documentacao completa incluida"
echo.

REM Definir branch principal
echo Configurando branch main...
git branch -M main
echo.

REM Push para GitHub
echo Enviando para GitHub...
git push -u origin main
echo.

echo ========================================
echo   Push concluido!
echo ========================================
echo.
echo Seu repositorio esta em:
echo https://github.com/DiegoZandonai/Dashboard
echo.

pause

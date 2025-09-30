@echo off
echo ========================================
echo   Configurando e Enviando para GitHub
echo ========================================
echo.

REM Adicionar remote (ignorar erro se ja existir)
echo Configurando repositorio remoto...
git remote remove origin 2>nul
git remote add origin https://github.com/DiegoZandonadi/Dashboard.git
echo.

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
git commit -m "feat: Dashboard Interativo - Analise de Dados em Tempo Real - Interface moderna com React TypeScript - Backend com Python FastAPI - Graficos interativos com Recharts - Dados em tempo real via WebSocket - Sistema de relatorios personalizados"
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
echo   Concluido!
echo ========================================
echo.
echo Seu repositorio esta em:
echo https://github.com/DiegoZandonadi/Dashboard
echo.

pause

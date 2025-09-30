# 🚀 Guia de Deploy - Dashboard Interativo

## ⚠️ **Importante sobre Vercel**

A Vercel **NÃO suporta** backend Python/FastAPI rodando continuamente. 

Você tem duas opções:

---

## 📋 **Opção 1: Deploy no Render (RECOMENDADO - Gratuito)**

O Render suporta tanto frontend quanto backend Python!

### **Passo a Passo:**

1. **Crie uma conta** em: https://render.com

2. **Conecte o GitHub:**
   - Clique em "New +"
   - Selecione "Blueprint"
   - Conecte seu repositório GitHub
   - O Render detectará automaticamente o `render.yaml`

3. **Deploy Automático:**
   - Backend: `https://dashboard-backend.onrender.com`
   - Frontend: `https://dashboard-frontend.onrender.com`

4. **Atualizar URL do Backend no Frontend:**
   - Edite `frontend/src/services/api.ts`
   - Mude `http://localhost:8000` para a URL do backend no Render

---

## 📋 **Opção 2: Deploy Separado**

### **Backend → Railway (Gratuito)**

1. Acesse: https://railway.app
2. Conecte com GitHub
3. Selecione o repositório
4. Railway detectará Python automaticamente
5. Configure:
   - **Start Command:** `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory:** `/`

### **Frontend → Vercel**

1. Acesse: https://vercel.com
2. Importe o repositório GitHub
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Adicione variável de ambiente:
   - `VITE_API_URL` = URL do backend no Railway

---

## 📋 **Opção 3: Deploy no Fly.io**

### **Backend:**

```bash
# Instalar Fly CLI
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Login
fly auth login

# Deploy backend
cd backend
fly launch
```

### **Frontend:**
Use Vercel ou Netlify como na Opção 2

---

## 🔧 **Configurar Frontend para Produção**

Depois de fazer deploy do backend, atualize o frontend:

**Arquivo: `frontend/src/services/api.ts`**

```typescript
// Trocar de:
const API_BASE_URL = 'http://localhost:8000'

// Para:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://seu-backend.onrender.com'
```

**Arquivo: `frontend/src/hooks/useWebSocket.ts`**

```typescript
// Trocar de:
const url = 'ws://localhost:8000/ws/realtime'

// Para:
const url = 'wss://seu-backend.onrender.com/ws/realtime'
```

---

## ✅ **Resumo das Plataformas**

| Plataforma | Backend Python | Frontend React | Gratuito | Recomendação |
|------------|----------------|----------------|----------|--------------|
| **Render** | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ Melhor opção |
| **Railway** | ✅ | ✅ | ✅ (limitado) | ⭐⭐⭐⭐ Ótima opção |
| **Fly.io** | ✅ | ❌ | ✅ | ⭐⭐⭐ Backend apenas |
| **Vercel** | ❌ | ✅ | ✅ | ⭐⭐⭐⭐⭐ Frontend apenas |
| **Netlify** | ❌ | ✅ | ✅ | ⭐⭐⭐⭐ Frontend apenas |

---

## 🎯 **Recomendação Final:**

**Use o Render** para deploy completo (backend + frontend) de forma gratuita e fácil!

1. Suba o código no GitHub ✅ (já feito)
2. Crie conta no Render
3. Conecte o repositório
4. Deploy automático com `render.yaml`
5. Pronto! 🎉

---

## 🆘 **Precisa de Ajuda?**

Se tiver dúvidas sobre o deploy, me avise!

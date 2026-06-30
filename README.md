# 🚗 Catálogo Técnico Automotivo Inteligente

## 📝 Objetivo

Este projeto implementa um **catálogo técnico automotivo inteligente** que utiliza um modelo de linguagem (LLM) via API OpenRouter para fornecer fichas técnicas completas de veículos. O sistema recebe o modelo e ano de um carro e retorna informações estruturadas sobre motorização, consumo, itens de série e pontos fortes/fracos.

## 🎯 Funcionalidades

- ✅ Interface moderna estilo chatbox com tema automotivo
- ✅ Integração com modelo `openai/gpt-oss-120b:free` do OpenRouter
- ✅ System prompt especializado em fichas técnicas de veículos
- ✅ Validação de entrada do usuário
- ✅ Proteção da chave API (fica no servidor, não no frontend)
- ✅ Respostas estruturadas com 4 seções obrigatórias:
  1. Motorização e Potência
  2. Consumo médio estimado
  3. Principais itens de série
  4. Pontos fortes e pontos fracos

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js + Express
- **Frontend:** HTML5 + CSS3 + JavaScript
- **API Externa:** OpenRouter (openai/gpt-oss-120b:free)
- **Variáveis de Ambiente:** dotenv
- **Segurança:** CORS

## 📦 Estrutura do Projeto

```
Catálogo_inteligente/
├── package.json          # Dependências e scripts
├── .env                  # Variáveis de ambiente (NÃO versionado)
├── .gitignore            # Arquivos ignorados no Git
├── server.js             # Servidor Express com rota /api/llm
└── public/
    └── index.html        # Interface frontend (chatbox)
```

## 🚀 Como Instalar e Executar

### Passo 1: Obter a Chave API

1. Acesse [OpenRouter.ai](https://openrouter.ai)
2. Crie uma conta e gere uma chave API
3. Acrescente créditos à sua conta (o free tier tem limites)

### Passo 2: Configurar o Projeto

1. Abra o terminal na pasta do projeto
2. Execute:
   ```bash
   npm install
   ```

### Passo 3: Adicionar a Chave API

1. Abra o arquivo `.env`
2. Substitua `sua_chave_aqui` pela sua chave do OpenRouter:
   ```
   OPENROUTER_API_KEY=sk-or-v1-...
   ```

### Passo 4: Executar o Servidor

```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

## 📱 Como Usar

1. Abra o navegador em `http://localhost:3000`
2. Digite o modelo e ano do veículo (ex: "Chevrolet Onix 2023")
3. Clique em "Pesquisar" ou pressione Enter
4. Aguarde a resposta com a ficha técnica completa

## 🔍 Exemplos de Consultas

- "Fiat Uno 2024"
- "Toyota Corolla 2022"
- "Volkswagen Gol 2023"
- "Renault Kwid 2023"
- "Honda Civic 2023"

## ⚙️ Validações

- ✓ Prompt vazio é rejeitado
- ✓ Limite máximo de 2000 caracteres por consulta
- ✓ Resposta é estruturada automaticamente pelo system prompt
- ✓ Erros da API são tratados e exibidos ao usuário

## 🎨 Design

A interface utiliza uma paleta de cores automotiva:
* Fundo: Preto profundo (#0d0d0d)
* Acentos: Vermelho (#e02020)
* Texto primário: Branco (#f0f0f0)
* Texto secundário: Cinza médio (#888)
* Tipografia: Inter (300–700)
* Input: Borda com foco em vermelho e glow sutil

## 🔐 Segurança

- A chave API fica protegida no arquivo `.env` do servidor
- O frontend nunca acessa a chave diretamente
- O arquivo `.env` está listado no `.gitignore` e não é versionado

## 🐛 Solução de Problemas

| Erro | Causa | Solução |
|------|-------|---------|
| `Erro: crie o arquivo .env` | Arquivo .env ausente | Crie o arquivo e adicione a chave API |
| `401 Unauthorized` | Chave API inválida | Verifique a chave no OpenRouter |
| `429 Too Many Requests` | Limite de requisições atingido | Aguarde ou upgrade o plano |
| `Resposta vazia` | Falha temporária da API | Tente novamente em alguns segundos |
| `Cannot find module 'express'` | Dependências não instaladas | Execute `npm install` |

## 📝 Desenvolvimento

Para rodar o servidor em modo alternativo:
```bash
npm run dev
```

## 🎓 O que Você Aprende

- ✓ Como integrar uma API externa (OpenRouter)
- ✓ Como proteger chaves de API com variáveis de ambiente
- ✓ Como criar um servidor Express com rotas POST
- ✓ Como construir uma interface de chat moderna
- ✓ Como usar LLMs dentro de uma aplicação web
- ✓ Como estruturar prompts para obter respostas formatadas

## 📄 Licença

Projeto educacional para a disciplina de Inteligência Artificial (ADS)

## 👨‍💻 Autor

Desenvolvido como atividade prática de LLM via OpenRouter

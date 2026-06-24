import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openai/gpt-oss-120b:free";

if (!API_KEY) {
  console.error("Erro: configure OPENROUTER_API_KEY no arquivo .env.");
  process.exit(1);
}

const SYSTEM_PROMPT = `Você é um catálogo automotivo inteligente especialista em fichas técnicas de veículos. O usuário vai te passar o modelo e o ano de um carro. Você deve retornar uma resposta muito bem organizada e direta contendo obrigatoriamente: 
1) Motorização e Potência
2) Consumo médio estimado
3) Principais itens de série
4) Pontos fortes e pontos fracos conhecidos desse modelo.

Formate a resposta de forma clara e estruturada, usando quebras de linha entre cada seção.`;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({ status: "API local funcionando", model: MODEL });
});

app.post("/api/llm", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ erro: "O campo prompt é obrigatório." });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ erro: "Limite: 2000 caracteres." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "Catálogo Automotivo Inteligente"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_completion_tokens: 1000
      })
    });

    if (!response.ok) {
      const detalhe = await response.text();
      return res.status(502).json({
        erro: "Erro ao consultar o OpenRouter.",
        status: response.status,
        detalhe
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(502).json({ erro: "Resposta vazia ou inesperada." });
    }

    res.json({ modelo: MODEL, resposta: text, uso: data.usage ?? null });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor.", detalhe: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚗 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Catálogo Automotivo Inteligente pronto para consultas!`);
});

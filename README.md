# Desafio Tecnico Lacrei

API em Node.js com Express, que expõe uma rota HTTP `[GET] /status` para validar disponibilidade da aplicação. Possui também um teste unitário, que é executado durante o fluxo de CI/CD.

## Stack e arquitetura

- **Runtime:** Node.js
- **Framework web:** Express
- **Gerenciamento de ambiente:** dotenv
- **Testes:** Node Test Runner (`node --test`) + Supertest
- **Containerizacao:** Docker + Docker Compose

Arquivos principais:

- `server.js`: bootstrap da aplicação, leitura de variaveis de ambiente e registro de rotas
- `routes/status.js`: implementacao do endpoint de status
- `routes/status.test.js`: teste automatizado da rota `/status`
- `Dockerfile`: build da imagem da aplicação
- `docker-compose.yml`: orquestracao local do servico

## Endpoint

### `GET /status`

Exemplo de resposta:

```json
{
  "status": "ok"
}
```

Codigos esperados:

- `200 OK`: aplicação disponivel

## Variaveis de ambiente

A aplicação usa `dotenv` e carrega variaveis do arquivo `.env`.

| Variavel | Obrigatoria | Default | Descricao |
| --- | --- | --- | --- |
| `PORT` | nao | `3000` | Porta HTTP utilizada pelo servidor |

Arquivos auxiliares de ambiente no projeto:

- `.env` (usado no Docker Compose)
- `.env.local`
- `.env.development`
- `.env.production`

## Como executar localmente (sem Docker)

Pre-requisitos:

- Node.js (LTS recomendado)
- npm

Instalacao e execucao:

```bash
npm install
npm run dev
```

A aplicação estará disponível em:

- `http://localhost:3000/status`

## Como executar localmente com Docker Compose

```bash
docker compose up --build
```

A aplicação estará disponível em:

- `http://localhost:3000/status`

## Executando testes

```bash
npm test
```

O teste valida:

- status code `200`
- header `content-type` como JSON
- payload `{ "status": "ok" }`

## Troubleshooting

Se `localhost:3000/status` nao responder:

1. Verifique se o container está em execução:
   ```bash
   docker ps
   ```
2. Confira logs da aplicação:
   ```bash
   docker logs <container_id>
   ```
3. Garanta que a porta foi publicada corretamente (`-p 3000:3000`).
4. Rebuild da imagem para evitar cache desatualizado:
   ```bash
   docker build --no-cache -t nodeapp:0.1 .
   ```
5. Teste com `curl`:
   ```bash
   curl -i http://localhost:3000/status
   ```

Se ainda houver erro, valide se outra aplicação já usa a porta `3000`.

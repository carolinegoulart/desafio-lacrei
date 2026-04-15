# Desafio Técnico Lacrei

API em Node.js com Express, que expõe uma rota HTTP `[GET] /status` para validar a disponibilidade da aplicação. Possui também um teste unitário, que é executado durante o fluxo de CI/CD.

## Stack e arquitetura

- **Runtime:** Node.js
- **Framework web:** Express
- **Gerenciamento de ambiente:** dotenv
- **Testes:** Node Test Runner (`node --test`) + Supertest
- **Containerização:** Docker + Docker Compose

Arquivos principais:

- `server.js`: bootstrap da aplicação, leitura de variáveis de ambiente e registro de rotas
- `routes/status.js`: implementação do endpoint de status
- `routes/status.test.js`: teste automatizado da rota `/status`
- `Dockerfile`: build da imagem da aplicação
- `docker-compose.yml`: orquestração local do serviço
- `.github/workflows`: arquivos de configuração das pipelines

## Endpoint

### `GET /status`

Exemplo de resposta:

```json
{
   "status": "ok",
   "version": "1.1.0",
   "environment": "staging"
}
```

Códigos esperados:

- `200 OK`: aplicação disponível

## Variáveis de ambiente

A aplicação usa a biblioteca `dotenv` para carregar as variáveis de ambiente em ambiente local. Em staging e produção, as variáveis são definidas diretamente na AWS.

## Como executar localmente (sem Docker)

Pré-requisitos:

- Node.js (LTS recomendado)
- npm

Instalação e execução:

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

Se `localhost:3000/status` não responder:

1. Verifique se o container está em execução:
   ```bash
   docker ps
   ```
2. Confira os logs da aplicação:
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

## Linting

Este projeto usa `ESLint` para padronização e validação estática do código.

Para executar:

```bash
npm run lint:fix
```

O comando executa o ESLint em todo o projeto (`eslint . --fix`) e corrige automaticamente problemas como:

- Variáveis não utilizadas
- Uso de variáveis não declaradas
- Inconsistências de pontuação, estilo e boas práticas

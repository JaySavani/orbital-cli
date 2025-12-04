# Orbital CLI

Orbital CLI is a Better Auth–powered device-flow authentication CLI with an AI workspace for developers.

It combines:

- **Device Flow authentication** via Better Auth + GitHub OAuth
- **Persistent AI chat** (backed by Postgres + Prisma)
- **Tool‑calling chat** (Google Search, code execution, URL context)
- **An autonomous agent** that can generate complete applications (files, folders, and setup commands) into your current directory
- A **Next.js web UI** for the device-authorization flow

---

## Features

### 🔐 Device Flow Authentication (Better Auth)

- `orbital login` implements OAuth 2.0 **Device Authorization Grant** on top of Better Auth.
- Authenticates via **GitHub** and stores tokens securely under `~/.better-auth/token.json`.
- CLI helpers:
  - `orbital login` – interactive login (opens browser or gives you the verification URL + code)
  - `orbital logout` – clears the stored token
  - `orbital whoami` – shows the currently authenticated user from the database

Under the hood:

- Auth server is an Express app (`server/src/index.js`) using `better-auth` with a **Prisma adapter** and **PostgreSQL**.
- Device flow is configured with `verificationUri: "/device"` and a front-end redirect to the Next.js app.

---

### 💬 AI Chat (with history)

- Authenticated users can start a chat session with:
  - `orbital wakeup` → select **Chat**.
- Conversations and messages are stored in Postgres via Prisma (`Conversation` / `Message` models).
- Terminal UX:
  - Pretty message boxes using `boxen` + `chalk`
  - Markdown rendering in the terminal via `marked` + `marked-terminal`
- Powered by Google Generative AI through the `ai` SDK and `@ai-sdk/google`.

---

### 🛠 Tool‑Augmented Chat

- From `orbital wakeup`, choose **Tool Calling** to enable multi‑step tool use.
- Tools are defined in `server/src/config/tool.config.js` and include:
  - **Google Search** – real‑time web search
  - **Code Execution** – run generated Python code for calculations / checks
  - **URL Context** – let the model read and reason over web pages via URLs you mention
- CLI flow:
  - You get a multiselect UI for enabling tools per session.
  - Active tools are displayed in a box, and used via the AI SDK’s tool calling (`streamText` with tools + steps).

---

### 🤖 Agent Mode – Autonomous Application Generator

- From `orbital wakeup`, choose **Agentic Mode**.
- The agent:
  - Asks *“What would you like to build?”* (e.g. “Build a todo app with React and Tailwind”).
  - Uses **structured output** (`generateObject` + Zod schema) to produce:
    - A **kebab‑case folder name**
    - A list of **full file paths + contents**
    - **Setup commands** (e.g. `npm install`, `npm run dev`, etc.)
  - Writes all generated files into a new folder under the **current working directory**.
  - Prints:
    - A project file tree
    - Generated location
    - Next steps / commands to run

**Important:** The agent **creates real files and folders**. Make sure you’re in a safe directory before using Agent Mode.

---

## Project Structure

- `server/` – Node.js backend, Prisma + PostgreSQL, Better Auth, and the CLI itself
  - `src/index.js` – Express server exposing Better Auth endpoints and `/device` redirect
  - `src/lib/auth.js` – Better Auth + Prisma adapter + device authorization configuration
  - `src/cli/main.js` – CLI entrypoint (exposed as `orbital` via `bin` in `package.json`)
  - `src/cli/commands/auth/login.js` – login/logout/whoami commands and token management
  - `src/cli/commands/ai/wakeUp.js` – `wakeup` command; entry to chat/tool/agent modes
  - `src/cli/chat/` – chat UIs:
    - `chat-with-ai.js` – basic chat
    - `chat-with-ai-tool.js` – tool‑calling chat
    - `chat-with-ai-agent.js` – agent mode (app generator)
  - `src/config/tool.config.js` – tool configuration (Google Search, code execution, URL context)
  - `src/config/agent.config.js` – structured app generation (Zod schema + filesystem writes)
  - `prisma/schema.prisma` – Postgres schema (users, sessions, accounts, device codes, conversations, messages)
- `client/` – Next.js app (App Router) used primarily for the **device verification UI**
  - `package.json` – Next.js, Tailwind, shadcn/radix UI, Better Auth client, etc.

---

## Tech Stack

**Backend / CLI**

- Node.js (ESM)
- Express
- Better Auth (with Prisma adapter)
- PostgreSQL + Prisma
- Commander, @clack/prompts, chalk, boxen, yocto-spinner
- Google Generative AI via `@ai-sdk/google` + `ai`

**Frontend**

- Next.js (App Router)
- Tailwind CSS + UI components
- Better Auth client for handling device flow from the browser

---

## Prerequisites

- **Node.js** (LTS or newer)
- **npm** / **pnpm** / **yarn**
- **PostgreSQL** instance (for `DATABASE_URL`)
- **Google Generative AI API key**
- **GitHub OAuth App** for Better Auth:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`

---

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url> orbital-cli
cd orbital-cli
```

### 2. Install dependencies

#### Server

```bash
cd server
npm install
# or
pnpm install
```

#### Client

```bash
cd ../client
npm install
# or
pnpm install
```

### 3. Configure environment variables (server)

In `server/`:

1. Copy the example env:

   ```bash
   cd server
   cp .env.example .env   # on Windows PowerShell: copy .env.example .env
   ```

2. Fill in `.env`:

   - `DATABASE_URL` – Postgres connection string  
   - `BETTER_AUTH_SECRET` – random secret for Better Auth  
   - `BETTER_AUTH_URL` – base URL of the auth server (e.g. `http://localhost:3005`)  
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` – from your GitHub OAuth app  
   - `GOOGLE_GENERATIVE_AI_API_KEY` – Google Generative AI key  
   - `ORBITAL_MODEL` – model name (default is `gemini-2.5-flash` if omitted)

### 4. Set up the database

With `DATABASE_URL` set, from `server/` run:

```bash
npx prisma db push
# or use your preferred migration workflow (e.g. npx prisma migrate dev)
```

This will create the tables for users, sessions, device codes, conversations, and messages.

### 5. Run the servers

**Auth + API server**

From `server/`:

```bash
npm run dev
# or
pnpm dev
```

This starts the Better Auth + Express server (default on port `3005`).

**Next.js client**

From `client/`:

```bash
npm run dev
# or
pnpm dev
```

By default, the Next.js app runs on `http://localhost:3000`.

---

## Installing the CLI

To use `orbital` as a global CLI during development:

From `server/`:

```bash
cd server
npm install
npm link
# or with pnpm:
# pnpm install
# pnpm link --global
```

After linking, you should have an `orbital` command available in your shell.

---

## Usage

### 1. Log in (device flow)

Make sure both the **server** and **client** are running.

Then:

```bash
orbital login
```

- You’ll see a device verification URL and user code.
- Optionally, the CLI can open the browser for you automatically.
- Approve the GitHub login in the browser.
- The CLI stores your token under `~/.better-auth/token.json`.

You can override defaults:

```bash
orbital login --server-url http://localhost:3005 --client-id YOUR_GITHUB_CLIENT_ID
```

### 2. Check your session

```bash
orbital whoami
```

Shows the current authenticated user (name, email, ID) from the database.

### 3. Wake up the AI

```bash
orbital wakeup
```

You’ll see a menu:

- **Chat** – simple AI chat
- **Tool Calling** – chat with tools like Google Search, code execution, and URL context
- **Agentic Mode** – autonomous app generator

Select an option using the interactive terminal UI.

---

### Chat

From the **Chat** option:

- Type messages and press Enter.
- AI responses stream in and are rendered as markdown in your terminal.
- Conversation is stored in Postgres, so you can extend or revisit sessions.

---

### Tool‑Calling Chat

From the **Tool Calling** option:

1. Select which tools to enable (Google Search, code execution, URL context).
2. Start chatting; the model can:
   - Look up fresh info with Google Search.
   - Execute generated Python code.
   - Fetch and reason about web pages via URLs you mention.

Enabled tools are logged and shown in the session header.

---

### Agent Mode (Autonomous Application Generator)

From the **Agentic Mode** option:

1. Describe what you want to build, e.g.:

   ```text
   Build a todo app with React and Tailwind that stores items in localStorage.
   ```

2. The agent:
   - Generates a structured description of the app (folder, files, content, commands).
   - Creates a new folder under the **current working directory**.
   - Writes all files to disk.
   - Shows you the project structure and exact commands to run next.

**Note:** Agent Mode has full write access to your current directory. Use it in a dedicated workspace.

---

## Environment Variables (Server)

- `DATABASE_URL` – PostgreSQL connection string
- `BETTER_AUTH_SECRET` – secret for Better Auth
- `BETTER_AUTH_URL` – public/base URL of the auth server
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` – GitHub OAuth app credentials
- `GOOGLE_GENERATIVE_AI_API_KEY` – Google Generative AI key
- `ORBITAL_MODEL` – model name for `@ai-sdk/google` (default `gemini-2.5-flash`)

---

## Status

The project is under active development. Expect breaking changes and polish to the CLI UX, agent capabilities, and the Next.js UI over time.

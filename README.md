# AI Snippet Service

A full-stack TypeScript service that transforms raw text content into AI-generated summaries for content teams.

## 🚀 Quick Start

> **Before you begin:** You need an **OpenAI API key** to run this project.
>
> <details>
> <summary>Click here for instructions</summary>
>
> 1. **Sign up / Log in to OpenAI**  
>    Go to [https://platform.openai.com](https://platform.openai.com) and log in or create an account.
> 2. **Create an API Key**
>    - Navigate to API Keys - [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).
>    - Select a name and click **Create new secret key**.
>    - Copy the key
> 3. **Add it to your `.env` file**
>    ```env
>    OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
>    ```
>    </details>

### Clone the repo

```bash
git clone git@github.com:olowe/ai-snippets-service.git
cd ai-snippets-service
```

## 🔧 Local Development Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- OpenAI API Key

### Environment Configuration

**Backend:**

1. Get OpenAI API key from: https://platform.openai.com/api-keys
2. Create `.env` file in project root:

```bash
# Copy the example environment file and update it
cp .env.example .env

# Add your OpenAI API key
OPENAI_API_KEY="..."

# Set NODE_ENV
NODE_ENV="development"
```

**Frontend:**

```bash
# Navigate to the frontend service
cd ai-snippet-web

# Copy the example environment file and update it
cp .env.example .env

# Set API URL
VITE_API_BASE_URL="http://localhost:3000"
```

### Install dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd ai-snippet-web
npm install
```

### Start the service

```bash
# Start backend only
npm run dev

# Start frontend only
cd ai-snippet-web && npm run dev
```

**Services will be available at:**

- **API Server**: http://localhost:3000
- **Web UI**: http://localhost:3030
- **MongoDB**: localhost:27017

## 🐳 Docker environment

### Docker environment configuration

**Backend:**

1. Get OpenAI API key from: https://platform.openai.com/api-keys
2. Create `.env.prod` file in project root:

```bash
# Copy the example environment file and update it
cp .env.example .env.prod

# Add your OpenAI API key
OPENAI_API_KEY="..."

# Set db uri
MONGODB_URI="mongodb://mongodb:27017/<db-name>"

# Set test db uri
TEST_MONGODB_URI="mongodb://mongodb:27017/<test-db-name>"

# Set NODE_ENV
NODE_ENV="production"
```

**Frontend:**

```bash
# Navigate to the frontend service
cd ai-snippet-web

# Copy the example environment file and update it
cp .env.example .env

# Set API URL
VITE_API_BASE_URL="http://localhost:3000"
```

### Start the entire application stack

```bash
# Start everything (runs tests first, then starts services)
# At the project root, run:
docker compose up --build
```

**Services will be available at:**

- **API Server**: http://localhost:3000
- **Web UI**: http://localhost:3030
- **MongoDB**: localhost:27017

## 🧪 Running Tests

```bash
# Backend unit tests
npm run test

# Watch mode for development
npm run test:dev

# Run tests in Docker environment
docker compose run backend npm run test
```

## 📚 API Documentation

### Create Snippet

```bash
curl -X POST http://localhost:3000/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your raw content here. This could be a blog draft, transcript, or any text that needs summarization for content teams to reuse elsewhere."
  }'
```

**Response:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "text": "Your raw content here...",
  "summary": "AI-generated 30-word summary of the content."
}
```

### Get Single Snippet

```bash
curl http://localhost:3000/snippets/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "text": "Your snippet here...",
  "summary": "AI-generated summary."
}
```

### List All Snippets

```bash
curl http://localhost:3000/snippets
```

**Response:**

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "text": "Content preview...",
    "summary": "AI summary..."
  }
]
```

## ⚙️ Testing Strategy

### Test-Driven Development

This project follows strict TDD methodology with meaningful test-first cycles:

```bash
# Example TDD cycle from git history:
[wip] add failing tests for snippet manager
test(snippet-manager): add passing tests for createSnippet
```

## 📸 Application Screenshots

### Web Interface

![Screenshot: Main form with textarea and "Generate Summary" button](https://imgur.com/iQciD7D.png)

![Screenshot: Multiple Snippets](https://imgur.com/Uk8XaVp.png)

### Test Results

![Screenshot: Vitest output showing passing TDD tests](https://imgur.com/RzchVIo.png)

## 📝 Technical Notes

### TODO/Roadmap

- Add comprehensive edge case tests for `SummaryGenerator` (rate limiting, token limits)
- Implement integration tests for API routes using Supertest
- Implement response streaming for real-time summary generation feedback
- Implement more sophisticated prompt engineering with parameter tuning
- Create dedicated snippet detail pages with full text and summary comparison

### Trade-offs

- Prioritized working features over comprehensive edge case handling
- Chose manual deployment coordination over CI/CD pipeline setup
- Multi-service coordination required more time than anticipated for proper configuration

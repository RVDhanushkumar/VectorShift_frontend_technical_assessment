# VectorShift Frontend Technical Assessment

An interactive visual pipeline builder that lets users compose data-processing workflows by dragging and connecting nodes on a canvas. A FastAPI backend validates the resulting graph for correctness.

---

## Project Structure

```
frontend_technical_assessment/
├── backend/
│   └── main.py              # FastAPI server — DAG validation
└── frontend/
    └── src/
        ├── App.js            # Root component
        ├── store.js          # Zustand global state
        ├── ui.js             # ReactFlow canvas
        ├── toolbar.js        # Draggable node palette
        ├── submit.js         # Submit button + result dialog
        ├── JsonEditorPanel.js# Live JSON import/export panel
        └── nodes/            # 8 node types (Input, Output, LLM, …)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Canvas / graph | ReactFlow 11 |
| State management | Zustand |
| Backend framework | FastAPI |
| Data validation | Pydantic |

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.9+

### Backend

```bash
cd backend
pip install fastapi pydantic uvicorn python-multipart
python main.py
```

Server starts at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`.

---

## Features

### Pipeline Canvas

- **Drag-and-drop nodes** from the toolbar onto the canvas.
- **Connect nodes** by dragging from an output handle to an input handle.
- **Grid snapping** (20 px), minimap, and zoom controls built in.

### Node Types

| Node | Purpose |
|---|---|
| Input | Named pipeline entry point with configurable data type |
| Output | Named pipeline exit point |
| LLM | AI model node (system prompt + user prompt → response) |
| Text | Text manipulation / formatting |
| Conditional | Branching logic |
| API Call | HTTP request (GET / POST / PUT / PATCH / DELETE) |
| Transform | Data transformation utilities |
| Note | Free-text annotation |

### JSON Editor Panel

A slide-out panel on the right exposes the full pipeline as editable JSON. Changes are validated (`id`, `type`, `position` required on every node) and applied live to the canvas.

### Pipeline Validation

Clicking **Submit Pipeline** posts the current nodes and edges to the backend. The response shows:

- Number of nodes
- Number of edges
- Whether the graph is a valid DAG (no cycles)

---

## API

### `GET /`

Health check.

```json
{ "Ping": "Pong" }
```

### `POST /pipelines/parse`

Validate a pipeline graph.

**Request body**

```json
{
  "nodes": [{ "id": "input-1" }, { "id": "llm-1" }],
  "edges": [{ "source": "input-1", "target": "llm-1" }]
}
```

**Response**

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

The backend uses an in-degree topological sort (Kahn's algorithm) to detect cycles.

---

## Configuration

All defaults are hardcoded for local development — no `.env` file is required.

| Setting | Value |
|---|---|
| Frontend origin (CORS) | `http://localhost:3000` |
| Backend base URL (frontend) | `http://localhost:8000` |

---

## Available Scripts (frontend)

| Command | Description |
|---|---|
| `npm start` | Development server with hot reload |
| `npm run build` | Production build to `frontend/build/` |
| `npm test` | Run test suite |

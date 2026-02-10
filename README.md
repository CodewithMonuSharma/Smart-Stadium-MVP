# Smart Stadium Management System

A modern full-stack application for managing stadium operations with AI-powered insights.

## Features

- **Dashboard**: Real-time KPI metrics, occupancy tracking, and system health monitoring.
- **Smart Ticketing**: Mock AI fraud detection for digital tickets.
- **Crowd Management**: Live crowd density heatmap and AI-driven flow predictions.
- **Energy & Sustainability**: Monitoring and optimization suggestions.
- **Merchandise**: Inventory analytics.

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + shadcn/ui + Recharts
- **Backend**: Django + Django REST Framework + Python AI (scikit-learn/pandas mock)
- **Database**: SQLite (Default) / PostgreSQL (Configurable)
- **AI/ML**: Python-based prediction logic

## Prerequisities

- Python 3.8+
- Node.js 16+

## Setup Instructions

### 1. Backend Setup

Navigate to the `backend` folder:
```bash
cd backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run migrations:
```bash
python manage.py migrate
```

Start the server:
```bash
python manage.py runserver
```
The backend API will run at `http://127.0.0.1:8000/`.

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

### 3. Usage

- **Dashboard**: View high-level stats.
- **Crowd Management**: Navigate to `/crowd` to see the live heatmap and AI predictions.
- **Mock Data**: Use the backend API `http://127.0.0.1:8000/api/generate-mock/` (POST request) to populate initial data if needed, or rely on auto-generation.

## AI Features (Mock)

- **Crowd Prediction**: Predicts future congestion based on current capacity.
- **Ticket Fraud**: Assigns a fraud score based on ticket pattern analysis.
- **Energy Forecast**: Projects future usage based on historical trends.

## Configuration

- To use PostgreSQL, set `DB_NAME`, `DB_USER`, `DB_PASSWORD` environment variables before running Django.
- Tailwind configuration is in `frontend/tailwind.config.js`.

---
**Note**: This is an MVP prototype. AI models use simulated logic for demonstration purposes.

# Groq Chatbot Full-Stack Application

A modern full-stack application for interacting with Groq AI models through a clean, responsive chat interface.

## 🌟 Features

- **Interactive Chat Interface**: User-friendly chat UI similar to ChatGPT and Claude
- **Multiple AI Models**: Support for various Groq models including Mixtral, LLaMA2, and Gemma
- **Customizable Parameters**: Adjust temperature and token length for different response styles
- **Streaming Support**: Option for real-time streaming responses
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme based on system preferences

## 🏗️ Architecture

This project consists of two main components:

1. **Backend API**: FastAPI server that proxies requests to the Groq API
2. **Frontend UI**: React + TypeScript application with a modern chat interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Groq API key (obtain from [Groq's website](https://console.groq.com))

### Installation

#### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhay-Kanwasi/Groq-powered-Chatbot.git
   cd Groq-powered-Chatbot/backend
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the backend server:
   ```bash
   uvicorn app:app --reload
   ```

The FastAPI backend will run on `http://localhost:8000`.

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The React frontend will run on `http://localhost:3000`.

## 📁 Project Structure

```
groq-chatbot/
├── backend/                 # FastAPI backend
│   ├── app.py               # Main FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/             # API integration
│   │   ├── components/      # React components
│   │   ├── store/           # Zustand state management
│   │   ├── types.ts         # TypeScript types
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Entry point
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── tsconfig.json        # TypeScript configuration
│
└── README.md                # Project documentation
```

## 💻 API Endpoints

### Backend FastAPI Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat` | POST | Send a chat message and get an AI response |
| `/models` | GET | Get a list of available AI models |
| `/health` | GET | Health check endpoint |

### Frontend API Integration

The frontend communicates with the backend using Axios for HTTP requests and React Query for data fetching/caching.

## 🧩 Technologies Used

### Backend
- **FastAPI**: High-performance web framework for building APIs
- **httpx**: Asynchronous HTTP client for Python
- **python-dotenv**: Environment variable management

### Frontend
- **React**: UI library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Vite**: Next-generation frontend tooling
- **Zustand**: Lightweight state management
- **React Query**: Data fetching and caching library
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **Lucide React**: Beautiful icons

## ⚙️ Configuration Options

### Backend Configuration

- `GROQ_API_KEY`: Your Groq API key
- `GROQ_ORGANIZATION_ID` : Groq Organization ID
- Available models are defined in the `MODELS` dictionary in `app.py`

### Frontend Configuration

The chat settings can be adjusted via the settings panel:

- **Model**: Select which Groq model to use
- **Temperature**: Adjust from 0.0 (more deterministic) to 1.0 (more creative)
- **Max Tokens**: Set the maximum length of responses (100-2000)
- **Stream**: Toggle streaming mode for real-time responses

## 🔄 Development Workflow

1. Make changes to the backend or frontend code
2. Backend changes will automatically reload with uvicorn's `--reload` flag
3. Frontend changes will automatically reload with Vite's hot module replacement

## 🛠️ Building for Production

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Run with a production ASGI server like Uvicorn or Gunicorn:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend

```bash
cd frontend
npm run build
```

This creates a `dist` directory with production-ready static files that can be served by any static file server.

## 🔒 Security Considerations

- The backend should validate all inputs
- In production, configure CORS properly to restrict access
- Don't expose your Groq API key in client-side code
- Consider adding rate limiting for the chat endpoint

## 👥 Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgements

- [Groq](https://groq.com) for providing the AI API
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for styling
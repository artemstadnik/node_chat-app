# Node Chat App

A real-time multi-room chat application built with React, Node.js, Express, and Socket.IO. Features instant messaging, room management (create, rename, delete, join), persistent usernames, and a Discord-inspired dark UI.

## Technologies Used

- **React 18** — UI framework with custom hooks architecture
- **Vite 5** — build tool with HMR
- **Socket.IO 4** — real-time bidirectional WebSocket communication
- **Express 5** — HTTP server framework
- **Sass** — SCSS modules for component-level styling
- **ESLint** & **Prettier** — code quality and formatting

## Getting Started

Clone the repository:

```bash
git clone https://github.com/artemstadnik/node_chat-app.git
cd node_chat-app
```

Install dependencies:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

Run the project locally (two terminals):

```bash
npm run start:server
```

```bash
npm run start:client
```

The client dev server starts at `http://localhost:5173`, the API server at `http://localhost:3005`.

### Available Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run start:server` | Start the Socket.IO / Express server |
| `npm run start:client` | Start the Vite dev server            |
| `npm run lint`         | Lint and auto-fix with ESLint        |
| `npm run format`       | Format with Prettier                 |

## Features

- **Real-time messaging** — instant delivery via WebSockets with author, timestamp, and room context
- **Multi-room support** — create, rename, join, and delete chat rooms on the fly
- **Persistent username** — saved in localStorage, restored on page reload
- **Default "General" room** — always available, cannot be deleted
- **Auto-scroll** — chat view automatically follows new messages
- **Dark theme** — Discord-inspired dark purple UI with Inter font
- **Modular architecture** — custom React hooks (`useAuth`, `useChat`) separate concerns cleanly
- **Handler-based server** — room and message logic isolated into dedicated Socket.IO handlers

## Project Structure

```
node_chat-app/
├── client/
│   ├── src/
│   │   ├── components/    Login, Sidebar, ChatWindow
│   │   ├── hooks/         useAuth, useChat
│   │   ├── styles/        SCSS modules
│   │   ├── socket.js      Socket.IO client singleton
│   │   ├── App.jsx        Root component
│   │   └── main.jsx       Entry point
│   ├── index.html
│   └── vite.config.js
├── server/
│   └── src/
│       ├── handlers/      roomHandlers, messageHandlers
│       ├── config.js      PORT & CLIENT_ORIGIN
│       ├── store.js       In-memory data store
│       └── index.js       Express + Socket.IO server
└── package.json
```

## Author

**Artem Stadnik** — [GitHub](https://github.com/artemstadnik)

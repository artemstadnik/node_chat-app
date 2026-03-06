import useAuth from './hooks/useAuth';
import useChat from './hooks/useChat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  const { username, temporaryName, setTemporaryName, login, logout } =
    useAuth();

  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    createRoom,
    renameRoom,
    deleteRoom,
  } = useChat(username);

  if (!username) {
    return (
      <Login
        onLogin={login}
        temporaryName={temporaryName}
        onTemporaryNameChange={setTemporaryName}
      />
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        rooms={rooms}
        currentRoom={currentRoom}
        onSelectRoom={setCurrentRoom}
        onCreateRoom={createRoom}
        onLogout={logout}
        username={username}
        onRenameRoom={renameRoom}
        onDeleteRoom={deleteRoom}
      />

      <ChatWindow
        currentRoom={currentRoom}
        messages={messages}
        onSendMessage={sendMessage}
        newMessage={newMessage}
        onNewMessageChange={setNewMessage}
      />
    </div>
  );
}

export default App;

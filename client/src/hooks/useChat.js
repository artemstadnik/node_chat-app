import { useEffect, useRef, useState } from 'react';
import socket from '../socket';

function useChat(username) {
  const [rooms, setRooms] = useState(['General']);
  const [currentRoom, setCurrentRoom] = useState('General');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentRoomRef = useRef(currentRoom);

  currentRoomRef.current = currentRoom;

  const sendMessage = (submitEvent) => {
    submitEvent.preventDefault();

    const trimmedText = newMessage.trim();

    if (!trimmedText) {
      return;
    }

    const messageData = {
      author: username,
      text: trimmedText,
      time: new Date().toLocaleTimeString(),
      room: currentRoom,
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  const createRoom = () => {
    const roomName = prompt('Enter new room name:');

    if (roomName && !rooms.includes(roomName)) {
      socket.emit('create_room', roomName);
      setCurrentRoom(roomName);
    }
  };

  const renameRoom = (oldName) => {
    const newName = prompt(`Rename "${oldName}" to:`, oldName);

    if (newName && newName !== oldName && !rooms.includes(newName)) {
      socket.emit('rename_room', { oldName, newName });
    }
  };

  const deleteRoom = (roomToDelete) => {
    if (roomToDelete === 'General') {
      return alert('Cannot delete the General room.');
    }

    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${roomToDelete}"?`,
    );

    if (isConfirmed) {
      socket.emit('delete_room', roomToDelete);

      if (currentRoom === roomToDelete) {
        setCurrentRoom('General');
      }
    }
  };

  useEffect(() => {
    socket.on('init_data', (data) => {
      setRooms(data.rooms);
      setMessages(data.messages);

      if (!data.rooms.includes(currentRoomRef.current)) {
        setCurrentRoom(data.rooms[0] || 'General');
      }
    });

    socket.on('room_renamed', ({ oldName, newName }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.room === oldName ? { ...msg, room: newName } : msg,
        ),
      );

      if (currentRoomRef.current === oldName) {
        setCurrentRoom(newName);
      }
    });

    socket.on('room_deleted', (roomName) => {
      setMessages((prev) => prev.filter((msg) => msg.room !== roomName));

      if (currentRoomRef.current === roomName) {
        setCurrentRoom('General');
      }
    });

    socket.on('receive_message', (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    });

    socket.on('update_rooms', (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => {
      socket.off('init_data');
      socket.off('room_renamed');
      socket.off('room_deleted');
      socket.off('receive_message');
      socket.off('update_rooms');
    };
  }, []);

  useEffect(() => {
    if (username) {
      socket.emit('set_username', username);
      socket.emit('join_room', currentRoom);
    }
  }, [username, currentRoom]);

  return {
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
  };
}

export default useChat;

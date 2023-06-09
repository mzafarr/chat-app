import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import dynamic from "next/dynamic";

const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      email: auth.currentUser.email,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center pt-10 max-w-s h-screen bg-slate-600 text-white">
      <div className="text-3xl text-center mb-6">
        <h1>
          Welcome to:
          <span className="font-semibold">{room.toUpperCase()}</span>
        </h1>
      </div>
      <div className="flex h-5/6 flex-col max-w-[370px] items-start justify-between border p-4">
        <div className="min-w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-3 min-w-full  ${
                auth.currentUser && auth.currentUser.email === message.email
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex rounded-lg min-w-[120px] whitespace-normal ${
                  auth.currentUser && auth.currentUser.email === message.email
                    ? "bg-red-300"
                    : "bg-orange-300"
                }`}
              >
                <span className="px-3 py-1.5 text-lg break-words min-w-[120px] whitespace-normal">
                  {message.text}
                </span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="min-w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="p-2 rounded-md"
            placeholder="Type your message here..."
          />
          <button type="submit" className="py-2 px-4 bg-slate-900 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
// export default Chat;
export default dynamic (() => Promise.resolve(Chat), {ssr: false})
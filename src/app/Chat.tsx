"use client"
import React, { useState, useEffect, useRef } from "react";
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
import ScrollToBottom from "react-scroll-to-bottom";
import Image from "next/image";
import sendIcon from "../../public/sendIcon.png"

interface Message {
  id: string;
  text: string;
  email: string;
}

const Chat = ({ room }: { room: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = useRef(collection(db, "messages")); // Use useRef to create a stable reference
  useEffect(() => {
    const queryMessages = query(
      messagesRef.current, // Access the reference using .current
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const messageData = change.doc.data() as Message;
          setMessages((prevMessages) => [...prevMessages, { ...messageData, id: change.doc.id }]);
        }
      });
    });
    return () => unsubscribe();
  }, [room]); // Only include 'room' as the dependency

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef.current, { // Access the reference using .current
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="flex flex-col justify-around items-center py-6 max-w-s h-[90vh] bg-slate-600 text-white md:text-2xl">
      <div className="text-3xl text-center mb-4">
        <h1>
          Welcome to: 
          <span className="font-semibold"> {room.toUpperCase()}</span>
        </h1>
      </div>
      <div className="max-w-[370px] flex flex-col h-full items-start justify-between rounded-md border p-4">
        {/* <div className="min-w-full"> */}
          <ScrollToBottom  className="overflow-scroll min-w-full">
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
                      ? "bg-red-300 ml-8"
                      : "bg-orange-300 mr-8"
                  }`}
                >
                  <span className="px-3 py-1.5 text-xl md:text-2xl break-words min-w-[120px] whitespace-normal">
                    {message.text}
                  </span>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        {/* </div> */}
        <form onSubmit={handleSubmit} className="flex min-w-full pt-2 mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="p-2 text-slate-700 rounded-l-lg w-[90%] text-xl outline-none"
            placeholder="Type your message here..."
          />
          <button type="submit" className="py-2.5 px-4 bg-slate-900 rounded-r-lg">
            <Image src={sendIcon} alt="send button" width={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Chat), { ssr: false });

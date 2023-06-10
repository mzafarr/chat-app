"use client";
import React, { useState } from "react";
import Chat from "./Chat";
import Auth from "./Auth";
import { AppWrapper } from "./AppWrapper";
import Cookies from "universal-cookie";
import dynamic from "next/dynamic";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");

  return (
    <>
      {!isAuth ? (
        <AppWrapper
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsInChat={setIsInChat}
        >
          <Auth setIsAuth={setIsAuth} />
        </AppWrapper>
      ) : (
        <AppWrapper
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsInChat={setIsInChat}
        >
          {!isInChat ? (
            <div className="w-full p-4 h-screen outline-none bg-slate-600 absolute inset-0 flex flex-col justify-center items-center">
              <input
                placeholder="enter room number"
                onChange={(e) => setRoom(e.target.value)}
                className="w-full max-w-xs px-3 py-4 text-slate-800 text-xl"
              />
              <button
                className="w-full max-w-xs my-4 p-3 text-2xl bg-slate-800"
                onClick={() => {
                  setIsInChat(true);
                }}
              >
                Enter Chat
              </button>
            </div>
          ) : (
            <Chat room={room} />
          )}
        </AppWrapper>
      )}
    </>
  );
}
// export default ChatApp;
export default dynamic(() => Promise.resolve(ChatApp), { ssr: false });

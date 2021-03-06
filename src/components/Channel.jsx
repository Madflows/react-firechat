import React, { useState, useEffect, useRef } from "react";

import {
  collection,
  limit,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Message from "./Message";

const Channel = ({ user = null, db = null, msgRef = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const msgRef = collection(db, "messages");
      const unsubMsg = onSnapshot(
        query(msgRef, orderBy("createdAt"), limit(50)),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(data);
        }
      );
      

      return unsubMsg;
    }
    // Scroll the last message into view :)
    bottomListRef.current.scrollIntoView({ behavior: "smooth" });
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      addDoc(msgRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
      }).then(() => {
        setNewMessage("");
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className="flex flex-col max-h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Welcome to</p>
              <h2 className="mb-3">Flows FireChat</h2>
            </div>
            <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p>
          </div>

          <div className="h-[50vh] overflow-x-clip overflow-y-scroll">
            <ul>
              {messages.map((message) => (
                <li key={message.id}>
                  <Message {...message} />
                </li>
              ))}
            </ul>
            <div ref={bottomListRef} />
          </div>
        </div>
      </div>

      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md z-10 max-w-screen-lg mx-auto dark:text-slate-800 shadow-md"
        >
          <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent dark:text-slate-800 outline-none px-4 py-3"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 px-4 py-3 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Channel;

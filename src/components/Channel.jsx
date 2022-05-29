import React, { useState, useEffect } from "react";

import { collection, limit, onSnapshot, query, orderBy } from "firebase/firestore";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);

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
  }, [db]);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;

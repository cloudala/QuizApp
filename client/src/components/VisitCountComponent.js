import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function VisitCount() {
  const { user, visitCount } = useContext(UserContext);

  return (
    <>
      {user && (
        <div className="bg-yellow-300 p-4 rounded-md shadow-md">
          <p className="text-2xl font-bold text-gray-800">
            Welcome, <span className="text-blue-700">{user.name}</span>! Thank you and your friends for the {visitCount} visit(s) 🥰!
          </p>
        </div>
      )}
    </>
  );
}
import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // const { data, loading, error, fetchData } = useFetch(
    //   'https://localhost:4000/api/quizzes'
    // );
    
    const [user, setUser] = useState(null);

    const updateUser = async (newUserData) => {
        setUser(newUserData);
    };

    return (
    <UserContext.Provider
        value={{
        user,
        setUser,
        updateUser
        }}
    >
        {children}
    </UserContext.Provider>
    );
};
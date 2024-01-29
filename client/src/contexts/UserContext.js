import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Cookies from 'js-cookie';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        const storedVisitCount = Cookies.get(`visitCount_${user?.id}`);
        if (storedVisitCount) {
          setVisitCount(parseInt(storedVisitCount, 10));
        }
    }, [user]);

    const updateUser = async (newUserData) => {
        setUser(newUserData);
    };

    const incrementVisitCount = (user) => {
        setVisitCount((prevCount) => {
            const newCount = prevCount + 1;
            Cookies.set(`visitCount_${user.id}`, newCount, { expires: 365 });
            return newCount;
        });
    };

    return (
    <UserContext.Provider
        value={{
        user,
        setUser,
        updateUser,
        visitCount,
        setVisitCount,
        incrementVisitCount
        }}
    >
        {children}
    </UserContext.Provider>
    );
};
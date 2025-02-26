import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // replace this with actual API call
    const fetchUser = async () => {
      const userData = {
        username: "JohnDoe",
        profilePicture: "/logo192.png",
        name: "John Doe",
        level: "0",
        creation_date: "1-1-1969",
      };
      setUser(userData);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export default UserContext;

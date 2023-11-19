import { createContext } from "react";
import { useState } from "react";

const userContext = createContext();
const UserState = (props) => {
  const [username, setusername] = useState(null);

  return (
    <userContext.Provider value={{ username, setusername }}>
      {props.children}
    </userContext.Provider>
  );
};
export { userContext, UserState };

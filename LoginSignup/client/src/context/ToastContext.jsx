import { createContext, useState } from "react";

const ToastContext = createContext();

const ToastState = (props) => {
  const [toast, setToast] = useState(null);
  const showToast = (type, msg) => {
    console.log("running the satte");
    setToast({ type, msg });
    setTimeout(() => {
      setToast(null);
    }, 1500);
  };
  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};
export { ToastContext, ToastState };

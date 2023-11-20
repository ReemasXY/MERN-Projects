import React, { useEffect, useRef, useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const ErrorModal = () => {
  const Toast = useContext(ToastContext);
  const { toast } = Toast;

  return (
    <>
      {toast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-body bg-${toast.type} text-white`}>
              {toast.msg}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;

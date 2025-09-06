import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastDisplay from "../src/components/ToastDisplay";
import { onMessageListener } from "../src/firebase";

function useNotification() {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const notify = () => toast(<ToastDisplay notification={notification} />);
    if (notification.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
    const handleMessage = (payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    };

    onMessageListener()
      .then(handleMessage)
      .catch((err) => console.log(err));
  }, []);
  return {};
}

export default useNotification;

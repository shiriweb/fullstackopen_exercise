import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  if (!notification) return null;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px 0",
        background: "#f0f0f0",
      }}
    >
      {notification}
    </div>
  );
};

export default Notification;

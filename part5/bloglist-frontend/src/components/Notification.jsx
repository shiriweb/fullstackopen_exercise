const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px solid",
        padding: 10,
        marginBottom: 10,
      }}
    >
      {message}
    </div>
  );
};

export default Notification;

import { useEffect } from "react";

const Alert = ({ alert, setAlert }) => {
  // Display ALERT for 3 SECOND
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({ show: false });
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className={`alert-container ${alert.type}`}>
      <p>{alert.msg}</p>
    </div>
  );
};

export default Alert;

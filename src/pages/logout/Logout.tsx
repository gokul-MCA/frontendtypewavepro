import styles from "../../css/Logout.module.css";

import { Alert, AlertTitle } from "@mui/material";
import CustomButton from "../../components/ui/CustomButton";
import { useEffect, useState } from "react";
import axios from "axios";

const Logout = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

    // useEffect(() => {
    //   // Get logged-in user
    //   axios
    //     .get("/auth/current_user")
    //     .then((res) => {
    //       if (res.data) console.log(res);
    //       else window.location.href = "/";
    //     })
    //     .catch(() => (window.location.href = "/"));
  
    // }, []);
  

  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <CustomButton label="Back To Home" variant="outlined" href="/" />
      </div>

      {isAlertVisible && (
        <Alert severity="success" className={styles.alert}>
          <AlertTitle>Logout Successful</AlertTitle>
          You’ve been logged out successfully. <br />
          <strong>Hope to see you again soon — keep practicing!</strong>
        </Alert>
      )}

      <h2 className={styles.heading}>Practice makes perfect.</h2>

      <p className={styles.subtext}>
        Come back soon — the keyboard misses you!
      </p>

      <CustomButton
        label="Return to Practice"
        variant="contained"
        href="/login"
      />
    </div>
  );
};

export default Logout;

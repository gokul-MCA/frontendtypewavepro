import styles from "../../css/Login.module.css";

import CustomButton from "../../components/ui/CustomButton";
import { loginWithGoogle } from "../../services/authService";

const Login = () => {
  const handleGoogleAuth = () => {
    loginWithGoogle();
  };

  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <CustomButton label="Back To Home" variant="outlined" href="/" />
      </div>

      <div className={styles.heading_container}>
        <h1 className={styles.heading}>TypeWavePro</h1>
        <h2 className={styles.heading2}>Unlock 🔓 Premium for Free 🎁</h2>
        <h2 className={styles.heading2}>Log In 🗝️ to Get Instant Access</h2>
        <h2 className={styles.heading2}>to All Premium Features! 💎</h2>
        <p className={styles.paragraph}>
          🔸 Log in now to enjoy exclusive benefits and unlock premium features
          for an enhanced experience!{" "}
        </p>
      </div>

      <div className={styles.buttons}>
        <CustomButton
          label="Continue with Google"
          variant="contained"
          onClick={handleGoogleAuth}
        >
          <img
            src="/google-logo.svg"
            alt="Google Logo"
            height={32}
            width="auto"
            style={{ marginRight: "8px" }}
          />
        </CustomButton>
      </div>
    </div>
  );
};

export default Login;

import CustomButton from "../../components/ui/CustomButton";
import styles from "../../css/Home.module.css";

const Home: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={`${styles.box} ${styles.box1}`}>
        <h1 className={styles.heading}>TypeWavePro</h1>

        <h2 className={styles.heading2}>Boost Speed⚡& Accuracy 💯</h2>
        <h2 className={styles.heading2}>Engaging Topics💡& Tests 📋</h2>

        <p className={styles.paragraph}>
          🔸Enhance your typing skills with personalized typing tests, choose
          variety of topics and become a typing master to improve typing speed
          and accuracy.
        </p>

        <div className={styles.buttons}>
          <CustomButton
            label="Sign up – It's free!"
            variant="contained"
            sx={{ border: "none",'@media (max-width:360px)':{
                display: 'none',
              } }}
            href="/login"
            // className={styles.buttonLargeScreens}
          />
          <CustomButton
            label="Try Without Sign Up"
            variant="outlined"
            href="/practice"
            sx={{
              '@media (max-width:360px)':{
                display: 'none',
              }
            }}
            // className={styles.buttonLargeScreens}
          />
          <CustomButton
            label="Sign up"
            variant="contained"
            sx={{ border: "none",'@media (min-width:360px)':{
                display: 'none',
              } }}
            href="/login"
            // className={styles.buttonSmallScreens}
          />
          <CustomButton
            label="Try it"
            variant="outlined"
            sx={{
              '@media (min-width:360px)':{
                display: 'none',
              }
            }}
            href="/practice"
            // className={styles.buttonSmallScreens}
          />
        </div>
      </div>

      {/* <div className={`${styles.box} ${styles.box2}`}>
        This Box renders as an HTML section element.
      </div> */}
    </section>
  );
};

export default Home;

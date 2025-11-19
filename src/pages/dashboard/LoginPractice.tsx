import styles from "../../css/Practice.module.css";

import RefreshIcon from "@mui/icons-material/Refresh";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PracticeState } from "../practice/PracticeLogic";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButton";
import SearchInput from "../../components/dashboard/SearchInput";
import SelectInput from "../../components/dashboard/SelectInput";

const LoginPractice: React.FC = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();

  const context = useContext(PracticeState);
  if (!context) throw new Error("Practice must be used within a PracticeLogic");

  const {
    minutes,
    seconds,
    mistakes,
    charIndex,
    inputRef,
    charRefs,
    correctWrongStyle,
    typingContent,
    handleChange,
    handleKeyDown,
    handleClick,
    shuffleResetFunc,
    restartFunc,
  } = context;

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      navigate("result", { replace: true });
    }
  }, [minutes, seconds]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setShowSearchInput(location.pathname.includes("dynamic"));
  }, [location]);

  // variables for condition based styles
  const timeLeftStyle = minutes || (seconds < 6 && styles.red);
  const mistakeStyles = mistakes > 20 && styles.red;
  return (
    <div className={styles.container}>
      <div className={styles.back_button}>
        <CustomButton label="Back" variant="outlined" href="/dashboard" />
      </div>

      {/* search input box */}
      {showSearchInput && (
        <div className={styles.search_input}>
          <SearchInput />
        </div>
      )}

      {!showSearchInput && (
        <div className={styles.search_input}>
          <SelectInput />
        </div>
      )}

      <div className={styles.box}>
        {/* time left and mistakes section  */}
        <div className={styles.display_timeLeft_mistakes}>
          <p>
            Time Left:{" "}
            <strong className={`${timeLeftStyle}`}>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </strong>
          </p>
          <p>
            Mistakes: <strong className={`${mistakeStyles}`}>{mistakes}</strong>
          </p>
        </div>

        <Divider aria-hidden="true" className={styles.divider} />
        {/* content and practise section  */}
        <div className={styles.test}>
          <input
            type="text"
            className={styles.inputField}
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {typingContent.split("").map((char: string, index: number) => (
            <span
              key={index}
              className={`${index === charIndex && styles.active} ${
                correctWrongStyle[index]
              }`}
              ref={(el) => {
                if (el) charRefs.current[index] = el;
              }}
              onClick={() => handleClick(index)}
            >
              {char}
            </span>
          ))}
        </div>

        {/* shuffle and restart button section  */}
        <div className={styles.actions_tryAnother_restart}>
          <Tooltip title="Restart">
            <IconButton onClick={restartFunc}>
              <RefreshIcon style={{ color: "var(--secondary-color)" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LoginPractice;

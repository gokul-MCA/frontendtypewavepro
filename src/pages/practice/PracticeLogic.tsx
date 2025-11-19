import styles from "../../css/Practice.module.css";

import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { getRandomTypingContent } from "../../utils/logic";
import { Outlet } from "react-router-dom";

// Define the shape of context data
interface PracticeContextType {
  minutes: number;
  seconds: number;
  mistakes: number;
  charIndex: number;
  WPM: number;
  CPM: number;
  accuracy: number;
  inputRef: React.RefObject<HTMLInputElement>;
  charRefs: React.RefObject<HTMLSpanElement[]>;
  correctWrongStyle: string[];
  typingContent: string;
  setTypingContent: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClick: (index: number) => void;
  shuffleResetFunc: () => void;
  restartFunc: () => void;
}

export const PracticeState = createContext<PracticeContextType | undefined>(
  undefined
);

interface PractiseLogicProps {
  children?: ReactNode;
}

const PracticeLogic: React.FC<PractiseLogicProps> = ({children}) => {

  const [time, setTime] = useState<number>(120);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(Math.floor(time / 60));
  const [seconds, setSeconds] = useState<number>(time % 60);
  const inputRef = useRef<HTMLInputElement>(null!);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const [charIndex, setCharIndex] = useState<number>(0);

  // used for result
  const [WPM, setWPM] = useState<number>(0);
  const [CPM, setCPM] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [correctWrongStyle, setCorrectWrongStyle] = useState<string[]>([]);

  // Data for typing practice
  const [typingContent, setTypingContent] = useState<string>("");
  // shuffle function variable
  const [shuffleReset, setShuffleReset] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  // Effect for focusing the input and getting random typing content
  useEffect(() => {
    inputRef.current?.focus(); // Optional chaining to avoid null ref error
    const randomContent = getRandomTypingContent();
    setTypingContent(randomContent.content);
  }, [shuffleReset]);

  // Update minutes and seconds when resetTrigger changes
  useEffect(() => {
    setTime(120);
    setMinutes(time / 60);
    setSeconds(time % 60);
  }, [resetTrigger]);

  // Timer logic to decrease seconds and minutes
  useEffect(() => {
    let interval: any;
    if (isTyping && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
      setIsTyping(false);

      // Calculate typing statistics
      // Typing stats calculation
      if (charIndex > 0) {
        let correctChars = charIndex - mistakes;
        let cpm = (correctChars / time) * 60;
        setCPM(Math.max(0, Math.floor(cpm)));
        let wpm = Math.round((correctChars / 5 / time) * 60);
        setWPM(Math.max(0, wpm));
        let accuracyPercentage = (correctChars / charIndex) * 100;
        setAccuracy(Math.max(0, accuracyPercentage));
      }
    }
    return () => clearInterval(interval);
  }, [isTyping, minutes, seconds]);

  // Overall handle the typing test logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);

    if (charIndex < characters.length && (minutes > 0 || seconds > 0)) {
      if (!isTyping) setIsTyping(true);

      // styles for correct and wrong
      if (typedChar === currentChar?.textContent) {
        correctWrongStyle[charIndex] = styles.correct;
      } else {
        setMistakes(mistakes + 1);
        correctWrongStyle[charIndex] = styles.wrong;
      }

      setCharIndex((prevIndex) => prevIndex + 1);

      if (charIndex === characters.length - 1) setIsTyping(false);
    }
    e.target.value = "";
  };

  // Handles backspace keypress for correcting mistakes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && charIndex > 0) {
      e.preventDefault(); // Prevent default backspace behavior
      const prevIndex = charIndex - 1;

      if (correctWrongStyle[prevIndex] === styles.wrong) {
        setMistakes((prevMistakes) => prevMistakes - 1);
      }

      setCharIndex(prevIndex);
      setCorrectWrongStyle((prevState) => {
        const newState = [...prevState];
        newState[prevIndex] = "";
        return newState;
      });
    }
  };

  const handleClick = () => {
    setCharIndex(charIndex);
    setIsTyping(true);
    inputRef.current?.focus();
  };

  const restartFunc = () => {
    setResetTrigger((prev) => !prev); // Toggle boolean to force re-run
    setIsTyping(false);
    setCharIndex(0); // Reset character index
    setMistakes(0); // Reset mistakes
    setCorrectWrongStyle([]); // Clear styles
    inputRef.current!.value = ""; // Clear input field
  };

  const shuffleResetFunc = () => {
    setShuffleReset((prev) => !prev);
    restartFunc();
  };

  return (
    <>
      <PracticeState.Provider
        value={{
          minutes,
          seconds,
          mistakes,
          charIndex,
          WPM,
          CPM,
          accuracy,
          inputRef,
          charRefs,
          correctWrongStyle,
          typingContent,
          setTypingContent,
          handleChange,
          handleKeyDown,
          handleClick,
          shuffleResetFunc,
          restartFunc,
        }}
      >
        {children ? children : <Outlet/>}
      </PracticeState.Provider>
    </>
  );
};

export default PracticeLogic;

// You used only <Outlet /> in PracticeLogic, but it still worked — why?
// Because React Router maintains an internal outlet context tree, and
// if <PracticeLogic> is rendered as part of a route tree, it knows to inject the correct child route into the <Outlet />.
// if you need manually pass a children only u need Children
// const PracticeLogic = ({ children }: PractiseLogicProps) => {
//   const hasChildren = !!children;

//   return (
//     <PracticeState.Provider value={/* context */}>
//       {hasChildren ? children : <Outlet />}
//     </PracticeState.Provider>
//   );
// };

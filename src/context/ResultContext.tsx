import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ResultType } from '../types';

interface ResultContextType {
  result: ResultType | null;
  setResult: (result: ResultType) => void;
}

export const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResultState] = useState<ResultType | null>(null);
  
  
  // Create BroadcastChannel
  const channelRef = useRef<BroadcastChannel | null>(null);
  
  useEffect(() => {
    const channel = new BroadcastChannel("result_channel");
    channelRef.current = channel;
    
    channel.onmessage = (event) => {   // Listens for messages from other tabs
      const incomingResult = event.data as ResultType;
      setResultState(incomingResult);
    };
    
    return () => {
      channel.close();
    };
  }, []);
  
  const setResult = (newResult: ResultType) => {
    setResultState(newResult);
    channelRef.current?.postMessage(newResult); // Broadcast to other tabs
  };
  
  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => useContext(ResultContext);
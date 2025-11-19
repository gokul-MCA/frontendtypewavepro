import { Outlet, useParams } from "react-router-dom";
import PracticeLogic from "../../pages/practice/PracticeLogic";

const PracticeSessionWrapper = () => {
  const { sessionId } = useParams();
  return (
    <PracticeLogic key={sessionId}>
      <Outlet />
    </PracticeLogic>
  );
};

export default PracticeSessionWrapper;

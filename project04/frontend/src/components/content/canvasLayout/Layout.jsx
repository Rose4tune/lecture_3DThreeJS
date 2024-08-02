import { useRecoilValue } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { styled } from "styled-components";
import { SideBar } from "./UserInterfaces/common/SideBar";
import { Minimap } from "./ground/Minimap";
import { ChatArea } from "./UserInterfaces/common/ChatArea";
import { Notice } from "./UserInterfaces/common/Notice";

export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(IsLoadCompletedAtom);

  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <Minimap />
          {currentMap !== "MINI_GAME" && <ChatArea />}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;

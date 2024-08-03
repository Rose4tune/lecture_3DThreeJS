import { useRecoilValue } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
} from "../../../store/PlayersAtom";
import { styled } from "styled-components";
import { SideBar } from "./UserInterfaces/common/SideBar";
import { Minimap } from "./ground/Minimap";
import { ChatArea } from "./UserInterfaces/common/ChatArea";
import { Notice } from "./UserInterfaces/common/Notice";
import { Footer } from "./UserInterfaces/common/Footer";
import { Popup } from "./ground/Popup";

export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(IsLoadCompletedAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const me = useRecoilValue(MeAtom);

  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <Minimap />
          {currentMap !== "MINI_GAME" && <ChatArea />}
          {currentMap !== "GROUND" &&
            currentMyRoomPlayer &&
            me?.id !== currentMyRoomPlayer.id && <Popup />}
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;

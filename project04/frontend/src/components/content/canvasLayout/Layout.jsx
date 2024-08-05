import { useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
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
import { MyRoomToolBar } from "./UserInterfaces/myRoom/MyRoomToolBar";
import { Memo } from "./UserInterfaces/myRoom/Memo";
import { SelectedObjectMenuBar } from "./ground/SelectedObjectMenuBar";
import { Tooltip } from "./UserInterfaces/myRoom/Tooltip";

export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);
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
          <Memo />
          {currentMap !== "MINI_GAME" && <ChatArea />}
          {currentMap === "GROUND" &&
            currentMyRoomPlayer &&
            me?.id !== currentMyRoomPlayer.id && <Popup />}
          {currentMap === "MY_ROOM" && (
            <>
              <MyRoomToolBar />
              {currentMyRoomPlayer?.id === me.id && <SelectedObjectMenuBar />}
              <Tooltip />
            </>
          )}
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

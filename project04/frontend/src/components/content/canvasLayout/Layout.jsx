import { useRecoilValue } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { styled } from "styled-components";
import { SideBar } from "./canvas/UserInterfaces/common/SideBar";

export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompletedAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && <SideBar />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;

import { useState } from "react";
import { STEPS } from "../../../data/constans";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CharacterSelectFinishedAtom,
  SelectedCharacterGlbNameIndexAtom,
} from "../../../store/PlayersAtom";
import { socket } from "../../../sockets/clientSocket";
import { isValidText } from "../../../utils";
import { styled } from "styled-components";

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);

  const [tempNickname, setTempNickname] = useState();
  const [tempJobPosition, setTempJobPosition] = useState();
  const [selectedCharacterGlbNameIndexAtom, SetSelectedCharacterGlbNameIndex] =
    useRecoilState(SelectedCharacterGlbNameIndexAtom);

  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom
  );

  if (!socket) return null;
  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>패디에서 사용할 내 이름이에요</LoginTitle>
          <Input
            autoFocus
            placeholder="별명을 입력해주세요"
            onChange={(e) => {
              setTempNickname(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (!isValidText(tempNickname)) return;
              if (e.key === "Enter") {
                setCurrentStep(STEPS.JOB_POSITION);
              }
            }}
          />
          <NextBtn
            disabled={!isValidText(tempNickname)}
            className={isValidText(tempNickname) ? "valid" : "disabled"}
            onClick={() => {
              setCurrentStep(STEPS.JOB_POSITION);
            }}
          >
            이대로 진행할래요
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && <></>}
      {currentStep === STEPS.CHRATER && <></>}
      {currentStep === STEPS.FINISH && <></>}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background-color: #85e6ff;
`;

const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CharacterCanvasContainer = styled.div``;

const CharacterTuningWrapper = styled.div``;

const CharacterCanvasWrapper = styled.div``;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 280px;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #ffffff;
    }
  }
  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled.button``;

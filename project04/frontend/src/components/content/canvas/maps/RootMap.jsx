import React from "react";
import { GroundElements } from "./structures/ground";
import { useRecoilValue } from "recoil";
import { CharacterSelectFinishedAtom } from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";

export const RootMap = () => {
  const chracterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  return (
    <>{!chracterSelectFinished ? <CharacterInit /> : <GroundElements />}</>
  );
};

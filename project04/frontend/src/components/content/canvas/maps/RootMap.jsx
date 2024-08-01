import React, { useEffect, useRef } from "react";
import { GroundElements } from "./structures/ground";
import { useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
} from "../../../../store/PlayersAtom";
import { CharacterInit } from "../../lobby/CharacterInit";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { Player } from "./player/Player";
import { Line } from "@react-three/drei";

export const RootMap = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );

  const players = useRecoilValue(PlayersAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);

  return (
    <>
      {!characterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {playerGroundStructuresFloorPlaneCorners?.map((corner) => {
            return (
              <Line
                key={corner.name}
                color={"red"}
                points={corner.corners.map((c) => [c.x, 0.01, c.z])}
              />
            );
          })}
          {players.map((player) => {
            return (
              <Player
                key={player.id}
                player={player}
                position={
                  new Vector3(
                    player.position[0],
                    player.position[1],
                    player.position[2]
                  )
                }
              />
            );
          })}
        </>
      )}
    </>
  );
};

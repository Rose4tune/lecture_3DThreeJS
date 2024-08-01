import { NicknameBoard } from "../structures/ground/3dUIs/NicknameBoard";
import { usePlayer } from "./hooks/usePlayer";

export function Man({ player, position, modelIndex }) {
  const {
    me,
    playerRef,
    nicknameRef,
    memoizedPosition,
    playerId,
    nodes,
    materials,
  } = usePlayer({
    player,
    position,
    modelIndex: modelIndex ?? player.selectedCharacterGlbNameIndex,
  });

  return (
    <>
      {me && (
        <NicknameBoard
          ref={nicknameRef}
          text={`${player?.nickname} ${player.jobPosition}`}
        />
      )}
      <group
        ref={playerRef}
        position={memoizedPosition}
        name={playerId ?? ""}
        dispose={null}
      >
        <group name="Root_Scene">
          <group name="RootNode">
            <group
              name="CharacterArmature"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <primitive object={nodes.Root} />
            </group>
            <skinnedMesh
              castShadow
              receiveShadow
              name="Character"
              geometry={nodes.Character.geometry}
              material={materials.Atlas}
              skeleton={nodes.Character.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
      </group>
    </>
  );
}

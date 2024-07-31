import { usePlayer } from "./hooks/usePlayer";

export function Woman({ player, position, modelIndex }) {
  const { playerRef, memoizedPosition, playerId, nodes, materials } = usePlayer(
    {
      player,
      position,
      modelIndex: modelIndex ?? player.selectedCharacterGlbNameIndex,
    }
  );

  return (
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
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials["Atlas.001"]}
            skeleton={nodes.Character.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

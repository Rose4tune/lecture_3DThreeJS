import { myRoomSize } from "../../../../../../../data/constants";

export const MyRoomFloor = () => {
  return (
    <mesh name="my-room-floor" position-y={-myRoomSize / 2} receiveShadow>
      <boxGeometry args={[myRoomSize, 0.05, myRoomSize]} />
      <meshStandardMaterial color={"aqua"} />
    </mesh>
  );
};

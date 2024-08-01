import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { Vector3 } from "three";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import _ from "lodash-es";

const name = "ground-swing";
const scale = 0.04;

export const Swing = () => {
  const { scene } = useGLTF("/models/Swing.glb");
  const position = useMemo(() => new Vector3(8, 0, 8), []);
  const setPlayGroundStructuresBoundingBox = useSetRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    const mesh = scene.children[0];
    if (mesh.geometry.boundingBox) {
      setPlayGroundStructuresBoundingBox((prev) =>
        _.uniqBy(
          [
            ...prev,
            {
              name,
              box: {
                max: mesh.geometry.boundingBox.max
                  .clone()
                  .multiplyScalar(scale * 1.4),
                min: mesh.geometry.boundingBox.min
                  .clone()
                  .multiplyScalar(scale * 1.4),
              },
              position,
            },
          ],
          "name"
        )
      );
    }
  }, [scene]);

  return (
    <primitive
      visible
      name={name}
      scale={[scale, scale, scale]}
      position={position}
      object={scene}
    />
  );
};

import Earth from "./Earth";
import Weather from "./Weather";

export default function Scene() {
  return (
    <>
      <Earth position={[0, -0.7, -2]} />
      <Weather Weather={"clear"} />
    </>
  );
}

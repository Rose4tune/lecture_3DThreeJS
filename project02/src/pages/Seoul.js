import { useLoaderData } from "react-router-dom";
import Content from "../components/Content";

export default function Seoul() {
  const data = useLoaderData();

  return (
    <div className="layout-detail">
      <section className="left">
        <img src="/images/01.jpg" alt="seoul" />
      </section>
      <section className="right">
        <Content data={data.weatherData} />
      </section>
    </div>
  );
}

import { useLoaderData } from "react-router-dom";
import Content from "../components/Content";

export default function Losangeles() {
  const data = useLoaderData();

  return (
    <div className="layout-detail">
      <section className="left">
        <img src="/images/05.jpg" alt="Losangeles" />
      </section>
      <section className="right">
        <Content data={data.weatherData} />
      </section>
    </div>
  );
}

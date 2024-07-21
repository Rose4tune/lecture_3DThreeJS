import { useLoaderData } from "react-router-dom";
import Content from "../components/Content";
import { motion } from "framer-motion";

export default function Losangeles() {
  const data = useLoaderData();

  return (
    <div className="layout-detail">
      <motion.section
        className="left"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        exit={{ x: "-100%", transition: { duration: 0.5 } }}
      >
        <img src="/images/05.jpg" alt="Losangeles" />
      </motion.section>
      <motion.section
        className="right"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        exit={{ x: "100%", transition: { duration: 0.5 } }}
      >
        <Content data={data?.weatherData} />
      </motion.section>
    </div>
  );
}

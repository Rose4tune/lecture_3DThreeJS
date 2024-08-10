"use client";

import MoreIcon from "@/public/icons/more.svg";
import { AnimatePresence, useAnimate, useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FloatingPlusBtn({ title }) {
  const sectionRef = useRef(null);
  const [scope, animate] = useAnimate();
  const isInView = useInView(sectionRef, {
    amount: "all",
  });

  useEffect(() => {
    if (!isInView) return;
    if (isInView) {
      const animateBtn = async () => {
        await animate(
          "button",
          { borderWidth: "20px" },
          { transition: { delay: 1 } }
        );
        animate("button", { borderWidth: "0px" });
      };

      animateBtn();
    }
  }, [isInView, animate]);

  return (
    <div
      ref={sectionRef}
      className="sticky bottom-0 flex justify-center items-center h-40 z-10"
    >
      <div ref={scope}>
        <AnimatePresence>
          {isInView && (
            <motion.button
              className="backdrop-effect rounded-full border-[#016dda]"
              style={{ backgroundColor: "rgb(66 66 69/70%)" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: {
                    duration: 1,
                    delay: 0,
                  },
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: {
                    duration: 0.3,
                    delay: 0.3,
                  },
                },
              }}
            >
              <div className="flex items-center p-2.5 min-h-[56px] min-w-[56px]">
                <span className="text-white overflow-hidden whitespace-nowrap font-semibold text-sm">
                  {title}
                </span>
                <span className=" bg-[#0071e3] rounded-full flex justify-center items-center text-white">
                  <MoreIcon />
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

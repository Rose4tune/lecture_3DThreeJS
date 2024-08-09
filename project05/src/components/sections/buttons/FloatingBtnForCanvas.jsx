"use client";

import { motion, AnimatePresence, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FloatingBtnForCanvas() {
  const sectionsRef = useRef(null);
  const isInView = useInView(sectionsRef, { amount: "all" });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isInView) return;
    const animateButton = async () => {
      if (!scope?.current) return;
      await animate(scope.current, { borderWidth: "20px" });
      animate(scope.current, { borderWidth: "0px" });
    };

    animateButton();
  }, [isInView]);

  return (
    <div
      ref={sectionsRef}
      className="flex justify-center sticky bottom-0 z-10 py-[100px]"
    >
      <AnimatePresence>
        <div className="h-[76px] flex justify-center items-center text-white">
          {isInView && (
            <motion.div
              ref={scope}
              className="flex flex-row border-[#016dda] rounded-full"
            >
              <motion.div
                className="rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px]"
                initial={{ width: 0 }}
                animate={{ width: "auto", transition: { delay: 1 } }}
                exit={{ width: 0 }}
              >
                <motion.div
                  className="flex justify-center h-full overflow-hidden relative items-center"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: "168px",
                    opacity: 1,
                    transition: { delay: 1 },
                  }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  <motion.div className="p-1 paginate">
                    <motion.span
                      className="rounded-full block w-6 h-6 cursor-pointer"
                      style={{
                        backgroundColor: "white",
                        borderWidth: 2,
                        borderColor: "blue",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-row rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px]"
                initial={{
                  width: 56,
                  marginLeft: 0,
                  backgroundColor: "#f5f5f780",
                }}
                animate={{
                  width: "auto",
                  marginLeft: "14px",
                  backgroundColor: "#f5f5f730",
                  transition: { delay: 1 },
                }}
                exit={{ backgroundColor: "#f5f5f780", marginLeft: 0 }}
              >
                <motion.div
                  className={`cursor-pointer flex items-center justify-center cursor-pointer px-2 rounded-full `}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                    transition: { delay: 1 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  15.5cm
                </motion.div>
                <motion.div
                  className={`cursor-pointer flex items-center justify-center cursor-pointer px-2 rounded-full`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                    transition: { delay: 1 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  17.0cm
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

"use client";

export default function FloatingBtnForCanvas() {
  return (
    <div className="flex justify-center sticky bottom-0 z-10 py-[100px]">
      <div className="h-[76px] flex justify-center items-center text-white">
        <div className="flex flex-row border-[#016dda] rounded-full">
          <div className="rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px]">
            <div className="flex justify-center h-full overflow-hidden relative items-center">
              <div className="p-1 paginate">
                <span
                  className="rounded-full block w-6 h-6 cursor-pointer"
                  style={{
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "blue",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px]">
            <div
              className={`cursor-pointer flex items-center justify-center cursor-pointer px-2 rounded-full `}
            >
              15.5cm
            </div>
            <div
              className={`cursor-pointer flex items-center justify-center cursor-pointer px-2 rounded-full`}
            >
              17.0cm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import MoreIcon from "@/public/icons/more.svg";

export default function FloatingPlusBtn({ title }) {
  return (
    <div className="sticky bottom-0 flex justify-center items-center h-40 z-10">
      <div>
        <button
          className="backdrop-effect rounded-full border-[#016dda]"
          style={{ backgroundColor: "rgb(66 66 69/70%)" }}
        >
          <div className="flex items-center p-2.5 min-h-[56px] min-w-[56px]">
            <span
              className="text-white overflow-hidden whitespace-nowrap font-semibold text-sm"
              style={{ marginInlineEnd: "12px" }}
            >
              {title}
            </span>
            <span className=" bg-[#0071e3] rounded-full flex justify-center items-center text-white">
              <MoreIcon />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const SubMenuNames = [
    "스토어",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "AirPods",
    "TV 및 홈",
    "엔터테인먼트",
    "액세서리",
    "고객지원",
  ];

  return (
    <div className="flex justify-center bg-black text-white px-1.5">
      <nav className="z-20 h-11 flex flex-1">
        <div className="flex flex-1 max-w-screen-lg mx-auto px-8">
          <ul className="flex flex-1 items-center justify-between text-xs gap-8 min-[835px]:gap-0">
            {SubMenuNames.map((subMenu, index) => {
              return (
                <div
                  key={index}
                  className="hidden min-[835px]:flex text-[#cccccc] hover:text-white font-light cursor-pointer"
                >
                  {subMenu}
                </div>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

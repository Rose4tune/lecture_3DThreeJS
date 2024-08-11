import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function pageExample04() {
  makeMainVideo();
  makeSection();
}

const makeMainVideo = () => {
  const html = document.documentElement;
  const canvas = document.getElementById("scrollAnimation");
  const context = canvas.getContext("2d");
  const frameCount = 129;
  const currentFrame = (index) =>
    `assets/img/dog_${index.toString().padStart(3, "0")}.jpg`;

  const img = new Image();
  img.src = currentFrame(1);

  canvas.width = 1280;
  canvas.height = 740;
  img.onload = () => {
    context.drawImage(img, 0, 0);
  };

  const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  };

  window.addEventListener("scroll", () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  preloadImages();
};

const makeSection = () => {
  const second = document.querySelector(".second");
  gsap.to(second.querySelector(".title"), {
    x: 100,
    color: "purple",
    scrollTrigger: {
      trigger: second,
      // scroll start, end 확인 할 수 있음
      markers: true,
      // triger, 기준선 위치 변경 가능
      // "(trigger position), (animate position)"
      start: "top center",
      end: "bottom center",
      // up -> down 확인 가능
      onEnter: () => console.log("entered"),
      onLeave: () => console.log("leave"),
      // down -> up 확인 가능
      onEnterBack: () => console.log("onEnterBack"),
      onLeaveBack: () => console.log("onLeaveBack"),
      // onEnter, onLeave, onEnterBack, onLeaveBack 순서대로 함수 실행 지정
      toggleAttribute: "play reverse play reverse",
    },
    duration: 5,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  pageExample04();
});

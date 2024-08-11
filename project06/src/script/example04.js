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
  const sections = document.querySelectorAll(".section");
  const title = document.querySelector(".title");

  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: sections[1],
      pin: true, // 트리거로 지정된 요소가 뷰포트 안에 고정되도록 해준다
      scrub: 0.3, // 애니메이션 지연시켜 부드럽게 만들어준다 (1이 될수록 많이 부드러워진다)
      start: "top top",
      end: "+=300%", // 트리거의 시작부터 뷰포트의 3배까지 스크롤 할 때까지 스크롤트리거 활성화
      markers: true,
      toggleActions: "play reverse play reverse",
    },
  });
  t1.from(title, {
    autoAlpha: 0,
    duration: 2,
  });

  const production = document.querySelector(".product-explain");
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: sections[2],
      pin: true,
      scrub: 0.3,
      start: "top top",
      end: "+=300%",
      markers: true,
    },
  });
  t2.from(production, {
    x: "300%",
    autoAlpha: 0,
    duration: 2,
    stagger: 3,
  }).to(production, { duration: 3 });

  gsap.to(production.querySelector(".dot"), {
    duration: 1,
    opacity: 1,
    scale: 1.2,
    repeat: Infinity,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  pageExample04();
});

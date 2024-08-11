import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function pageExample05() {
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
  const production = document.querySelector(".product-explain");

  const title = document.querySelector(".title");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sections[1],
      pin: true,
      scrub: 0.3,
      start: "top top",
      end: "+=300%",
      // markers: true,
      toggleActions: "play reverse play reverse",
    },
  });
  tl.from(title, {
    autoAlpha: 0,
    duration: 2,
    ease: "power3.inOut",
  });

  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: sections[2],
      pin: true,
      scrub: 0.3,
      start: "top top",
      end: "+=300%",
    },
  });
  t2.from(production, {
    x: "300%",
    autoAlpha: 0,
    duration: 2,
    ease: "none",
    stagger: 3,
  }).to(production, { duration: 3 });

  gsap.to(production.querySelector(".dot"), {
    duration: 1,
    opacity: 1,
    scale: 1.2,
    repeat: Infinity,
  });

  const icons = document.querySelectorAll(".icon-container img");

  gsap.set(icons[2], { rotateZ: 35 });
  const t3 = gsap.timeline({
    scrollTrigger: {
      trigger: sections[3],
      start: "top top",
      end: "+=300%",
      pin: true,
      toggleActions: "play reverse play reverse", // 통통 튀는 느낌내기 좋음
    },
    ease: "elastic.inOut(1.2, 0.75",
  });
  t3.from(icons, {
    opacity: 0,
    scale: 0,
    stagger: 0.04, // 각각이 다르게 지연되서 나오게 할 수 있음
  });

  const imgSection = document.querySelector(".img-container");
  const t4 = gsap.timeline({});
  t4.fromTo(
    imgSection,
    {
      y: 0,
    },
    {
      y: 0,
      scale: 0.8,
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        pin: sections[4],
        start: "top center",
        end: "+=10000",
        scrub: true, // 스무스한 느낌 내기 좋음
        markers: true,
        // 화면 크기 변경되거나 새로고침 될 때 애니메이션 상태 초기화 해줌 (반응형 최적화)
        invalidateOnRefresh: true,
      },
    }
  );
};

document.addEventListener("DOMContentLoaded", () => {
  pageExample05();
});

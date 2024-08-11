import { gsap } from "gsap";

function pageExample03() {
  const html = document.documentElement;
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1280;
  canvas.height = 740;

  const frameCount = 129;
  const currentFrame = (index) =>
    `assets/img/dog_${index.toString().padStart(3, "0")}.jpg`;

  const img = new Image();
  img.src = currentFrame(1);
  img.onload = () => {
    context.drawImage(img, 0, 0);
  };

  const updateImage = (index) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, index);
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
}

function makeSection() {
  gsap.to(".box1", { rotate: 27, x: 120, duration: 1 });
  gsap.from(".box2", { rotate: 27, x: 120, duration: 1 });
  gsap.fromTo(".box3", { x: -100 }, { rotate: 27, x: 120, duration: 1 });
}

document.addEventListener("DOMContentLoaded", () => {
  pageExample03();
  makeSection();
});

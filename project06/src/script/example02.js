//https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg
// 위의 이미지는 148개 프레임임
function pageExample02() {
  const html = document.documentElement;
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 720;
  canvas.height = 720;

  const frameCount = 27;
  const currentFrame = (index) =>
    `assets/flower/flower_out${index.toString().padStart(4, "0")}.jpg`;

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
      // frameCount를 넘기 않도록
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    // requestAnimationFrame 콜백에 넣어주면 스크롤 이벤트가 발생될 때 마다 함수호출이 이루어지는게 아니라
    // 브라우저가 다음 화면을 그릴 준비가 될 때 호출됨
    // 애니메이션 성능 및 베터리 효율도 좋아짐
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

  // 이미지 프리로드를 해서 이미지 캐싱시켜 성능을 올림
  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  preloadImages();
}

document.addEventListener("DOMContentLoaded", () => {
  pageExample02();
});

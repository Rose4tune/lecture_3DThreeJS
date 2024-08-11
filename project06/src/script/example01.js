function pageExample01() {
  const video = document.getElementById("video");

  // scrollY 값으로 영상 조절하기
  window.addEventListener("scroll", () => {
    const time = (window.scrollY / 1000) * 4;
    video.currentTime = time;
  });

  // video 초기화
  addEventListener("load", () => {
    video.pause();
    video.currentTime = 0;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pageExample01();
});

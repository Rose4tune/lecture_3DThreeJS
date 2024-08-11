//https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg

function pageExample02() {
  const html = document.documentElement;
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1158;
  canvas.height = 778;

  // line
  context.lineWidth = 10;

  // Wall
  context.strokeStyle = "brown";
  context.strokeRect(75, 140, 150, 110); // x, y, w, h

  // Door
  context.fillRect(130, 190, 40, 60);

  // Roof
  context.strokeStyle = "red";
  context.beginPath();
  context.moveTo(50, 140);
  context.lineTo(150, 60);
  context.lineTo(250, 140);
  context.closePath();
  context.stroke();

  // Cimeny
  context.strokeStyle = "blue";
  context.beginPath();
  context.moveTo(200, 100);
  context.lineTo(200, 60);
  context.lineTo(220, 60);
  context.lineTo(220, 115);
  context.closePath();
  context.stroke();
}

document.addEventListener("DOMContentLoaded", () => {
  pageExample02();
});

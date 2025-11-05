document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.getElementById("headline-marquee");
  const headline = document.getElementById("headline-marquee-text");

  const SPEED = 260;
  let position = 0;
  let last = null;

  const measure = () => ({
    container: marquee.clientWidth,
    text: headline.scrollWidth,
  });

  const step = (time) => {
    const { container, text } = measure();
    if (last === null) last = time;
    const delta = (time - last) / 1000;
    last = time;
    position -= delta * SPEED;
    if (position < -text) position = container;
    headline.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(step);
  };

  position = marquee.clientWidth;
  requestAnimationFrame(step);
});

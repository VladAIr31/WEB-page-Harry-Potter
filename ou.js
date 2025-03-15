document.addEventListener("DOMContentLoaded", () => {
  const wand = document.querySelector(".wand");
  const egg = document.querySelector(".egg");
  let isEggControlledByMouse = false;
  let originalAnimation = egg.style.animation;

  egg.style.position = "absolute";

  function enableMouseControl() {
    egg.style.animation = "none"; 

    const moveEgg = (event) => {
      const rect = egg.getBoundingClientRect();
      const eggWidth = rect.width;
      const eggHeight = rect.height;

      egg.style.left = `${event.clientX - eggWidth / 2}px`;
      egg.style.top = `${event.clientY - eggHeight / 2}px`;
    };

    document.addEventListener("mousemove", moveEgg);

    wand.addEventListener(
      "click",
      () => {
        disableMouseControl(moveEgg);
      },
      { once: true }
    );

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        disableMouseControl(moveEgg);
      }
    }, { once: true });
  }

  function disableMouseControl(moveEgg) {
    egg.style.animation = originalAnimation; 
    document.removeEventListener("mousemove", moveEgg);
    isEggControlledByMouse = false;
  }

  wand.addEventListener("click", () => {
    if (!isEggControlledByMouse) {
      isEggControlledByMouse = true;
      enableMouseControl();
    }
  });

  egg.addEventListener("click", () => {
    if (!isEggControlledByMouse) {
      isEggControlledByMouse = true;
      enableMouseControl();
    }
  });
});

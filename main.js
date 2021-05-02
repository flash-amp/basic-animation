let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNo, animation) => {
  return "images/" + animation + "/" + frameNo + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    forward: [],
    backward: [],
    block: [],
  };
  let totalImages = 0;

  ["idle", "kick", "punch", "forward", "backward", "block"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      totalImages += animationFrames.length;

      animationFrames.forEach((frameNo) => {
        let path = imagePath(frameNo, animation);
        loadImage(path, (image) => {
          images[animation][frameNo - 1] = image;
          totalImages--;

          if (totalImages === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimation = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length === 0) selectedAnimation = "idle";
    else {
      selectedAnimation = queuedAnimation.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };

  document.getElementById("forward").onclick = () => {
    queuedAnimation.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimation.push("backward");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      queuedAnimation.push("kick");
    } else if (key === "ArrowRight") {
      queuedAnimation.push("punch");
    }
  });
});

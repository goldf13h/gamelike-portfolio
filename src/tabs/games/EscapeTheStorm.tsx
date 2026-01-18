import { useEffect, useRef } from "react";
import { gameBgStyles } from "./gameBg";

type Obstacle = {
  lane: number;
  y: number;
  size: number;
  speed: number;
};

type Heart = {
  lane: number;
  y: number;
  size: number;
  speed: number;
};

export default function EscapeTheStorm() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const info = infoRef.current;
    if (!canvas || !info) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const laneCount = 3;
    const laneWidth = canvas.width / laneCount;

    let playerLane = 1; // 0..2
    const playerY = canvas.height - 50;
    const playerSize = 30;

    let score = 0;
    let lives = 3;
    let frame = 0;

    const obstacles: Obstacle[] = [];
    const hearts: Heart[] = [];

    let running = true;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        playerLane = Math.max(0, playerLane - 1);
      } else if (e.key === "ArrowRight") {
        playerLane = Math.min(laneCount - 1, playerLane + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    function spawnEntities() {
      frame++;

      // obstacles every 50 frames
      if (frame % 50 === 0) {
        obstacles.push({
          lane: Math.floor(Math.random() * laneCount),
          y: -20,
          size: 30,
          speed: 3,
        });
      }

      // hearts every 120 frames
      if (frame % 120 === 0) {
        hearts.push({
          lane: Math.floor(Math.random() * laneCount),
          y: -20,
          size: 20,
          speed: 2,
        });
      }
    }

    function updateEntities() {
      if (!canvas || !info || !ctx) return;
      // obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
        o.y += o.speed;

        const hit =
          o.lane === playerLane &&
          o.y + o.size > playerY &&
          o.y < playerY + playerSize;

        if (hit) {
          obstacles.splice(i, 1);
          lives--;
          continue;
        }

        if (o.y > canvas.height + o.size) {
          obstacles.splice(i, 1);
        }
      }

      // hearts
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y += h.speed;

        const hit =
          h.lane === playerLane &&
          h.y + h.size > playerY &&
          h.y < playerY + playerSize;

        if (hit) {
          hearts.splice(i, 1);
          score++;
          continue;
        }

        if (h.y > canvas.height + h.size) {
          hearts.splice(i, 1);
        }
      }
    }

    function drawHeart(x: number, y: number, size: number) {
      if (!canvas || !info || !ctx) return;
      ctx.fillStyle = "#f88";
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.bezierCurveTo(
        x,
        y + size / 2,
        x + size / 2,
        y + size,
        x + size / 2,
        y + size
      );
      ctx.bezierCurveTo(
        x + size / 2,
        y + size,
        x + size,
        y + size / 2,
        x + size,
        y + size / 4
      );
      ctx.bezierCurveTo(x + size, y, x + size / 2, y, x + size / 2, y + size / 4);
      ctx.fill();
    }

    function draw() {
      if (!canvas || !info || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // lane lines
      ctx.strokeStyle = "#333";
      for (let i = 1; i < laneCount; i++) {
        const x = i * laneWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // player
      ctx.fillStyle = "#0af";
      const playerX = playerLane * laneWidth + laneWidth / 2 - playerSize / 2;
      ctx.fillRect(playerX, playerY, playerSize, playerSize);

      // obstacles
      ctx.fillStyle = "#f00";
      obstacles.forEach((o) => {
        const x = o.lane * laneWidth + laneWidth / 2 - o.size / 2;
        ctx.fillRect(x, o.y, o.size, o.size);
      });

      // hearts
      hearts.forEach((h) => {
        const x = h.lane * laneWidth + laneWidth / 2 - h.size / 2;
        drawHeart(x, h.y, h.size);
      });

      info.textContent = `Score: ${score}  Lives: ${lives}`;
    }

    function loop() {
      if (!canvas || !info || !ctx) return;
      if (!running) return;

      spawnEntities();
      updateEntities();
      draw();

      if (lives > 0) {
        requestAnimationFrame(loop);
      } else {
        info.textContent = `Game over! Final score: ${score}`;
      }
    }

    loop();

    return () => {
      running = false;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div style={gameBgStyles.wrapper}>
      <canvas ref={canvasRef} width={600} height={400} style={gameBgStyles.canvas} />
      <div ref={infoRef} style={gameBgStyles.info} />
    </div>
  );
}

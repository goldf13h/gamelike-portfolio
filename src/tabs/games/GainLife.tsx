import { useEffect, useRef } from "react";
import { gameBgStyles } from "./gameBg";

type Player = {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
};

type Heart = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

type Bomb = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

export default function GainLife() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const info = infoRef.current;
    if (!canvas || !info) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- game state (mutable, stays out of React renders) ---
    const player: Player = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      w: 20,
      h: 20,
      speed: 5,
    };

    const keys: Record<string, boolean> = {};
    let hearts: Heart[] = [];
    let bombs: Bomb[] = [];
    let score = 0;
    let lives = 3;
    let spawnCounter = 0;

    let running = true;

    function drawPlayer() {
      if (!canvas || !info || !ctx) return;
      ctx.fillStyle = "#0ff";
      ctx.fillRect(player.x, player.y, player.w, player.h);
    }

    function drawHeart(h: Heart) {
      if (!canvas || !info || !ctx) return;
      ctx.fillStyle = "pink";
      ctx.beginPath();

      const size = h.size;
      const x = h.x;
      const y = h.y;

      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(
        x,
        y,
        x - size / 2,
        y,
        x - size / 2,
        y + size / 4
      );
      ctx.bezierCurveTo(
        x - size / 2,
        y + size / 2,
        x,
        y + size,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + size,
        x + size / 2,
        y + size / 2,
        x + size / 2,
        y + size / 4
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.fill();
    }

    function drawBomb(b: Bomb) {
      if (!canvas || !info || !ctx) return;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
    }

    function spawnObjects() {
      if (!canvas || !info || !ctx) return;
      spawnCounter++;

      // spawn heart every 60 frames
      if (spawnCounter % 60 === 0) {
        hearts.push({
          x: Math.random() * (canvas.width - 20) + 10,
          y: -20,
          size: 10,
          speed: 2,
        });
      }

      // spawn bomb every 90 frames
      if (spawnCounter % 90 === 0) {
        bombs.push({
          x: Math.random() * (canvas.width - 20) + 10,
          y: -20,
          size: 8,
          speed: 3,
        });
      }
    }

    function updateObjects() {
      if (!canvas || !info || !ctx) return;
      hearts = hearts.filter((h) => {
        h.y += h.speed;

        const hit =
          h.y + h.size > player.y &&
          h.y < player.y + player.h &&
          h.x > player.x - h.size &&
          h.x < player.x + player.w + h.size;

        if (hit) {
          score++;
          return false;
        }

        return h.y < canvas.height + h.size;
      });

      bombs = bombs.filter((b) => {
        b.y += b.speed;

        const hit =
          b.y + b.size > player.y &&
          b.y < player.y + player.h &&
          b.x > player.x - b.size &&
          b.x < player.x + player.w + b.size;

        if (hit) {
          lives--;
          return false;
        }

        return b.y < canvas.height + b.size;
      });
    }

    function updatePlayer() {
      if (!canvas || !info || !ctx) return;
      if (keys["ArrowLeft"]) player.x -= player.speed;
      if (keys["ArrowRight"]) player.x += player.speed;

      // clamp
      player.x = Math.max(0, Math.min(player.x, canvas.width - player.w));
    }

    function draw() {
      if (!canvas || !info || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPlayer();
      hearts.forEach(drawHeart);
      bombs.forEach(drawBomb);

      info.textContent = `Score: ${score}  Lives: ${lives}`;
    }

    function loop() {
      if (!canvas || !info || !ctx) return;
      if (!running) return;

      spawnObjects();
      updateObjects();
      updatePlayer();
      draw();

      if (lives > 0) {
        requestAnimationFrame(loop);
      } else {
        info.textContent = `Game over! Final score: ${score}`;
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      keys[e.key] = true;
    }

    function onKeyUp(e: KeyboardEvent) {
      keys[e.key] = false;
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    loop();

    return () => {
      running = false;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div style={gameBgStyles.wrapper}>
      <canvas
        ref={canvasRef}
        id="game"
        width={600}
        height={400}
        style={gameBgStyles.canvas}
      />
      <div ref={infoRef} id="info" style={gameBgStyles.info} />
    </div>
  );
}

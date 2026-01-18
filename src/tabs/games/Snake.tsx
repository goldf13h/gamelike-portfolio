import { useEffect, useRef } from "react";
import { gameBgStyles } from "./gameBg";

type Vec2 = {
  x: number;
  y: number;
};

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const info = infoRef.current;

    if (!canvas || !info) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake: Vec2[] = [
      { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) },
    ];

    let apple: Vec2 = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };

    let direction: Vec2 = { x: 1, y: 0 };
    let score = 0;
    let frameCount = 0;
    let running = true;

    function draw() {
      if (!canvas || !info || !ctx) return;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "red";
      ctx.fillRect(
        apple.x * gridSize,
        apple.y * gridSize,
        gridSize - 1,
        gridSize - 1
      );

      ctx.fillStyle = "lime";
      snake.forEach((seg) => {
        ctx.fillRect(
          seg.x * gridSize,
          seg.y * gridSize,
          gridSize - 1,
          gridSize - 1
        );
      });

      info.textContent = `Score: ${score}`;
    }

    function resetGame() {
      snake = [
        { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) },
      ];
      direction = { x: 1, y: 0 };
      apple = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
      score = 0;
    }

    function update() {
      if (!canvas || !info || !ctx) return;
      const head: Vec2 = {
        x: (snake[0].x + direction.x + tileCount) % tileCount,
        y: (snake[0].y + direction.y + tileCount) % tileCount,
      };

      // self collision
      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        info.textContent = `Game over! Final score: ${score}`;
        resetGame();
        return;
      }

      snake.unshift(head);

      if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        };
      } else {
        snake.pop();
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y !== -1) direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x !== 1) direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x !== -1) direction = { x: 1, y: 0 };
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    function gameLoop() {
      if (!running) return;

      requestAnimationFrame(gameLoop);
      if (++frameCount < 6) return;
      frameCount = 0;
      update();
      draw();
    }

    gameLoop();

    return () => {
      running = false;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div style={gameBgStyles.wrapper}>
      <canvas ref={canvasRef} width={400} height={400} style={gameBgStyles.canvas} />
      <div ref={infoRef} style={gameBgStyles.info} />
    </div>
  );
}

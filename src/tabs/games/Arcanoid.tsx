import { useEffect, useRef } from "react";
import { gameBgStyles } from "./gameBg";

type Paddle = {
  width: number;
  height: number;
  x: number;
  speed: number;
  dx: number;
};

type Ball = {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
};

type Brick = {
  x: number;
  y: number;
  status: 0 | 1;
};

export default function Arcanoid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const info = infoRef.current;
    if (!canvas || !info) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Paddle
    const paddle: Paddle = {
      width: 75,
      height: 10,
      x: (canvas.width - 75) / 2,
      speed: 5,
      dx: 0,
    };

    // Ball
    const ball: Ball = {
      x: canvas.width / 2,
      y: canvas.height - 30,
      radius: 7,
      dx: 2,
      dy: -2,
    };

    // Bricks
    const brickRowCount = 5;
    const brickColumnCount = 8;
    const brickWidth = 50;
    const brickHeight = 15;
    const brickPadding = 5;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    const bricks: Brick[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    let score = 0;
    let lives = 3;
    let running = true;

    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === "ArrowRight") paddle.dx = paddle.speed;
      else if (e.key === "ArrowLeft") paddle.dx = -paddle.speed;
    }

    function keyUpHandler(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        paddle.dx = 0;
      }
    }

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    function resetBallAndPaddle() {
      if (!canvas || !info || !ctx) return;
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 30;
      ball.dx = 2;
      ball.dy = -2;
      paddle.x = (canvas.width - paddle.width) / 2;
      paddle.dx = 0;
    }

    function resetGame() {
      // reset bricks
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r].status = 1;
        }
      }
      score = 0;
      lives = 3;
      resetBallAndPaddle();
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (
              ball.x > b.x &&
              ball.x < b.x + brickWidth &&
              ball.y > b.y &&
              ball.y < b.y + brickHeight
            ) {
              ball.dy = -ball.dy;
              b.status = 0;
              score++;

              if (score === brickRowCount * brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                resetGame();
              }
            }
          }
        }
      }
    }

    function drawBall() {
      if (!canvas || !info || !ctx) return;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0f0";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      if (!canvas || !info || !ctx) return;
      ctx.beginPath();
      ctx.rect(
        paddle.x,
        canvas.height - paddle.height,
        paddle.width,
        paddle.height
      );
      ctx.fillStyle = "#00f";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      if (!canvas || !info || !ctx) return;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#f00";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawHud() {
      if (!canvas || !info || !ctx) return;
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#fff";

      // optional duplicate info in div too
      info.textContent = `Score: ${score}  Lives: ${lives}`;
    }

    function update() {
      if (!canvas || !info || !ctx) return;
      if (!running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBricks();
      drawBall();
      drawPaddle();
      drawHud();

      collisionDetection();

      // bounce off walls
      if (
        ball.x + ball.dx > canvas.width - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.dx = -ball.dx;
      }

      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        // paddle collision
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
        } else {
          lives--;

          if (lives <= 0) {
            info.textContent = `Game over! Final score: ${score}`;
            resetGame();
          } else {
            resetBallAndPaddle();
          }
        }
      }

      // move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // move paddle
      paddle.x += paddle.dx;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
      }

      requestAnimationFrame(update);
    }

    update();

    return () => {
      running = false;
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <div style={gameBgStyles.wrapper}>
      <canvas ref={canvasRef} width={480} height={320} style={gameBgStyles.canvas} />
      <div ref={infoRef} style={gameBgStyles.info} />
    </div>
  );
}

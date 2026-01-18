import gainlifeImg from "../assets/game_gain-life.png";
import snakeImg from "../assets/game_snake.png";
import snake2Img from "../assets/game_snake2.png";
import arcanoidImg from "../assets/game_arcanoid.png";
import drmarioImg from "../assets/game_dr-mario.png";
import escapethestormImg from "../assets/game_escape-the-storm.png";

import { useState, useEffect, useMemo } from "react";
import { RootPortal } from "../hooks/RootPortal";

import SnakeGame from "./games/Snake";
import GainLife from "./games/GainLife";
import EscapeTheStorm from "./games/EscapeTheStorm";
import Arcanoid from "./games/Arcanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type GameEntry = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  cover: {
    src: string;
    alt: string;
  };
};

const GAMES: GameEntry[] = [
  {
    id: "g-1",
    name: "gain life",
    description: "Click the hearts",
    completed: true,
    cover: {
      src: gainlifeImg,
      alt: "Gain Life",
    },
  },
  {
    id: "g-2",
    name: "snake",
    description: "classic snake game",
    completed: true,
    cover: {
      src: snakeImg,
      alt: "Snake",
    },
  },
  {
    id: "g-3",
    name: "arcanoid",
    description: "destroy the bricks game",
    completed: true,
    cover: {
      src: arcanoidImg,
      alt: "Arcanoid",
    },
  },
  {
    id: "g-4",
    name: "dr. mario",
    description: "a dr. mario clone",
    completed: false,
    cover: {
      src: drmarioImg,
      alt: "Dr. Mario",
    },
  },
  {
    id: "g-5",
    name: "escape the storm",
    description: "bullet-hell like game",
    completed: true,
    cover: {
      src: escapethestormImg,
      alt: "Escape the Storm",
    },
  },
  {
    id: "g-6",
    name: "snake 2",
    description: "classic snake game",
    completed: false,
    cover: {
      src: snake2Img,
      alt: "Snake 2",
    },
  },
];

export default function GamesTab(props: { onModalChange?: (open: boolean) => void }) {
  const { onModalChange } = props;
  const [openGameId, setOpenGameId] = useState<string | null>(null);

  function openGame(id: string) {
    setOpenGameId(id);
    onModalChange?.(true);
  }

  function closeGame() {
    setOpenGameId(null);
    onModalChange?.(false);
  }

  useEffect(() => {
    if (!openGameId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGame();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openGameId]);

  const activeGame = useMemo(
    () => (openGameId ? GAMES.find((g) => g.id === openGameId) ?? null : null),
    [openGameId]
  );

  return (
    <>
      <section id="games">
        <header>
          <h2 className="text-center">Games</h2>
        </header>
        <div className="games-container">
          {GAMES.map((game) => {
            return (
              <>
                {game.completed ? (
                  <button 
                      type="button"
                      className="game game-completed"
                      onClick={() => openGame(game.id)}
                  >
                    <figure>
                      <img src={game.cover.src} alt={game.cover.alt} />
                    </figure>
                    <figcaption>
                      <h3 className="game-title">{game.name}</h3>
                      <p className="game-desc muted">{game.description}</p>
                    </figcaption>
                  </button>
                ) : (
                  <div className="game game-developing">
                    <figure>
                      <img src={game.cover.src} alt={game.cover.alt} />
                    </figure>
                    <figcaption>
                      <h3 className="game-title">{game.name}</h3>
                      <p className="game-desc muted">Developing..</p>
                    </figcaption>
                  </div>
                )
                }
               
              </>
            )
          })}

          {activeGame ? (
            <RootPortal>
              <div className="game-backdrop" role="dialog" aria-modal="true">
                <div className="game-details">
                  <div className="game-details-body">
                    <button className="game-exit" type="button" onClick={closeGame} aria-label="Close">
                      <FontAwesomeIcon icon={faX} />
                    </button>
                    {activeGame.id === "g-1" ? <GainLife /> : null}
                    {activeGame.id === "g-2" ? <SnakeGame /> : null}
                    {activeGame.id === "g-3" ? <Arcanoid /> : null}
                    {activeGame.id === "g-5" ? <EscapeTheStorm /> : null}
                  </div>
                </div>
              </div>
            </RootPortal>
          ) : null}
        </div>
      </section>
    </>
  );
}
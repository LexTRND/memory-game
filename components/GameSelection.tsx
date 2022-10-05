import Head from "next/head";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GamePiece, GameSelections, Player } from "../interface/interfaces";
import styles from "../styles/GameSelection.module.scss";
import { shuffle } from "../functions/shuffledPieces";
import { FourByFour, SixBySix } from "../functions/memoryPieces";

const GameSelection = () => {
  const [theme, setTheme] = useState<boolean>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [grid, setGrid] = useState<GamePiece[]>();
  const [start, setStart] = useState(false);
  const [inPlay, setInPlay] = useState<GamePiece[]>([]);
  const [played, setPlayed] = useState<any[]>([]);
  const [turn, setTurn] = useState<number>(0);

  const [value, setValue] = useLocalStorage<GameSelections>("game", {});

  const startGame = () => {
    if (theme !== undefined && grid !== undefined && players.length > 0) {
      setValue((current) => {
        return {
          ...current,
          theme,
          players: [...players],
          grid,
          inPlay,
          played,
          turn,
        };
      });
      window.location.reload();
    }
  };

  // Func used to enable the start button
  // Disabling the button prevents loading game with missing data
  const verify = () => {
    if (theme !== undefined && grid !== undefined && players.length > 0) {
      setStart(true);
    }
  };
  // Checks verify as variables are being set
  useEffect(() => {
    verify();
  }, [theme, players, grid]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.card}>
        <div className={styles.selectionSection}>
          <div>
            <p>Select Theme</p>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => setTheme(true)}
              className={theme ? styles.selectedBtn : ""}>
              Icons
            </button>
            <button
              onClick={() => setTheme(false)}
              className={theme === false ? styles.selectedBtn : ""}>
              Numbers
            </button>
          </div>
        </div>
        <div className={styles.selectionSection}>
          <div>
            <p>Number of Players</p>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => setPlayers([{ player: 1, score: 0 }])}
              className={players?.length === 1 ? styles.selectedBtn : ""}>
              1
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                ])
              }
              className={players?.length === 2 ? styles.selectedBtn : ""}>
              2
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                  { player: 3, score: 0 },
                ])
              }
              className={players?.length === 3 ? styles.selectedBtn : ""}>
              3
            </button>
            <button
              onClick={() =>
                setPlayers([
                  { player: 1, score: 0 },
                  { player: 2, score: 0 },
                  { player: 3, score: 0 },
                  { player: 4, score: 0 },
                ])
              }
              className={players?.length === 4 ? styles.selectedBtn : ""}>
              4
            </button>
          </div>
        </div>
        <div className={styles.selectionSection}>
          <div>
            <p>Grid Size</p>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => setGrid(shuffle(FourByFour))}
              className={grid?.length === 16 ? styles.selectedBtn : ""}>
              4x4
            </button>
            <button
              onClick={() => setGrid(shuffle(SixBySix))}
              className={grid?.length === 36 ? styles.selectedBtn : ""}>
              6x6
            </button>
          </div>
        </div>
        <div className={styles.selectionSection}>
          <div className={styles.buttons}>
            <button
              onClick={() => startGame()}
              className={start === true ? styles.startBtn : ""}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;

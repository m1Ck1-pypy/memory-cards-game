import { useEffect } from "react";
import EndGameModal from "../components/Game/EndGameModal";
// import InstructionGame from "../components/Game/InstructionGame";
import { useSnapshot } from "valtio";
import { gameActions, gameState } from "../state/game";
import SelectFieldModal from "../components/Game/SelectFieldModal";
import SingleGame from "../components/Game/SingleGame";
import { useLocation, useNavigate } from "react-router-dom";
import MultiGame from "../components/Game/MutliGame";
import { actions, appState } from "../state/state";
import { multiGameActions, multiGameState } from "../state/multi-game";
import { ArrowLeft } from "lucide-react";

const GamePage = () => {
  const snap_app = useSnapshot(appState);
  const snap_single_game = useSnapshot(gameState);
  const snap_multi_game = useSnapshot(multiGameState);
  const navigate = useNavigate();
  const location = useLocation();
  const players = location.state?.players || 1;

  useEffect(() => {
    return () => {
      actions.changeSizeGame(true);
    };
  }, [players]);

  const onModalClose = () => {
    if (players === 1) {
      gameActions.initializeGame();
      return;
    }
    multiGameActions.initializeGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <button
        onClick={() => navigate("/")}
        className="z-100 absolute top-20 left-115 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>
      {snap_app?.changeSize ? (
        <SelectFieldModal />
      ) : players == 1 ? (
        <SingleGame />
      ) : (
        <MultiGame />
      )}

      {/* Game instructions */}
      {/*{!snap.changeSize && <InstructionGame gameStarted={snap.gameStarted} />}*/}

      {/* End Game Info Modal */}
      {snap_single_game.gameOver && (
        <EndGameModal score={snap_single_game.score} onClose={onModalClose} />
      )}
      {snap_multi_game.gameOver && (
        <EndGameModal winner={snap_multi_game.winner} onClose={onModalClose} />
      )}
    </div>
  );
};

export default GamePage;

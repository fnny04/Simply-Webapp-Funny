import { useEffect, useState } from "react";

function Quiz() {
  const [currentGame, setCurrentGame] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(10);
  const [currentGamePlaying, setCurrentGamePlaying] = useState(0);

  const getGameData = async () => {
    let res = await fetch(
      "https://raw.githubusercontent.com/aaronnech/Who-Wants-to-Be-a-Millionaire/master/questions.json"
    );
    let data = await res.json();
    await setCurrentGame(data.games[0]?.questions);
  };

  useEffect(() => {
    getGameData();
  }, [currentGamePlaying]);

  const updateScore = (answer_index, el) => {
    if (currentQuestion > maxQuestions) return; //change this to display end game scene
    if (answer_index === currentGame[currentQuestion].correct) {
      setPlayerScore((current_score) => current_score + 1000);
      el.target.classList.add("correct");
    } else {
      el.target.classList.add("wrong");
    }
    setTimeout(() => {
      setCurrentQuestion((current_question) => current_question + 1);
      el.target.classList.remove("correct");
      el.target.classList.remove("wrong");
    }, 1000);
    console.log(playerScore);
  };

  const endGameScreen = () =>
    playerScore >= 8000 ? (
      <>
        <div className="container text-center p-2 text-white mt-auto header-bg">
          <h2 className="text-2xl pb-1 border-b border-gray-500">
            Bank: ${playerScore}
          </h2>
          <h4 className="text-lg">Get $8000 to advanced to next round.</h4>
        </div>
        <div className="mb-auto p-6 header-bg">
          <h2 className="font-bold text-lg">You Advanced To Next Round</h2>
          <p>
            You can keep playing to stand to win the cash price of $20 000.
            Answer the next 5 questions.
          </p>
          <p>What will you do?</p>
          <div className="flex p-3 text-white">
            <div className="py-2 px-5 cursor-pointer btn-primary rounded-xl mr-3">
              Cash Out
            </div>
            <div className="py-2 px-5 cursor-pointer bg-green-500 rounded-xl">
              Keep playing
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="my-auto p-6 header-bg">
        <h2 className="font-bold text-lg">You Did Not Advance</h2>
        <p>
          It seems like you are lacking in general knowledge... Your welcome to
          play again
        </p>
        <div className="flex p-3 text-white">
          <a href="/quiz">
            <button className="bg-green-300 p-2 rounded-md">Play Again</button>
          </a>
        </div>
      </div>
    );

  return (
    <div className="container h-screen items flex flex-col">
      <div className="text-center py-4 header-bg shadow-md text-lg font-semibold text-2xl text-cyan-600">
        <h2>Who Wants To Be A Millionaire</h2>
      </div>
      {currentQuestion !== 10 ? (
        <>
          <div
            id="game-container"
            className="items-center justify-center my-auto"
          >
            <div className="text-xl text-center btn-primary">
              {currentQuestion + 1}/10 Questions
            </div>
            <div className="p-3 text-2xl text-center">
              {currentGame[currentQuestion]?.question}
            </div>
            <div id="answers-container" className="p-3">
              {currentGame[currentQuestion]?.content.map((answer, index) => (
                <div
                  key={index}
                  className="container btn-container items-center flex border border-gray-700 mb-2 rounded-3xl cursor-pointer"
                  onClick={(el) => {
                    updateScore(index, el);
                  }}
                >
                  <div className="py-2 px-4 bg-gray-700 text-white font-bold text-lg rounded-3xl m-1 shadow-md btn-primary">
                    {index + 1}
                  </div>
                  <div className="py-2 px-4 text-gray-700 font-semibold">
                    {answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container text-center header-bg p-2 text-white mt-auto">
            <h2 className="text-2xl text-gray-600 pb-1 border-b border-gray-500">
              Your Score is: {playerScore}
            </h2>
          </div>
        </>
      ) : (
        endGameScreen()
      )}
    </div>
  );
}

export default Quiz;

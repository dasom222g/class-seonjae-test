import React from "react";

const Answer = ({ data, onAnswerClick }) => {
  // logic
  const { answerList } = data;

  const handleClick = (answer) => {
    onAnswerClick(answer);
  };

  // view
  return (
    <div>
      {answerList.map((answer, index) => (
        <div key={index} className="py-2">
          <button
            type="button"
            className="block w-full p-4 rounded-xl bg-white border-2 border-black"
            onClick={() => handleClick(answer)}
          >
            {answer.text} {answer.type}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Answer;

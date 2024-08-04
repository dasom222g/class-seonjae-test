import React, { useCallback, useEffect, useState } from "react";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { initialMbtiAnswer, initialMbtiQuestion } from "../data/initialState";
import { mbtiAnswerList, mbtiQuestionList } from "../data/response";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";

const Test = ({ onMovePage }) => {
  // logic
  const totalStep = 12;
  const history = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [mbtiQuestion, setMbtiQuestion] = useState(initialMbtiQuestion);
  const [mbtiAnswer, setMbtiAnswer] = useState(initialMbtiAnswer);

  const [mbtiResultList, setMbtiResultList] = useState([]);

  const { step, questionText } = mbtiQuestion;

  const hanleAnswerClick = (selectedItem) => {
    // 12까지만 증가하고 12일때는 증가 안함
    setCurrentStep(currentStep + 1);

    // TODO: mbtiResult 담기

    // 1. mbtiResultList에 첫 데이터 추가 - 완료
    // 2. 담긴 mbtiReulstList중에 이미 존재하는 questionType이 있는지 체크 - 완료
    // 3. 체크한 값이 true: resultValue의 [firstType]의 값을
    // 4. 체크한 값이 false: mbtiReulstList에 객체 추가 - 완료

    const { firstType, lastType, questionType } = mbtiQuestion;

    const existItem = mbtiResultList.find(
      (item) => item.questionType === questionType
    );

    if (existItem) {
      // 같은 questionType이 존재 하는경우
      setMbtiResultList((prev) =>
        prev.map((item) => {
          return item.questionType === questionType
            ? {
                ...item,
                resultValue: {
                  [firstType]:
                    firstType === selectedItem.type
                      ? item.resultValue[firstType] + 1
                      : item.resultValue[firstType],
                },
              }
            : item;
        })
      );
    } else {
      // 같은 questionType이 존재하지 않는 경우
      initMbtiResultList(firstType, lastType, questionType, selectedItem);
    }
  };

  const initMbtiResultList = (
    firstType,
    lastType,
    questionType,
    selectedItem
  ) => {
    setMbtiResultList((prev) => [
      ...prev,
      {
        firstType,
        lastType,
        questionType,
        resultValue: {
          [firstType]: selectedItem.type === firstType ? 1 : 0,
        },
      },
    ]);
  };

  const goResult = useCallback(() => {
    history("/result");

    //TODO: onMovePage시 mbtiResultList데이터 보내기
    onMovePage(mbtiResultList);
  }, [history, mbtiResultList, onMovePage]);

  useEffect(() => {
    currentStep > totalStep && goResult();
  }, [currentStep, goResult]);

  // 1. 원하는 state 감시
  useEffect(() => {
    // state 변경시 실행될 실행문
    const nextQuestion = mbtiQuestionList.find(
      (item) => item.step === currentStep
    ); // undefined

    // question데이터 변경
    nextQuestion && setMbtiQuestion(nextQuestion);

    // answerData 변경
    const nextAnswer = mbtiAnswerList.find(
      (answer) => answer.questionStep === currentStep
    );
    nextAnswer && setMbtiAnswer(nextAnswer);
  }, [currentStep]);

  // 2. 진입 시 딱 한번만 실행
  useEffect(() => {
    // 진입 시 실행될 실행문
  }, []);

  // 3. 모든 state가 변경될때 실행
  useEffect(() => {
    // 페이지에서 하나의 state라도 변경될때 실행될 실행문
  });

  // view
  return (
    <section className="h-full py-12 flex flex-col justify-between">
      {/* START: Progress 컴포넌트 */}
      <Progress totalStep={totalStep} currentStep={currentStep} />
      {/* END: Progress 컴포넌트 */}
      {/* START: Question 컴포넌트 */}
      <Question text={questionText} step={step} />
      {/* END: Question 컴포넌트 */}
      {/* START: Answer 컴포넌트 */}
      <Answer data={mbtiAnswer} onAnswerClick={hanleAnswerClick} />
      {/* END: Answer 컴포넌트 */}
    </section>
  );
};

export default Test;

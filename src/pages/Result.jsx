import React, { useEffect, useState } from "react";
import { IoMdRefresh, IoMdShareAlt } from "react-icons/io";
import Score from "../components/Score";
import LoveIndex from "../components/LoveIndex";
import ResultMessage from "../components/ResultMessage";
import { mbtiResultDataList } from "../data/response";
import { initialMbtiResultData } from "../data/initialState";

const Result = ({ mbtiResultList }) => {
  // logic
  const [resultData, setResultData] = useState(initialMbtiResultData); // ENFP데이터

  useEffect(() => {
    // 1. expected output [E, S, F, P]
    const mbti = mbtiResultList
      .map((item) =>
        item.resultValue[item.firstType] > 1 ? item.firstType : item.lastType
      )
      .join(""); // 2. expected output "ESFP"
    console.log("🚀~ mbti:", mbti);
    const targetItem = mbtiResultDataList.find((item) => item.type === mbti);
    targetItem && setResultData(targetItem);
  }, [mbtiResultList]);

  // view
  return (
    <section className="pt-10 pb-8">
      {/* START: 로고 텍스트 */}
      <div className="text-center relative">
        <i className="absolute -left-1 -top-4 bg-[url('../public/images/icon/main-icon-wave.png')] w-[71px] h-[29px]" />{" "}
        {/* icon */}
        <div className="relative pt-8">
          <span className="flex justify-center items-end font-cafe24surround text-4xl font-bold p-1 text-stroke-1 text-stroke-black text-white relative z-10">
            <span className="block text-6xl text-mbti-deep-yellow transform -rotate-12 origin-right">
              궁
            </span>
            합{" "}
            <span className="block text-6xl text-mbti-light-pink transform rotate-12 origin-left -ml-1">
              결
            </span>
            <span className="block transform -rotate-12 origin-bottom-right">
              과
            </span>
          </span>
          {/* START: icon */}
          <i className="absolute inset-0 bg-[url('../public/images/icon/result-icon-heart.svg')] bg-no-repeat bg-hand-heart bg-center -top-6 left-1" />
          <svg
            viewBox="0 0 500 500"
            className="transform -rotate-12 absolute -top-2 right-0"
          >
            <path
              id="curve"
              d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
              className="fill-none"
            />
            <text width="500" className="text-2xl font-cafe24surround">
              <textPath xlinkHref="#curve" textAnchor="end" startOffset="100%">
                선재와 나의
              </textPath>
            </text>
          </svg>
          {/* END: icon */}
        </div>
      </div>
      {/* END: 로고 텍스트 */}
      <div className="py-4">
        {/* START: Score 컴포넌트 */}
        <Score number={resultData.score} />
        {/* END: Score 컴포넌트 */}
      </div>
      <div className="py-4">
        {/* START: LoveIndex 컴포넌트 */}
        <LoveIndex list={resultData.loveIndexList} />
        {/* END: LoveIndex 컴포넌트 */}
      </div>
      <div className="py-4">
        {/* START: ResultMessage 컴포넌트 */}
        <ResultMessage />
        {/* END: ResultMessage 컴포넌트*/}
      </div>
      <div className="py-4">
        {/* START: Button 컴포넌트 */}
        <div className="py-2">
          <button
            type="button"
            className={`flex gap-2 justify-center items-center text-mbti-blue bg-white font-cafe24surround rounded-4xl border-[6px] border-mbti-blue py-1 w-3/4 mx-auto`}
          >
            친구에게 공유하기
            <IoMdShareAlt size={32} />
          </button>
        </div>
        {/* END: Button 컴포넌트 */}
        {/* START: Button 컴포넌트 */}
        <div className="py-2">
          <button
            type="button"
            className={`flex gap-2 justify-center items-center text-white bg-mbti-blue font-cafe24surround rounded-4xl border-[6px] border-mbti-blue py-1 w-3/4 mx-auto`}
          >
            궁합 다시보기
            <IoMdRefresh size={32} />
          </button>
        </div>
        {/* END: Button 컴포넌트 */}
      </div>
    </section>
  );
};

export default Result;

import { useEffect } from "react";
import patterImg from "/images/vector_pattern.svg";

type Props = {
  isLoading: boolean,
  responseArr: any,
  totalRentCnt: number,
  setTotalRentCnt: React.Dispatch<React.SetStateAction<number>>,
}

const TotalRentalCnt = ({isLoading, responseArr, totalRentCnt, setTotalRentCnt }: Props) => {
  // 한달간 총 대여 수

  // 총 대여수 계산
  const CalcTotalRent = () => {
    let totalRentCntSum = 0;
    responseArr.map((info: any) => {
      totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
      setTotalRentCnt(totalRentCntSum);
    })
  };

  useEffect(() => {
    if(responseArr){
      CalcTotalRent();
    }
  }, [responseArr]);

  return (
    <div className="relative border-red border bg-white overflow-hidden shadow-md h-44 rounded-xl w-full max-w-4xl p-8 pt-9 m-3 bg-center">
      <img
        src={patterImg}
        alt="vector_image"
        className="absolute -top-2 -right-0 w-[14rem] h-[14rem] z-[1]"
      />
      <div className="flex flex-col z-[2] relative">
        <p className="font-bold text-gray-600 mb-4">총 대여 건수</p>
          <p className="text-2xl flex">
            {isLoading ? (
              <span className="mr-3 animate-pulse text-gray-400">
                ????
              </span>
            ): (
              <span>{totalRentCnt.toLocaleString("ko-KR")}</span>
            )}
            회
          </p>
      </div>
    </div>
  );
};

export default TotalRentalCnt;

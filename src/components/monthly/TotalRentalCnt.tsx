import { useEffect } from "react";

type Props = {
  isLoading: boolean;
  responseArr: any;
  totalRentCnt: number;
  setTotalRentCnt: React.Dispatch<React.SetStateAction<number>>;
};

const TotalRentalCnt = ({
  isLoading,
  responseArr,
  totalRentCnt,
  setTotalRentCnt,
}: Props) => {
  // 한달간 총 대여 수 계산
  const CalcTotalRent = () => {
    let totalRentCntSum = 0;
    responseArr.forEach((info: any) => {
      totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
    });
    setTotalRentCnt(totalRentCntSum);
  };

  useEffect(() => {
    if (responseArr) {
      CalcTotalRent();
    }
  }, [responseArr]);

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg h-44 rounded-lg w-full max-w-4xl p-8 m-4">
      <div className="absolute inset-0 bg-opacity-20 bg-pattern z-[1]"></div>

      <div className="flex flex-col z-[2] relative">
        <p className="font-semibold text-lg mb-4">총 대여 건수</p>
        <p className="text-3xl font-bold">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <span>{totalRentCnt.toLocaleString("ko-KR")}</span>
          )}
          <span className="text-xl ml-2">회</span>
        </p>
      </div>
    </div>
  );
};

export default TotalRentalCnt;

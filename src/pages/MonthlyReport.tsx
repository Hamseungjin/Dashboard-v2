import React, { useCallback, useEffect, useState } from "react";
import DropDownSelect from "../components/DropDownSelect";
import formatData from "../components/utils/formatData";
import axios from "axios";
import Loader from "../components/Loader";
import TopComponent from "../components/monthly/TopComponent";
import BottomComponent from "../components/monthly/BottomComponent";

const MonthlyReport = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩 상태를 관리할 상태
  const [bikeData, setBikeData] = useState(null!);
  const [month, setMonth] = useState<number>(() => {
    return 202312;
  });

  const keyConfig = {
    API_KEY: import.meta.env.VITE_API_KEY,
  };

  const url = `/api/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}`;

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(url);
    setBikeData(data);
    setIsLoading(false);
  }, [month]);

  useEffect(() => {
    fetchData();
  }, [month]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center gap-4 text-2xl">
        <Loader />
        <span className="animate-pulse text-slate-600">
          {month.toString().slice(0, 4)}년 {month.toString().slice(4, 6)}월의 데이터를 받아오는 중입니다. . .
        </span>
      </div>
    );
  }
  console.log(bikeData);

  return (
    <div className="my-12 relative">
      {/* select box & text */}
      <div className="flex items-center w-full justify-center">
        <DropDownSelect
          options={[202312, 202311, 202310, 202309, 202308]}
          month={month}
          setMonth={setMonth}
        />
        <p className="relative px-4 text-center text-slate-500">
          해당 통계는 {formatData(month)}, 서울의 1000개의 따릉이 대여소를
          기반으로 분석한 자료입니다.
        </p>
      </div>

      {/* 하단의 컴포넌트 : 탑 5대여소 비교 분석 차트 2개 & 통계 요약 */}
      <BottomComponent month={month} />

      {/* 상단 : 총 대여 건수 / 박스 4개 */}
      <TopComponent month={month} />
    </div>
  );
};

export default React.memo(MonthlyReport);

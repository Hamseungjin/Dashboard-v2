import { useState } from "react";
import DropDownSelect from "../components/DropDownSelect";
import formatData from "../components/utils/formatData";
import BottomComponent from "../components/monthly/BottomComponent";
import TopComponent from "../components/monthly/TopComponent";


const MonthlyReport = () => {
  const [month, setMonth] = useState<number>(202312);

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

      {/* 상단 : 총 대여 건수 / 박스 4개 */}
      <TopComponent month={month} />

      {/* 하단의 컴포넌트 : 탑 5대여소 비교 분석 차트 2개 & 통계 요약 */}
      <BottomComponent month={month} />
    </div>
  );
};

export default MonthlyReport;

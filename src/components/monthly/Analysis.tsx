import Loader from "../Loader";
import formatData from "../utils/formatData";

type Props = {
  isLoading: boolean;
  month: number;
  topFiveList: any;
  totalRentCnt: number;
};

const Analysis = ({ isLoading, month, topFiveList, totalRentCnt }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 border-b pb-4 mb-6">
        📊 통계 요약
      </h2>
      {isLoading || !topFiveList ? (
        <div className="flex justify-center items-center mt-10">
          <Loader />
          <span className="ml-3 text-xl font-medium text-gray-500 animate-pulse">
            통계를 불러오는 중입니다...
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed">
            {formatData(month)} 기준 1000개의 대여소 중 대여 건수가 가장 많았던 대여소는
            <span className="text-blue-600 font-semibold"> {topFiveList[0].name}</span>,
            <span className="text-blue-600 font-semibold"> {topFiveList[1].name}</span>,
            <span className="text-blue-600 font-semibold"> {topFiveList[2].name}</span>,
            <span className="text-blue-600 font-semibold"> {topFiveList[3].name}</span>,
            <span className="text-blue-600 font-semibold"> {topFiveList[4].name}</span> 입니다.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            그 중에서도 <span className="text-blue-600 font-semibold">{topFiveList[0].name}</span> 대여소에서는 한 달간 총 
            <span className="text-blue-600 font-semibold"> {topFiveList[0].use_cnt}번</span>의 따릉이를 대여했으며, 이는 
            {formatData(month)} 전체 대여 건수의 
            <span className="text-blue-600 font-semibold"> {(topFiveList[0].use_cnt / totalRentCnt).toFixed(2)}%</span>에 해당합니다.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            두 번째로 대여 건수가 많았던 <span className="text-blue-600 font-semibold">{topFiveList[1].name}</span> 대여소에서는 약 
            <span className="text-blue-600 font-semibold"> {topFiveList[1].use_cnt}건</span>의 대여가 이루어졌으며, 
            {topFiveList[0].name} 대여소와 {topFiveList[1].name} 대여소의 한달간 대여 건수 차이는 약 
            <span className="text-blue-600 font-semibold"> {topFiveList[0].use_cnt - topFiveList[1].use_cnt}건</span>입니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analysis;

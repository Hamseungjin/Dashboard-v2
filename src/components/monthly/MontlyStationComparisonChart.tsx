import LineChartContainer from "./LineChartContainer";
import { GoDotFill } from "react-icons/go";
import MontlyUsageBarChart from "../charts/MontlyUsageBarChart";
import Loader from "../Loader";

type Props = {
  topFiveList: any,
  isLoading: boolean
}

const MontlyStationComparisonChart = ({ isLoading, topFiveList }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-12 justify-center items-start mt-10">
      {/* Line chart container */}
      <LineChartContainer topFiveList={topFiveList} isLoading={isLoading} />

      {/* Bar chart container */}
      <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-[400px]">
        {/* Standards - 이용 시간, 이용 거리  */}
        <div className="flex gap-4 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <GoDotFill className="text-blue-500" />
            <span>이용 거리</span>
          </p>
          <p className="flex items-center gap-2">
            <GoDotFill className="text-green-500" />
            <span>이용 시간</span>
          </p>
        </div>

        {/* Bar chart */}
        <div className="w-full h-[360px] bg-white rounded-lg shadow-lg p-4">
          {isLoading || !topFiveList ? (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-600 text-lg font-medium">
              <Loader />
              <p className="mt-4 animate-pulse">차트를 그리는 중입니다...</p>
            </div>
          ) : (
            <MontlyUsageBarChart topFiveData={topFiveList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MontlyStationComparisonChart;

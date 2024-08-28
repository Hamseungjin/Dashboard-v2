import MontlyUsageLineChart from "../charts/MontlyUsageLineChart";
import Loader from "../Loader";

type Props = {
  topFiveList: any;
  isLoading: boolean;
};

const LineChartContainer = ({ topFiveList, isLoading }: Props) => {
  return (
    <div className="flex flex-col items-center p-6 gap-6 bg-white rounded-lg shadow-md">
      {/* Top 2 비교 */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        {isLoading || !topFiveList ? (
          <div className="flex flex-col items-center justify-center w-full h-40 text-gray-600 text-lg font-medium">
            <Loader />
            <p className="mt-4 animate-pulse">데이터를 받아오는 중입니다...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-400 text-sm">{topFiveList[0].name}</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {topFiveList[0].use_cnt} 대
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-400 text-sm">{topFiveList[1].name}</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {topFiveList[1].use_cnt} 대
              </p>
            </div>
          </>
        )}
      </div>

      {/* Line Chart */}
      <div className="w-full h-[250px]">
        {isLoading || !topFiveList ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-600 text-lg font-medium">
            <Loader />
            <p className="mt-4 animate-pulse">차트를 그리는 중입니다...</p>
          </div>
        ) : (
          <MontlyUsageLineChart topFiveData={topFiveList} />
        )}
      </div>
    </div>
  );
};

export default LineChartContainer;

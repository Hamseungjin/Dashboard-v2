import MontlyUsageLineChart from "../charts/MontlyUsageLineChart";
import Loader from "../Loader";

type Props = {
  topFiveList: any;
  isLoading: boolean;
};

const LineChartContainer = ({ topFiveList, isLoading }: Props) => {
  return (
    <div className="flex flex-col px-8 p-2 gap-8">
      {/* top 2 비교 */}
      <div className="flex flex-col gap-4">
        {isLoading || !topFiveList ? (
          <div className="flex gap-4 min-h-40 items-center justify-center font-semibold text-lg">
            <Loader />
            <p className="animate-pulse">데이터를 받아오는 중입니다. . .</p>
          </div>
        ) : (
          <>
            {/* 1등 */}
            <div className="flex flex-col">
              <p className="text-gray-500 mt-1">{topFiveList[0].name}</p>
              <p className="text-xl flex items-center">
                <span className="text-3xl font-semibold">
                  {topFiveList[0].use_cnt} 대
                </span>
              </p>
            </div>
            {/* 2등 */}
            <div className="flex flex-col">
              <p className="text-gray-500 mt-1">{topFiveList[1].name}</p>
              <span className="text-3xl font-semibold">
                {topFiveList[1].use_cnt} 대
              </span>
            </div>
          </>
        )}
      </div>

      {/* line chart */}
      <div className="w-[400px] h-[200px] mt-4">
        {isLoading || !topFiveList ? (
          <div className="flex gap-4 min-h-40 items-center justify-center font-semibold text-lg">
            <Loader />
            <p className="animate-pulse">차트를 그리는 중입니다. . .</p>
          </div>
        ) : (
          <MontlyUsageLineChart topFiveData={topFiveList} />
        )}
      </div>
    </div>
  );
};

export default LineChartContainer;

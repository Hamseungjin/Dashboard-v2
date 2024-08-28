import { useEffect, useState } from "react";
import Analysis from "./Analysis";
import MontlyStationComparisonChart from "./MontlyStationComparisonChart";
import axios from "axios";

type Props = {
  month: number;
};

interface List {
  name: string;
  carb: number;
  use_time: number;
  use_dist: number;
  use_cnt: number;
}

const BottomComponent = ({ month }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topFiveList, setTopFiveList] = useState<List[]>(undefined!);
  const [topFiveStation, setTopFiveStation] = useState<any>([]);
  const [totalRentCnt, setTotalRentCnt] = useState<number>(0);

  const keyConfig = {
    API_KEY: import.meta.env.VITE_API_KEY,
  };
  const url = `/api/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}`;

  const selectDataFromTopFive = () => {
    const topFiveData = topFiveStation.map((station: any) => {
      return {
        name: station.STATION_NAME.split(".")[1].trim(),
        carb: parseInt(station.CARBON_AMT),
        use_time: parseInt(station.MOVE_TIME),
        use_dist: parseInt(station.MOVE_METER) / 1000,
        use_cnt: parseInt(station.USE_CNT),
      };
    });
    setTopFiveList(topFiveData);
  };

  const fetchData = async () => {
    const { data } = await axios.get(url);
    const response = data.cycleRentUseMonthInfo;

    let findTopStations: any = [];

    response.row.map((info: any) => {
      let totalRentCntSum = 0;
      totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
      setTotalRentCnt(totalRentCntSum);

      if (
        findTopStations.length < 5 ||
        info.USE_CNT >
          parseInt(findTopStations[findTopStations.length - 1].USE_CNT)
      ) {
        findTopStations.push(info);
        findTopStations.sort(
          (a: any, b: any) => parseInt(b.USE_CNT) - parseInt(a.USE_CNT)
        );

        if (findTopStations.length > 5) findTopStations.pop();
      }
    });
    setTopFiveStation(findTopStations);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [month]);

  useEffect(() => {
    setIsLoading(true);
    if (topFiveStation.length > 0) {
      selectDataFromTopFive();
    }
    setIsLoading(false);
  }, [topFiveStation]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center my-4 px-6">
      {/* 하단의 상단 컨테이너 - line & bar */}
      <section className="flex flex-col justify-between border border-gray-200 bg-gray-50 rounded-lg shadow-md p-6 w-full md:w-1/2">
        <>
          <h1 className="font-semibold text-2xl text-gray-800">
            🚴‍♀️ 대여소별 비교 분석
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            상위 5개 대여소의 대여 건수를 비교 분석한 결과입니다.
          </p>
        </>
        {/* charts */}
        <div className="mt-6">
          <MontlyStationComparisonChart
            topFiveList={topFiveList}
            isLoading={isLoading}
          />
        </div>
      </section>

      <section className="flex flex-col w-full md:w-1/2 gap-6">
        {/* 탑5 통계 요약 */}
        <div className="flex flex-col justify-between border border-gray-200 p-6 bg-white shadow-md rounded-lg">
          <Analysis
            isLoading={isLoading}
            month={month}
            topFiveList={topFiveList}
            totalRentCnt={totalRentCnt}
          />
          {/* 출처 */}
          <div className="mt-8 text-xs text-gray-500">
            <p>
              모든 자료의 출처는 {"<서울 열린데이터 광장>"}의 '공공자전거이용정보'이며 자료 권한은 서울특별시에 있음을 알립니다.
            </p>
            <div className="mt-2 flex flex-col md:flex-row gap-2 text-blue-500">
              <a
                target="_blank"
                href="https://www.seoul.go.kr/main/index.jsp"
                className="hover:underline"
              >
                - 서울 열린데이터 광장 링크
              </a>
              <a target="_blank" href="https://data.seoul.go.kr/index.do" className="hover:underline">
                - 서울특별시 홈페이지 링크
              </a>
              <a target="_blank" href="https://www.bikeseoul.com" className="hover:underline">
                - 따릉이 홈페이지 링크
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BottomComponent;

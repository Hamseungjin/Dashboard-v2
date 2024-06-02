import { useEffect, useState } from "react";
import Analysis from "./Analysis";
import MontlyStationComparisonChart from "./MontlyStationComparisonChart";

type Props = {
  topFiveStation: any;
  month: number;
  totalRentCnt: number;
};

interface List {
  name: string;
  carb: number;
  use_time: number;
  use_dist: number;
  use_cnt: number;
}

const BottomComponent = ({topFiveStation, month, totalRentCnt,}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topFiveList, setTopFiveList] = useState<List[]>(undefined!);

  // 탑 5 정류장(topFiveStation)에서 필요한 데이터만 추출
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

  useEffect(() => {
    setIsLoading(true);
    if (topFiveStation) {
      selectDataFromTopFive();
      setIsLoading(false);
    }
  }, [topFiveStation]);

  return (
    <div className="flex flex-wrap gap-8 items-center justify-center my-2 px-4">
      {/* 하단의 상단 컨테이너 - line & bar */}
      <section className="flex flex-col justify-center border bg-white rounded-xl shadow-lg p-4">
        <>
          <h1 className="font-semibold text-xl">대여소별 비교 분석</h1>
          <p className="text-slate-500 text-sm mt-1">
            대여 건수가 가장 많았던 대여소 5곳을 선별하여 비교 분석했습니다.
          </p>
        </>

        {/* charts */}
        <MontlyStationComparisonChart topFiveList={topFiveList} isLoading={isLoading} />
      </section>

      <section className="flex flex-col gap-6 w-[900px]">
        {/* 탑5 통계 요약 */}
        <div className="w-full flex flex-col justify-between border p-4 py-8 bg-white shadow-lg rounded-lg">
          <Analysis
            isLoading={isLoading}
            month={month}
            topFiveList={topFiveList}
            totalRentCnt={totalRentCnt}
          />

          {/* 출처 */}
          <div className="flex flex-col mt-16 text-sm">
            <p className="text-slate-500">
              모든 자료의 출처는 {"<서울 열린데이터 광장>"}의
              '공공자전거이용정보'이며 자료 권한은 서울특별시에 있음을 알립니다.
            </p>
            <div className="flex gap-4 text-blue-500">
              <a
                target="_blank"
                href="https://www.seoul.go.kr/main/index.jsp"
                className="hover:"
              >
                - 서울 열린데이터 광장 링크
              </a>
              <a target="_blank" href="https://data.seoul.go.kr/index.do">
                - 서울특별시 홈페이지 링크
              </a>
              <a target="_blank" href="https://www.bikeseoul.com">
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

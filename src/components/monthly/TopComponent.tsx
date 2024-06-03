import UserAnalysisThumb from "../UserAnalysisThumb";
import TotalRentalCnt from "./TotalRentalCnt";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  month: number;
};

const TopComponent = ({ month }: Props) => {
  const [totalRentCnt, setTotalRentCnt] = useState<number>(0); // 한달간 총 대여 수
  const [totalMoveTime, setTotalMoveTime] = useState<number>(0); // 이용 시간 총합 (평균 이용 시간 구할 때 사용)
  const [totalMoveDist, setTotalMoveDist] = useState<number>(0); // 이동거리 총합 (평균 이동 시간 구할 때 사용)
  const [totalSavedCarb, setTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량
  const [responseArr, setResponseArr] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const keyConfig = {
    API_KEY: import.meta.env.VITE_API_KEY,
  };

  const url = `/api/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        const response = data.cycleRentUseMonthInfo;

        setResponseArr(data.cycleRentUseMonthInfo.row);

        let totalMoveTimeSum = 0;
        let totalMoveDistSum = 0;
        let totalSavedCarbSum = 0;
        let totalRentCntSum = 0;

        response.row.map((info: any) => {
          // 총 대여수 구하기
          // 대여수 USE_CNT
          totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
          setTotalRentCnt(totalRentCntSum);

          // 이용시간 전체 평균
          // MOVE_TIME의 총합 / 총 대여수
          // 단위는 분(min)
          totalMoveTimeSum += info.MOVE_TIME ? parseInt(info.MOVE_TIME) : 0;
          setTotalMoveTime(totalMoveTimeSum);

          // 이동거리 전체 평균
          // MOVE_METER / 총 대여수
          // 단위는 미터(m) - Math.floor로 내림하기
          totalMoveDistSum += info.MOVE_METER
            ? Math.floor(parseInt(info.MOVE_METER))
            : 0;
          setTotalMoveDist(totalMoveDistSum);

          // 총 탄소 절감량
          // CARBON_AMT 의 total
          // 단위는 킬로그램(kg)
          totalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
          setTotalSavedCarb(totalSavedCarbSum);
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div className="flex flex-wrap justify-center relative pt-8">
      {/* 총 대여 건수 container */}
      <TotalRentalCnt
        isLoading={isLoading}
        responseArr={responseArr}
        setTotalRentCnt={setTotalRentCnt}
        totalRentCnt={totalRentCnt}
      />

      {/* 이용 & 이동 평균, 탄소, 나무 box - 4개 */}
      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
        <UserAnalysisThumb
          isLoading={isLoading}
          title="이용시간 평균"
          iconColor="#03C9D7"
          iconBg="#E5FAFB"
          amount={`${Math.floor(totalMoveTime / totalRentCnt)} 분`}
          icon={<MdOutlineSupervisorAccount />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="이용거리 평균"
          iconColor="rgb(255, 244, 229)"
          iconBg="rgb(254, 201, 15)"
          amount={`${Math.floor(totalMoveDist / totalRentCnt)} 미터`}
          icon={<BsBoxSeam />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="탄소 절감량 총합"
          iconColor="rgb(228, 106, 118)"
          iconBg="rgb(255, 244, 229)"
          amount={`${totalSavedCarb} kg`}
          icon={<FiBarChart />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="살린 나무의 수 (1그루=6.6kg)"
          iconColor="rgb(0, 194, 146)"
          iconBg="rgb(235, 250, 242)"
          amount={`${Math.floor(totalSavedCarb / 6.6)} 그루`}
          icon={<HiOutlineRefresh />}
        />
      </div>
    </div>
  );
};

export default TopComponent;

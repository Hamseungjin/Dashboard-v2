import UserAnalysisThumb from "../UserAnalysisThumb";
import TotalRentalCnt from "./TotalRentalCnt";
import { useEffect, useState } from "react";
import axios from "axios";

// icons
import { MdSupervisorAccount } from "@react-icons/all-files/md/MdSupervisorAccount";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "@react-icons/all-files/fi/FiBarChart";
import { HiOutlineRefresh } from "@react-icons/all-files/hi/HiOutlineRefresh";

type Props = {
  month: number;
};

const TopComponent = ({ month }: Props) => {
  const [totalRentCnt, setTotalRentCnt] = useState<number>(0);
  const [totalMoveTime, setTotalMoveTime] = useState<number>(0);
  const [totalMoveDist, setTotalMoveDist] = useState<number>(0);
  const [totalSavedCarb, setTotalSavedCarb] = useState<number>(0);
  const [responseArr, setResponseArr] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const keyConfig = {
    API_KEY: import.meta.env.VITE_API_KEY,
  };

  const url = `/api/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(url);
      const response = data.cycleRentUseMonthInfo;

      setResponseArr(response.row);

      let totalMoveTimeSum = 0;
      let totalMoveDistSum = 0;
      let totalSavedCarbSum = 0;
      let totalRentCntSum = 0;

      response.row.forEach((info: any) => {
        totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
        setTotalRentCnt(totalRentCntSum);

        totalMoveTimeSum += info.MOVE_TIME ? parseInt(info.MOVE_TIME) : 0;
        setTotalMoveTime(totalMoveTimeSum);

        totalMoveDistSum += info.MOVE_METER ? Math.floor(parseInt(info.MOVE_METER)) : 0;
        setTotalMoveDist(totalMoveDistSum);

        totalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
        setTotalSavedCarb(totalSavedCarbSum);
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* 총 대여 건수 container */}
      <TotalRentalCnt
        isLoading={isLoading}
        responseArr={responseArr}
        setTotalRentCnt={setTotalRentCnt}
        totalRentCnt={totalRentCnt}
      />

      {/* 이용 & 이동 평균, 탄소, 나무 box - 4개 */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <UserAnalysisThumb
          isLoading={isLoading}
          title="이용시간 평균"
          iconColor="#03C9D7"
          iconBg="#E5FAFB"
          amount={`${Math.floor(totalMoveTime / totalRentCnt)} 분`}
          icon={<MdSupervisorAccount />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="이용거리 평균"
          iconColor="#FEBE15"
          iconBg="#FFF6E0"
          amount={`${Math.floor(totalMoveDist / totalRentCnt)} 미터`}
          icon={<BsBoxSeam />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="탄소 절감량 총합"
          iconColor="#E46A76"
          iconBg="#FFECEC"
          amount={`${totalSavedCarb} kg`}
          icon={<FiBarChart />}
        />
        <UserAnalysisThumb
          isLoading={isLoading}
          title="살린 나무의 수 (1그루=6.6kg)"
          iconColor="#00C292"
          iconBg="#E5F9F0"
          amount={`${Math.floor(totalSavedCarb / 6.6)} 그루`}
          icon={<HiOutlineRefresh />}
        />
      </div>
    </div>
  );
};

export default TopComponent;

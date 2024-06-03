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
    <>
      <p className="font-semibold text-xl pb-6 border-b">[ 통계 요약 ]</p>
      {isLoading || !topFiveList ? (
        <div className="mt-20 flex gap-4 items-center ml-6">
          <Loader />
          <p className="font-semibold text-lg animate-pulse">통계를 요약하는 중입니다. . .</p>
        </div>
      ) : (
        <>
          <p className="pt-6 mb-3">
            &nbsp; {formatData(month)} 1000개의 대여소 중 가장 대여 건수가 많았던
            대여소는 차례대로 {topFiveList[0].name}, {topFiveList[1].name},{" "}
            {topFiveList[2].name}, {topFiveList[3].name}, {topFiveList[4].name}{" "}
            입니다.
          </p>
          <p>
            &nbsp; 가장 대여 건수가 많았던 {topFiveList[0].name}에서는 한 달간{" "}
            {topFiveList[0].use_cnt}번의 따릉이를 대여했으며, 이는{" "}
            {formatData(month)} 총 대여 건수의{" "}
            {(topFiveList[0].use_cnt / totalRentCnt).toFixed(2)}%에 해당합니다.
            두번째로 대여 건수가 많았던 {topFiveList[1].name}
            에서는 한달간 약 888건의 따릉이를 대여했으며, {
              topFiveList[0].name
            }{" "}
            대여소와 {topFiveList[1].name} 대여소의 한달간 대여 건수는 약{" "}
            {topFiveList[0].use_cnt - topFiveList[1].use_cnt}건 차이납니다.
          </p>
        </>
      )}
    </>
  );
};

export default Analysis;

import Loader from "../Loader";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-4 text-2xl">
      <Loader />
      <span className=" animate-pulse text-slate-600">
        페이지 렌더링에 필요한 리소스를 다운받는 중입니다. . .
      </span>
    </div>
  );
};

export default LoadingPage;

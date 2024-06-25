import Loader from "../Loader"

const LoadingSpinner = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-4 text-2xl">
        <Loader /> 
        <span className=" animate-pulse text-slate-600">
          서울 열린데이터 광장에서 데이터를 가져오는 중입니다. . .
        </span>
      </div>
  )
}

export default LoadingSpinner
import StepList from '../components/StepList';
// import ReactPlayer from 'react-player';
import { security } from '../data/dummy';

const ReturnBike = () => {
  return (
    <div className='mt-12 w-full py-12 px-8 flex flex-wrap gap-16 justify-center bg-gradient-to-r from-purple-50 to-indigo-50'>

      <div className="w-full max-w-[850px] mx-auto mb-8">
        {/* 자전거 안전운행안내 제목 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-green-700 rounded-full animate-ping"></div>
          <h1 className="text-lg font-semibold text-green-700">자전거 안전운행안내</h1>
        </div>

        {/* 따릉이 안전수칙 배너 */}
        <div className="bg-green-800 text-white rounded-lg flex items-center px-10 py-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
          {/* 따릉이 로고 */}
          <div className="flex items-center gap-4">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shadow-md">
              <img src="images/image.png" alt="따릉이 로고" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            </div>
            <span className="font-bold text-xl">따릉이</span>
          </div>
          {/* 안전수칙 텍스트 */}
          <div className="ml-auto text-xl font-semibold">안전수칙</div>
        </div>
      </div>

      {/* 방법 요약 */}
      <div className="w-full max-w-[850px] flex flex-col gap-8 border rounded-2xl shadow-xl bg-white mx-auto p-12">
        <div className='flex flex-col gap-12'>
          {security.map((list, idx) => (
            <StepList 
              key={idx} 
              index={idx + 1} 
              icon={list.icon} 
              title={list.title} 
              subText={list.subText} 
              bgColor={list.bgColor} 
              color={list.color} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReturnBike;

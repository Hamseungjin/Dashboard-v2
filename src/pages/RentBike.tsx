// import StepList from '../components/StepList';
import { rentStepsData } from '../data/dummy';
import ReactPlayer from 'react-player';

const RentBike = () => {
  return (
    <div className='mt-12 w-full py-12 px-8 flex flex-wrap gap-16 justify-center relative' style={{ 
        backgroundImage: `url('/path/to/bike-pattern.png'), linear-gradient(to right, #e0f7fa, #f1f8e9)`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat' 
      }}>
        {/* 영상 */}
        <div className='w-[800px] h-[480px] border-2 border-gray-300 rounded-xl bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2'>
          <div className='w-full h-full'>
            <ReactPlayer url="https://youtu.be/2i2FpMWQBnU" width="100%" height="100%" />
          </div>
        </div>
        <div className='w-[800px] h-[480px] border-2 border-gray-300 rounded-xl bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2'>
          <div className='w-full h-full'>
            <ReactPlayer url="https://youtu.be/qV8lem9vy8U" width="100%" height="100%" />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {rentStepsData.map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="text-2xl text-primary-500">{step.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Button Design */}
        <div className="w-full flex justify-center mt-6">
          <a href="https://www.bikeseoul.com/info/infoReg.do" target="_blank" rel="noopener noreferrer">
            <button className="rounded-full text-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white py-4 px-10 shadow-md transform transition-transform duration-300 hover:scale-105 font-bold font-sans hover:shadow-lg hover:-translate-y-1">
              자세히 보기
            </button>
          </a>
        </div>
    </div>
  );
}

export default RentBike;

import { home } from '../data/dummy';

const Home = () => {
  return (
    <div className="my-20 px-4">
      {/* 배경 이미지로 변경된 섹션 */}
      <div 
        className="relative border p-10 shadow-2xl rounded-3xl mx-auto max-w-5xl h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(/images/background.png)`, backgroundSize: '85%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }} 
      >
        <a href="https://www.bikeseoul.com/" target="_blank" rel="noopener noreferrer">
          <button className="absolute -bottom-6 rounded-full right-8 text-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white py-4 px-10 shadow-md transform transition-transform duration-300 hover:scale-105 font-bold font-sans hover:shadow-lg hover:-translate-y-1">
            더 많은 소식 보기
          </button>
        </a>
      </div>

      {/* 상단 텍스트 섹션 */}
      <div className='w-full text-center mb-16 mt-10'>
        <h2 className='text-4xl font-semibold text-gray-600'>
          서울자전거는 <span className='text-green-600 font-bold'>누구나, 언제나, 어디서나</span> 쉽고 편리하게 이용할 수 있는 무인대여 시스템입니다.
        </h2>
        <p className='text-gray-500 mt-5'>
          서울시의 교통체증, 대기오염, 고유가 문제를 해결하고 건강한 사회 및 시민들의 삶의 질을 높이고자 마련되었습니다.
        </p>
      </div>

      {/* 서울 텍스트 섹션 */}
      <div className='w-full text-center mb-20'>
        <h1 className='text-5xl font-bold text-green-700'>서울</h1>
        <p className='text-3xl text-gray-600 mt-3'>자전거와 함께하는 건강한 도시<br />세계적인 자전거 도시</p>
      </div>

      {/* 방법 요약 */}
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-16 border rounded-2xl shadow-xl mx-auto p-16 bg-white">
        {/* 원형 디자인 섹션 */}
        <div className='flex flex-row justify-center gap-16'>
          {home.map((list, idx) => (
            <div key={idx} className='flex flex-col items-center'>
              {/* 원형 디자인 */}
              <div className={`flex justify-center items-center ${list.bgColor} rounded-full w-72 h-72 border-4 border-gray-200 transition transform hover:scale-105 hover:shadow-2xl`}>
                <div className='flex flex-col items-center text-center'>
                  <div className='text-5xl mb-4 text-white'>{list.icon}</div>
                  <h2 className='text-xl font-bold text-white'>{list.title}</h2>
                  <p className='text-base text-white'>{list.subText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>    
  );
};

export default Home;

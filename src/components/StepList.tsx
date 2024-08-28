type Props = {
  index: number;
  icon: JSX.Element;
  title: string;
  subText: string;
  bgColor: string;
  color: string;
};

const StepList = ({ index, icon, title, subText, bgColor, color }: Props) => {
  return (
    <div className={`${bgColor} rounded-2xl px-4 shadow-lg`}>
      <div className="h-full flex items-center gap-3">

        {/* icon */}
        <div className={`py-6 px-2 text-4xl text-white flex items-center justify-center`}>
          {icon}
        </div>

        {/* index */}
        <div className={`w-[115px] h-full shadow-2xl flex items-center justify-center text-4xl font-bold ${color}`}>
          {index}
        </div>

        {/* Description */}
        <div className="flex flex-col w-full text-white justify-center">
          <h1 className='text-xl font-bold font-sans'>{title}</h1>
          <p className='text-sm font-sans'>{subText}</p>
        </div>

      </div>
    </div>
  );
};

export default StepList;

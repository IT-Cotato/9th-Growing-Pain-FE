const ProgressBar = ({contribution}) => {
  return (
    <div className="ml-[14px] w-[59px] h-[9px] bg-white border rounded-[10px]">
      <div className="h-full bg-navy-dark rounded-[10px]" style={{ width: `${contribution}%` }}></div>
    </div>
  );
};

export default ProgressBar;
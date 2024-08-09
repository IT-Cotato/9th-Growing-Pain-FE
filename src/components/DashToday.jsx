const DashToday = ({ member, content, last }) => {
  return (
    <div className={`py-[11px] ${!last ? 'border-b' : ''}`}>
      <div className="flex justify-between">
        <div className="text-[13px]">{content}</div>
        <div className="text-[13px] text-gray-800">{member}</div>
      </div>
    </div>
  );
};

export default DashToday;
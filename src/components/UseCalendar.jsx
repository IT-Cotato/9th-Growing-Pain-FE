import './UseCalendar.css';
import Calendar from 'react-calendar';
import { useState, useContext } from 'react';
import moment from 'moment';

import { GrowthStateContext } from "../App";
import { getDDay } from '../utils/getDDay';

import { ChevronRightIcon,	ChevronLeftIcon } from '@heroicons/react/24/outline';

const UseCalendar = () =>{
  const [date, setDate] = useState(new Date());         // 선택한 날짜
  const [, , applicationData] = useContext(GrowthStateContext);   // 지원현황 데이터 불러오기

  const onChange = date => {
    setDate(date);
  };

  // 마감일이 임박하면 점(dot) 추가, 7일 초과이면 점 추가 X (UI 때문에 not-dot로 추가)
  const dotTileContent = ({ date }) => {
    const html = [];
    const formattedDate = moment(date).format('YYYY-MM-DD');
    if (applicationData.some(application => getDDay(application.job_post_dead_line) <= 7 && moment(application.job_post_dead_line).format('YYYY-MM-DD') === formattedDate)) {
      html.push(<div className="dot" key={formattedDate}></div>);
    } else {
      html.push(<div className="not-dot" key={formattedDate}></div>);
    }
    return (
      <div className="flex justify-center items-center absoluteDiv">
        {html}
      </div>
    );
  };

  return (
    <div className='calendar-container bg-white'>
      <div className='react-calendar__use'>
      <Calendar 
        onChange={onChange}
        value={date}
        calendarType="gregory"
        minDetail="year"
        locale="en-US" // 영어로 설정
        formatDay={(local, date) => moment(date).format("D")}
        nextLabel={<ChevronRightIcon className='size-6 stroke-1' />}
        prevLabel={<ChevronLeftIcon className='size-6 stroke-1' />}
        next2Label={null}
        prev2Label={null}
        tileContent={dotTileContent}
      />
      </div>
    </div>
  );
}

export default UseCalendar;
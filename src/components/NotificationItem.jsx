import React from 'react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { calculateTimeAge } from '../utils/calculateTimeAge';

const NotificationItem = ({ id, profile, nickname, time, content, type }) => {
  const nav = useNavigate();

  if(type==='community'){
    return (
      <div className='notification-item mb-[20px] rounded-[10px] border-b-[1px] border-gray-300' onClick={()=>nav(`/user/community/total/#postId=${id}`)} >
        <div className='flex flex-col cursor-pointer'>
          <div className='flex items-center gap-[7px] cursor-pointer'>
            <img src={profile} alt='Profile' className='w-[30px] h-[30px] rounded-full' />
            <div className='text-[14px] font-medium'>{nickname}</div>
            <div className='text-[14px] text-gray-400'>•</div>
            <div className='text-[11px] text-gray-400'>{calculateTimeAge(time)}</div>
          </div>
          <p className='my-[15px] text-[13px] text-left cursor-pointer'>{content}</p>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className='notification-item mb-[20px] rounded-[10px] border-b-[1px] border-gray-300'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-[7px]'>
            <img src={logo} alt='Profile' className='w-[30px] h-[30px] rounded-full' />
            <div className='text-[14px] font-medium'>성장통</div>
          </div>
          <div className='flex items-center justify-between'>
            <p className='my-[15px] text-[13px] text-left'>{content}</p>
            <div className='my-[15px] text-[13px] text-center text-navy-dark cursor-pointer' onClick={()=>nav(`/user/growth/apply/${id}`)}>확인하기</div>
          </div>
        </div>
      </div>
    );
  }
};

export default NotificationItem;

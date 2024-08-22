import { useState, useEffect } from 'react';
import NotificationItem from '../components/NotificationItem';
import 프사 from '../assets/images/logo.png';
import instance from '../api/instance';
import { getDDay } from '../utils/getDDay';

const typeMap = {
	'DOCUMENT': '서류',
	'INTERVIEW': '면접',
	'INTERVIEW_FEEDBACK': '면접 피드백',
	'BUSINESS_ANALYSIS': '기업 분석'
};

const Notification = () => {
	const [applyData, setApplyData] = useState([]);
	const [repliesData, setRepliesData] = useState([]);

	// 서버로부터 댓글 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/comment/member');
        if (response.data && response.data.status === 'success') {
          console.log('댓글 알림 GET 성공: ', response.data.data.commentList);
          // 받아온 데이터를 replies에 저장하고 시간순으로 정렬
          const sortedReplies = response.data.data.commentList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRepliesData(sortedReplies);
        }
      } catch (error) {
        console.error('댓글 알림 GET 실패: ', error);
      }
    };

    fetchData();
  }, []);

	// 서버로부터 1일, 3일, 7일 남은 공고 데이터 GET 및 병합
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response3, response7] = await Promise.all([
          instance.get(`/api/job-posts/days-left/${1}`),
          instance.get(`/api/job-posts/days-left/${3}`),
          instance.get(`/api/job-posts/days-left/${7}`)
        ]);

        const allResponses = [response1, response3, response7];

        let combinedData = [];

        allResponses.forEach(response => {
          if (response.data && response.data.status === 'success') {
            console.log(`지원현황 알림 GET 성공: ${response.data.data.jobApplicaionList}`);
            combinedData = [...combinedData, ...response.data.data.jobApplicaionList];
          }
        });

				// 남은 날짜 계산 및 추가
        combinedData = combinedData.map(item => ({
          ...item,
          daysLeft: getDDay(item.applicationCloseDate)
        }));

        // 남은 날짜 기준으로 정렬
        const sortedData = combinedData.sort((a, b) => a.daysLeft - b.daysLeft);
        setApplyData(sortedData);
      } catch (error) {
        console.error('지원현황 알림 GET 실패: ', error);
      }
    };

    fetchData();
  }, []);

	// repliesData가 null일 때 로딩 스피너나 대체 UI를 표시할 수 있음
  if (!repliesData) {
    return <div>Loading...</div>;  // 데이터를 불러오는 동안 표시될 내용
  }

	return (
		<div className='notification-page mx-[50px] my-[35px] h-[90%]'>
			<div className='notification-container flex gap-[25px] h-[100%]'>
				<div className='community-notification w-[50%] h-[100%] flex flex-col'>
					<p className='text-[19px] font-medium text-left text-navy-dark mb-[17px]'>커뮤니티 알림</p>
					<div className='notification-content bg-white flex-1 rounded-[10px] p-[30px]'>
						{repliesData.map(reply => (
							reply && (
								<NotificationItem
									key={reply.commentId}
									id={reply.postId}
									profile={프사}
									nickname={reply.memberNickname}
									time={reply.createdAt}
									content={reply.content}
									type='community'
								/>
							)
						))}
					</div>
				</div>
				<div className='apply-notification w-[50%] h-[100%] flex flex-col'>
					<p className='text-[19px] font-medium text-left text-navy-dark mb-[17px]'>성장 기록 알림</p>
					<div className='notification-content bg-white flex-1 rounded-[10px] p-[30px]'>
						{applyData.map(apply => (
              <NotificationItem
								key={apply.jobApplicationId+'a'}
								id={apply.jobPostId}
                content={`등록하신 ${apply.companyName} 공고의 ${typeMap[apply.applicationType]} 마감 ${apply.daysLeft}일 전이에요!`}
                type='apply'
              />
            ))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notification;

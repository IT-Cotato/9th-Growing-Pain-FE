import './App.css';
import Router from './routes/Router';
import React, { createContext } from 'react';

const memberData = [
	{
		member_email: 'greatsounds613@gmail.com', // 식별을 위한 아이디
		member_name: 'haydenCho', // 닉네임 (이것도 식별 가능)
		member_field: 'IT', // 분야
		member_job: '대학생', // 직업
		member_belong: '덕성여자대학교', // 소속
		profile_status: 'PUBLIC', // 프로필 공개 여부
		oauth_id: 1234, // OAuth 인증 일련번호
		auth_provider: 'GOOGLE', // Oauth 인증 방법
		deleted: false, // 삭제 여부
	},
	{
		member_email: 'kang061313@gmail.com',
		member_name: 'yongaricode',
		member_field: 'Front-End',
		member_job: '대학생',
		member_belong: '이화여자대학교',
		profile_status: 'PRIVATE',
		oauth_id: 5681,
		auth_provider: 'KAKAO',
		deleted: false,
	},
];

const jobPostData = [
	{
		job_post_id: 0,
		member_id: 'greatsounds613@gmail.com',
		company_name: '토스',
		job_part: '프론트엔드',
	},
	{
		job_post_id: 1,
		member_id: 'greatsounds613@gmail.com',
		company_name: '네이버',
		job_part: 'AE',
	},
	{
		job_post_id: 2,
		member_id: 'greatsounds613@gmail.com',
		company_name: '카카오',
		job_part: 'PM',
	},
	{
		job_post_id: 3,
		member_id: 'greatsounds613@gmail.com',
		company_name: '당근',
		job_part: 'UI/UX 디자이너',
	},
	{
		job_post_id: 4,
		member_id: 'greatsounds613@gmail.com',
		company_name: '라인',
		job_part: '프론트엔드',
	},
	{
		job_post_id: 5,
		member_id: 'greatsounds613@gmail.com',
		company_name: '기업은행',
		job_part: 'AE',
	},
	{
		job_post_id: 6,
		member_id: 'greatsounds613@gmail.com',
		company_name: '배민',
		job_part: '백엔드',
	},
	{
		job_post_id: 7,
		member_id: 'greatsounds613@gmail.com',
		company_name: '쿠팡',
		job_part: '프론트엔드',
	},
	{
		job_post_id: 8,
		member_id: 'greatsounds613@gmail.com',
		company_name: 'Google',
		job_part: 'PM',
	},
];

const applicationData = [
	{
		job_post_id: 0, // 공고 id
		job_application_id: 0, // 지원현황 id (공고로 먼저 구분)
		application_type: 'DOCUMENT', // 지원현황 타입
		created_at: new Date().getTime(), // 작성날짜
		updated_at: new Date().getTime(), // 수정날짜
		place: '서초구', // 장소
		result: 'PENDING', // 결과
		submission_status: false, // 제출여부(지원현황 타입에 따라 다름)
		job_post_start_date: new Date('2024-07-06').getTime(), // 공고 시작 날짜
		job_post_dead_line: new Date('2024-10-23').getTime(), // 공고 마감 날짜
	},
	{
		job_post_id: 0,
		job_application_id: 1,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '서초구',
		result: 'PENDING',
		submission_status: false,
		job_post_start_date: new Date('2024-07-06').getTime(),
		job_post_dead_line: new Date('2024-10-23').getTime(),
	},
	{
		job_post_id: 0,
		job_application_id: 2,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '서초구',
		result: 'PENDING',
		submission_status: false,
		job_post_start_date: new Date('2024-07-06').getTime(),
		job_post_dead_line: new Date('2024-10-23').getTime(),
	},
	{
		job_post_id: 1,
		job_application_id: 2,
		application_type: 'DOCUMENT',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '종로구',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-06').getTime(),
		job_post_dead_line: new Date('2024-09-19').getTime(),
	},
	{
		job_post_id: 1,
		job_application_id: 3,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '종로구',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-06').getTime(),
		job_post_dead_line: new Date('2024-09-19').getTime(),
	},
	{
		job_post_id: 2,
		job_application_id: 4,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '도봉구',
		result: 'FAILED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-04').getTime(),
		job_post_dead_line: new Date('2024-08-17').getTime(),
	},
	{
		job_post_id: 3,
		job_application_id: 5,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '강남구',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-05').getTime(),
		job_post_dead_line: new Date('2024-08-15').getTime(),
	},
	{
		job_post_id: 4,
		job_application_id: 6,
		application_type: 'DOCUMENT',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '강북구',
		result: 'PENDING',
		submission_status: true,
		job_post_start_date: new Date('2024-07-06').getTime(),
		job_post_dead_line: new Date('2024-08-17').getTime(),
	},
	{
		job_post_id: 5,
		job_application_id: 7,
		application_type: 'DOCUMENT',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '양주시',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-02').getTime(),
		job_post_dead_line: new Date('2024-08-14').getTime(),
	},
	{
		job_post_id: 6,
		job_application_id: 8,
		application_type: 'DOCUMENT',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '의정부시',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-05').getTime(),
		job_post_dead_line: new Date('2024-08-20').getTime(),
	},
	{
		job_post_id: 7,
		job_application_id: 9,
		application_type: 'DOCUMENT',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '제주도 서귀포시',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-05').getTime(),
		job_post_dead_line: new Date('2024-08-10').getTime(),
	},
	{
		job_post_id: 8,
		job_application_id: 10,
		application_type: 'INTERVIEW',
		created_at: new Date().getTime(),
		updated_at: new Date().getTime(),
		place: '세종시',
		result: 'PASSED',
		submission_status: true,
		job_post_start_date: new Date('2024-07-05').getTime(),
		job_post_dead_line: new Date('2024-08-10').getTime(),
	},
];

const applicaionDetailData = [
	{
		job_post_id: 0,
		application_detail_id: 0,
		id: 0,
		title: '1번 지원서 서류 1',
		content: '1번 지원서 서류 1입니다',
	},
	{
		job_post_id: 0,
		application_detail_id: 0,
		id: 1,
		title: '1번 지원서 서류 2',
		content: '1번 지원서 서류 2입니다',
	},
	{
		job_post_id: 0,
		application_detail_id: 0,
		id: 2,
		title: '1번 지원서 서류 3',
		content: '1번 지원서 서류 3입니다',
	},
	{
		job_post_id: 0,
		application_detail_id: 1,
		id: 0,
		title: '1번 지원서 면접 1',
		content: '1번 지원서 면접 1입니다',
	},
	{
		job_post_id: 1,
		application_detail_id: 0,
		id: 0,
		title: '2번 지원서 서류 1',
		content: '2번 지원서 서류 1입니다 토스는 혁신적인 금융 기술과 편리한 서비스로 많은 사람들에게 신뢰받고 있습니다. 저는 토스의 이러한 혁신적인 접근 방식과 고객 중심의 서비스 철학에 매우 호감을 가지고 있습니다. 특히, 디지털 금융 서비스의 발전이 사회 전반에 긍정적인 영향을 미치고 있다고 믿기 때문에, 토스와 같은 기업이 이 분야에서 선도적 역할을 하는 것을 지지합니다.또한, 토스의 사용자 경험과 기술적 혁신에 대한 헌신적인 노력을 주목하고 있습니다. 저는 자주 사용하는 은행 서비스가 제공하는 번거로움을 줄이고, 디지털화된 솔루션을 통해 일상적인 금융 거래를 편리하게 처리할 수 있는 토스의 방식에 큰 매력을 느끼고 있습니다. 더불어, 토스가 고객의 다양한 금융 생활을 지원하며 동시에 투명하고 안전한 서비스를 제공하는 점도 매우 중요하게 생각합니다. 이러한 가치와 목표를 함께 실현하고자 하는 저의 열정과 노력이 토스와 잘 맞아 떨어질 것이라고 믿습니다.2번 지원서 서류 1입니다 토스는 혁신적인 금융 기술과 편리한 서비스로 많은 사람들에게 신뢰받고 있습니다. 저는 토스의 이러한 혁신적인 접근 방식과 고객 중심의 서비스 철학에 매우 호감을 가지고 있습니다. 특히, 디지털 금융 서비스의 발전이 사회 전반에 긍정적인 영향을 미치고 있다고 믿기 때문에, 토스와 같은 기업이 이 분야에서 선도적 역할을 하는 것을 지지합니다.또한, 토스의 사용자 경험과 기술적 혁신에 대한 헌신적인 노력을 주목하고 있습니다. 저는 자주 사용하는 은행 서비스가 제공하는 번거로움을 줄이고, 디지털화된 솔루션을 통해 일상적인 금융 거래를 편리하게 처리할 수 있는 토스의 방식에 큰 매력을 느끼고 있습니다. 더불어, 토스가 고객의 다양한 금융 생활을 지원하며 동시에 투명하고 안전한 서비스를 제공하는 점도 매우 중요하게 생각합니다. 이러한 가치와 목표를 함께 실현하고자 하는 저의 열정과 노력이 토스와 잘 맞아 떨어질 것이라고 믿습니다.2번 지원서 서류 1입니다 토스는 혁신적인 금융 기술과 편리한 서비스로 많은 사람들에게 신뢰받고 있습니다. 저는 토스의 이러한 혁신적인 접근 방식과 고객 중심의 서비스 철학에 매우 호감을 가지고 있습니다. 특히, 디지털 금융 서비스의 발전이 사회 전반에 긍정적인 영향을 미치고 있다고 믿기 때문에, 토스와 같은 기업이 이 분야에서 선도적 역할을 하는 것을 지지합니다.또한, 토스의 사용자 경험과 기술적 혁신에 대한 헌신적인 노력을 주목하고 있습니다. 저는 자주 사용하는 은행 서비스가 제공하는 번거로움을 줄이고, 디지털화된 솔루션을 통해 일상적인 금융 거래를 편리하게 처리할 수 있는 토스의 방식에 큰 매력을 느끼고 있습니다. 더불어, 토스가 고객의 다양한 금융 생활을 지원하며 동시에 투명하고 안전한 서비스를 제공하는 점도 매우 중요하게 생각합니다. 이러한 가치와 목표를 함께 실현하고자 하는 저의 열정과 노력이 토스와 잘 맞아 떨어질 것이라고 믿습니다.2번 지원서 서류 1입니다 토스는 혁신적인 금융 기술과 편리한 서비스로 많은 사람들에게 신뢰받고 있습니다. 저는 토스의 이러한 혁신적인 접근 방식과 고객 중심의 서비스 철학에 매우 호감을 가지고 있습니다. 특히, 디지털 금융 서비스의 발전이 사회 전반에 긍정적인 영향을 미치고 있다고 믿기 때문에, 토스와 같은 기업이 이 분야에서 선도적 역할을 하는 것을 지지합니다.또한, 토스의 사용자 경험과 기술적 혁신에 대한 헌신적인 노력을 주목하고 있습니다. 저는 자주 사용하는 은행 서비스가 제공하는 번거로움을 줄이고, 디지털화된 솔루션을 통해 일상적인 금융 거래를 편리하게 처리할 수 있는 토스의 방식에 큰 매력을 느끼고 있습니다. 더불어, 토스가 고객의 다양한 금융 생활을 지원하며 동시에 투명하고 안전한 서비스를 제공하는 점도 매우 중요하게 생각합니다. 이러한 가치와 목표를 함께 실현하고자 하는 저의 열정과 노력이 토스와 잘 맞아 떨어질 것이라고 믿습니다.',
	},
	{
		job_post_id: 1,
		application_detail_id: 1,
		id: 0,
		title: '2번 지원서 면접 1',
		content: '2번 지원서 면접 1입니다',
	},
];

const infoData = {
  name: "김수윤",
  company: "숙명여자대학교 영어영문학과",
  belong: "숙명여자대학교 영어영문학과 재학생",
  education: "숙명여자대학교 영어영문학과",
  skill: "퍼블릭 스피킹",
  activity: "IT동아리 코테이토 8기 활동",
  award: "해커톤 1등",
  toefl: "120",
  career: "5년간의 UX 리서치 경험을 바탕으로 사용자 인터뷰와 설문조사를 기획하고 실행하며, 사용성 테스트와 데이터 분석을 통해 사용자 경험을 개선하는 데 주력해왔습니다. 다양한 디자인 툴과 프로토타입 툴을 사용하여 여러 부서와 협업하며, 사용자 중심의 제품 디자인 및 개발을 진행했습니다. 모바일 앱 리디자인 프로젝트에서는 사용자 피드백을 반영하여 인터페이스를 개선하고, 웹사이트 리뉴얼 프로젝트에서는 사용자의 행동 데이터를 분석하여 정보 구조를 재설계하는 등의 성과를 이루었습니다.",
  about: "저는 창의적이고 분석적인 사고를 바탕으로 사용자 경험(UX) 리서치 분야에서 5년간 일해왔습니다. 대학에서 UX 디자인을 전공한 후, 다양한 워크숍과 온라인 강좌를 통해 최신 UX 리서치 기법과 도구를 익히며 지속적으로 역량을 강화해왔습니다. 제 주요 업무는 사용자 인터뷰와 설문조사를 기획하고 실행하는 것이며, 이를 통해 얻은 데이터를 분석하여 사용자 경험을 개선하는 데 주력하고 있습니다. 또한, 사용성 테스트를 통해 제품의 문제점을 파악하고 해결책을 제안하는 역할을 맡고 있습니다.",
}

export const GrowthStateContext = createContext();

function App() {
	const userInfo = true;

	return (
		<>
			<GrowthStateContext.Provider value={[memberData, jobPostData, applicationData, applicaionDetailData, infoData]}>
				<Router userInfo={userInfo} />
			</GrowthStateContext.Provider>
		</>
	);
}

export default App;

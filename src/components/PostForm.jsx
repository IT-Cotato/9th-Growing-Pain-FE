import React from 'react';
import MemoField from './MemoField';
import Button from './Button';
import 프사 from '/images/공모전.png';

const PostForm = ({ category }) => {
	const userData = {
		nickname: 'yongaricode',
		position: '프론트엔드',
		profile: 프사,
	};

	const categoryOptions = {
		free: '자유',
		study: '팀원모집',
		contest: '팀원모집',
		project: '팀원모집',
		portfolio: '포트폴리오',
	};

	const selectedCategory = categoryOptions[category];

	return (
		<div className="h-[378px] bg-white rounded-[10px] mr-[32px] flex-col flex">
			<div className="flex pt-[29px] ml-[36px] justify-between pr-[36px] items-center">
				<section className="flex items-center">
					<span>
						<img src={userData.profile} alt="User profile" className="rounded-full w-9 h-9" />
					</span>
					<h1 className="ml-[12px] text-[16px] font-medium">{userData.nickname}</h1>
					<h1 className="text-[14px] ml-[10px] text-gray-commuPosition">{userData.position}</h1>
				</section>
				<select className="h-[42px] w-[202px] bg-[#EDF6FF] pl-[20px] rounded-[10px]" value={selectedCategory}>
					<option value="카테고리" hidden>
						카테고리
					</option>
					<option value="자유">자유</option>
					<option value="팀원모집">팀원모집</option>
					<option value="포트폴리오">포트폴리오</option>
				</select>
			</div>
			<section className="mt-[18px] space-y-[20px] flex-grow flex flex-col mx-[36px]">
				<MemoField placeholderText={'제목을 입력해주세요'} type={'communityTitle'} />
				<MemoField placeholderText={'자유롭게 글을 남겨보세요 '} type={'communityMainText'} />
				<div className="flex justify-end mt-auto">
					<Button type={'communitySave'} text={'글쓰기'} />
				</div>
			</section>
		</div>
	);
};

export default PostForm;

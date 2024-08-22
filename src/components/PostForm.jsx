import React from 'react';
import MemoField from './MemoField';
import Button from './Button';
import CustomDropdown from './CustomDropdown';
import { useState } from 'react';
import instance from '../api/instance';
import DEFAULT_PROFILE_IMAGE from '/images/기본프로필.png';

const PostForm = ({ category, onPostCreated }) => {
	let [title, setTitle] = useState('');
	let [content, setContent] = useState('');

	const userData = {
		nickname: sessionStorage.getItem('nickname'),
		position: sessionStorage.getItem('field'),
		profile: sessionStorage.getItem('profileImage'),
	};

	const categoryOptions = {
		free: '자유',
		member: ['프로젝트', '공모전', '스터디'],
		portfolio: '포트폴리오',
	};

	const handleSubmit = async () => {
		if (!title || !content || !Category) {
			alert('카테고리 선택 후 제목과 내용을 모두 입력해 주세요.');
			return;
		}

		const postData = {
			title: title,
			content: content,
			category: Category,
		};

		try {
			const response = await instance.post('/api/post', postData);
			if (response.status === 201) {
				console.log('포스트 작성 성공:', response.data);
				setTitle('');
				setContent('');
				onPostCreated();
				setSelectedCategory(category);
			}
		} catch (error) {
			console.error('포스트 작성 오류:', error);
			alert('포스트 작성에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	const [Category, setSelectedCategory] = useState('');

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		console.log('Selected Category:', category); // 선택된 카테고리 값을 부모 컴포넌트에서 처리
	};

	const selectedCategory = category === 'member' ? '팀원모집' : categoryOptions[category];

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
				<CustomDropdown category={category} onCategoryChange={handleCategoryChange} className="z-50" />
			</div>
			<div className="mt-[18px] flex-grow flex flex-col mx-[36px]">
				<div className="h-1/4 z-10">
					<MemoField
						placeholderText={'제목을 입력해주세요'}
						type={'communityTitle'}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="h-2/4">
					<MemoField
						placeholderText={'자유롭게 글을 남겨보세요 '}
						type={'communityMainText'}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div className="flex justify-end h-1/4 mt-[18px]" onClick={handleSubmit}>
					<Button type={'communitySave'} text={'글쓰기'} />
				</div>
			</div>
		</div>
	);
};

export default PostForm;

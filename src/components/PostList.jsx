import React from 'react';
import PostItem from './PostItem';
import DEFAULT_PROFILE_IMAGE from '/images/기본프로필.png';
import { calculateTimeAge } from '../utils/calculateTimeAge';

const PostList = ({ posts }) => {
	return (
		<div className="my-[20px] space-y-[20px]">
			{posts.map((data, index) => {
				const createdDate = new Date(data.createdAt); // 문자열을 Date 객체로 변환
				return (
					<PostItem
						key={index}
						nickname={data.memberNickname}
						id={data.postId}
						createdTime={calculateTimeAge(createdDate)} // 변환된 Date 객체를 함수에 전달
						position={data.memberField}
						postTitle={data.title}
						content={data.content}
						userProfile={data.ProfileImage || DEFAULT_PROFILE_IMAGE}
						heart={data.likeCount}
						comments={data.comments}
						category={data.subCategory}
					/>
				);
			})}
		</div>
	);
};

export default PostList;

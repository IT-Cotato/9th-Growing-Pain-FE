import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
	return (
		<div className="my-[20px] space-y-[20px]">
			{posts.map((data, index) => (
				<PostItem
					key={index}
					nickname={data.nickname}
					id={data.post_id}
					createdTime={data.createdTime}
					position={data.position}
					postTitle={data.postTitle}
					content={data.content}
					userProfile={data.profile}
					heart={data.heart}
					comment={data.comment}
					bookmart={data.bookmark}
					category={data.category}
				/>
			))}
		</div>
	);
};

export default PostList;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

// const categoryOptions = {
// 	FREE: '자유',
// 	TEAM: ['프로젝트', '공모전', '스터디'],
// 	PORTFOLIO: '포트폴리오',
// };

// const subCategoryValues = {
// 	프로젝트: 'PROJECT',
// 	공모전: 'CONTEST',
// 	스터디: 'STUDY',
// };

// const displaySubCategoryNames = {
// 	PROJECT: '프로젝트',
// 	CONTEST: '공모전',
// 	STUDY: '스터디',
// };

// const CustomDropdown = ({ category, onCategoryChange }) => {
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
// 	const [selectedCategory, setSelectedCategory] = useState('');
// 	const [selectedSubCategory, setSelectedSubCategory] = useState('');

// 	const location = useLocation();

// 	useEffect(() => {
// 		if (category) {
// 			if (category === 'TEAM') {
// 				setSelectedCategory('TEAM');
// 				setSelectedSubCategory('');
// 				console.log('selectedCategory: TEAM');
// 			} else if (category === 'ALL') {
// 				setSelectedCategory('');
// 				setSelectedSubCategory('');
// 				console.log('selectedCategory 비움');
// 			}
// 		} else {
// 			setSelectedCategory(category);
// 			setSelectedSubCategory('');
// 		}
// 	}, [category]);

// 	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

// 	const handleCategorySelect = (category) => {
// 		setSelectedCategory(category);
// 		if (category !== 'TEAM') {
// 			setIsSubMenuOpen(false);
// 			setSelectedSubCategory('');
// 			setIsMenuOpen(false);
// 			onCategoryChange(category);
// 		}
// 	};

// 	const handleSubCategorySelect = (subCategory) => {
// 		const mappedValue = subCategoryValues[subCategory] || subCategory;
// 		setSelectedSubCategory(subCategory); // 한글로 저장
// 		setIsMenuOpen(false);
// 		setIsSubMenuOpen(false);
// 		onCategoryChange(mappedValue); // 매핑된 값을 부모 컴포넌트에 전달
// 	};

// 	return (
// 		<div className="relative inline-block">
// 			{location.pathname === '/user/community/total' && (
// 				<button
// 					onClick={toggleMenu}
// 					className="flex h-[42px] w-[202px] items-center justify-between bg-navy-mypageToggle rounded-[10px] text-[15px] px-5 text-[#606060]"
// 				>
// 					{
// 						// 1. `selectedCategory`가 빈 문자열일 때
// 						selectedCategory === ''
// 							? '카테고리'
// 							: // 2. `selectedCategory`가 'TEAM'이 아닌 경우
// 								selectedCategory !== 'TEAM'
// 								? categoryOptions[selectedCategory]
// 								: // 3. `selectedCategory`가 'TEAM'인 경우
// 									selectedSubCategory
// 					}
// 					<FaAngleDown />
// 				</button>
// 			)}
// 			{location.pathname === '/user/community/total' && isMenuOpen && (
// 				<div className="absolute bg-white border border-[#C5D2F7] rounded-[10px] mt-3 w-[202px] z-50">
// 					<ul>
// 						{Object.keys(categoryOptions).map((category) => (
// 							<li
// 								key={category}
// 								className="relative"
// 								onMouseEnter={() => category === 'TEAM' && setIsSubMenuOpen(true)}
// 								onMouseLeave={() => category === 'TEAM' && setIsSubMenuOpen(false)}
// 							>
// 								<button
// 									className={`w-full text-left px-4 py-2 h-[50px] hover:bg-navy-commuDropboxHover flex justify-between items-center ${
// 										(isSubMenuOpen || selectedCategory === 'TEAM') && category === 'TEAM'
// 											? 'bg-navy-commuDropboxHover'
// 											: 'hover:bg-navy-commuDropboxHover'
// 									}`}
// 									onClick={() => handleCategorySelect(category)}
// 								>
// 									{category === 'TEAM' ? '팀원모집' : categoryOptions[category]}
// 									{category === 'TEAM' && <FaAngleRight className="fill-[#818181]" />}
// 								</button>
// 								{isSubMenuOpen && category === 'TEAM' && (
// 									<div className="absolute left-full top-[-50px] w-[202px] rounded-[10px] bg-white border border-[#C5D2F7]">
// 										<ul>
// 											{categoryOptions.TEAM.map((subCategory) => (
// 												<li key={subCategory}>
// 													<button
// 														className="w-full h-[50px] text-left px-4 py-2 hover:bg-gray-200"
// 														onClick={() => handleSubCategorySelect(subCategory)}
// 													>
// 														{subCategory}
// 													</button>
// 												</li>
// 											))}
// 										</ul>
// 									</div>
// 								)}
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 			{location.pathname === '/user/community/member' && (
// 				<button
// 					onClick={toggleMenu}
// 					className="flex h-[42px] w-[202px] items-center justify-between bg-navy-mypageToggle rounded-[10px] text-[15px] px-5 text-[#606060]"
// 				>
// 					{selectedSubCategory || '카테고리'}
// 					<FaAngleDown />
// 				</button>
// 			)}
// 			{location.pathname === '/user/community/member' && isMenuOpen && (
// 				<div className="absolute bg-white border border-[#C5D2F7] rounded-[10px] mt-3 w-[202px] z-50">
// 					<ul>
// 						{categoryOptions.TEAM.map((subCategory) => (
// 							<li key={subCategory} className="relative">
// 								<button
// 									className="w-full text-left px-4 py-2 h-[50px] hover:bg-navy-commuDropboxHover flex justify-between items-center"
// 									onClick={() => handleSubCategorySelect(subCategory)}
// 								>
// 									{subCategory}
// 								</button>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default CustomDropdown;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

const categoryOptions = {
	FREE: '자유',
	TEAM: ['프로젝트', '공모전', '스터디'],
	PORTFOLIO: '포트폴리오',
};

const subCategoryValues = {
	프로젝트: 'PROJECT',
	공모전: 'CONTEST',
	스터디: 'STUDY',
};

const displaySubCategoryNames = {
	PROJECT: '프로젝트',
	CONTEST: '공모전',
	STUDY: '스터디',
};

const CustomDropdown = ({ category, onCategoryChange }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');

	const location = useLocation();

	useEffect(() => {
		if (category) {
			if (category === 'TEAM') {
				setSelectedCategory('TEAM');
				setSelectedSubCategory('');
			} else if (category === 'ALL') {
				setSelectedCategory('');
				setSelectedSubCategory('');
			} else {
				setSelectedCategory(category);
				setSelectedSubCategory('');
			}
		}
	}, [category]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		if (category !== 'TEAM') {
			setIsSubMenuOpen(false);
			setSelectedSubCategory('');
			setIsMenuOpen(false);
			onCategoryChange(category);
		}
	};

	const handleSubCategorySelect = (subCategory) => {
		const mappedValue = subCategoryValues[subCategory] || subCategory;
		setSelectedSubCategory(subCategory);
		setIsMenuOpen(false);
		setIsSubMenuOpen(false);
		onCategoryChange(mappedValue);
	};

	useEffect(() => {
		console.log('selectedCategory:', selectedCategory);
		console.log('selectedSubCategory:', selectedSubCategory);
	}, [selectedCategory, selectedSubCategory]);

	return (
		<div className="relative inline-block">
			{location.pathname === '/user/community/total' && (
				<button
					onClick={toggleMenu}
					className="flex h-[42px] w-[202px] items-center justify-between bg-navy-mypageToggle rounded-[10px] text-[15px] px-5 text-[#606060]"
				>
					{selectedCategory === ''
						? '카테고리'
						: selectedCategory === 'TEAM'
							? selectedSubCategory
							: categoryOptions[selectedCategory]}
					<FaAngleDown />
				</button>
			)}
			{location.pathname === '/user/community/total' && isMenuOpen && (
				<div className="absolute bg-white border border-[#C5D2F7] rounded-[10px] mt-3 w-[202px] z-50">
					<ul>
						{Object.keys(categoryOptions).map((category) => (
							<li
								key={category}
								className="relative"
								onMouseEnter={() => category === 'TEAM' && setIsSubMenuOpen(true)}
								onMouseLeave={() => category === 'TEAM' && setIsSubMenuOpen(false)}
							>
								<button
									className={`w-full text-left px-4 py-2 h-[50px] hover:bg-navy-commuDropboxHover flex justify-between items-center ${
										(isSubMenuOpen || selectedCategory === 'TEAM') && category === 'TEAM'
											? 'bg-navy-commuDropboxHover'
											: 'hover:bg-navy-commuDropboxHover'
									}`}
									onClick={() => handleCategorySelect(category)}
								>
									{category === 'TEAM' ? '팀원모집' : categoryOptions[category]}
									{category === 'TEAM' && <FaAngleRight className="fill-[#818181]" />}
								</button>
								{isSubMenuOpen && category === 'TEAM' && (
									<div className="absolute left-full top-[-50px] w-[202px] rounded-[10px] bg-white border border-[#C5D2F7]">
										<ul>
											{categoryOptions.TEAM.map((subCategory) => (
												<li key={subCategory}>
													<button
														className="w-full h-[50px] text-left px-4 py-2 hover:bg-gray-200"
														onClick={() => handleSubCategorySelect(subCategory)}
													>
														{subCategory}
													</button>
												</li>
											))}
										</ul>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
			{location.pathname === '/user/community/member' && (
				<button
					onClick={toggleMenu}
					className="flex h-[42px] w-[202px] items-center justify-between bg-navy-mypageToggle rounded-[10px] text-[15px] px-5 text-[#606060]"
				>
					{selectedSubCategory || '카테고리'}
					<FaAngleDown />
				</button>
			)}
			{location.pathname === '/user/community/member' && isMenuOpen && (
				<div className="absolute bg-white border border-[#C5D2F7] rounded-[10px] mt-3 w-[202px] z-50">
					<ul>
						{categoryOptions.TEAM.map((subCategory) => (
							<li key={subCategory} className="relative">
								<button
									className="w-full text-left px-4 py-2 h-[50px] hover:bg-navy-commuDropboxHover flex justify-between items-center"
									onClick={() => handleSubCategorySelect(subCategory)}
								>
									{subCategory}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;

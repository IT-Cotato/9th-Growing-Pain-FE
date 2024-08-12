import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

const categoryOptions = {
	free: '자유',
	member: ['프로젝트', '공모전', '스터디'],
	portfolio: '포트폴리오',
};

const CustomDropdown = ({ category }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');

	const location = useLocation();

	useEffect(() => {
		if (category) {
			if (category === 'member') {
				setSelectedCategory('member');
				setSelectedSubCategory('');
			} else {
				setSelectedCategory(category);
				setSelectedSubCategory('');
			}
		} else {
			setSelectedCategory('');
			setSelectedSubCategory('');
		}
	}, [category]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		if (category !== 'member') {
			setIsSubMenuOpen(false);
			setSelectedSubCategory('');
			setIsMenuOpen(false);
		}
	};

	const handleSubCategorySelect = (subCategory) => {
		setSelectedSubCategory(`팀원모집 - ${subCategory}`);
		setIsMenuOpen(false);
		setIsSubMenuOpen(false);
	};

	return (
		<div className="relative inline-block">
			{location.pathname === '/user/community/total' && (
				<button
					onClick={toggleMenu}
					className="flex h-[42px] w-[202px] items-center justify-between bg-navy-mypageToggle rounded-[10px] text-[15px] px-5 text-[#606060]"
				>
					{selectedSubCategory
						? selectedSubCategory
						: selectedCategory
							? selectedCategory === 'member'
								? '팀원모집'
								: categoryOptions[selectedCategory]
							: '카테고리'}
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
								onMouseEnter={() => category === 'member' && setIsSubMenuOpen(true)}
								onMouseLeave={() => category === 'member' && setIsSubMenuOpen(false)}
							>
								<button
									className={`w-full text-left px-4 py-2 h-[50px] hover:bg-navy-commuDropboxHover flex justify-between items-center ${
										(isSubMenuOpen || selectedCategory === 'member') && category === 'member'
											? 'bg-navy-commuDropboxHover'
											: 'hover:bg-navy-commuDropboxHover'
									}`}
									onClick={() => handleCategorySelect(category)}
								>
									{category === 'member' ? '팀원모집' : categoryOptions[category]}
									{category === 'member' && <FaAngleRight className="fill-[#818181]" />}
								</button>
								{isSubMenuOpen && category === 'member' && (
									<div className="absolute left-full top-[-50px] w-[202px] rounded-[10px] bg-white border border-[#C5D2F7]">
										<ul>
											{categoryOptions.member.map((subCategory) => (
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
					{selectedSubCategory ||
						(selectedCategory === 'member' ? '카테고리' : categoryOptions[selectedCategory]) ||
						'카테고리'}
					<FaAngleDown />
				</button>
			)}
			{location.pathname === '/user/community/member' && isMenuOpen && (
				<div className="absolute bg-white border border-[#C5D2F7] rounded-[10px] mt-3 w-[202px] z-50">
					<ul>
						{categoryOptions.member.map((subCategory) => (
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

// import React from 'react';

// const InputField = ({ placeholderText, className, icon: Icon, onChange, type, onKeyDown }) => {
// 	return (
// 		<div className={`relative ${className}`}>
// 			{Icon && <Icon className="absolute left-[30px] top-1/2 transform -translate-y-1/2" size={24} color="#888888" />}
// 			<input
// 				type={type}
// 				placeholder={placeholderText}
// 				className="border border-[#26408B] rounded-[10px] w-[336px] h-14 pl-[65px] placeholder:text-[17px]"
// 				onChange={onChange}
// 				onKeyDown={onKeyDown}
// 			/>
// 		</div>
// 	);
// };

// export default InputField;

import React from 'react';

const InputField = ({ placeholderText, className, icon: Icon, onChange, type, onKeyDown, place }) => {
	let inputStyle = 'border border-[#26408B] rounded-[10px] w-[336px] h-14 pl-[65px] placeholder:text-[17px]';

	switch (place) {
		case 'signup':
			inputStyle = 'border border-[#26408B] rounded-[10px] w-[548px] h-[56px] pl-[20px] placeholder:text-[17px]';
			break;
		case 'login':
			inputStyle = 'border border-[#26408B] rounded-[10px] w-[336px] h-14 pl-[65px] placeholder:text-[17px]';
			break;
		default:
			break;
	}

	return (
		<div className={`relative ${className}`}>
			{Icon && <Icon className="absolute left-[30px] top-1/2 transform -translate-y-1/2" size={24} color="#888888" />}
			<input
				type={type}
				placeholder={placeholderText}
				className={inputStyle}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
};

export default InputField;

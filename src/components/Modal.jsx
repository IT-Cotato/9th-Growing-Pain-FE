const Modal = ({ children }) => {
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center z-50">{children}</div>
	);
};

export default Modal;

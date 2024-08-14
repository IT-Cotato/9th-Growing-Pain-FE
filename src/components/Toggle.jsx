// DropdownToggle.js
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Toggle = ({ menuItems, bg, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder || menuItems[0]);
  const inSection = useRef();

  const clickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    if (onChange) {
      onChange(item); // 부모 컴포넌트로 선택된 값 전달
    }
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (isOpen && !inSection.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen]);

  // 동기화: placeholder가 변경될 때 selectedItem을 업데이트
  useEffect(() => {
    setSelectedItem(placeholder);
  }, [placeholder]);

  // 아이콘 스타일
  const iconClass = 'size-6 stroke-1';
  const menuItemClass = 'cursor-pointer p-4 rounded-[10px] hover:bg-gray-lightSide flex items-center text-center justify-center gap-2';

  return (
    <div ref={inSection} className="relative max-w-[202px] w-[100%] h-[42px] z-10">
      <div onClick={clickToggle} className={`flex justify-between items-center ${bg} rounded-[10px] cursor-pointer px-[20px] py-[10px]`}>
        <div>{selectedItem}</div>
        <ChevronDownIcon className={iconClass} />
      </div>
      {isOpen && (
        <div className="submenu absolute top-[54px] right-0 max-w-[202px] w-[100%] bg-white border rounded-[10px] shadow-lg">
          {menuItems.map((item, index) => (
            <div key={index} className={menuItemClass} onClick={() => handleItemClick(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toggle;

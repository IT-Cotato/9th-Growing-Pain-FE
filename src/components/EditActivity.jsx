import { useState, useEffect } from "react";
import Button from "./Button";
import MemoField from "./MemoField";

const EditActivity = ({ editData, onSubmit }) => {
  const [inputData, setInputData] = useState(
    {
      activity_name: '',
      activity_period: '',
      role: '',
      activity_type: '',
      contribution: 0,
      activity_url: '',
      result: '',
      content: '',
    }
  )

  useEffect(() => {
    if (editData) {
      setInputData(editData);
    }
  }, [editData]);

  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
  };

  const handleSave = () => {
    onSubmit(inputData);
  };

  return (
    <div className="edit-activity-container mx-[70px] my-[40px] rounded-[10px] bg-navy-lightSide h-full">
      <div className="px-[50px] pt-[40px] pb-[30px] h-full flex flex-col gap-y-[3%] content-between">
        <div className="activity-info h-[50%] flex-col">
          <p className="font-medium text-[17px] text-left mb-[1%]">기본정보</p>
          <div className="bg-white h-[85%] rounded-[10px] p-[30px] flex text-left">
            <div className="left-container h-[100%] border-r flex-1">
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center mb-[2%]">
                <p className="w-[15%]">활동명</p>
                <MemoField 
                  type={'activityInfo'}
                  placeholderText={'활동명을 입력하세요'}
                  value={inputData.activity_name}
                  onChange={(value) => handleChange('activity_name', value)}
                />
              </div>
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center mb-[2%]">
                <p className="w-[15%]">역할</p>
                <MemoField
                  type={'activityInfo'}
                  placeholderText={'역할을 입력하세요'}
                  value={inputData.role}
                  onChange={(value) => handleChange('role', value)}
                />
              </div>
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center">
                <p className="w-[15%]">기여도</p>
                <MemoField
                  type={'activityInfo'}
                  placeholderText={'기여도를 입력하세요'}
                  value={inputData.contribution}
                  onChange={(value) => handleChange('contribution', value)}
                />
              </div>
            </div>
            <div className="right-container h-[100%] flex-1 pl-[30px] flex-col">
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center mb-[2%]">
                <p className="w-[15%]">활동기간</p>
                <MemoField
                  type={'activityInfo'}
                  placeholderText={'활동기간을 입력하세요'}
                  value={inputData.activity_period}
                  onChange={(value) => handleChange('activity_period', value)}
                />
              </div>
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center mb-[2%]">
                <p className="w-[15%]">활동유형</p>
                <MemoField
                  type={'activityInfo'}
                  placeholderText={'활동유형을 입력하세요'}
                  value={inputData.activity_type}
                  onChange={(value) => handleChange('activity_type', value)}
                />
              </div>
              <div className="w-[100%] h-[30%] flex gap-[4%] items-center">
                <p className="w-[15%]">URL</p>
                <MemoField
                  type={'activityInfo'}
                  placeholderText={'URL을 입력하세요'}
                  value={inputData.activity_url}
                  onChange={(value) => handleChange('activity_url', value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="activity-result h-[25%] flex-col">
          <p className="font-medium text-[17px] text-left mb-[1%]">성과</p>
          <div className="bg-white h-[70%] rounded-[10px]">
            <MemoField
              type={'activityContent'}
              placeholderText={'성과를 입력하세요'}
              value={inputData.result}
              onChange={(value) => handleChange('result', value)}
            />
          </div>
        </div>
        <div className="activity-content h-[25%] flex-col">
          <p className="font-medium text-[17px] text-left mb-[1%]">활동 내용</p>
          <div className="bg-white h-[70%] rounded-[10px]">
            <MemoField 
              type={'activityContent'}
              placeholderText={'활동 내용을 입력하세요'}
              value={inputData.content}
              onChange={(value) => handleChange('content', value)}
            />
          </div>
        </div>
        <div className="save-button flex justify-end">
          <Button type={'communitySave'} text={'저장하기'} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
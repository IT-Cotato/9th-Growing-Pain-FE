import { useParams } from "react-router-dom";
import EditActivity from "../components/EditActivity";

const NewActivity = () => {
  // 새로운 활동 데이터를 생성
	const handleCreate = (newData) => {
    console.log("생성된 데이터:", newData);
  };

  return (
    <div className="h-[90%]">
      <EditActivity onSubmit={handleCreate} />
    </div>
  );
}

export default NewActivity;
import { useParams } from "react-router-dom";
import EditActivity from "../components/EditActivity";

const NewActivity = () => {
  return (
    <div className="h-[90%]">
      <EditActivity />
    </div>
  );
}

export default NewActivity;
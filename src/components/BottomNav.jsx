import { FaFile, FaTachometerAlt } from "react-icons/fa";
import { BsFiles } from "react-icons/bs";

export const BottomNav = () => {
  return (
    <div className="btm-nav">
      <button className="active">
        <FaTachometerAlt className="h-5 w-5" />
      </button>
      <button>
        <FaFile className="h-5 w-5" />
      </button>
      <button>
        <BsFiles className="h-5 w-5" />
      </button>
    </div>
  );
};

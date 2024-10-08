import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-violet-600 text-3xl"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;

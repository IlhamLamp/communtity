import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomepageWorkCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-300 w-full rounded-3xl shadow-md hover:border hover:border-slate-500">
      <div
        className={`relative flex flex-col h-[250px] m-1 p-2 rounded-3xl ${data?.bg_color}`}
      >
        <div className="flex w-full justify-between p-1">
          <span className="bg-white text-slate-800 rounded-full p-2 text-xs">
            {data?.date}
          </span>
          <div className="p-4 rounded-full bg-white text-gray-400 w-6 h-6 flex items-center justify-center hover:text-gray-700 cursor-pointer">
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 lg:mt-2 p-1">
          <div className="basis-2/3">
            <h5 className="text-sm text-slate-700 tracking-tight">
              {data?.company || data?.username}
            </h5>
            <h3 className="text-lg text-slate tracking-tight line-clamp-2 lg:line-clamp-3">
              {data?.position}
            </h3>
          </div>
          <div className="basis-1/3 flex mx-auto justify-end">
            <img
              src="/assets/avatar.png"
              className="rounded-full"
              width="50px"
              height="10px"
              alt="test"
            />
          </div>
        </div>

        {/* Tags section */}
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 max-w-full overflow-hidden">
          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs">
            {data?.experience}
          </span>
          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs">
            {data?.duration}
          </span>
          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs">
            {data?.participation}
          </span>
        </div>
      </div>

      <div className="flex w-full justify-between items-center py-2 px-4 my-2">
        <div className="text-gray-700">
          <p className="text-xl font-semibold">{data?.types}</p>
          <p className="text-sm text-gray-500">{data?.location}</p>
        </div>
        <button className="bg-slate-800 hover:bg-Navy text-white px-4 py-2 rounded-full text-sm tracking-tight transition duration-100 ease-linear cursor-pointer">
          Details
        </button>
      </div>
    </div>
  );
};

export default HomepageWorkCard;

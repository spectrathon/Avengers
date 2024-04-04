import { useNavigate } from "react-router-dom";

export default function YogaCard({ id, title, img, instructions }) {
  const navigate = useNavigate();
  const sentences = instructions.split(".");
  return (
    <div className="grid grid-cols-2 gap-2 mb-10 w-3/4 border border-gray-500 border-opacity-10 shadow-lg rounded-lg overflow-hidden card transform transition-all duration-500 ease-in-out hover:scale-105">
      <div className="w-96 flex justify-center items-center pt-8 pb-8">
        <div className="border-r-4 border-gray-500 py-4 mr-1 border-opacity-20">
          <img
            className="cursor-pointer"
            src={img}
            alt={title}
            onClick={() => {
              navigate(`/Yoga/${id}`);
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col overflow-auto pl-0 pr-20 justify-center items-center ">
        <h3 className="uppercase sans-serif font-bold text-2xl mt-8 mb-4 text-center tracking-tight">{title}</h3>
        <p className="text-gray-800 text-center text-lg sans-serif font-thin tracking-tight">{instructions}</p>
      </div>
    </div>
  );
}  
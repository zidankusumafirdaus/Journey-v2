import { useNavigate } from "react-router-dom";
import Slidebar from "../../components/layout/Slidebar";
import SNoteDetail from "../../components/snot/SNoteDetail";

const SNoteDetailPage = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-12 sm:py-16 
                 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 
                       rounded-full border border-gray-500/30 bg-gray-600/20 backdrop-blur-md text-gray-200 shadow-md 
                       hover:bg-gray-500/30 hover:text-white hover:border-gray-400 
                       transition-colors text-sm sm:text-base"
          >
            <span className="font-bold text-lg pb-1">←</span>
          </button>

          <SNoteDetail />
        </div>
      </div>
    </section>
  );
};

export default SNoteDetailPage;
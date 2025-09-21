import Slidebar from "../../components/layout/Slidebar";
import SNoteHeader from "../../components/snot/SNoteHeader";
import SNoteItem from "../../components/snot/SNoteItem";

const SNotePage = () => {
  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-12 sm:py-16 
                 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
    >
      <Slidebar />

      {/* Header */}
      <SNoteHeader />

      {/* List Notes */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <SNoteItem />
      </div>
    </section>
  );
};

export default SNotePage;
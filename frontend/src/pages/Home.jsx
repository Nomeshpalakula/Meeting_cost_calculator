import Calculator from '../components/Calculator';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Meeting Cost Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Know exactly how much your meetings cost your company in real-time. 
          Make better decisions about scheduling meetings.
        </p>
      </div>

      {/* Calculator Component */}
      <Calculator />
    </div>
  );
};

export default Home;
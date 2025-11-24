export default function FindRunMockupPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Find Run Page (Mockup)</h1>

      {/* Explanation Section */}
      <div className="mb-10">
        <p className="text-lg text-gray-700">
          Browse available runs submitted by other users. Each run includes a location,
          distance, pace, and estimated difficulty. This is a mockup layout and
          will later display real run data from the database.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">Filter Runs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-800 font-medium mb-1">Difficulty Level</label>
            <select className="border border-gray-400 rounded-md px-3 py-2 w-full bg-white">
              <option>Any</option>
              <option>Easy</option>
              <option>Moderate</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Minimum Distance</label>
            <select className="border border-gray-400 rounded-md px-3 py-2 w-full bg-white">
              <option>Any</option>
              <option>1 mile</option>
              <option>3 miles</option>
              <option>5 miles</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Preferred Pace</label>
            <select className="border border-gray-400 rounded-md px-3 py-2 w-full bg-white">
              <option>Any</option>
              <option>Slow</option>
              <option>Moderate</option>
              <option>Fast</option>
            </select>
          </div>
        </div>
      </div>

      {/* Run Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-3">[ Run Location ]</h3>
            <p className="text-gray-700">
              Distance:
              <span className="font-medium">[ X miles ]</span>
            </p>
            <p className="text-gray-700">
              Pace:
              <span className="font-medium">[ XX:XX ]</span>
            </p>
            <p className="text-gray-700">
              Difficulty:
              <span className="font-medium">[ Level ]</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

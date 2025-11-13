import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Optimize Your Media Files
            <span className="block text-blue-600 mt-2">
              Without Compromising Quality
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Free, secure, and powerful media optimization tool. Compress images
            and videos by up to 90% while maintaining exceptional quality - all
            processed directly in your browser for complete privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#optimizer"
              className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              Start Optimizing
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
            <div className="text-gray-600">Size Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Private & Secure</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">0s</div>
            <div className="text-gray-600">Upload Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

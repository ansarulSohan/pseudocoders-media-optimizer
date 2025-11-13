import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About This Tool
          </h2>
          <p className="text-lg text-gray-600">
            Built by developers, for everyone
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why We Built This
            </h3>
            <p className="text-gray-600 mb-4">
              At PseudoCoders, we believe powerful tools should be accessible to
              everyone. We created this media optimizer to solve a common
              problem: reducing file sizes without sacrificing quality, all
              while keeping your data private and secure.
            </p>
            <p className="text-gray-600">
              Unlike other tools that upload your files to servers, our
              optimizer processes everything directly in your browser using
              advanced WebAssembly and Canvas APIs. This means your files never
              leave your device, ensuring complete privacy and lightning-fast
              processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                🎯 Our Mission
              </h4>
              <p className="text-gray-600">
                To provide free, open-source tools that empower creators,
                developers, and businesses to optimize their digital content
                without compromising on quality or privacy.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                💡 Technology
              </h4>
              <p className="text-gray-600">
                Built with Next.js, React, and WebAssembly for maximum
                performance. We use industry-standard compression algorithms
                optimized for the web.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Want to learn more about PseudoCoders and our other projects?
            </p>
            <a
              href="https://pseudocoders.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Visit PseudoCoders
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


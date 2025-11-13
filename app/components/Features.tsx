import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      icon: "🔒",
      title: "100% Private",
      description:
        "All processing happens in your browser, files never leave your device",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Instant optimization with no server uploads or waiting times",
    },
    {
      icon: "🎯",
      title: "Smart Compression",
      description:
        "Advanced algorithms maintain quality while reducing file size",
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Works seamlessly on desktop, tablet, and mobile devices",
    },
    {
      icon: "🆓",
      title: "Completely Free",
      description: "No subscriptions, no limits, unlimited optimizations",
    },
    {
      icon: "🎨",
      title: "Multiple Formats",
      description: "Support for JPG, PNG, WebP, GIF, MP4, and more",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Tool?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for professional media optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


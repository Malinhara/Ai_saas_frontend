import { FaCamera, FaChevronRight, FaHeadphones, FaPaintBrush, FaUser } from 'react-icons/fa'; // Icons from react-icons

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 rounded-lg p-6 bg-white">
    <div className="flex items-center justify-between">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <FaChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
    </div>
    <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

const ServicesPage = () => {
  const services = [
    {
      icon: FaCamera, // Camera icon for image generation
      title: "Image Generation",
      description: "Transform your ideas into stunning visuals with our advanced AI image generation technology."
    },
    {
      icon: FaHeadphones, // Headphones icon for audio analysis
      title: "Audio Generation",
      description: "Extract detailed insights from your audio"
    },
    {
      icon: FaPaintBrush, // PaintBrush icon for image editing
      title: "Image Editing",
      description: "Apply artistic styles to your photos and create unique visual transformations."
    },
    {
      icon: FaUser, // User icon for high-quality avatar generation
      title: "High-Quality Avatar",
      description: "Generate detailed avatars from your photos for a personalized digital presence."
    }
  ];

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8" style={{
      background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
    }}>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8" style={{
    background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
  }}>
        <div className="max-w-7xl mx-auto px-4 py-28 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              AI-Powered Image Services
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Unleash the power of artificial intelligence to transform, analyze, and enhance your visual content.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Transform your visual content with our AI-powered services today.
            </p>
            <div className="mt-8">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

import {
  ShoppingCart,
  Truck,
  BarChart,
  Store,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Easy Shopping",
    description:
      "Browse and buy products from trusted vendors with a seamless experience.",
    icon: ShoppingCart,
    for: "Users",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with reliable shipping options.",
    icon: Truck,
    for: "Users",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our support team is available round-the-clock to assist you.",
    icon: Headphones,
    for: "Users",
  },
  {
    id: 4,
    title: "Product Listing",
    description:
      "Easily list and manage your products to reach a wide audience.",
    icon: Store,
    for: "Vendors",
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description:
      "Track sales, orders, and customer insights with powerful analytics.",
    icon: BarChart,
    for: "Vendors",
  },
  {
    id: 6,
    title: "Secure Payments",
    description: "Ensure safe transactions with our secure payment system.",
    icon: ShieldCheck,
    for: "Vendors",
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="relative flex flex-col items-center md:items-start bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500 p-4">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-gray-600 flex-grow text-center md:text-start">
        {service.description}
      </p>
      <span className="text-xs text-blue-600 font-medium mt-2">
        For {service.for}
      </span>
    </div>
  );
};

const Service = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        &larr; Home
      </button>
      <div className="flex w-full flex-col justify-between items-start mb-6">
        <div className="w-full text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center w-full font-bold text-gray-900 mb-2">
            Our Services
          </h2>
          <p className="text-gray-600 text-base ny-2">
            Discover the benefits we offer to both users and vendors on KBMart.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Service;

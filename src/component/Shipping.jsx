import React from "react";
import { Truck, ShieldCheck, Headphones, Undo2 } from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "Enjoy free delivery on all orders over $50.",
    icon: Truck,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Secure Payment",
    description: "All transactions are encrypted and secure.",
    icon: ShieldCheck,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "24/7 Support",
    description: "We're here to help, anytime you need us.",
    icon: Headphones,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Easy Return",
    description: "Hassle-free returns within 30 days.",
    icon: Undo2,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const Shipping = () => {
  return (
    <section className="py-10 px-4 md:px-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2  lg:grid-cols-4 gap-6">
        {features.map(
          ({ title, description, icon: Icon, bgColor, iconColor }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <div className={`p-3 rounded-full ${bgColor}`}>
                {Icon ? (
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                ) : (
                  <div>?</div>
                )}
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Shipping;

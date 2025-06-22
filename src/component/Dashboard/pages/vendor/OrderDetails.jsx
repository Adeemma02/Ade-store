import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const OrderDetails = () => {
  const { orderId } = useParams();
  const order = {
    id: orderId,
    customer: "John Doe",
    date: "2025-06-05",
    total: 199.99,
    status: "Pending",
    items: [{ id: 1, name: "Laptop", quantity: 1, price: 199.99 }],
    shippingAddress: "123 Main St, Lagos, Nigeria",
  };

  return (
    <div>
      <Helmet>
        <title>Order Details - Vendor Dashboard</title>
        <meta
          name="description"
          content={`Details for order #${orderId} in your vendor dashboard.`}
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">
        Order #{order.id}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <p className="text-gray-600">Customer: {order.customer}</p>
          <p className="text-gray-600">Date: {order.date}</p>
          <p className="text-gray-600">Total: ₦{order.total}</p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Items</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">Item</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">₦{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p className="text-gray-600">{order.shippingAddress}</p>
        </div>
        <Link
          to="/vendor-dashboard/orders"
          className="bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;

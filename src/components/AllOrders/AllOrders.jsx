import React from 'react'

export default function AllOrders() {
  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">All Orders</h2>
        <div className="text-center text-gray-500 mb-6">
          <i className="fa-solid fa-box-open text-4xl mb-2 text-green-400"></i>
          <p>No orders to display yet.</p>
        </div>
        {/* You can map orders here in the future */}
        <div className="flex justify-center">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface Drug {
  id: number;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  orderId: string;
  transactionRef: number;
  transactionTime: string;
  amount: number;
  drugsPurchased: Drug[];
}

const Verify: React.FC = () => {
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow 6-digit input
    setTransactionRef(value);
  };

  const fetchOrder = async () => {
    if (transactionRef.length !== 6) {
      setError('Transaction Reference must be 6 digits.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/verify?transactionRef=${transactionRef}`);
      const data = await response.json();

      if (!response.ok || !data.success) throw new Error(data.message || 'Order not found.');

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOrder = async () => {
    if (!order) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/verify?transactionRef=${order.transactionRef}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Verification failed.');

      alert(`Order ${order.orderId} has been verified.`);
      setOrder(null);
      setTransactionRef('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = () => {
    setOrder(null);
    setTransactionRef('');
    setError(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Verify Order</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={transactionRef}
          onChange={handleChange}
          placeholder="Enter 6-digit Transaction Ref"
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          onClick={fetchOrder}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Order'}
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {order && (
        <div className="mt-6 bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold text-blue-900">Order Details</h2>
          <p className="text-gray-700"><strong>Order ID:</strong> {order.orderId}</p>
          <p className="text-gray-700"><strong>Transaction Ref:</strong> {order.transactionRef}</p>
          <p className="text-gray-700"><strong>Transaction Time:</strong> {new Date(order.transactionTime).toLocaleString()}</p>
          <p className="text-gray-700"><strong>Amount:</strong> ${order.amount.toFixed(2)}</p>

          <h3 className="text-lg font-semibold mt-4">Drugs Purchased:</h3>
          <ul className="mt-2">
            {order.drugsPurchased.map((drug) => (
              <li key={drug.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                <Image src={drug.image} alt={drug.name} className="w-16 h-16 rounded" />
                <div>
                  <p className="font-medium">{drug.name}</p>
                  <p className="text-gray-500">{drug.description}</p>
                  <p className="text-gray-700">Quantity: {drug.quantity} | Price: ₦{drug.price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              onClick={verifyOrder}
              disabled={loading}
            >
              Verify Order
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              onClick={cancelOrder}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;

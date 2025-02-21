'use client'
import React, { useEffect, useState } from 'react';
import { Drug, useCart } from './CartContext';

interface OrderDetail {
  orderId: string;
  transactionRef: number;
  transactionTime: string;
  amount: number;
  drugsPurchased: Drug[];
}

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ongoingOrders, setOngoingOrders] = useState<OrderDetail[]>([]);

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Fetch ongoing orders based on order IDs stored in localStorage
  const fetchOngoingOrders = async () => {
    const stored = localStorage.getItem('orderIds');
    const orderIds: string[] = stored ? JSON.parse(stored) : [];
    const validOrders: OrderDetail[] = [];
    const updatedOrderIds: string[] = [];

    for (const id of orderIds) {
      try {
        const res = await fetch(`/api/orders?orderId=${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            validOrders.push(data.order);
            updatedOrderIds.push(id);
          }
        } else if (res.status === 404) {
          // Order not found means it is resolved, so skip it.
          console.log(`Order ${id} not found, removing from local storage.`);
        }
      } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
      }
    }
    localStorage.setItem('orderIds', JSON.stringify(updatedOrderIds));
    setOngoingOrders(validOrders);
  };

  // Fetch ongoing orders when the component mounts
  useEffect(() => {
    fetchOngoingOrders();
  }, []);

  const handlePayClick = () => {
    setShowModal(true);
  };

  const handlePaymentConfirmation = async () => {
    // Generate a unique random 6-digit number
    const transactionRef = Math.floor(100000 + Math.random() * 900000);
    // Generate a unique order id using a timestamp
    const orderId = `ORD-${Date.now()}`;
    // Create the order data payload
    const orderData = {
      orderId,
      transactionRef,
      transactionTime: new Date().toISOString(),
      amount: total,
      drugsPurchased: cart,
    };

    // Retrieve existing orderIds from localStorage (as an array) and add the new one
    const stored = localStorage.getItem('orderIds');
    const orderIds: string[] = stored ? JSON.parse(stored) : [];
    orderIds.push(orderId);
    localStorage.setItem('orderIds', JSON.stringify(orderIds));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Payment confirmed. Thank you! Your Order ID is ${orderId}`);
        clearCart();
        setShowModal(false);
        // Update the ongoing orders list after adding a new order.
        fetchOngoingOrders();
      } else {
        alert('An error occurred processing your order.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred processing your order.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item: Drug, index: number) => (
              <div key={index} className="cart-item">
                <p>{item.name}</p>
                <p>Price: ₦{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="total">
            <p>Total: ₦{total.toFixed(2)}</p>
          </div>
          <div className="buttons">
            <button className="pay-button" onClick={handlePayClick}>
              Pay
            </button>
            <button className="clear-button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Payment Details</h2>
            <p>
              Account Number: <strong>1234567890</strong>
            </p>
            <p>
              Bank: <strong>LuthBank</strong>
            </p>
            <p>
              Amount: <strong>₦{total.toFixed(2)}</strong>
            </p>
            <button className="confirm-button" onClick={handlePaymentConfirmation}>
              I have paid
            </button>
          </div>
        </div>
      )}

      {/* Ongoing Orders Section */}
      <div className="ongoing-orders">
        <h2>Ongoing Orders</h2>
        {ongoingOrders.length === 0 ? (
          <p>No ongoing orders.</p>
        ) : (
          ongoingOrders.map((order) => (
            <div key={order.orderId} className="order-item">
              <p>
                Order ID: <strong>{order.orderId}</strong>
              </p>
              <p>
                Transaction Ref: <strong>{order.transactionRef}</strong>
              </p>
              <p>
                Items:{" "}
                <strong>
                  {order.drugsPurchased
                    .slice(0, 3)
                    .map((d: Drug) => d.name)
                    .join(", ")}
                  {order.drugsPurchased.length > 3 ? ", ..." : ""}
                </strong>
              </p>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .checkout-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1,
        h2 {
          text-align: center;
        }
        .cart-items {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;
        }
        .cart-item:last-child {
          border-bottom: none;
        }
        .total {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .pay-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }
        .pay-button:hover {
          background-color: #005bb5;
        }
        .clear-button {
          padding: 10px 20px;
          background-color: #dc3545;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }
        .clear-button:hover {
          background-color: #c82333;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }
        .modal h2 {
          margin-top: 0;
        }
        .confirm-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }
        .confirm-button:hover {
          background-color: #218838;
        }
        .ongoing-orders {
          margin-top: 40px;
          border-top: 2px solid #ddd;
          padding-top: 20px;
        }
        .order-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;

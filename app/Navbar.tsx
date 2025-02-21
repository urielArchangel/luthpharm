'use client'
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';

const NavBar: React.FC = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <Link href="/"><h1>LuthPharm</h1></Link>
      
      </div>
      <div className="navbar-center">
        <Link href="/store">Store</Link>
      </div>
      <div className="navbar-right">
        <Link href="/checkout">Cart ({cart.length})</Link>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #4CBEF1;
          color: #fff;
        }
        .navbar-left h1 {
          margin: 0;
          font-size: 24px;
        }
        .navbar-center a,
        .navbar-right a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          margin: 0 10px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;

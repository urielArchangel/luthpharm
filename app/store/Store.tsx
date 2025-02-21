'use client'
import React, { useState, ChangeEvent } from 'react';
import drugs from '@/app/store/drugs.json';
import { useCart, Drug } from '../CartContext';
import Image from 'next/image';

const Store: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { addToCart } = useCart();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDrugs = drugs.filter((drug: Drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="store-container">
      <h1 className='text-[15px] sm:text-[20px] font-semibold'>
        LuthPharm&apos;s Pharmaceutical Drug Store
      </h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a drug..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="drug-list">
        {filteredDrugs.map((drug: Drug) => (
          <div key={drug.id} className="drug-item">
            <Image width={480} height={480} src={drug.image} alt={drug.name} />
            <h2>{drug.name}</h2>
            <p>{drug.description}</p>
            <p className="price">Price: ₦{drug.price.toFixed(2)}</p>
            <button onClick={() => addToCart(drug)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .store-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .search-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .search-container input {
          width: 100%;
          max-width: 400px;
          padding: 10px 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
        .drug-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
          gap: 20px;
          justify-content: center;
        }
        .drug-item {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .drug-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .drug-item img {
          width: 100%;
          height: auto;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .drug-item h2 {
          font-size: 20px;
          margin: 10px 0;
        }
        .drug-item p {
          margin: 8px 0;
          font-size: 14px;
        }
        .drug-item .price {
          font-weight: bold;
          color: #0070f3;
        }
        .drug-item button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        .drug-item button:hover {
          background-color: #005bb5;
        }
        @media (max-width: 600px) {
          .drug-item h2 {
            font-size: 18px;
          }
          .drug-item p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default Store;

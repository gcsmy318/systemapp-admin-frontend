// pages/products/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import withAuth from '@/pages/utils/withAuth.js';

 function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://systemappbackend-production.up.railway.app/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>กำลังโหลด...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">หมวดหมู่: {product.code}</p>
      <p className="text-gray-600 mb-2">ราคา: {product.price} บาท</p>
      <p className="text-gray-700">{product.info}</p>
    </div>
  );
}
export default withAuth(ProductDetail);
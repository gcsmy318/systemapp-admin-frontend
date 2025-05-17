import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';

function ProductAdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://systemappbackend-production.up.railway.app/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      const res = await fetch(`https://systemappbackend-production.up.railway.app/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  return (
        <Layout>
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">จัดการสินค้า</h1>
              <Link href="/"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
                 </Link>
             <Link href="/admin/products/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          เพิ่มสินค้าใหม่
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">ID</th>
               <th className="px-4 py-2 border">ข้อมูล</th>
              <th className="px-4 py-2 border">ชื่อสินค้า</th>
              <th className="px-4 py-2 border">หมวดหมู่</th>
              <th className="px-4 py-2 border">รายละเอียดสินค้า</th>
              <th className="px-4 py-2 border">ราคา</th>
              <th className="px-4 py-2 border">รูปภาพ</th>
              <th className="px-4 py-2 border">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="text-center">


                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.description}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.code}</td>
                <td className="px-4 py-2 border">{product.info.length > 100
                                        ? product.info.substring(0, 100) + '...'
                                          : product.info} </td>
                <td className="px-4 py-2 border">{product.price} บาท</td>
                <td className="px-4 py-2 border">
                  <img src={product.image} alt={product.name}           width={200} height={300} className="h-12 mx-auto" />
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:underline">
                    แก้ไข
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">ไม่มีสินค้าในระบบ</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </Layout>
  );
}

export default withAuth(ProductAdminPage);
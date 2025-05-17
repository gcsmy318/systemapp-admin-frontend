import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import withAuth from '@/pages/utils/withAuth.js';

function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || id === 'new') return;
    fetch(`${process.env.API_BASE_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => alert('ไม่พบข้อมูลสินค้า'));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = id === 'new' ? 'POST' : 'PUT';
    const url = id === 'new'
      ? `${process.env.API_BASE_URL}/api/products`
      : `${process.env.API_BASE_URL}/api/products/${id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert('บันทึกสำเร็จ');
        router.push('/products');
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{id === 'new' ? 'เพิ่มสินค้าใหม่' : 'แก้ไขสินค้า'}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">ราคา (฿)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">รายละเอียด</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1">URL รูปภาพ</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>
    </Layout>
  );
}


export default withAuth(EditProduct);
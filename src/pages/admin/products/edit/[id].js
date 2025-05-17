// pages/admin/products/edit/[id].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';

 function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    info: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    if (id) {
      // ดึงข้อมูลสินค้าจาก API
      fetch(`${process.env.API_BASE_URL}/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setFormData({
            name: data.name,
            code: data.code,
            info: data.info,
            price: data.price,
            image: null,
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('code', formData.code);
    updatedData.append('info', formData.info);
    updatedData.append('price', formData.price);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    const res = await fetch(`${process.env.API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      body: updatedData,
    });

    if (res.ok) {
      alert('อัปเดตสินค้าสำเร็จ');
      router.push('/admin/products');
    } else {
      alert('เกิดข้อผิดพลาดในการอัปเดตสินค้า');
    }
  };

  if (!product) return <p>กำลังโหลด...</p>;

  return (
  <Layout>
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h1>
              <Link href="/admin/products"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
                      </Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">หมวดหมู่</label>
          <select
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            <option value="HEALTHY SNACKS">HEALTHY SNACKS</option>
            <option value="INSTANT PORRIDGE">INSTANT PORRIDGE</option>
            <option value="SOUP">SOUP</option>
            <option value="COOKING INGREDIENTS AND FOOD TOPPINGS">COOKING INGREDIENTS AND FOOD TOPPINGS</option>
            <option value="PROMOTION">PROMOTION</option>
            <option value="ขนมเสริมพัฒนาการสำหรับเด็ก">ขนมเสริมพัฒนาการสำหรับเด็ก</option>
            <option value="โจ๊กข้าวกล้องงอก">โจ๊กข้าวกล้องงอก</option>
            <option value="ซุปธัญพืช">ซุปธัญพืช</option>
            <option value="ส่วนผสมและเครื่องปรุงประกอบอาหาร">ส่วนผสมและเครื่องปรุงประกอบอาหาร</option>
            <option value="โปรโมชั่น">โปรโมชั่น</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">รายละเอียด</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ราคา</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">อัปโหลดรูปภาพใหม่ (ถ้าต้องการ)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
                 className="btn-submit"
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </form>
    </div>
      </Layout>
  );
}


export default withAuth(EditProduct);
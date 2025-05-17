import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';
const categories = [
  "HEALTHY SNACKS",
  "INSTANT PORRIDGE",
  "SOUP",
  "COOKING INGREDIENTS AND FOOD TOPPINGS",
  "PROMOTION",
  "ขนมเสริมพัฒนาการสำหรับเด็ก",
  "โจ๊กข้าวกล้องงอก",
  "ซุปธัญพืช",
  "ส่วนผสมและเครื่องปรุงประกอบอาหาร",
  "โปรโมชั่น",
];

 function CreateProduct() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('กรุณาเลือกรูปภาพ');

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('code', code);
    formData.append('info', info);
    formData.append('price', price);
    formData.append('image', image);

    const res = await fetch('https://systemappbackend-production.up.railway.app/api/products', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('เพิ่มสินค้าสำเร็จ');
      router.push('/admin/products');
    } else {
      alert('เกิดข้อผิดพลาด');
    }
  };

  return (
        <Layout>
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">เพิ่มสินค้า</h1>
             <Link href="/admin/products"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
                </Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">รหัสสินค้า (4 ตัว) *ขึ้นต้นด้วย P ต.ย. P001</label>
          <input
            type="text"
            maxLength={4}
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">หมวดหมู่</label>
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">รายละเอียดสินค้า</label>
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="w-full border px-3 py-2 rounded h-28"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ราคา (บาท)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">เลือกรูปภาพสินค้า</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}

            className="block w-full text-sm text-gray-500"
          />
          {preview && (
            <img src={preview} alt="preview"         width={500} className="mt-4 rounded w-48" />
          )}
        </div>

        <button
          type="submit"
                           className="btn-submit"
        >
          บันทึก
        </button>
      </form>
    </div>
      </Layout>
  );
}

export default withAuth(CreateProduct);
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';

function EditNews() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null); // ไฟล์ภาพใหม่
  const [imageUrl, setImageUrl] = useState('');     // URL ภาพเก่า (หรือหลังอัพโหลด)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.API_BASE_URL}/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image); // URL ภาพเดิม
        setLoading(false);
      })
      .catch(() => {
        alert('โหลดข้อมูลผิดพลาด');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    // ถ้ามีภาพใหม่ ให้แนบไป
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imageUrl) {
      // กรณีไม่แก้ไขภาพ แต่ต้องส่ง URL ภาพเดิมไป (ถ้า backend รองรับ)
      formData.append('imageUrl', imageUrl);
    }

    const res = await fetch(`${process.env.API_BASE_URL}/api/news/${id}`, {
      method: 'PUT',
      body: formData, // ใช้ formData ส่ง multipart/form-data
      // ห้ามตั้ง headers Content-Type เอง เพราะ browser จะตั้งให้ถูกต้องอัตโนมัติ
    });

    if (res.ok) {
      alert('แก้ไขข่าวเรียบร้อย');
      router.push('/news');
    } else {
      alert('เกิดข้อผิดพลาด');
    }
  };

  // แสดง preview ของไฟล์ภาพใหม่ หรือ ถ้าไม่มี แสดง URL ภาพเดิม
  const previewSrc = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

  if (loading) return <div className="text-center mt-20">กำลังโหลดข้อมูล...</div>;

  return (
   <Layout>

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">แก้ไขข่าว</h1>
         <Link href="/news"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
          </Link>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">หัวข้อข่าว</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">เนื้อหา</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={6}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">แก้ไขรูปภาพ</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {previewSrc && (
          <div className="mt-4">
            <p className="font-semibold mb-2">ตัวอย่างภาพ:</p>
            <img
              src={previewSrc}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded border"
              onLoad={() => {
                if (imageFile) URL.revokeObjectURL(previewSrc);
              }}
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button   type="submit"    className="btn-submit"  >
            บันทึกการแก้ไข
          </button>

        </div>
      </form>
    </div>
     </Layout>
  );
}


export default withAuth(EditNews);
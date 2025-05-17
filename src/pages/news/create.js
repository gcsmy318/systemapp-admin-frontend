
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';



 function CreateNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('กรุณาเลือกไฟล์รูปภาพก่อน');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageFile);

    const res = await fetch('https://systemappbackend-production.up.railway.app/api/news', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('เพิ่มข่าวเรียบร้อย');
      setTitle('');
      setContent('');
      setImageFile(null);
      setPreviewUrl(null);
    } else {
      alert('เกิดข้อผิดพลาด');
    }



  };


  return (
  <Layout>
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">เพิ่มข่าวใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
                <Link href="/news"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
                </Link>
        <div>
          <label className="block font-medium mb-1">หัวข้อข่าว</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="หัวข้อข่าว"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">เนื้อหา</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เนื้อหา"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

     <div>
       <label className="block font-medium mb-1">เลือกรูปภาพ</label>
       <input
         type="file"
         accept="image/*"
         onChange={(e) => {
           const file = e.target.files[0];
           setImageFile(file);
           if (file) {
             setPreviewUrl(URL.createObjectURL(file));
           } else {
             setPreviewUrl(null);
           }
         }}
         className="block w-full text-sm text-gray-500
           file:mr-4 file:py-2 file:px-4
           file:rounded file:border-0
           file:text-sm file:font-semibold
           file:bg-blue-50 file:text-blue-700
           hover:file:bg-blue-100"
       />
       {previewUrl && (
         <div className="mt-4">
           <p className="mb-2 text-sm text-gray-500">ตัวอย่างรูปภาพ:</p>
           <img
             src={previewUrl}
             alt="Preview"
                      width={500}
             className="w-full max-h-80 object-contain rounded border"
           />
         </div>
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

export default withAuth(CreateNews);
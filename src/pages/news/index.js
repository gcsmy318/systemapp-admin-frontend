import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import withAuth from '../utils/withAuth.js';

function AdminNewsPage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_BASE_URL}/api/news`)
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้?')) {
      const res = await fetch(`${process.env.API_BASE_URL}/api/news/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setNewsList(newsList.filter(news => news.id !== id));
      } else {
        alert('ลบไม่สำเร็จ ลองใหม่อีกครั้ง');
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">จัดการข่าวสาร</h1>
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-4">
          ย้อนกลับ
        </Link>&#10240;
        <Link href="/news/create" className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-4">
          เพิ่มข่าวใหม่
        </Link>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">รูปภาพ</th>
                <th className="border px-4 py-2">หัวข้อ</th>
                <th className="border px-4 py-2">เนื้อหา</th>
                <th className="border px-4 py-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news.id} className="text-center">
                  <td className="border px-2 py-2">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                           width={200} height={300}
                      className="w-32 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="border px-2 py-2">{news.title}</td>
                  <td className="border px-2 py-2 text-sm text-gray-600 text-left break-words whitespace-pre-wrap max-w-xs">
                    {news.content.length > 100
                      ? news.content.substring(0, 100) + '...'
                      : news.content}
                  </td>
                  <td className="border px-2 py-2 space-x-2">
                    <Link href={`/news/${news.id}`} className="text-green-600 hover:underline">ดู</Link>&#10240;
                    <Link href={`/news/edit/${news.id}`} className="text-blue-600 hover:underline">แก้ไข</Link>&#10240;
                    <button
                      onClick={() => handleDelete(news.id)}
                      className="text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {newsList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">ไม่มีข้อมูลข่าวสาร</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(AdminNewsPage);

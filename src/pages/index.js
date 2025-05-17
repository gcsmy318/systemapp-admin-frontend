import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';
import '@/style/globals.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 drop-shadow-sm">
        หน้าหลักระบบจัดการ
      </h1>

      <div className="flex gap-6">
        <Link
          href="/news"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          จัดการข่าวสาร
        </Link>
        <Link
          href="/admin/products"
          className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          จัดการสินค้า
        </Link>
      </div>
    </Layout>
  );
}

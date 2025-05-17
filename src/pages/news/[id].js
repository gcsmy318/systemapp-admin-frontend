import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import withAuth from '@/pages/utils/withAuth.js';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/news`);
  const newsList = await res.json();

  const paths = newsList.map(news => ({
    params: { id: news.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}


export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/news/${params.id}`);
 // const res = await fetch('http://localhost:8080/api/products')
  if (!res.ok) {
    return { notFound: true };
  }

  const news = await res.json();

  return {
    props: { news },
    revalidate: 60, // re-generate page every 60 seconds
  };
}

function NewsDetail({ news }) {
  return (
 <Layout>
    <div className="p-8 max-w-4xl mx-auto">
       <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center mb-6">    <Link href="/news"  className="px-6 py-2 border rounded hover:bg-gray-100 transition">ย้อนกลับ
              </Link>
              </div>
      {news.imageUrl ? (
        <img
          src={news.imageUrl}
          alt={news.title}
             width={400}
          className="w-full h-[400px] object-cover rounded mb-6"
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center mb-6">
          <span className="text-gray-500">ไม่มีรูปภาพ</span>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-lg leading-relaxed whitespace-pre-line">{news.content}</p>
    </div>
 </Layout>
  );
}


export default withAuth(NewsDetail);
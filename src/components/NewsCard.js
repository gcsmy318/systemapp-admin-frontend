import Link from 'next/link';

export default function NewsCard({ news }) {
  return (
    <Link href={`/news/${news.id}`} legacyBehavior>
      <a className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white border border-gray-200">
        <div className="overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {news.title}
          </h2>
        </div>
      </a>
    </Link>
  );
}

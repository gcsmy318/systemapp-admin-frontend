import Link from 'next/link';

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="group rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white border border-gray-200">
      <img
        src={product.image}
        alt={product.name}
        width={200} height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-2">หมวดหมู่: {product.code}</p>
        <p className="text-blue-600 font-semibold">{product.price.toLocaleString()} บาท</p>
        <div className="mt-4 flex justify-between items-center text-sm">
          <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">ดู</Link>
          <Link href={`/admin/products/edit/${product.id}`} className="text-yellow-600 hover:underline">แก้ไข</Link>
          <button onClick={() => onDelete(product.id)} className="text-red-600 hover:underline">ลบ</button>
        </div>
      </div>
    </div>
  );
}
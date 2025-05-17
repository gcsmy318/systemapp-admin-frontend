import Layout from '../../components/Layout';

export default function ProductList({ products }) {
  return (
    <Layout>
      <h1 className="text-3xl mb-6 font-bold">สินค้า</h1>
      {/* สร้างตารางหรือ grid แสดงสินค้า พร้อมปุ่มจัดการ CRUD */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-3 rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2"     width={200} height={300}/>
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.price} ฿</p>
            {/* ปุ่มแก้ไข ลบ เพิ่ม */}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/products`);
  const products = await res.json();

  return { props: { products } };
}

import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
            ระบบจัดการข่าวสารและสินค้า

            <button  onClick={handleLogout}     className=" rounded hover:bg-red-600" >
                 &#10240;  ออกจากระบบ
            </button>
               </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600 text-sm select-none">
          © 2025 Smile Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}












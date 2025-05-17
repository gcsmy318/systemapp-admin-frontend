import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // ถ้า login แล้วให้ redirect
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/');
    }
  }, []);

  const handleLogin = () => {
    if (password === 'smile1975!') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">เข้าสู่ระบบแอดมิน</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          placeholder="รหัสผ่าน"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}

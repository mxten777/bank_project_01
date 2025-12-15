import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../lib/firebaseAuth';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('admin-logged-in');
      navigate('/admin/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="text-xl font-bold text-gray-900">
                LocalBank ONE 관리자
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-sm text-gray-600 hover:text-gray-900"
                target="_blank"
              >
                사이트 보기
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={`block px-4 py-2 rounded-lg ${
                      isActive('/admin/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    대시보드
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/notices"
                    className={`block px-4 py-2 rounded-lg ${
                      isActive('/admin/notices')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    공지 관리
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/inquiries"
                    className={`block px-4 py-2 rounded-lg ${
                      isActive('/admin/inquiries')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    문의 관리
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className={`block px-4 py-2 rounded-lg ${
                      isActive('/admin/settings')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    화이트라벨 설정
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

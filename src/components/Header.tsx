import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const Header: React.FC = () => {
  const { config } = useWhiteLabel();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 기관명 */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMobileMenuOpen(false)}>
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            ) : (
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-transform group-hover:scale-105"
                style={{ backgroundColor: config.colorTheme.primary }}
              >
                {config.institutionName.charAt(0)}
              </div>
            )}
            <span className="text-xl font-bold transition-colors" style={{ color: config.colorTheme.text }}>
              {config.institutionName}
            </span>
          </Link>
          
          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/') 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={isActive('/') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
            >
              홈
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/services') 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={isActive('/services') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
            >
              서비스 안내
            </Link>
            <Link
              to="/notices"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/notices') 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={isActive('/notices') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
            >
              공지·소식
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/about') 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={isActive('/about') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
            >
              기관 소개
            </Link>
            <Link
              to="/inquiry"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/inquiry') 
                  ? 'text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
              style={isActive('/inquiry') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
            >
              상담·문의
            </Link>
          </nav>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={isActive('/') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
              >
                홈
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/services') 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={isActive('/services') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
              >
                서비스 안내
              </Link>
              <Link
                to="/notices"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/notices') 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={isActive('/notices') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
              >
                공지·소식
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/about') 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={isActive('/about') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
              >
                기관 소개
              </Link>
              <Link
                to="/inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/inquiry') 
                    ? 'text-white shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
                style={isActive('/inquiry') ? { backgroundColor: config.colorTheme.primary } : { color: config.colorTheme.text }}
              >
                상담·문의
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

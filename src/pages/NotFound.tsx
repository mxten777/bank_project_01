import React from 'react';
import { Link } from 'react-router-dom';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const NotFound: React.FC = () => {
  const { config } = useWhiteLabel();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 숫자 */}
        <div className="mb-8">
          <h1 
            className="text-9xl font-bold mb-4 animate-bounce"
            style={{ color: config.colorTheme.primary }}
          >
            404
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: config.colorTheme.primary, animationDelay: '0s' }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: config.colorTheme.primary, animationDelay: '0.2s' }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: config.colorTheme.primary, animationDelay: '0.4s' }}
            />
          </div>
        </div>
        
        {/* 에러 메시지 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-8 border border-gray-100">
          <div className="mb-6">
            <svg 
              className="w-24 h-24 mx-auto mb-6 text-gray-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br />
            주소를 다시 확인해 주세요.
          </p>
          
          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ backgroundColor: config.colorTheme.primary }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              홈으로 돌아가기
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 rounded-xl font-semibold border-2 hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ 
                color: config.colorTheme.primary,
                borderColor: config.colorTheme.primary 
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              이전 페이지
            </button>
          </div>
        </div>
        
        {/* 도움말 링크 */}
        <div className="text-gray-500 text-sm">
          <p className="mb-3">빠른 링크</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/services" 
              className="hover:underline"
              style={{ color: config.colorTheme.primary }}
            >
              서비스 안내
            </Link>
            <Link 
              to="/notices" 
              className="hover:underline"
              style={{ color: config.colorTheme.primary }}
            >
              공지사항
            </Link>
            <Link 
              to="/about" 
              className="hover:underline"
              style={{ color: config.colorTheme.primary }}
            >
              기관 소개
            </Link>
            <Link 
              to="/inquiry" 
              className="hover:underline"
              style={{ color: config.colorTheme.primary }}
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

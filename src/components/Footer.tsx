import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const Footer: React.FC = () => {
  const { config } = useWhiteLabel();
  
  return (
    <footer className="mt-auto bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 기관 정보 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="logo" className="h-10 w-auto" />
              ) : (
                <div 
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: config.colorTheme.primary }}
                >
                  {config.institutionName.charAt(0)}
                </div>
              )}
              <h3 className="text-xl font-bold" style={{ color: config.colorTheme.primary }}>
                {config.institutionName}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              지역 금융기관 디지털 안내 서비스<br />
              신뢰할 수 있는 금융 정보를 제공합니다
            </p>
          </div>
          
          {/* 바로가기 */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: config.colorTheme.text }}>
              바로가기
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all group-hover:opacity-100" style={{ backgroundColor: config.colorTheme.primary, opacity: 0 }}></span>
                  홈
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all group-hover:opacity-100" style={{ backgroundColor: config.colorTheme.primary, opacity: 0 }}></span>
                  서비스 안내
                </a>
              </li>
              <li>
                <a href="/notices" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all group-hover:opacity-100" style={{ backgroundColor: config.colorTheme.primary, opacity: 0 }}></span>
                  공지·소식
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all group-hover:opacity-100" style={{ backgroundColor: config.colorTheme.primary, opacity: 0 }}></span>
                  기관 소개
                </a>
              </li>
              <li>
                <a href="/inquiry" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all group-hover:opacity-100" style={{ backgroundColor: config.colorTheme.primary, opacity: 0 }}></span>
                  상담·문의
                </a>
              </li>
            </ul>
          </div>
          
          {/* 서비스 안내 */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: config.colorTheme.text }}>
              서비스 안내
            </h3>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                본 서비스는 금융 거래를 제공하지 않으며<br />
                정보 안내 및 상담 연결 목적입니다.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">상담 시간</strong><br />
                  평일 09:00 ~ 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 {config.institutionName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            LocalBank ONE - Digital Service Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const About: React.FC = () => {
  const { config } = useWhiteLabel();
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: config.colorTheme.primary }}
          >
            {config.institutionType === 'nonghyup' ? '조합' : '기관'} 소개
          </h1>
          <p className="text-lg text-gray-600">
            {config.institutionName}을 소개합니다
          </p>
        </div>
        
        {/* 기관 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center mb-8">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="logo" className="w-32 h-32 mb-6 md:mb-0 md:mr-8" />
            ) : (
              <div 
                className="w-32 h-32 rounded-lg flex items-center justify-center text-white text-4xl font-bold mb-6 md:mb-0 md:mr-8"
                style={{ backgroundColor: config.colorTheme.primary }}
              >
                {config.institutionName.charAt(0)}
              </div>
            )}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2" style={{ color: config.colorTheme.text }}>
                {config.institutionName}
              </h2>
              <p className="text-lg text-gray-600">
                {config.mainMessage}
              </p>
            </div>
          </div>
        </div>
        
        {/* 미션 및 비전 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div 
            className="p-8 rounded-lg"
            style={{ backgroundColor: config.colorTheme.background }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: config.colorTheme.primary }}>
              미션
            </h3>
            <p className="text-gray-700">
              {config.institutionType === 'nonghyup' 
                ? '지역 주민과 농업인을 위한 신뢰할 수 있는 금융 파트너로서 지역 경제 발전에 기여합니다.'
                : '조합원의 경제적·사회적 지위 향상을 위한 상호금융 서비스를 제공하고 지역 사회 발전에 이바지합니다.'}
            </p>
          </div>
          
          <div 
            className="p-8 rounded-lg"
            style={{ backgroundColor: config.colorTheme.background }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: config.colorTheme.primary }}>
              비전
            </h3>
            <p className="text-gray-700">
              {config.institutionType === 'nonghyup'
                ? '디지털 혁신을 통한 농협 금융의 미래를 선도하고, 지역 주민 모두가 편리하게 이용할 수 있는 금융 서비스를 구현합니다.'
                : '협동조합 정신을 바탕으로 조합원 중심의 혁신적인 금융 서비스를 제공하여 함께 성장하는 신협을 만들어갑니다.'}
            </p>
          </div>
        </div>
        
        {/* 핵심 가치 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: config.colorTheme.primary }}>
            핵심 가치
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: config.colorTheme.background }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" style={{ color: config.colorTheme.primary }}>
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h4 className="font-bold mb-2" style={{ color: config.colorTheme.text }}>신뢰</h4>
              <p className="text-sm text-gray-600">고객과의 약속을 지키는 믿을 수 있는 금융기관</p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: config.colorTheme.background }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" style={{ color: config.colorTheme.primary }}>
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-bold mb-2" style={{ color: config.colorTheme.text }}>혁신</h4>
              <p className="text-sm text-gray-600">디지털 전환을 통한 편리한 서비스 제공</p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: config.colorTheme.background }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" style={{ color: config.colorTheme.primary }}>
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-bold mb-2" style={{ color: config.colorTheme.text }}>상생</h4>
              <p className="text-sm text-gray-600">지역 사회와 함께 성장하는 금융</p>
            </div>
          </div>
        </div>
        
        {/* 연락처 */}
        <div 
          className="mt-8 p-8 rounded-lg"
          style={{ backgroundColor: config.colorTheme.background }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: config.colorTheme.primary }}>
            오시는 길
          </h3>
          <div className="text-center text-gray-700">
            <p className="mb-2">상세한 위치 및 연락처는 지점별로 다를 수 있습니다.</p>
            <p>자세한 문의는 <a href="/inquiry" className="font-semibold underline" style={{ color: config.colorTheme.primary }}>문의하기</a>를 이용해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

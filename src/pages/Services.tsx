import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const Services: React.FC = () => {
  const { config } = useWhiteLabel();
  
  const services = [
    {
      category: '예·적금',
      items: ['정기예금', '자유적금', '정기적금'],
    },
    {
      category: '대출',
      items: ['신용대출', '주택담보대출', '전세자금대출'],
    },
    {
      category: '카드',
      items: ['체크카드', '신용카드', '포인트 서비스'],
    },
    {
      category: '보험',
      items: ['생명보험', '손해보험', '연금보험'],
    },
  ];
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: config.colorTheme.primary }}
          >
            서비스 안내
          </h1>
          <p className="text-lg text-gray-600">
            {config.institutionName}에서 제공하는 다양한 금융 서비스를 확인하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ color: config.colorTheme.primary }}
              >
                {service.category}
              </h2>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg 
                      className="w-5 h-5 mr-3 mt-1 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      style={{ color: config.colorTheme.secondary }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: config.colorTheme.primary }}
              >
                자세히 보기
              </button>
            </div>
          ))}
        </div>
        
        {/* 안내 메시지 */}
        <div 
          className="p-6 rounded-lg"
          style={{ backgroundColor: config.colorTheme.background }}
        >
          <div className="flex items-start">
            <svg 
              className="w-6 h-6 mr-3 mt-1 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{ color: config.colorTheme.primary }}
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <div>
              <h3 className="font-bold mb-2" style={{ color: config.colorTheme.primary }}>
                서비스 이용 안내
              </h3>
              <p className="text-gray-600">
                본 페이지는 서비스 소개 및 안내 목적입니다.<br />
                실제 금융 거래는 지점 방문 또는 별도 전용 채널을 통해 이용 가능합니다.<br />
                자세한 상담은 <a href="/inquiry" className="underline font-semibold" style={{ color: config.colorTheme.primary }}>문의하기</a>를 이용해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

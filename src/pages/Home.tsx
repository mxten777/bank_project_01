import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home: React.FC = () => {
  const { config } = useWhiteLabel();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section - 프리미엄 업그레이드 */}
      <section 
        className="py-28 md:py-40 px-4 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.colorTheme.background} 0%, ${config.colorTheme.primary}15 100%)`
        }}
      >
        {/* 배경 장식 - 개선된 그라데이션 */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ backgroundColor: config.colorTheme.primary }}></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ backgroundColor: config.colorTheme.secondary, animationDelay: '1s' }}></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fadeIn">
            {/* 뱃지 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md mb-8">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.colorTheme.primary }}></span>
              <span className="text-sm font-semibold" style={{ color: config.colorTheme.primary }}>
                신뢰할 수 있는 금융 파트너
              </span>
            </div>
            
            <h1 className="text-display-lg md:text-display-xl mb-6 leading-tight" style={{ color: config.colorTheme.primary }}>
              {config.mainMessage}
            </h1>
            
            <p className="text-body-xl md:text-body-xl text-gray-600 mb-12 font-normal max-w-3xl mx-auto leading-relaxed">
              {config.institutionName}에서 제공하는<br className="md:hidden" />
              편리하고 안전한 정보 안내 서비스입니다
            </p>
            
            {/* CTA Buttons - 새 Button 컴포넌트 사용 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link to="/inquiry">
                <Button size="lg" variant="primary" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }>
                  {config.ctaButtons.primary}
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }>
                  {config.ctaButtons.secondary}
                </Button>
              </Link>
            </div>
            
            {/* 통계 카드 */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-heading-1 font-bold mb-1" style={{ color: config.colorTheme.primary }}>100+</div>
                <div className="text-body-sm text-gray-600">서비스</div>
              </div>
              <div className="text-center">
                <div className="text-heading-1 font-bold mb-1" style={{ color: config.colorTheme.primary }}>24/7</div>
                <div className="text-body-sm text-gray-600">상담 지원</div>
              </div>
              <div className="text-center">
                <div className="text-heading-1 font-bold mb-1" style={{ color: config.colorTheme.primary }}>99%</div>
                <div className="text-body-sm text-gray-600">만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Features Section - Card 컴포넌트 사용 */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-body-sm font-semibold text-gray-700 mb-4">
              주요 서비스
            </span>
            <h2 className="text-display-md mb-4" style={{ color: config.colorTheme.primary }}>
              신뢰할 수 있는 금융 안내
            </h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              고객님의 금융 생활을 더욱 편리하게 만드는<br />
              다양한 서비스를 제공합니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card variant="elevated" hover interactive>
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-heading-2 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                서비스 안내
              </h3>
              <p className="text-body-md text-gray-600 leading-relaxed mb-6">
                다양한 금융 상품과 서비스를 쉽고 빠르게 확인하세요
              </p>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                style={{ color: config.colorTheme.primary }}
              >
                자세히 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
            
            {/* Feature 2 */}
            <Card variant="elevated" hover interactive>
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <h3 className="text-heading-2 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                공지·소식
              </h3>
              <p className="text-body-md text-gray-600 leading-relaxed mb-6">
                최신 소식과 중요 공지사항을 실시간으로 받아보세요
              </p>
              <Link 
                to="/notices" 
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                style={{ color: config.colorTheme.primary }}
              >
                공지 확인
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
            
            {/* Feature 3 */}
            <Card variant="elevated" hover interactive>
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-heading-2 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                상담·문의
              </h3>
              <p className="text-body-md text-gray-600 leading-relaxed mb-6">
                궁금한 점을 언제든지 편하게 문의하세요
              </p>
              <Link 
                to="/inquiry" 
                className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                style={{ color: config.colorTheme.primary }}
              >
                문의하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Info Section - 프리미엄 카드 그리드 */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: config.colorTheme.background }}>
        {/* 배경 장식 */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: config.colorTheme.secondary }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-display-md mb-6" style={{ color: config.colorTheme.primary }}>
              안전하고 편리한 안내 서비스
            </h2>
            <p className="text-body-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              본 서비스는 금융 거래를 제공하지 않으며<br />
              단순 문의 및 안내 목적으로 운영됩니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Info Card 1 */}
            <Card variant="default" hover padding="lg">
              <div className="flex items-start gap-5">
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                  }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-heading-3 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                    개인정보 최소 수집
                  </h3>
                  <p className="text-body-md text-gray-600 leading-relaxed">
                    서비스 이용에 필요한 최소한의 정보만 수집하며, 안전하게 보호합니다
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Info Card 2 */}
            <Card variant="default" hover padding="lg">
              <div className="flex items-start gap-5">
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                  }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-heading-3 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                    안내 및 상담 연결
                  </h3>
                  <p className="text-body-md text-gray-600 leading-relaxed">
                    전문 상담원과의 빠른 연결을 지원하여 신속한 답변을 제공합니다
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Info Card 3 */}
            <Card variant="default" hover padding="lg">
              <div className="flex items-start gap-5">
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                  }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-heading-3 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                    실시간 정보 제공
                  </h3>
                  <p className="text-body-md text-gray-600 leading-relaxed">
                    최신 공지사항과 서비스 정보를 실시간으로 업데이트하여 제공합니다
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Info Card 4 */}
            <Card variant="default" hover padding="lg">
              <div className="flex items-start gap-5">
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.colorTheme.primary} 0%, ${config.colorTheme.secondary} 100%)`
                  }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-heading-3 mb-3 font-bold" style={{ color: config.colorTheme.text }}>
                    모바일 최적화
                  </h3>
                  <p className="text-body-md text-gray-600 leading-relaxed">
                    언제 어디서나 모바일 기기로 편리하게 이용 가능합니다
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-3xl bg-white shadow-xl">
              <p className="text-body-lg text-gray-700 mb-6">
                더 자세한 정보가 필요하신가요?
              </p>
              <Link to="/about">
                <Button size="lg" variant="primary">
                  기관 소개 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

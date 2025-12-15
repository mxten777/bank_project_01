import React, { useState, useEffect } from 'react';
import { useWhiteLabel } from '../../context/WhiteLabelContext';
import type { InstitutionType } from '../../types';
import { COLOR_THEMES, MAIN_MESSAGES, CTA_TEMPLATES, TONE_DESCRIPTION } from '../../lib/whitelabel';
import { getWhiteLabelConfig, saveWhiteLabelConfig } from '../../lib/firebaseDb';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminSettings: React.FC = () => {
  const { config, updateConfig } = useWhiteLabel();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const INSTITUTION_ID = 'default'; // 기본 설정 ID
  
  // Firestore에서 설정 불러오기
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await getWhiteLabelConfig(INSTITUTION_ID);
        if (savedConfig) {
          updateConfig(savedConfig);
        }
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    };
    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Firestore에 설정 저장
  const handleSaveConfig = async () => {
    try {
      setIsSaving(true);
      await saveWhiteLabelConfig(INSTITUTION_ID, config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save config:', error);
      alert('설정 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleInstitutionTypeChange = (type: InstitutionType) => {
    updateConfig({
      institutionType: type,
      colorTheme: COLOR_THEMES[type],
      mainMessage: MAIN_MESSAGES[type][0],
      ctaButtons: CTA_TEMPLATES[type][0],
    });
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
      {/* 로딩 상태 */}
      {isSaving && <LoadingSpinner size="lg" fullScreen text="설정 저장 중..." />}
      
      {/* 성공 메시지 */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg animate-fadeIn z-50">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-semibold">설정이 저장되었습니다!</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">화이트라벨 설정</h1>
          <p className="text-gray-600">기관 유형과 브랜드를 즉시 전환하세요</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {isSaving ? '저장 중...' : '설정 저장'}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            미리보기
          </a>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <div>
            <h3 className="font-bold text-yellow-900 mb-2 text-lg">플랫폼 핵심 기능</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              이 설정을 변경하면 <strong>전체 사이트가 즉시 반영</strong>됩니다. 코드 수정 없이 농협/신협 전환이 가능합니다.
            </p>
          </div>
        </div>
      </div>
      
      {/* 기관 유형 선택 */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          기관 유형
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleInstitutionTypeChange('nonghyup')}
            className={`p-8 border-2 rounded-xl text-left transition-all duration-300 group ${
              config.institutionType === 'nonghyup'
                ? 'border-green-600 bg-green-50 shadow-lg'
                : 'border-gray-300 hover:border-green-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-gray-900">농협</h3>
              {config.institutionType === 'nonghyup' && (
                <svg className="w-8 h-8 text-green-600 animate-scaleIn" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{TONE_DESCRIPTION.nonghyup}</p>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.nonghyup.primary }}></div>
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.nonghyup.secondary }}></div>
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.nonghyup.accent }}></div>
            </div>
          </button>
          
          <button
            onClick={() => handleInstitutionTypeChange('shinhyup')}
            className={`p-8 border-2 rounded-xl text-left transition-all duration-300 group ${
              config.institutionType === 'shinhyup'
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-gray-900">신협</h3>
              {config.institutionType === 'shinhyup' && (
                <svg className="w-8 h-8 text-blue-600 animate-scaleIn" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{TONE_DESCRIPTION.shinhyup}</p>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.shinhyup.primary }}></div>
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.shinhyup.secondary }}></div>
              <div className="w-10 h-10 rounded-lg shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: COLOR_THEMES.shinhyup.accent }}></div>
            </div>
          </button>
        </div>
      </div>
      
      {/* 기관명 */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
          기관명
        </h2>
        <input
          type="text"
          value={config.institutionName}
          onChange={(e) => updateConfig({ institutionName: e.target.value })}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          placeholder="예: 서울중앙농협, 부산신협"
        />
      </div>
      
      {/* 로고 업로드 */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
          </svg>
          로고
        </h2>
        <div className="flex items-center gap-6">
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="logo" className="w-32 h-32 object-contain border-2 border-gray-200 rounded-xl shadow-sm" />
          ) : (
            <div 
              className="w-32 h-32 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md"
              style={{ backgroundColor: config.colorTheme.primary }}
            >
              {config.institutionName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-all file:cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              권장 크기: 200x200px, PNG 또는 JPG
            </p>
            {config.logoUrl && (
              <button
                onClick={() => updateConfig({ logoUrl: '' })}
                className="mt-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 font-semibold bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                로고 제거
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* 메인 메시지 */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          메인 메시지
        </h2>
        <div className="space-y-3 mb-6">
          {MAIN_MESSAGES[config.institutionType].map((message, index) => (
            <button
              key={index}
              onClick={() => updateConfig({ mainMessage: message })}
              className={`w-full p-5 border-2 rounded-xl text-left transition-all duration-300 ${
                config.mainMessage === message
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <span className="font-medium text-gray-900">{message}</span>
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            또는 직접 입력
          </label>
          <input
            type="text"
            value={config.mainMessage}
            onChange={(e) => updateConfig({ mainMessage: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="사용자 정의 메시지 입력"
          />
        </div>
      </div>
      
      {/* CTA 버튼 */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          CTA 버튼 문구
        </h2>
        <div className="space-y-3 mb-6">
          {CTA_TEMPLATES[config.institutionType].map((template, index) => (
            <button
              key={index}
              onClick={() => updateConfig({ ctaButtons: template })}
              className={`w-full p-5 border-2 rounded-xl text-left transition-all duration-300 ${
                config.ctaButtons.primary === template.primary
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <span className="font-semibold text-gray-900">{template.primary}</span>
              <span className="text-gray-500 mx-2">/</span>
              <span className="font-semibold text-gray-900">{template.secondary}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              주 버튼
            </label>
            <input
              type="text"
              value={config.ctaButtons.primary}
              onChange={(e) => updateConfig({ 
                ctaButtons: { ...config.ctaButtons, primary: e.target.value } 
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="주 버튼 문구"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              부 버튼
            </label>
            <input
              type="text"
              value={config.ctaButtons.secondary}
              onChange={(e) => updateConfig({ 
                ctaButtons: { ...config.ctaButtons, secondary: e.target.value } 
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="부 버튼 문구"
            />
          </div>
        </div>
      </div>
      
      {/* 현재 설정 미리보기 */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          현재 설정 미리보기
        </h2>
        <div 
          className="p-10 rounded-xl border-2 border-gray-200 shadow-inner"
          style={{ backgroundColor: config.colorTheme.background }}
        >
          <div className="flex items-center gap-4 mb-8">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="logo" className="w-16 h-16 object-contain" />
            ) : (
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md"
                style={{ backgroundColor: config.colorTheme.primary }}
              >
                {config.institutionName.charAt(0)}
              </div>
            )}
            <span className="text-2xl font-bold text-gray-900">{config.institutionName}</span>
          </div>
          <h3 
            className="text-4xl font-bold mb-6 leading-tight"
            style={{ color: config.colorTheme.primary }}
          >
            {config.mainMessage}
          </h3>
          <div className="flex gap-4">
            <button
              className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              style={{ backgroundColor: config.colorTheme.primary }}
            >
              {config.ctaButtons.primary}
            </button>
            <button
              className="px-8 py-4 rounded-xl font-semibold border-2 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
              style={{ 
                color: config.colorTheme.primary,
                borderColor: config.colorTheme.primary 
              }}
            >
              {config.ctaButtons.secondary}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

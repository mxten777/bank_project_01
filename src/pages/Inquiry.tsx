import React, { useState } from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';
import { addInquiry } from '../lib/firebaseDb';

const Inquiry: React.FC = () => {
  const { config } = useWhiteLabel();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    content: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await addInquiry({
        ...formData,
        status: 'pending',
        updatedAt: new Date(),
      });
      console.log('문의 제출 완료:', formData);
      setSubmitted(true);
      setFormData({ name: '', contact: '', content: '' });
      
      // 3초 후 성공 메시지 숨기기
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('문의 제출 실패:', error);
      alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: config.colorTheme.primary }}
          >
            상담·문의
          </h1>
          <p className="text-lg text-gray-600">
            궁금하신 점을 남겨주시면 빠르게 답변드리겠습니다
          </p>
        </div>
        
        {/* 안내 메시지 */}
        <div 
          className="p-6 rounded-lg mb-8"
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
                본 서비스는 금융 거래를 제공하지 않으며<br />
                단순 문의 및 안내 목적입니다.<br />
                입력하신 정보는 상담 연결 목적으로만 사용됩니다.
              </p>
            </div>
          </div>
        </div>
        
        {/* 성공 메시지 */}
        {submitted && (
          <div 
            className="mb-6 p-4 rounded-lg text-white"
            style={{ backgroundColor: config.colorTheme.primary }}
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.</span>
            </div>
          </div>
        )}
        
        {/* 문의 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label 
              htmlFor="name" 
              className="block text-sm font-bold mb-2"
              style={{ color: config.colorTheme.text }}
            >
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력해주세요"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="contact" 
              className="block text-sm font-bold mb-2"
              style={{ color: config.colorTheme.text }}
            >
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              placeholder="연락받으실 전화번호를 입력해주세요"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="content" 
              className="block text-sm font-bold mb-2"
              style={{ color: config.colorTheme.text }}
            >
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              placeholder="문의하실 내용을 자세히 작성해주세요"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-lg font-bold text-white text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: config.colorTheme.primary }}
          >
            {isSubmitting ? '제출 중...' : '문의하기'}
          </button>
        </form>
        
        {/* 추가 안내 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>상담 시간: 평일 09:00 ~ 18:00</p>
          <p className="mt-2">주말 및 공휴일 접수 건은 익일 순차 처리됩니다</p>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;

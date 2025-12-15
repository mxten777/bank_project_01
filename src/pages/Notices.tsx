import React, { useState, useEffect } from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';
import { getNotices } from '../lib/firebaseDb';
import type { Notice } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const Notices: React.FC = () => {
  const { config } = useWhiteLabel();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firestore에서 공지사항 불러오기
  useEffect(() => {
    const loadNotices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedNotices = await getNotices();
        setNotices(fetchedNotices);
      } catch (err) {
        console.error('Failed to load notices:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    loadNotices();
  }, []);
  
  return (
    <div className="min-h-screen py-12 px-4">
      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner size="lg" fullScreen />}
      
      {/* 에러 메시지 */}
      {error && (
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
            {error}
          </div>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: config.colorTheme.primary }}
          >
            공지·소식
          </h1>
          <p className="text-lg text-gray-600">
            {config.institutionName}의 최신 소식과 공지사항을 확인하세요
          </p>
        </div>
        
        {/* 공지사항 리스트 */}
        <div className="space-y-6">
          {notices.map((notice) => (
            <a
              key={notice.id}
              href={notice.link}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold" style={{ color: config.colorTheme.text }}>
                  {notice.title}
                </h2>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {notice.createdAt.toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {notice.summary}
              </p>
              <div className="flex items-center" style={{ color: config.colorTheme.primary }}>
                <span className="text-sm font-semibold">자세히 보기</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
        
        {notices.length === 0 && (
          <div className="text-center py-12">
            <svg 
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;

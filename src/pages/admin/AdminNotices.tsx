import React, { useState, useEffect } from 'react';
import { getNotices, addNotice, deleteNotice } from '../../lib/firebaseDb';
import type { Notice } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    link: '',
  });

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newNoticeId = await addNotice({
        ...formData,
        updatedAt: new Date(),
      });
      const newNotice: Notice = {
        id: newNoticeId,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotices([newNotice, ...notices]);
      setFormData({ title: '', summary: '', link: '' });
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to add notice:', err);
      alert('공지사항 작성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        setIsLoading(true);
        await deleteNotice(id);
        setNotices(notices.filter(n => n.id !== id));
      } catch (err) {
        console.error('Failed to delete notice:', err);
        alert('공지사항 삭제에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div>
      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner size="lg" fullScreen />}
      
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">공지 관리</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
        >
          {isCreating ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              취소
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 공지 작성
            </>
          )}
        </button>
      </div>
      
      {/* 작성 폼 */}
      {isCreating && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            새 공지사항 작성
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="공지사항 제목을 입력하세요"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                요약 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="공지사항 요약을 입력하세요"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                링크 (선택)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                외부 페이지 링크만 가능합니다 (PDF 직접 업로드 불가)
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                작성 완료
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setFormData({ title: '', summary: '', link: '' });
                }}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* 공지 목록 */}
      <div className="space-y-5">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 border border-gray-100 transition-all duration-300 group">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{notice.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{notice.summary}</p>
                {notice.link && (
                  <a 
                    href={notice.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium group/link"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="group-hover/link:underline">{notice.link}</span>
                  </a>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  {notice.createdAt.toLocaleDateString('ko-KR')}
                </p>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="px-5 py-2.5 bg-red-50 text-red-700 rounded-xl text-sm font-semibold hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {notices.length === 0 && !isCreating && (
        <div className="bg-white rounded-xl shadow-md p-16 text-center border border-gray-100">
          <svg 
            className="w-20 h-20 mx-auto mb-6 text-gray-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg mb-6">등록된 공지사항이 없습니다.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            첫 공지 작성하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;

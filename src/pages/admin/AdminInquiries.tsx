import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '../../lib/firebaseDb';
import type { Inquiry } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firestore에서 문의 불러오기
  useEffect(() => {
    const loadInquiries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedInquiries = await getInquiries();
        setInquiries(fetchedInquiries);
      } catch (err) {
        console.error('Failed to load inquiries:', err);
        setError('문의를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInquiries();
  }, []);
  
  const updateStatus = async (id: string, newStatus: 'pending' | 'processing' | 'completed') => {
    try {
      setIsLoading(true);
      await updateInquiryStatus(id, newStatus);
      setInquiries(prev =>
        prev.map(inquiry =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
      alert('상태 업데이트에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);
  
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-orange-100 text-orange-800 border-orange-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
    };
    const labels = {
      pending: '대기',
      processing: '처리중',
      completed: '완료',
    };
    return (
      <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
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
        <h1 className="text-3xl font-bold text-gray-900">문의 관리</h1>
      </div>
      
      {/* 필터 */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
          </svg>
          <span className="font-semibold text-gray-700">상태별 필터</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            전체 <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{inquiries.length}</span>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'pending'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            대기 <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{inquiries.filter(i => i.status === 'pending').length}</span>
          </button>
          <button
            onClick={() => setFilter('processing')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'processing'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            처리중 <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{inquiries.filter(i => i.status === 'processing').length}</span>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'completed'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            완료 <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{inquiries.filter(i => i.status === 'completed').length}</span>
          </button>
        </div>
      </div>
      
      {/* 문의 목록 */}
      <div className="space-y-5">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 border border-gray-100 transition-all duration-300">
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{inquiry.name}</h3>
                  {getStatusBadge(inquiry.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    {inquiry.contact}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    {inquiry.createdAt.toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{inquiry.content}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => updateStatus(inquiry.id, 'pending')}
                disabled={inquiry.status === 'pending'}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  inquiry.status === 'pending'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 hover:border-orange-300 transform hover:-translate-y-0.5'
                }`}
              >
                대기
              </button>
              <button
                onClick={() => updateStatus(inquiry.id, 'processing')}
                disabled={inquiry.status === 'processing'}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  inquiry.status === 'processing'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 transform hover:-translate-y-0.5'
                }`}
              >
                처리중
              </button>
              <button
                onClick={() => updateStatus(inquiry.id, 'completed')}
                disabled={inquiry.status === 'completed'}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  inquiry.status === 'completed'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 hover:border-green-300 transform hover:-translate-y-0.5'
                }`}
              >
                완료
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredInquiries.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-16 text-center border border-gray-100">
          <svg 
            className="w-20 h-20 mx-auto mb-6 text-gray-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-lg">해당 상태의 문의가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;

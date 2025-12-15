import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotices, getInquiries } from '../../lib/firebaseDb';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    pendingInquiries: 0,
    totalNotices: 0,
    recentNotices: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Firestore에서 실시간 통계 가져오기
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const [notices, inquiries] = await Promise.all([
          getNotices(),
          getInquiries(),
        ]);

        // 7일 이내 공지사항 개수 계산
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentNoticesCount = notices.filter(
          (notice) => notice.createdAt >= sevenDaysAgo
        ).length;

        // 대기 중인 문의 개수 계산
        const pendingCount = inquiries.filter(
          (inquiry) => inquiry.status === 'pending'
        ).length;

        setStats({
          totalInquiries: inquiries.length,
          pendingInquiries: pendingCount,
          totalNotices: notices.length,
          recentNotices: recentNoticesCount,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);
  
  return (
    <div className="animate-fadeIn">
      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner size="lg" fullScreen />}
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-display-md font-bold text-gray-900 mb-3">대시보드</h1>
        <p className="text-body-lg text-gray-600">LocalBank ONE 관리 시스템에 오신 것을 환영합니다</p>
      </div>
      
      {/* Stats Grid - 프리미엄 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Stat Card 1 */}
        <Card variant="elevated" hover padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-body-sm font-semibold text-gray-600 mb-2">전체 문의</p>
          <p className="text-display-sm font-bold text-gray-900 mb-1">{stats.totalInquiries}</p>
          <p className="text-caption text-gray-500">총 접수 건수</p>
        </Card>

        {/* Stat Card 2 */}
        <Card variant="elevated" hover padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-body-sm font-semibold text-gray-600 mb-2">대기 중 문의</p>
          <p className="text-display-sm font-bold text-orange-600 mb-1">{stats.pendingInquiries}</p>
          <p className="text-caption text-gray-500">처리 필요</p>
        </Card>

        {/* Stat Card 3 */}
        <Card variant="elevated" hover padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </div>
          </div>
          <p className="text-body-sm font-semibold text-gray-600 mb-2">전체 공지</p>
          <p className="text-display-sm font-bold text-gray-900 mb-1">{stats.totalNotices}</p>
          <p className="text-caption text-gray-500">등록된 공지사항</p>
        </Card>

        {/* Stat Card 4 */}
        <Card variant="elevated" hover padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-body-sm font-semibold text-gray-600 mb-2">최근 공지</p>
          <p className="text-display-sm font-bold text-gray-900 mb-1">{stats.recentNotices}</p>
          <p className="text-caption text-gray-500">7일 이내</p>
        </Card>
      </div>
      
      {/* Quick Actions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions - 프리미엄 Card */}
        <Card variant="elevated" padding="lg">
          <h2 className="text-display-xs font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            빠른 작업
          </h2>
          <div className="space-y-4">
            <Link
              to="/admin/notices"
              className="group flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 rounded-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
              </span>
              <div className="flex-1">
                <span className="block text-body-lg font-bold text-blue-900 mb-1">새 공지사항 작성</span>
                <span className="block text-caption text-blue-700">공지사항을 작성하고 관리합니다</span>
              </div>
              <svg className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              to="/admin/inquiries"
              className="group flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 rounded-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </span>
              <div className="flex-1">
                <span className="block text-body-lg font-bold text-orange-900 mb-1">대기 중인 문의 확인</span>
                <span className="block text-caption text-orange-700">고객 문의에 신속하게 답변합니다</span>
              </div>
              <svg className="w-6 h-6 text-orange-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              to="/admin/settings"
              className="group flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 rounded-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </span>
              <div className="flex-1">
                <span className="block text-body-lg font-bold text-purple-900 mb-1">화이트라벨 설정</span>
                <span className="block text-caption text-purple-700">브랜드와 시스템을 설정합니다</span>
              </div>
              <svg className="w-6 h-6 text-purple-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </Card>
        
        {/* System Info - 프리미엄 Card */}
        <Card variant="elevated" padding="lg">
          <h2 className="text-display-xs font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            시스템 안내
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-body-lg font-bold text-green-900 mb-1">시스템 정상 가동</p>
                <p className="text-body-sm text-green-700">모든 서비스가 정상적으로 작동 중입니다</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-body-lg font-bold text-blue-900 mb-1">화이트라벨 플랫폼</p>
                <p className="text-body-sm text-blue-700">농협/신협 즉시 전환 가능</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-slate-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-body-lg font-bold text-gray-900 mb-1">최근 업데이트</p>
                <p className="text-body-sm text-gray-700">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

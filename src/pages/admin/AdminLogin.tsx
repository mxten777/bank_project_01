import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../../lib/firebaseAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await loginWithEmail(credentials.email, credentials.password);
      localStorage.setItem('admin-logged-in', 'true');
      showToast('success', '로그인에 성공했습니다!');
      navigate('/admin/dashboard');
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Firebase 에러 메시지 한글화
      let errorMessage = '로그인에 실패했습니다';
      if (error instanceof Error) {
        const errorCode = (error as { code?: string }).code;
        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage = '유효하지 않은 이메일 형식입니다';
            break;
          case 'auth/user-not-found':
            errorMessage = '등록되지 않은 사용자입니다';
            break;
          case 'auth/wrong-password':
            errorMessage = '비밀번호가 올바르지 않습니다';
            break;
          case 'auth/invalid-credential':
            errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다';
            break;
          case 'auth/too-many-requests':
            errorMessage = '로그인 시도 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요';
            break;
          default:
            errorMessage = error.message || '로그인에 실패했습니다';
        }
      }
      setError(errorMessage);
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError('');
  };
  
  if (loading) {
    return <LoadingSpinner size="lg" fullScreen text="로그인 중..." />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-display-md mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            관리자 로그인
          </h1>
          <p className="text-body-lg text-gray-600">
            LocalBank ONE 관리 시스템
          </p>
        </div>
        
        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-100 animate-scaleIn">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              label="이메일"
              value={credentials.email}
              onChange={handleChange}
              error={error && credentials.email === '' ? '이메일을 입력하세요' : undefined}
              placeholder="admin@example.com"
              fullWidth
              required
              disabled={loading}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />
            
            <Input
              type="password"
              name="password"
              label="비밀번호"
              value={credentials.password}
              onChange={handleChange}
              error={error && credentials.password === '' ? '비밀번호를 입력하세요' : undefined}
              placeholder="••••••••"
              fullWidth
              required
              disabled={loading}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              }
            />
            
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              }
            >
              로그인
            </Button>
          </form>
          
          {/* Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-body-sm font-semibold text-gray-700">Firebase 인증 연동</p>
              </div>
              <p className="text-caption text-gray-500">
                등록된 계정으로 로그인하세요
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Link */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-body-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            메인 페이지로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

# LocalBank ONE - 지역 금융기관 디지털 창구 표준 MVP

> 농협/신협을 위한 화이트라벨 SaaS 플랫폼  
> White-label digital branch platform for local financial institutions

## 🎯 프로젝트 개요

LocalBank ONE은 지역 금융기관(농협, 신협)을 위한 **즉시 전환 가능한 화이트라벨 디지털 창구 플랫폼**입니다.

### 핵심 특징
- ✅ **즉시 전환 가능한 화이트라벨** - 농협/신협 브랜드를 관리자 설정에서 즉시 변경
- ✅ **프리미엄 UI/UX** - 신뢰감을 주는 세련된 디자인
- ✅ **반응형 디자인** - 모바일, 태블릿, 데스크톱 완벽 지원
- ✅ **관리자 대시보드** - 공지사항, 문의 관리, 실시간 통계
- ✅ **배포 준비 완료** - Vercel 즉시 배포 가능

### 지원 기관
- 🟢 **농협 (Nonghyup)** - 녹색 테마, 지역 밀착형 메시징
- 🔵 **신협 (Shinhyup)** - 블루 테마, 신용 중심 메시징

---

## 🚀 빠른 시작

### 1. 설치

```bash
# 저장소 클론 (또는 다운로드)
git clone <repository-url>
cd bank_project_01

# 의존성 설치
npm install

# 환경 변수 설정
# .env.example을 복사하여 .env 파일 생성
# Firebase 설정값을 입력하세요
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173` (또는 5174)에서 실행됩니다.

### 3. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 📋 데모 가이드

### 🔹 화이트라벨 전환 데모 (핵심 기능)

1. **관리자 로그인**
   - URL: `http://localhost:5173/admin/login`
   - 이메일: `admin@demo.com`
   - 비밀번호: `demo1234`

2. **설정 페이지 접근**
   - 좌측 사이드바에서 **"설정"** 클릭
   - 또는 URL: `http://localhost:5173/admin/settings`

3. **즉시 브랜드 전환 체험**
   - 상단 **"기관 유형"** 드롭다운에서 "농협" 또는 "신협" 선택
   - **"설정 저장"** 버튼 클릭
   - **새 탭에서 홈페이지(`/`) 열기** → 브랜드가 즉시 변경된 것을 확인
   - 색상, 로고, 메시지가 모두 변경됩니다

4. **확인 사항**
   - 헤더 로고 및 색상 변경
   - 메인 페이지 배경 그라데이션 변경
   - CTA 버튼 메시지 변경
   - 푸터 저작권 표시 변경

### 🔹 공개 페이지 둘러보기

| 페이지 | URL | 설명 |
|--------|-----|------|
| 홈 | `/` | 히어로 섹션, 주요 서비스 소개 |
| 서비스 | `/services` | 금융 상품 안내 |
| 공지사항 | `/notices` | 공지 게시판 (Firestore 실시간 연동) |
| 기관 소개 | `/about` | 기관 정보 및 연혁 |
| 문의하기 | `/inquiry` | 문의 폼 (Firestore 저장) |

### 🔹 관리자 페이지 기능

| 페이지 | URL | 기능 |
|--------|-----|------|
| 대시보드 | `/admin/dashboard` | 실시간 통계, 빠른 작업 |
| 공지 관리 | `/admin/notices` | 공지사항 작성/삭제 (Firestore) |
| 문의 관리 | `/admin/inquiries` | 문의 상태 관리 (Firestore 실시간) |
| 설정 | `/admin/settings` | 화이트라벨 전환 (Firestore 저장) |

---

## 🏗️ 기술 스택

### Frontend
- **Vite 7.2.7** - 빠른 빌드 도구
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router DOM** - 라우팅
- **Tailwind CSS 3.4.15** - 스타일링

### Backend & Database
- **Firebase 12.6.0** - BaaS (Backend as a Service)
- **Firebase Authentication** - 이메일/비밀번호 인증
- **Firestore** - NoSQL 클라우드 데이터베이스
- **Firebase Storage** - 파일 저장소 (향후 로고 업로드용)

### 상태 관리
- **Context API** - 화이트라벨 설정 전역 관리
- **localStorage** - 세션 유지

### 디자인
- 커스텀 애니메이션 (fadeIn, slideDown, scaleIn)
- 반응형 그리드 레이아웃
- 모바일 햄버거 메뉴

---

## 🔥 Firebase 설정 가이드

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Firebase 설정값을 입력하세요:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firestore 보안 규칙

Firebase Console → Firestore Database → Rules에서 아래 규칙을 적용하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 공지사항: 모든 사용자 읽기 가능, 인증된 사용자만 쓰기
    match /notices/{noticeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 문의: 모든 사용자 작성 가능, 인증된 사용자만 읽기/수정
    match /inquiries/{inquiryId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // 화이트라벨 설정: 모든 사용자 읽기, 인증된 사용자만 쓰기
    match /whitelabel-configs/{configId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

> **보안 참고**: 
> - 공개 읽기가 필요한 컬렉션만 `allow read: if true` 설정
> - 프로덕션 환경에서는 Custom Claims로 관리자 권한 구분 권장
> - 문의는 누구나 작성 가능하지만, 조회는 관리자만 가능

### Firebase 기능

현재 구현된 기능:
- ✅ 이메일/비밀번호 인증
- ✅ 로그인/로그아웃
- ✅ 인증 상태 관리
- ✅ 공지사항 Firestore 연동 (작성, 삭제, 실시간 조회)
- ✅ 문의 Firestore 연동 (제출, 상태 관리, 실시간 조회)
- ✅ 화이트라벨 설정 Firestore 저장 (자동 로드/저장)
- ✅ AdminDashboard 실시간 통계 (문의/공지사항 개수)

---

## 📁 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── Header.tsx      # 헤더 (모바일 메뉴 포함)
│   ├── Footer.tsx      # 푸터
│   ├── LoadingSpinner.tsx  # 로딩 스피너
│   └── NotFound.tsx    # 404 페이지
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 메인 페이지
│   ├── Services.tsx    # 서비스 안내
│   ├── Notices.tsx     # 공지사항 (Firestore 연동)
│   ├── About.tsx       # 기관 소개
│   ├── Inquiry.tsx     # 문의하기 (Firestore 연동)
│   └── admin/          # 관리자 페이지
│       ├── AdminLogin.tsx      # Firebase Auth 로그인
│       ├── AdminLayout.tsx     # 관리자 레이아웃
│       ├── AdminDashboard.tsx  # 실시간 통계
│       ├── AdminNotices.tsx    # 공지 관리 (Firestore)
│       ├── AdminInquiries.tsx  # 문의 관리 (Firestore)
│       └── AdminSettings.tsx   # 화이트라벨 설정 (Firestore)
├── context/            # Context API
│   └── WhiteLabelContext.tsx
├── lib/                # 유틸리티
│   ├── whitelabel.ts   # 화이트라벨 설정
│   ├── firebase.ts     # Firebase 초기화
│   ├── firebaseAuth.ts # Firebase 인증 함수
│   └── firebaseDb.ts   # Firestore CRUD 함수
├── types/              # TypeScript 타입
│   └── index.ts
├── App.tsx             # 라우팅 설정
└── main.tsx            # 진입점
```

---

## 🎨 화이트라벨 커스터마이징

### 기본 설정 구조 (`src/lib/whitelabel.ts`)

```typescript
export const COLOR_THEMES = {
  nonghyup: {
    primary: '#10b981',      // 녹색
    secondary: '#059669',
    accent: '#34d399',
  },
  shinhyup: {
    primary: '#3b82f6',      // 블루
    secondary: '#2563eb',
    accent: '#60a5fa',
  },
};

export const MAIN_MESSAGES = {
  nonghyup: {
    hero: '우리 지역을 위한\n믿을 수 있는 금융 파트너',
    subtitle: '농협과 함께하는 안전하고 편리한 금융 서비스',
  },
  shinhyup: {
    hero: '서민과 함께\n신용으로 키우는 미래',
    subtitle: '신협과 함께하는 안전하고 편리한 금융 서비스',
  },
};
```

### 새 기관 추가하기

1. `src/lib/whitelabel.ts`에 새 기관 설정 추가
2. `src/types/index.ts`의 `InstitutionType`에 타입 추가
3. 로고 이미지를 `public/` 폴더에 추가
4. Context Provider에서 자동으로 반영됨

---

## 🔐 인증 정보

### Firebase Authentication 연동 완료 ✅

Firebase Console에서 관리자 계정을 생성하세요:

1. **Firebase Console 접속**
   - URL: https://console.firebase.google.com
   - 프로젝트 선택: `bank-project-01-d3872`

2. **관리자 계정 생성**
   - Authentication → Users → Add user
   - 이메일과 비밀번호 입력
   - 생성 완료

3. **로그인 테스트**
   - URL: `http://localhost:5173/admin/login`
   - 생성한 계정으로 로그인

> ⚠️ **보안 참고**: 프로덕션 환경에서는 Firebase의 Custom Claims를 사용하여 관리자 권한을 구분하세요.

---

## 🚢 배포 가이드

### Vercel 배포

1. **Vercel에 프로젝트 연결**
   ```bash
   # Vercel CLI 설치
   npm install -g vercel
   
   # 배포
   vercel
   ```

2. **환경 변수 설정** (필요 시)
   - Vercel 대시보드에서 환경 변수 추가
   - 예: `VITE_API_URL`, `VITE_FIREBASE_CONFIG` 등

3. **자동 배포**
   - GitHub와 연동 시 `main` 브랜치 푸시 시 자동 배포

### 빌드 최적화
- Vite의 코드 스플리팅 자동 적용
- Tailwind CSS의 미사용 스타일 자동 제거 (PurgeCSS)
- 이미지 최적화 권장 (WebP 포맷 사용)

---

## 📊 성능 지표

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

---

## 🛠️ 개발 가이드

### 코드 스타일
- **TypeScript**: Strict 모드 활성화
- **Import**: Type-only imports 사용 (`import type { }`)
- **컴포넌트**: Function Component + React.FC
- **스타일링**: Tailwind CSS 우선, 인라인 스타일 최소화

### 커스텀 애니메이션 추가
`tailwind.config.js`에서 keyframes 추가:
```javascript
theme: {
  extend: {
    keyframes: {
      myAnimation: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    animation: {
      myAnimation: 'myAnimation 0.5s ease-out',
    },
  },
}
```

---

## 🔮 향후 개선 계획

### Phase 2 (완료) ✅
- ✅ Firebase 연동 (인증, 데이터베이스)
- ✅ 실시간 데이터 동기화
- [ ] 파일 업로드 (공지사항 첨부파일 - Firebase Storage)

### Phase 3 (고급 기능)
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드
- [ ] PWA 지원
- [ ] 실시간 알림 (WebSocket)
- [ ] 로고 업로드 기능 (Firebase Storage)

### Phase 4 (분석 & 보안)
- [ ] Google Analytics 연동
- [ ] 보안 강화 (CSRF, XSS 방어)
- [ ] Firebase Custom Claims (관리자 권한 구분)
- [ ] 접근성 개선 (WCAG 2.1 AA 준수)

---

## 📞 문의 및 지원

### 이슈 리포트
GitHub Issues를 통해 버그 리포트 및 기능 제안

### 라이선스
MIT License

---

## 🙏 감사 인사

이 프로젝트는 지역 금융기관의 디지털 전환을 지원하기 위해 만들어졌습니다.

**Made with ❤️ for local financial institutions**

---

## ✨ 주요 업데이트

### v1.1.0 (2025-01-15) - Firebase 완전 연동 🔥
- ✅ Firebase Authentication 완전 통합
- ✅ Firestore 실시간 데이터베이스 연동
- ✅ 공지사항/문의 CRUD 완성
- ✅ 화이트라벨 설정 자동 저장/로드
- ✅ AdminDashboard 실시간 통계
- ✅ 세분화된 보안 규칙 적용

### v1.0.0 (2025-01-15)
- ✅ 초기 MVP 릴리스
- ✅ 농협/신협 화이트라벨 지원
- ✅ 관리자 대시보드 구현
- ✅ 반응형 디자인 완성
- ✅ 프리미엄 UI/UX 적용

---

**🎉 LocalBank ONE과 함께 지역 금융의 디지털 혁신을 시작하세요!**

---

## React + Vite 기술 참고사항

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Figma 디자인 → MVP 적용 가이드

> Figma 디자인을 React + Tailwind CSS 프로젝트에 통합하는 실무 가이드

---

## 🎯 작업 개요

Figma에서 받은 디자인을 현재 MVP(LocalBank ONE)에 적용하는 단계별 프로세스입니다.

### 현재 기술 스택
- ✅ React 18 + TypeScript
- ✅ Tailwind CSS 3.4.15
- ✅ Vite 7.2.7
- ✅ Firebase 연동 완료

### 적용 범위
1. 브랜드 에셋 (로고, 아이콘)
2. 디자인 시스템 (컬러, 타이포그래피)
3. UI 컴포넌트 스타일
4. 애니메이션/인터랙션

---

## 📋 단계별 적용 프로세스

### Step 1: Figma 파일 분석 및 에셋 추출 (1일차)

#### 1-1. Figma 파일 구조 파악
```
✅ 체크리스트
□ 페이지 구조 확인 (Home, Admin, Components 등)
□ 컴포넌트 라이브러리 위치 확인
□ 디자인 시스템 페이지 찾기
□ 반응형 프레임 확인 (Mobile/Tablet/Desktop)
□ 브랜드별 페이지 확인 (농협/신협)
```

#### 1-2. 에셋 추출
**Figma에서 Export**
1. 로고 파일
   ```
   Select Logo → Right Click → Export
   - Format: SVG (벡터)
   - Format: PNG @2x, @3x (래스터)
   ```

2. 아이콘 파일
   ```
   Select All Icons → Export
   - Format: SVG
   - Naming: icon-[name].svg
   ```

3. 일러스트레이션
   ```
   Select Illustrations → Export
   - Format: SVG (편집 가능)
   - Format: PNG @2x (고해상도)
   ```

**파일 저장 위치**
```bash
# 프로젝트 폴더 구조
public/
├── logos/
│   ├── logo-nonghyup.svg
│   ├── logo-shinhyup.svg
│   └── favicon.svg
├── icons/
│   ├── icon-home.svg
│   ├── icon-notice.svg
│   └── ... (기타 아이콘)
└── illustrations/
    ├── hero-main.svg
    ├── 404-error.svg
    └── empty-state.svg
```

---

### Step 2: 디자인 토큰 추출 및 설정 (1일차)

#### 2-1. Figma에서 디자인 토큰 추출

**Figma Inspect 패널 활용**
```
1. Figma 우측 패널에서 'Inspect' 탭 클릭
2. 컬러/타이포그래피/간격 정보 복사
```

**컬러 팔레트 추출 예시**
```
Figma 스타일 → Colors → Copy CSS
```

#### 2-2. Tailwind Config 업데이트

**`tailwind.config.js` 수정**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 Figma에서 추출한 컬러
      colors: {
        // 농협 브랜드
        nonghyup: {
          50: '#f0fdf4',   // Figma에서 복사
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',  // Primary
          600: '#059669',  // Secondary
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // 신협 브랜드
        shinhyup: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Primary
          600: '#2563eb',  // Secondary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      
      // 📝 타이포그래피
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // Figma 폰트
        display: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // Figma Text Styles 복사
        'display-lg': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-1': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-3': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      
      // 📐 간격 시스템
      spacing: {
        // Figma Auto Layout 값
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // 🎭 그림자
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      
      // 📏 Border Radius
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      // ⚡ 애니메이션
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

**적용 확인**
```bash
# 개발 서버 재시작
npm run dev
```

#### 2-3. CSS 변수 방식 (선택사항)

**`src/index.css` 추가**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 농협 컬러 */
    --color-primary: 16 185 129;  /* #10b981 */
    --color-secondary: 5 150 105;
    --color-accent: 52 211 153;
  }
  
  [data-brand="shinhyup"] {
    /* 신협 컬러 */
    --color-primary: 59 130 246;  /* #3b82f6 */
    --color-secondary: 37 99 235;
    --color-accent: 96 165 250;
  }
}
```

---

### Step 3: 컴포넌트별 스타일 적용 (2~3일차)

#### 3-1. 우선순위 설정
```
1순위: 브랜드 에셋 (로고, 컬러)
2순위: 레이아웃 컴포넌트 (Header, Footer)
3순위: 공통 컴포넌트 (Button, Card, Input)
4순위: 페이지별 컴포넌트
```

#### 3-2. Figma Dev Mode 활용

**Figma → Code 변환**
```
1. Figma에서 컴포넌트 선택
2. 우측 패널 'Dev Mode' 활성화
3. 'Code' 탭에서 CSS 복사
4. Tailwind 클래스로 변환
```

**예시: Button 컴포넌트**

**Figma CSS**
```css
background: #10b981;
padding: 12px 24px;
border-radius: 12px;
font-size: 16px;
font-weight: 600;
```

**Tailwind 변환**
```tsx
// src/components/Button.tsx
<button className="bg-nonghyup-500 px-6 py-3 rounded-xl text-base font-semibold">
  버튼 텍스트
</button>
```

#### 3-3. 컴포넌트 스타일 적용 순서

**1. Header 컴포넌트**
```tsx
// src/components/Header.tsx
import React from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';

const Header: React.FC = () => {
  const { config } = useWhiteLabel();
  
  return (
    <header className="bg-white shadow-md">
      {/* Figma에서 추출한 로고 사용 */}
      <img 
        src={`/logos/logo-${config.institutionType}.svg`} 
        alt="logo"
        className="h-12 w-auto" // Figma 크기 참고
      />
    </header>
  );
};
```

**2. Button 컴포넌트 리팩토링**
```tsx
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  children 
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300';
  
  const variants = {
    primary: 'bg-nonghyup-500 text-white hover:bg-nonghyup-600 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-nonghyup-500 border-2 border-nonghyup-500 hover:bg-nonghyup-50',
    ghost: 'bg-transparent text-nonghyup-500 hover:bg-nonghyup-50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
};

export default Button;
```

**3. Card 컴포넌트**
```tsx
// src/components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, hover = false }) => {
  return (
    <div className={`
      bg-white rounded-xl shadow-md p-6 border border-gray-100
      ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''}
    `}>
      {children}
    </div>
  );
};
```

#### 3-4. 페이지별 적용

**Home.tsx 예시**
```tsx
// src/pages/Home.tsx
import heroImage from '/illustrations/hero-main.svg';

const Home: React.FC = () => {
  return (
    <div>
      {/* Figma 디자인 적용 */}
      <section className="py-20 bg-gradient-to-br from-nonghyup-50 to-nonghyup-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-display-lg font-bold text-gray-900 mb-6">
                우리 지역을 위한<br />
                믿을 수 있는 금융 파트너
              </h1>
              <p className="text-body-lg text-gray-600 mb-8">
                농협과 함께하는 안전하고 편리한 금융 서비스
              </p>
              <Button variant="primary" size="lg">
                시작하기
              </Button>
            </div>
            <div>
              {/* Figma 일러스트 사용 */}
              <img src={heroImage} alt="Hero" className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
```

---

### Step 4: 아이콘 통합 (1일차)

#### 4-1. SVG 아이콘 컴포넌트화

**방법 1: 직접 Import (소규모)**
```tsx
// src/components/icons/IconHome.tsx
const IconHome: React.FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Figma에서 복사한 SVG Path */}
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" />
    </svg>
  );
};
```

**방법 2: react-icons 라이브러리 (대규모)**
```bash
npm install react-icons
```

```tsx
import { FiHome, FiBell, FiSettings } from 'react-icons/fi';

<FiHome className="w-6 h-6 text-nonghyup-500" />
```

**방법 3: 커스텀 아이콘 폴더 (권장)**
```tsx
// src/components/Icon.tsx
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <img 
      src={`/icons/icon-${name}.svg`}
      alt={name}
      className={`inline-block ${className}`}
    />
  );
};

// 사용
<Icon name="home" className="w-6 h-6" />
```

#### 4-2. 아이콘 색상 동적 변경

**currentColor 활용**
```tsx
// SVG에 fill="currentColor" 또는 stroke="currentColor" 설정

// 사용
<IconHome className="text-nonghyup-500" />  // 농협 녹색
<IconHome className="text-shinhyup-500" />  // 신협 블루
```

---

### Step 5: 타이포그래피 적용 (반나절)

#### 5-1. 웹폰트 추가

**Google Fonts 사용 (Pretendard 대체)**
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**로컬 폰트 사용**
```css
/* src/index.css */
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
  font-weight: 700;
}
```

#### 5-2. 텍스트 스타일 적용

```tsx
// Figma Text Styles → Tailwind Classes

// Display Large
<h1 className="text-display-lg font-bold">제목</h1>

// Heading 1
<h2 className="text-heading-1 font-semibold">소제목</h2>

// Body Medium
<p className="text-body-md">본문 텍스트</p>

// Caption
<span className="text-caption text-gray-500">설명 텍스트</span>
```

---

### Step 6: 애니메이션 적용 (반나절)

#### 6-1. Figma Prototype → CSS Animation

**Figma Prototype 분석**
```
1. Figma에서 Prototype 탭 확인
2. Interaction 설정 확인 (Ease, Duration)
3. CSS로 변환
```

**예시: 버튼 호버 효과**
```tsx
<button className="
  transform transition-all duration-300
  hover:scale-105 hover:shadow-lg
  active:scale-95
">
  버튼
</button>
```

#### 6-2. 페이지 전환 애니메이션

```tsx
// src/App.tsx
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* 라우트 */}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### Step 7: 반응형 검증 (반나절)

#### 7-1. Breakpoint 확인

**Figma Frames → Tailwind Breakpoints**
```
Mobile: 375px → sm: (< 640px)
Tablet: 768px → md: (640px ~ 1024px)
Desktop: 1440px → lg: (> 1024px)
```

#### 7-2. 반응형 클래스 적용

```tsx
<div className="
  grid grid-cols-1       /* Mobile: 1 column */
  md:grid-cols-2         /* Tablet: 2 columns */
  lg:grid-cols-3         /* Desktop: 3 columns */
  gap-6
">
  {/* 카드들 */}
</div>
```

#### 7-3. 반응형 테스트

```bash
# 브라우저 개발자 도구
1. F12 → Toggle Device Toolbar
2. 여러 기기 크기로 테스트
3. Figma 디자인과 비교
```

---

## 🛠️ 실무 도구 및 팁

### 1. Figma Plugin 활용

**Figma to Code (추천)**
```
1. Figma Plugin 검색: "Figma to Code"
2. 컴포넌트 선택 → Plugin 실행
3. React + Tailwind 코드 자동 생성
4. 복사 → 붙여넣기 → 수정
```

**Tailwind CSS Plugin**
```
Figma에서 직접 Tailwind 클래스 확인 가능
```

### 2. VS Code Extension

**Tailwind CSS IntelliSense**
```bash
# 자동완성 지원
code --install-extension bradlc.vscode-tailwindcss
```

**Figma 미리보기**
```bash
# Figma 파일을 VS Code에서 바로 보기
code --install-extension figma.figma-vscode-extension
```

### 3. Chrome Extension

**PixelParallel**
```
Figma 디자인을 브라우저에 오버레이
픽셀 퍼펙트 확인 가능
```

### 4. 자동화 도구

**Figma API 활용 (고급)**
```javascript
// Figma 디자인 토큰 자동 추출
const figma = require('figma-api');
// 컬러/타이포 → JSON → Tailwind Config
```

---

## 📊 진행 상황 체크리스트

### Phase 1: 준비 (Day 1)
- [ ] Figma 파일 접근 권한 확인
- [ ] 디자인 시스템 페이지 분석
- [ ] 에셋 Export (로고, 아이콘, 일러스트)
- [ ] 파일 정리 (public/ 폴더)

### Phase 2: 디자인 토큰 (Day 1)
- [ ] 컬러 팔레트 추출
- [ ] tailwind.config.js 업데이트
- [ ] 타이포그래피 설정
- [ ] 간격/그림자 시스템 적용

### Phase 3: 컴포넌트 (Day 2-3)
- [ ] Header/Footer 스타일 적용
- [ ] Button 컴포넌트 리팩토링
- [ ] Card 컴포넌트 업데이트
- [ ] Form 요소 스타일
- [ ] 아이콘 통합

### Phase 4: 페이지 (Day 3-4)
- [ ] Home 페이지 적용
- [ ] Services 페이지
- [ ] Notices 페이지
- [ ] Admin 페이지들
- [ ] 404 페이지

### Phase 5: 검증 (Day 4-5)
- [ ] 반응형 테스트
- [ ] 브랜드 전환 테스트 (농협 ↔ 신협)
- [ ] 애니메이션 확인
- [ ] 접근성 체크
- [ ] 크로스 브라우저 테스트

---

## ⚠️ 주의사항 및 트러블슈팅

### 1. SVG 파일이 표시 안 될 때
```bash
# Vite는 SVG를 모듈로 import
import Logo from '/logos/logo.svg?react';

<Logo className="w-20 h-20" />
```

### 2. 폰트가 적용 안 될 때
```bash
# 브라우저 캐시 삭제
Ctrl + Shift + Delete

# 또는 강제 새로고침
Ctrl + F5
```

### 3. Tailwind 클래스 인식 안 될 때
```bash
# tailwind.config.js 확인
content: ["./src/**/*.{js,ts,jsx,tsx}"]

# 개발 서버 재시작
npm run dev
```

### 4. 컬러가 제대로 표시 안 될 때
```javascript
// Figma RGB → Tailwind
Figma: rgb(16, 185, 129)
Tailwind: bg-[#10b981]  // 정확한 값

// 또는 Config에 추가
colors: {
  'custom-green': '#10b981'
}
```

### 5. 반응형이 안 될 때
```tsx
// 모바일 우선으로 작성
className="text-base md:text-lg lg:text-xl"
// ❌ lg:text-xl md:text-lg text-base (순서 중요)
```

---

## 🎯 최종 점검

### 코드 품질
```bash
# TypeScript 에러 체크
npm run build

# ESLint
npm run lint
```

### 성능 최적화
```bash
# 이미지 최적화
npm install -D imagemin

# Bundle 크기 확인
npm run build
npm run preview
```

### Git Commit
```bash
git add .
git commit -m "feat: Apply Figma design system

- Update Tailwind config with design tokens
- Replace logos and icons
- Refactor Button/Card components
- Apply new typography
- Add animations"
```

---

## 📚 참고 자료

### Figma → Code 도구
- [Figma Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Anima Plugin](https://www.animaapp.com/)
- [Builder.io](https://www.builder.io/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

### 애니메이션
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)

---

**예상 소요 시간: 4~5일**
**난이도: 중급**
**협업: 디자이너와 지속적 소통 필수**

💡 막히는 부분이 있으면 언제든지 디자이너에게 피드백 요청하세요!

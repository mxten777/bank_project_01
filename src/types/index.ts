// 기관 유형
export type InstitutionType = 'nonghyup' | 'shinhyup';

// 컬러 테마
export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// 화이트라벨 설정
export interface WhiteLabelConfig {
  institutionType: InstitutionType;
  institutionName: string;
  logoUrl?: string;
  colorTheme: ColorTheme;
  mainMessage: string;
  ctaButtons: {
    primary: string;
    secondary: string;
  };
}

// 공지사항
export interface Notice {
  id: string;
  title: string;
  summary: string;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 문의
export interface Inquiry {
  id: string;
  name: string;
  contact: string;
  content: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

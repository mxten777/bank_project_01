import type { WhiteLabelConfig } from '../types';

// 사전 정의된 컬러 테마
export const COLOR_THEMES = {
  nonghyup: {
    primary: '#00843D',
    secondary: '#FFB800',
    accent: '#005826',
    background: '#F5F9F7',
    text: '#1A1A1A',
  },
  shinhyup: {
    primary: '#0066B3',
    secondary: '#00A0E9',
    accent: '#004A80',
    background: '#F0F7FC',
    text: '#1A1A1A',
  },
};

// 메인 메시지 템플릿
export const MAIN_MESSAGES = {
  nonghyup: [
    '지역 주민을 위한 디지털 안내 창구',
    '농협과 함께하는 지역 금융 안내 서비스',
    '편리한 정보 확인과 상담 연결',
  ],
  shinhyup: [
    '조합원과 더 가까운 디지털 소통 창구',
    '신협과 함께하는 생활 금융 안내',
    '가까운 금융, 쉬운 상담',
  ],
};

// CTA 버튼 템플릿
export const CTA_TEMPLATES = {
  nonghyup: [
    { primary: '문의하기', secondary: '안내받기' },
    { primary: '상담 신청', secondary: '서비스 안내' },
  ],
  shinhyup: [
    { primary: '상담 요청', secondary: '바로 문의' },
    { primary: '문의하기', secondary: '서비스 보기' },
  ],
};

// 기본 설정
export const DEFAULT_CONFIG: WhiteLabelConfig = {
  institutionType: 'nonghyup',
  institutionName: 'LocalBank ONE',
  colorTheme: COLOR_THEMES.nonghyup,
  mainMessage: MAIN_MESSAGES.nonghyup[0],
  ctaButtons: CTA_TEMPLATES.nonghyup[0],
};

// 톤앤매너 설명
export const TONE_DESCRIPTION = {
  nonghyup: '공공성과 안정성을 강조하는 공식적인 톤',
  shinhyup: '친근하고 일상적인 소통 중심의 톤',
};

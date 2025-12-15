import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Notice, Inquiry, WhiteLabelConfig } from '../types';

// ==================== 공지사항 관련 ====================

/**
 * 모든 공지사항 가져오기
 */
export const getNotices = async (): Promise<Notice[]> => {
  try {
    const noticesRef = collection(db, 'notices');
    const q = query(noticesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Notice[];
  } catch (error) {
    console.error('Get notices error:', error);
    throw error;
  }
};

/**
 * 공지사항 추가
 */
export const addNotice = async (notice: Omit<Notice, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const noticesRef = collection(db, 'notices');
    const docRef = await addDoc(noticesRef, {
      ...notice,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Add notice error:', error);
    throw error;
  }
};

/**
 * 공지사항 삭제
 */
export const deleteNotice = async (noticeId: string): Promise<void> => {
  try {
    const noticeRef = doc(db, 'notices', noticeId);
    await deleteDoc(noticeRef);
  } catch (error) {
    console.error('Delete notice error:', error);
    throw error;
  }
};

// ==================== 문의 관련 ====================

/**
 * 모든 문의 가져오기
 */
export const getInquiries = async (): Promise<Inquiry[]> => {
  try {
    const inquiriesRef = collection(db, 'inquiries');
    const q = query(inquiriesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Inquiry[];
  } catch (error) {
    console.error('Get inquiries error:', error);
    throw error;
  }
};

/**
 * 상태별 문의 가져오기
 */
export const getInquiriesByStatus = async (
  status: 'pending' | 'processing' | 'completed'
): Promise<Inquiry[]> => {
  try {
    const inquiriesRef = collection(db, 'inquiries');
    const q = query(
      inquiriesRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Inquiry[];
  } catch (error) {
    console.error('Get inquiries by status error:', error);
    throw error;
  }
};

/**
 * 문의 추가
 */
export const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const inquiriesRef = collection(db, 'inquiries');
    const docRef = await addDoc(inquiriesRef, {
      ...inquiry,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Add inquiry error:', error);
    throw error;
  }
};

/**
 * 문의 상태 업데이트
 */
export const updateInquiryStatus = async (
  inquiryId: string,
  status: 'pending' | 'processing' | 'completed'
): Promise<void> => {
  try {
    const inquiryRef = doc(db, 'inquiries', inquiryId);
    await updateDoc(inquiryRef, { status });
  } catch (error) {
    console.error('Update inquiry status error:', error);
    throw error;
  }
};

// ==================== 화이트라벨 설정 관련 ====================

/**
 * 화이트라벨 설정 가져오기
 */
export const getWhiteLabelConfig = async (institutionId: string) => {
  try {
    const configRef = doc(db, 'whitelabel-configs', institutionId);
    const docSnap = await getDoc(configRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Get whitelabel config error:', error);
    throw error;
  }
};

/**
 * 화이트라벨 설정 저장
 */
export const saveWhiteLabelConfig = async (institutionId: string, config: Partial<WhiteLabelConfig>): Promise<void> => {
  try {
    const configRef = doc(db, 'whitelabel-configs', institutionId);
    await setDoc(configRef, {
      ...config,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Save whitelabel config error:', error);
    throw error;
  }
};

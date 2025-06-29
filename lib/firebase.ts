import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo-app-id'
};

// Initialize Firebase only if API key is provided
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let googleProvider: any = null;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-key') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

// Export Firebase services
export { auth, db, storage, googleProvider };

// Authentication functions
export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

// User profile functions
export const createUserProfile = async (userId: string, userData: any) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Create user profile error:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

// Assessment results functions
export const savePersonalityAssessment = async (userId: string, results: any) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    await setDoc(doc(db, 'assessments', `${userId}_personality`), {
      userId,
      type: 'personality',
      results,
      completedAt: new Date()
    });
  } catch (error) {
    console.error('Save personality assessment error:', error);
    throw error;
  }
};

export const saveExpertiseAssessment = async (userId: string, results: any) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    await setDoc(doc(db, 'assessments', `${userId}_expertise`), {
      userId,
      type: 'expertise',
      results,
      completedAt: new Date()
    });
  } catch (error) {
    console.error('Save expertise assessment error:', error);
    throw error;
  }
};

// Company functions
export const searchCandidates = async (filters: any) => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    let q = query(collection(db, 'users'));
    
    if (filters.personalityType) {
      q = query(q, where('personalityType', '==', filters.personalityType));
    }
    
    if (filters.skills) {
      q = query(q, where('skills', 'array-contains-any', filters.skills));
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    
    const querySnapshot = await getDocs(q);
    const candidates = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return candidates;
  } catch (error) {
    console.error('Search candidates error:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    console.warn('Firebase not initialized, auth state listener not available');
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}; 
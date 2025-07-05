import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'trailie-d53aa.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo-app-id'
};

// Initialize Firebase only if API key is provided and not demo
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let googleProvider: any = null;

const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-key' ||
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your_firebase_api_key_here';



if (!isDemoMode) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.log('Running in demo mode - Firebase not initialized');
}

// Export Firebase services
export { auth, db, storage, googleProvider };

// Authentication functions
export const signInWithGoogle = async () => {
  if (!auth) {
    console.warn('Firebase auth not available - running in demo mode');
    throw new Error('Firebase not initialized - please configure Firebase or use demo mode');
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
    console.warn('Firebase auth not available - running in demo mode');
    throw new Error('Firebase not initialized - please configure Firebase or use demo mode');
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
    console.warn('Firebase auth not available - running in demo mode');
    throw new Error('Firebase not initialized - please configure Firebase or use demo mode');
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
    console.warn('Firebase auth not available - running in demo mode');
    return; // Silently return in demo mode
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
    console.log('Demo mode: Skipping Firebase createUserProfile');
    return; // Silently return in demo mode
  }
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Create user profile error:', error);
    // Don't throw error in demo mode
    if (!isDemoMode) {
      throw error;
    }
  }
};

export const getUserProfile = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo user profile');
    return {
      uid: userId,
      displayName: 'Demo User',
      email: 'demo@trailie.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };
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
    // Return demo data in demo mode instead of throwing
    if (isDemoMode) {
      return {
        uid: userId,
        displayName: 'Demo User',
        email: 'demo@trailie.com',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase updateUserProfile');
    return; // Silently return in demo mode
  }
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    // Don't throw error in demo mode
    if (!isDemoMode) {
      throw error;
    }
  }
};

// Assessment results functions
export const savePersonalityAssessment = async (userId: string, results: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase savePersonalityAssessment');
    return; // Silently return in demo mode
  }
  try {
    // Mevcut assessments koleksiyonuna kaydet
    await setDoc(doc(db, 'assessments', `${userId}_personality`), {
      userId,
      type: 'personality',
      results,
      completedAt: new Date()
    });
    
    // Reports koleksiyonuna da kaydet
    await saveUserReport(userId, {
      type: 'personality',
      results,
      summary: results.summary || results.description || 'DISC Kişilik Analizi',
      score: results.score || 85,
      strengths: results.strengths || [],
      devAreas: results.weaknesses || results.devAreas || [],
      details: results.details || results.description || '',
      completedAt: new Date()
    });
  } catch (error) {
    console.error('Save personality assessment error:', error);
    // Don't throw error in demo mode
    if (!isDemoMode) {
      throw error;
    }
  }
};

export const saveExpertiseAssessment = async (userId: string, results: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase saveExpertiseAssessment');
    return; // Silently return in demo mode
  }
  try {
    // Mevcut assessments koleksiyonuna kaydet
    await setDoc(doc(db, 'assessments', `${userId}_expertise`), {
      userId,
      type: 'expertise',
      results,
      completedAt: new Date()
    });
    
    // Reports koleksiyonuna da kaydet
    await saveUserReport(userId, {
      type: 'expertise',
      results,
      summary: results.summary || results.description || 'Uzmanlık Analizi',
      score: results.score || 85,
      strengths: results.strengths || results.skills || [],
      devAreas: results.weaknesses || results.devAreas || [],
      details: results.details || results.description || '',
      completedAt: new Date()
    });
  } catch (error) {
    console.error('Save expertise assessment error:', error);
    // Don't throw error in demo mode
    if (!isDemoMode) {
      throw error;
    }
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

export const saveSimulationResult = async (userId: string, simulationData: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase saveSimulationResult');
    return; // Silently return in demo mode
  }
  try {
    // Mevcut progress koleksiyonuna kaydet
    const progressRef = collection(db, 'users', userId, 'progress');
    await setDoc(doc(progressRef), {
      ...simulationData,
      createdAt: new Date(),
    });
    
    // Reports koleksiyonuna da kaydet
    await saveUserReport(userId, {
      type: 'simulation',
      ...simulationData,
      summary: simulationData.aiAnalysis?.summary || simulationData.simulationTitle || 'Simülasyon Sonucu',
      score: simulationData.aiAnalysis?.score || simulationData.score || 85,
      strengths: simulationData.aiAnalysis?.strengths || simulationData.strengths || [],
      devAreas: simulationData.aiAnalysis?.weaknesses || simulationData.weaknesses || simulationData.devAreas || [],
      details: simulationData.aiAnalysis?.details || simulationData.details || '',
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Save simulation result error:', error);
    // Don't throw error in demo mode
    if (!isDemoMode) {
      throw error;
    }
  }
};

export const getUserProgress = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo progress');
    return []; // Return empty array in demo mode
  }
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const q = query(progressRef, orderBy('createdAt', 'desc'), limit(20));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user progress error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

// CV functions
export const saveUserCV = async (userId: string, cvData: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase saveUserCV');
    return 'demo-cv-id'; // Return demo ID in demo mode
  }
  try {
    const cvsRef = collection(db, 'users', userId, 'cvs');
    const docRef = doc(cvsRef);
    await setDoc(docRef, {
      ...cvData,
      id: docRef.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Save user CV error:', error);
    // Return demo ID in demo mode instead of throwing
    if (isDemoMode) {
      return 'demo-cv-id';
    }
    throw error;
  }
};

export const getUserCVs = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo CVs');
    return []; // Return empty array in demo mode
  }
  try {
    const cvsRef = collection(db, 'users', userId, 'cvs');
    const q = query(cvsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user CVs error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const deleteUserCV = async (userId: string, cvId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const cvRef = doc(db, 'users', userId, 'cvs', cvId);
    await deleteDoc(cvRef);
  } catch (error) {
    console.error('Delete user CV error:', error);
    throw error;
  }
};

export const updateUserCV = async (userId: string, cvId: string, updates: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const cvRef = doc(db, 'users', userId, 'cvs', cvId);
    await updateDoc(cvRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Update user CV error:', error);
    throw error;
  }
};

// Messages and Notifications functions
export const saveUserMessage = async (userId: string, messageData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const messagesRef = collection(db, 'users', userId, 'messages');
    const docRef = doc(messagesRef);
    await setDoc(docRef, {
      ...messageData,
      id: docRef.id,
      createdAt: new Date(),
      read: false,
    });
    return docRef.id;
  } catch (error) {
    console.error('Save user message error:', error);
    throw error;
  }
};

export const getUserMessages = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo messages');
    return []; // Return empty array in demo mode
  }
  try {
    const messagesRef = collection(db, 'users', userId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user messages error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const markMessageAsRead = async (userId: string, messageId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const messageRef = doc(db, 'users', userId, 'messages', messageId);
    await updateDoc(messageRef, { read: true });
  } catch (error) {
    console.error('Mark message as read error:', error);
    throw error;
  }
};

export const saveUserNotification = async (userId: string, notificationData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const docRef = doc(notificationsRef);
    await setDoc(docRef, {
      ...notificationData,
      id: docRef.id,
      createdAt: new Date(),
      read: false,
    });
    return docRef.id;
  } catch (error) {
    console.error('Save user notification error:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo notifications');
    return []; // Return empty array in demo mode
  }
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const q = query(notificationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user notifications error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const notificationRef = doc(db, 'users', userId, 'notifications', notificationId);
    await updateDoc(notificationRef, { read: true });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
};

// Reports functions
export const saveUserReport = async (userId: string, reportData: any) => {
  if (!db) {
    console.log('Demo mode: Skipping Firebase saveUserReport');
    return 'demo-report-id'; // Return demo ID in demo mode
  }
  try {
    const reportsRef = collection(db, 'users', userId, 'reports');
    const docRef = doc(reportsRef);
    await setDoc(docRef, {
      ...reportData,
      id: docRef.id,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Save user report error:', error);
    // Return demo ID in demo mode instead of throwing
    if (isDemoMode) {
      return 'demo-report-id';
    }
    throw error;
  }
};

export const getUserReports = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo reports');
    return []; // Return empty array in demo mode
  }
  try {
    const reportsRef = collection(db, 'users', userId, 'reports');
    const q = query(reportsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user reports error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const deleteUserReport = async (userId: string, reportId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const reportRef = doc(db, 'users', userId, 'reports', reportId);
    await deleteDoc(reportRef);
  } catch (error) {
    console.error('Delete user report error:', error);
    throw error;
  }
};

// Interview results functions
export const saveInterviewResult = async (userId: string, interviewData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    // Reports koleksiyonuna kaydet
    await saveUserReport(userId, {
      type: 'interview',
      ...interviewData,
      summary: interviewData.summary || interviewData.aiAnalysis?.summary || 'Mülakat Değerlendirmesi',
      score: interviewData.score || interviewData.aiAnalysis?.score || 85,
      strengths: interviewData.strengths || interviewData.aiAnalysis?.strengths || [],
      devAreas: interviewData.devAreas || interviewData.weaknesses || interviewData.aiAnalysis?.devAreas || [],
      details: interviewData.details || interviewData.aiAnalysis?.details || '',
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Save interview result error:', error);
    throw error;
  }
};

// Job applications functions
export const saveJobApplication = async (userId: string, applicationData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const applicationsRef = collection(db, 'users', userId, 'job-applications');
    const docRef = doc(applicationsRef);
    await setDoc(docRef, {
      ...applicationData,
      id: docRef.id,
      createdAt: new Date(),
      status: 'applied', // applied, in-review, rejected, accepted
    });
    return docRef.id;
  } catch (error) {
    console.error('Save job application error:', error);
    throw error;
  }
};

export const getUserJobApplications = async (userId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const applicationsRef = collection(db, 'users', userId, 'job-applications');
    const q = query(applicationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user job applications error:', error);
    throw error;
  }
};

export const updateJobApplicationStatus = async (userId: string, applicationId: string, status: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const applicationRef = doc(db, 'users', userId, 'job-applications', applicationId);
    await updateDoc(applicationRef, { 
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update job application status error:', error);
    throw error;
  }
};

export const deleteJobApplication = async (userId: string, applicationId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const applicationRef = doc(db, 'users', userId, 'job-applications', applicationId);
    await deleteDoc(applicationRef);
  } catch (error) {
    console.error('Delete job application error:', error);
    throw error;
  }
};

// Network functions
export const saveConnection = async (userId: string, connectionData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const connectionsRef = collection(db, 'users', userId, 'connections');
    const docRef = doc(connectionsRef);
    await setDoc(docRef, {
      ...connectionData,
      id: docRef.id,
      createdAt: new Date(),
      status: 'pending', // pending, accepted, rejected
    });
    return docRef.id;
  } catch (error) {
    console.error('Save connection error:', error);
    throw error;
  }
};

export const getUserConnections = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo connections');
    return []; // Return empty array in demo mode
  }
  try {
    const connectionsRef = collection(db, 'users', userId, 'connections');
    const q = query(connectionsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user connections error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const updateConnectionStatus = async (userId: string, connectionId: string, status: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const connectionRef = doc(db, 'users', userId, 'connections', connectionId);
    await updateDoc(connectionRef, { 
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update connection status error:', error);
    throw error;
  }
};

export const saveNetworkSuggestion = async (userId: string, suggestionData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const suggestionsRef = collection(db, 'users', userId, 'network-suggestions');
    const docRef = doc(suggestionsRef);
    await setDoc(docRef, {
      ...suggestionData,
      id: docRef.id,
      createdAt: new Date(),
      viewed: false,
    });
    return docRef.id;
  } catch (error) {
    console.error('Save network suggestion error:', error);
    throw error;
  }
};

export const getNetworkSuggestions = async (userId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const suggestionsRef = collection(db, 'users', userId, 'network-suggestions');
    const q = query(suggestionsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get network suggestions error:', error);
    throw error;
  }
};

export const markSuggestionAsViewed = async (userId: string, suggestionId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const suggestionRef = doc(db, 'users', userId, 'network-suggestions', suggestionId);
    await updateDoc(suggestionRef, { viewed: true });
  } catch (error) {
    console.error('Mark suggestion as viewed error:', error);
    throw error;
  }
};

// Coaching functions
export const saveCoachingSession = async (userId: string, sessionData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const sessionsRef = collection(db, 'users', userId, 'coaching-sessions');
    const docRef = doc(sessionsRef);
    await setDoc(docRef, {
      ...sessionData,
      id: docRef.id,
      createdAt: new Date(),
      status: 'scheduled', // scheduled, completed, cancelled
    });
    return docRef.id;
  } catch (error) {
    console.error('Save coaching session error:', error);
    throw error;
  }
};

export const getUserCoachingSessions = async (userId: string) => {
  if (!db) {
    console.log('Demo mode: Returning demo coaching sessions');
    return []; // Return empty array in demo mode
  }
  try {
    const sessionsRef = collection(db, 'users', userId, 'coaching-sessions');
    const q = query(sessionsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user coaching sessions error:', error);
    // Return empty array in demo mode instead of throwing
    if (isDemoMode) {
      return [];
    }
    throw error;
  }
};

export const updateCoachingSession = async (userId: string, sessionId: string, updates: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const sessionRef = doc(db, 'users', userId, 'coaching-sessions', sessionId);
    await updateDoc(sessionRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update coaching session error:', error);
    throw error;
  }
};

export const saveCoachingNote = async (userId: string, sessionId: string, noteData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const notesRef = collection(db, 'users', userId, 'coaching-sessions', sessionId, 'notes');
    const docRef = doc(notesRef);
    await setDoc(docRef, {
      ...noteData,
      id: docRef.id,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Save coaching note error:', error);
    throw error;
  }
};

export const getCoachingNotes = async (userId: string, sessionId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const notesRef = collection(db, 'users', userId, 'coaching-sessions', sessionId, 'notes');
    const q = query(notesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get coaching notes error:', error);
    throw error;
  }
};

// B2B Admin functions
export const saveCompanyProfile = async (companyId: string, companyData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const companyRef = doc(db, 'companies', companyId);
    await setDoc(companyRef, {
      ...companyData,
      id: companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return companyId;
  } catch (error) {
    console.error('Save company profile error:', error);
    throw error;
  }
};

export const getCompanyProfile = async (companyId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const companyRef = doc(db, 'companies', companyId);
    const snapshot = await getDoc(companyRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Get company profile error:', error);
    throw error;
  }
};

export const searchCandidatesForCompany = async (filters: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    let q = query(collection(db, 'users'));
    
    if (filters.personalityType) {
      q = query(q, where('personalityType', '==', filters.personalityType));
    }
    
    if (filters.expertise) {
      q = query(q, where('expertise', 'array-contains-any', filters.expertise));
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    
    if (filters.experienceLevel) {
      q = query(q, where('experienceLevel', '==', filters.experienceLevel));
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

export const saveCompanyJobPosting = async (companyId: string, jobData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const jobsRef = collection(db, 'companies', companyId, 'jobs');
    const docRef = doc(jobsRef);
    await setDoc(docRef, {
      ...jobData,
      id: docRef.id,
      createdAt: new Date(),
      status: 'active', // active, closed, draft
    });
    return docRef.id;
  } catch (error) {
    console.error('Save company job posting error:', error);
    throw error;
  }
};

export const getCompanyJobPostings = async (companyId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const jobsRef = collection(db, 'companies', companyId, 'jobs');
    const q = query(jobsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get company job postings error:', error);
    throw error;
  }
};

export const saveCompanyAnalytics = async (companyId: string, analyticsData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const analyticsRef = collection(db, 'companies', companyId, 'analytics');
    const docRef = doc(analyticsRef);
    await setDoc(docRef, {
      ...analyticsData,
      id: docRef.id,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Save company analytics error:', error);
    throw error;
  }
};

export const getCompanyAnalytics = async (companyId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const analyticsRef = collection(db, 'companies', companyId, 'analytics');
    const q = query(analyticsRef, orderBy('createdAt', 'desc'), limit(30));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get company analytics error:', error);
    throw error;
  }
};

// Premium and Payment functions
export const saveUserSubscription = async (userId: string, subscriptionData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const subscriptionRef = doc(db, 'users', userId, 'subscriptions');
    await setDoc(subscriptionRef, {
      ...subscriptionData,
      id: subscriptionRef.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return subscriptionRef.id;
  } catch (error) {
    console.error('Save user subscription error:', error);
    throw error;
  }
};

export const getUserSubscription = async (userId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const subscriptionRef = doc(db, 'users', userId, 'subscriptions');
    const snapshot = await getDoc(subscriptionRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Get user subscription error:', error);
    throw error;
  }
};

export const savePayment = async (userId: string, paymentData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const paymentsRef = collection(db, 'users', userId, 'payments');
    const docRef = doc(paymentsRef);
    await setDoc(docRef, {
      ...paymentData,
      id: docRef.id,
      createdAt: new Date(),
      status: 'pending', // pending, completed, failed, refunded
    });
    return docRef.id;
  } catch (error) {
    console.error('Save payment error:', error);
    throw error;
  }
};

export const getUserPayments = async (userId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const paymentsRef = collection(db, 'users', userId, 'payments');
    const q = query(paymentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user payments error:', error);
    throw error;
  }
};

export const updatePaymentStatus = async (userId: string, paymentId: string, status: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const paymentRef = doc(db, 'users', userId, 'payments', paymentId);
    await updateDoc(paymentRef, { 
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    throw error;
  }
};

export const saveUserUsage = async (userId: string, usageData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const usageRef = collection(db, 'users', userId, 'usage');
    const docRef = doc(usageRef);
    await setDoc(docRef, {
      ...usageData,
      id: docRef.id,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Save user usage error:', error);
    throw error;
  }
};

export const getUserUsage = async (userId: string) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const usageRef = collection(db, 'users', userId, 'usage');
    const q = query(usageRef, orderBy('createdAt', 'desc'), limit(30));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get user usage error:', error);
    throw error;
  }
};

// Company assessment functions
export const uploadCompanyAssessment = async (companyId: string, assessmentData: any) => {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const assessmentId = `${companyId}_${Date.now()}`;
    await setDoc(doc(db, 'companyAssessments', assessmentId), {
      companyId,
      ...assessmentData,
      uploadedAt: new Date(),
      status: 'active'
    });
    return assessmentId;
  } catch (error) {
    console.error('Upload company assessment error:', error);
    throw error;
  }
}; 
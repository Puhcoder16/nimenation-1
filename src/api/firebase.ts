import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    type User
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    query, 
    onSnapshot, 
    addDoc, 
    deleteDoc, 
    doc, 
    serverTimestamp,
    type Unsubscribe
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALe0U1y9fbU_O7lqw1JOnsxMgrGsZSMS8",
  authDomain: "nimenation-website.firebaseapp.com",
  projectId: "nimenation-website",
  storageBucket: "nimenation-website.appspot.com",
  messagingSenderId: "1000097007041",
  appId: "1:1000097007041:web:3a2afbce8b84d407069b40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export interface Review {
  id: string;
  text: string;
  rating: number;
  authorName: string;
  authorPhotoURL: string;
  authorUid: string;
  createdAt: { seconds: number; nanoseconds: number; } | null;
}

// --- Fungsi Otentikasi Dasar ---
export const onAuthChange = (callback: (user: User | null) => void): Unsubscribe => {
    return onAuthStateChanged(auth, callback);
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

// --- Fungsi Login Pihak Ketiga ---
export const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

// --- Fungsi Baru untuk Email/Password ---
export const signUpWithEmail = async (name: string, email: string, pass: string): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
    }
};

export const signInWithEmail = async (email: string, pass: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, pass);
};

export const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
};


// --- Fungsi Firestore (Reviews) ---
export const subscribeToReviews = (callback: (reviews: Review[]) => void): Unsubscribe => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const reviewsCollectionRef = collection(db, `/artifacts/${appId}/public/data/reviews`);
    const q = query(reviewsCollectionRef);

    return onSnapshot(q, (snapshot) => {
        let reviewsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Review[];
        
        reviewsData.sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return b.createdAt.seconds - a.createdAt.seconds;
        });

        callback(reviewsData);
    });
};

export const addReview = async (user: User, text: string, rating: number): Promise<void> => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const reviewsCollectionRef = collection(db, `/artifacts/${appId}/public/data/reviews`);
    await addDoc(reviewsCollectionRef, {
        text,
        rating,
        authorName: user.displayName,
        authorPhotoURL: user.photoURL,
        authorUid: user.uid,
        createdAt: serverTimestamp(),
    });
};

export const deleteReview = async (reviewId: string): Promise<void> => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const reviewDocRef = doc(db, `/artifacts/${appId}/public/data/reviews`, reviewId);
    await deleteDoc(reviewDocRef);
};
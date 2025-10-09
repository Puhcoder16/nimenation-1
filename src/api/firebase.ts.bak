import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider,
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    type User
} from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    serverTimestamp, 
    onSnapshot,
    query,
    doc,
    deleteDoc,
    setDoc,
    getDoc
} from "firebase/firestore";

// --- Konfigurasi Firebase ---
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

// --- Otentikasi ---
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// --- Firestore ---
export interface Review {
    id: string; // ID dokumen akan sama dengan UID user
    authorName: string;
    authorPhotoURL: string;
    authorUid: string;
    text: string;
    rating: number;
    createdAt: { seconds: number; nanoseconds: number } | null;
    updatedAt?: { seconds: number; nanoseconds: number } | null;
}

// Mengambil semua review
export const subscribeToReviews = (callback: (reviews: Review[]) => void) => {
    const reviewsCollection = collection(db, 'reviews');
    const q = query(reviewsCollection);
    
    return onSnapshot(q, (snapshot) => {
        const reviewsData: Review[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));
        callback(reviewsData);
    });
};

// Mengambil review spesifik dari seorang user
export const getUserReview = async (userId: string): Promise<Review | null> => {
    const reviewDocRef = doc(db, 'reviews', userId);
    const docSnap = await getDoc(reviewDocRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Review;
    }
    return null;
}

// Menambah atau meng-update review (1 user = 1 review)
export const setReview = (user: User, text: string, rating: number, isUpdating: boolean) => {
  const reviewDocRef = doc(db, 'reviews', user.uid);
  const data = {
    authorName: user.displayName,
    authorPhotoURL: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`,
    authorUid: user.uid,
    text,
    rating,
    updatedAt: serverTimestamp(),
    ...( !isUpdating && { createdAt: serverTimestamp() } )
  };

  return setDoc(reviewDocRef, data, { merge: true });
};

// Menghapus review
export const deleteReview = (userId: string) => {
  return deleteDoc(doc(db, 'reviews', userId));
};
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider,
    signInWithPopup, 
    signOut, 
    onAuthStateChanged
} from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp, 
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export interface Review {
    id: string;
    authorName: string;
    authorPhotoURL: string;
    authorUid: string;
    text: string;
    rating: number;
    createdAt: { seconds: number } | null;
}

export const subscribeToReviews = (callback) => {
    const reviewsCollection = collection(db, 'reviews');
    const q = query(reviewsCollection, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
        const reviewsData: Review[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));
        callback(reviewsData);
    });
};

export const addReview = (user, text, rating) => {
  return addDoc(collection(db, 'reviews'), {
    authorName: user.displayName,
    authorPhotoURL: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`,
    authorUid: user.uid,
    text: text,
    rating: rating,
    createdAt: serverTimestamp()
  });
};

export const deleteReview = (reviewId) => {
  return deleteDoc(doc(db, 'reviews', reviewId));
};
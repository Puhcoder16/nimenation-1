import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification
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

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const signUpWithEmail = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
      displayName: name
  });
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Fungsi baru untuk mengirim ulang email verifikasi
export const resendVerificationEmail = async () => {
    if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
    } else {
        throw new Error("Tidak ada pengguna yang sedang login.");
    }
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
  if (!user.emailVerified) {
    throw new Error("Hanya pengguna terverifikasi yang bisa memberi ulasan.");
  }
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
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZQbSgJLpHBTE0JPpSxYR5orniPbBxMvk',
  authDomain: 'foodies-app-4033a.firebaseapp.com',
  projectId: 'foodies-app-4033a',
  storageBucket: 'foodies-app-4033a.appspot.com',
  messagingSenderId: '469180113989',
  appId: '1:469180113989:web:a854f58780f6236752ef2c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

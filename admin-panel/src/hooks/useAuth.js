import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export const useAuth = () => {
          const context = useContext(AuthContext);

          const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
          const resetPassword = (email) => sendPasswordResetEmail(auth, email);
          const logout = () => signOut(auth);

          return { ...context, login, resetPassword, logout };
};
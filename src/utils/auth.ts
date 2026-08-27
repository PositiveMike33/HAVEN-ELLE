import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Calendar scopes
provider.addScope('https://www.googleapis.com/auth/calendar');
// Contacts scopes
provider.addScope('https://www.googleapis.com/auth/contacts');
// Drive scopes
provider.addScope('https://www.googleapis.com/auth/drive.appdata');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedIdToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string, idToken: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken && cachedIdToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken, cachedIdToken);
      } else if (!isSigningIn) {
        try {
          cachedIdToken = await user.getIdToken();
          // Still need access token for Google APIs, which requires signInWithPopup
          // So if we don't have it, we might need them to log in again.
          if (cachedAccessToken && onAuthSuccess) {
            onAuthSuccess(user, cachedAccessToken, cachedIdToken);
          } else {
             if (onAuthFailure) onAuthFailure();
          }
        } catch {
          cachedAccessToken = null;
          cachedIdToken = null;
          if (onAuthFailure) onAuthFailure();
        }
      }
    } else {
      cachedAccessToken = null;
      cachedIdToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string; idToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }
    cachedAccessToken = credential.accessToken;
    cachedIdToken = await result.user.getIdToken();
    return { user: result.user, accessToken: cachedAccessToken, idToken: cachedIdToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (cachedAccessToken) return cachedAccessToken;
  
  try {
    const result = await googleSignIn();
    return result?.accessToken || null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

export const getIdToken = async (): Promise<string | null> => {
  if (cachedIdToken) return cachedIdToken;
  const user = auth.currentUser;
  if (user) {
    cachedIdToken = await user.getIdToken();
    return cachedIdToken;
  }
  return null;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedIdToken = null;
};

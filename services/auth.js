import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

export const registerUser = async (email, password) => {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password);
  return userCreds.user;
};

export const signUser = async (email, password) => {
  const userCreds = await signInWithEmailAndPassword(auth, email, password);
    
  return userCreds.user;
};

export const insertNewUserInDb = async (username, email, phoneNumber, user) => {
  await setDoc(doc(db, "users", user.uid), {
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    createdAt: new Date(),
    uid: user.uid,
    avatarFile: "BEAR",
  });
};

export const getUserFromDb = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  

  return await getDoc(userDocRef);
};

export const updateUserPassword = async (password) => {
  if (password) {
    await updatePassword(auth.currentUser, password);
  }
};

export const updateUserData = async (user, updatedUser) => {
  const userDocRef = doc(db, "users", user.uid);

  await updateDoc(userDocRef, updatedUser);
};

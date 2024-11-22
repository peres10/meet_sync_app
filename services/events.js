import { Alert } from "react-native";
import { db } from "../firebaseConfig"; // Import your Firebase config
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore"; // Firestore methods

export const createEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), eventData);
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    // Reference to the event document
    const eventDoc = doc(db, "events", eventId);

    // Delete the event from Firestore
    await deleteDoc(eventDoc);

    Alert.alert(`Event with ID: ${eventId} has been deleted.`);

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
};

export const getAllEvents = async () => {
  try {
    const eventsCollection = collection(db, "events");
    const snapshot = await getDocs(eventsCollection);
    const eventsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return eventsList
  } catch (e) {
    console.error("Error getting events:", error);
    return [];
  }
};

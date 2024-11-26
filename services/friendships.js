import { db, auth } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getFriendsList = async (uid) => {
  try {
    const friendshipDocRef = await doc(db, "friendships", uid);

    const friendshipDoc = await getDoc(friendshipDocRef);

    if (!friendshipDoc.exists()) {
      return [];
    }

    const { friends } = friendshipDoc.data(); // Assuming `friends` is an array of document references
    if (!friends || friends.length === 0) {
      return [];
    }

    const friendsDetails = await Promise.all(
      friends.map(async (friendRef) => {
        const friendDoc = await getDoc(friendRef); // Resolve each reference
        if (friendDoc.exists()) {
          return { id: friendDoc.id, ...friendDoc.data() };
        }
        return null; // Handle case where reference points to non-existent doc
      })
    );

    return friendsDetails;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
};

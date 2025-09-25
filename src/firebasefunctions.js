import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // tu configuración de Firebase

export const getLatestReading = async () => {
  const readingsRef = collection(db, "https://mold-detector-f5b34-default-rtdb.firebaseio.com/sensors");
  const q = query(readingsRef, orderBy("timestamp", "desc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
  return null;
};

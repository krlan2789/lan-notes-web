import { signInAnonymously, updateProfile } from "firebase/auth";

export const useAnonAuth = async () => {
  const { firebaseAuth } = useFirebaseClient();
  await signInAnonymously(firebaseAuth);

  const updateNickname = async (newVal: string) => {
    if (firebaseAuth.currentUser) {
      await updateProfile(firebaseAuth.currentUser, {
        displayName: newVal,
      });
    }
  };

  const userId = firebaseAuth.currentUser?.uid || "";
  const userToken = await firebaseAuth.currentUser?.getIdToken() || "";
  const userNickname = firebaseAuth.currentUser?.displayName || null;
  // console.log(JSON.stringify(firebaseAuth.currentUser));

  return {
    userId,
    userToken,
    userNickname,
    updateNickname,
  };
};

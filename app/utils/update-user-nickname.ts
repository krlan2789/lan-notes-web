import type IUserAuth from "./models/IUserAuth";

export default async (newNickname: string) => {
  const { userToken } = await useAnonAuth();
  if (newNickname) {
    const res = await $fetch<IUserAuth>(`/api/users/nickname`, {
      method: "PUT",
      headers: {
        Accept: 'applications/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: { nickname: newNickname }
    });

    return res;
  }
  return null;
}

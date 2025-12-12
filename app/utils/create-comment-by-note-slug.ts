export default async (slug: string, content: string, nickname: string) => {
  const { userToken } = await useAnonAuth();
  await $fetch<any>(`/api/comments/${slug}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${userToken}` },
    body: { nickname: nickname, content: content },
  }).catch(res => {
    console.log('reason:', res);
  });
}

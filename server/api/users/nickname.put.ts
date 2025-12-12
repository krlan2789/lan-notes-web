import UpdateNicknameDto from "~~/server/dtos/UpdateNicknameDto";
import { updateDisplayName } from "~~/server/libs/firebase-rest";

export default defineEventHandler(async (event) => {
  const userToken = '' + event.context.auth?.userToken;
  const { nickname } = await readBody<UpdateNicknameDto>(event);

  if (!userToken || !nickname) {
    throw createError({ statusCode: 400, statusMessage: "userToken and nickname are required" });
  }

  const updatedUser = await updateDisplayName(userToken, nickname);
  return updatedUser;
});

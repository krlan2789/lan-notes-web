import BaseResponseDto from "~~/server/dtos/BaseResponseDto";
// import { signInAnonymously } from "../../libs/firebase-rest";
import IUserAuth from "~/utils/models/IUserAuth";

export default defineEventHandler(async () => {
  // const user = await signInAnonymously();
  // return user;
  const res: BaseResponseDto = {
    statusCode: 200,
    data: {
      userId: '-',
      userToken: '-',
      refreshToken: '-',
      nickname: '',
    },
  };
  return Promise.resolve(res);
});

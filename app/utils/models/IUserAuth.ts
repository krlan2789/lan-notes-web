export default interface IUserAuth {
	userId: string;
	userToken: string;
	refreshToken: string;
	nickname?: string;
	email?: string;
}

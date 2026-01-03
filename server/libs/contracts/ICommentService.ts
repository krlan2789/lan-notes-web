import type NoteCommentModel from "~~/server/models/NoteCommentModel";

export const CommentServiceToken = "ICommentService";

export interface ICommentService {
	/**
	 * Get comments for a note (Firestore REST API)
	 * @param userToken
	 * @param slug
	 * @returns
	 */
	getComments(host: string, slug: string): Promise<NoteCommentModel[]>;
	/**
	 * Create new comment in a note (Firestore REST API)
	 * @param userToken
	 * @param data
	 * @returns
	 */
	createComment(host: string, data: NoteCommentModel): Promise<void>;
}

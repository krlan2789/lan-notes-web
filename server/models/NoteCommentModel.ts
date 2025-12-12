export default interface NoteCommentModel {
    id?: string;
    userId?: string;
    noteSlug: string;
    content: string;
    nickname: string;
    createdAt: string;
}
import { H3Event, EventHandlerRequest } from "h3";
import type NoteCommentModel from "~~/server/models/NoteCommentModel";
import containerRegistry from "~~/server/libs/container-registry";
import { ICommentService } from "~~/server/libs/contracts/ICommentService";
import { FirebaseServiceToken, IFirebaseService } from "~~/server/libs/contracts/IFirebaseService";

export class CommentService implements ICommentService {
    private firebaseService: IFirebaseService;

    constructor(event: H3Event<EventHandlerRequest>) {
        this.firebaseService = containerRegistry.resolve<IFirebaseService>(FirebaseServiceToken, event) || (() => { throw new Error('Failed to resolve FirebaseService in CommentService'); })();
    }

    /**
     * Get comments for a note
     * @param userToken
     * @param slug
     * @returns
     */
    async getComments(host: string, slug: string): Promise<NoteCommentModel[]> {
        const data = await this.firebaseService.fetchDocument(`host/${host}/notes/${slug}/comments`);
        // console.log('fetchComments.data:', data);
        let docs: NoteCommentModel[] = [];
        if (data?.documents) {
            docs = data.documents.map(
                (doc: any) =>
                    ({
                        id: doc.name.split("/").pop(),
                        noteSlug: doc.fields.noteSlug?.stringValue,
                        userId: doc.fields.uid?.stringValue,
                        content: doc.fields.content?.stringValue,
                        nickname: doc.fields.nickname?.stringValue,
                        createdAt: doc.fields.createdAt?.stringValue,
                    }) as NoteCommentModel,
            ) as NoteCommentModel[];
            docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            // console.log(docs);
        }
        return docs;
    }

    /**
     * Create new comment in a note
     * @param userToken
     * @param data
     * @returns
     */
    async createComment(host: string, data: NoteCommentModel) {
        await this.firebaseService.storeDocument(`host/${host}/notes/${data.noteSlug}/comments`, {
            content: { stringValue: data.content },
            createdAt: { stringValue: data.createdAt },
            // userId: { stringValue: data.userId },
            nickname: { stringValue: data.nickname },
            noteSlug: { stringValue: data.noteSlug },
        });
    }
}

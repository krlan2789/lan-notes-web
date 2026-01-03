import type { StreamingBlobPayloadInputTypes } from "@smithy/types/dist-types/streaming-payload/streaming-blob-payload-input-types";

export const S3ClientServiceToken = "IS3ClientService";

export type S3ObjectData = {
	data?: string;
	buffer?: Uint8Array<ArrayBufferLike>;
	lastModified?: Date;
};

export interface IS3ClientService {
	fetchStringObject(key: string): Promise<S3ObjectData | undefined>;
	fetchBufferObject(key: string): Promise<S3ObjectData | undefined>;
	generateSignedUrl(key: string): Promise<string | undefined>;
	sendMarkdownObject(key: string, body: string): Promise<void>;
	sendCustomObject<T extends StreamingBlobPayloadInputTypes>(key: string, body: T, contentType?: string): Promise<void>;
}

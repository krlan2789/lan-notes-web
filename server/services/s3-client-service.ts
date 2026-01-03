import { H3Event, EventHandlerRequest } from "h3";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StreamingBlobPayloadInputTypes } from "@smithy/types";
import { IS3ClientService, S3ObjectData } from "~~/server/libs/contracts/IS3ClientService";

export class S3ClientService implements IS3ClientService {
	private s3Client: S3Client = new S3Client({
		region: "auto",
		endpoint: process.env.S3_ENDPOINT as string,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
			accountId: process.env.S3_ACCOUNT_ID as string,
		},
	});

	constructor(event: H3Event<EventHandlerRequest>) { }

	async fetchStringObject(key: string): Promise<S3ObjectData | undefined> {
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key.startsWith('/') ? key.substring(1) : key,
		});

		// console.log("GetObjectCommand:", command);
		const response = await this.s3Client.send(command);
		// console.log("ContentType:", response.ContentType);
		// console.log("LastModified:", response.LastModified);
		// console.log("ETag:", response.ETag);
		// console.log("Metadata:", response.Metadata);
		const text = await response.Body?.transformToString();
		return { data: text, lastModified: response.LastModified };
	}

	async fetchBufferObject(key: string): Promise<S3ObjectData | undefined> {
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key.startsWith('/') ? key.substring(1) : key,
		});

		const response = await this.s3Client.send(command);
		const data = await response.Body?.transformToByteArray();
		return { buffer: data, lastModified: response.LastModified };
	}

	async generateSignedUrl(key: string): Promise<string | undefined> {
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key.startsWith('/') ? key.substring(1) : key,
		});

		const url = await getSignedUrl(this.s3Client, command, { expiresIn: 5 * 60 });
		return url;
	}

	async sendMarkdownObject(key: string, body: string): Promise<void> {
		const command = new PutObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key.startsWith('/') ? key.substring(1) : key,
			Body: body,
			ContentType: "text/markdown",
		});
		await this.s3Client.send(command);
	}

	async sendCustomObject<T extends StreamingBlobPayloadInputTypes>(
		key: string,
		body: T,
		contentType?: string,
	): Promise<void> {
		const command = new PutObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME as string,
			Key: key.startsWith('/') ? key.substring(1) : key,
			Body: body,
			ContentType: contentType,
		});
		await this.s3Client.send(command);
	}
}

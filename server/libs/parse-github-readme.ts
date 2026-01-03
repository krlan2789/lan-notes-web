export default async (url: string): Promise<string | undefined> => {
	if (url != null && typeof url == "string") {
		const readmeUrl = ("" + url).replace("github.com", "raw.githubusercontent.com") + "/main/README.md";
		const res = await fetch(readmeUrl);
		return await res.text();
	}
	return Promise.resolve(undefined);
};

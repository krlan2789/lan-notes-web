export default async (type: string, url: string): Promise<string> => {
	if (type.length > 0 && url.length > 0) {
		let readmeUrl = "";
		switch (type.toLowerCase()) {
			case "github":
				readmeUrl = ("" + url).replace("github.com", "raw.githubusercontent.com") + "/main/README.md";
				break;
			case "local":
				readmeUrl = window.location.origin + url;
				break;
		}
		// console.log(readmeUrl);
		const res = await fetch(readmeUrl);
		return await res.text();
	}
	return Promise.resolve("");
};

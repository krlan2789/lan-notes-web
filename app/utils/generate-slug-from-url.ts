export default (url: string, toRemoves: string[] = [".md", ".mdx"]) => {
	const urlArr = url.split("/");
	let slug = urlArr[urlArr.length - 1] || "";
	if (toRemoves) {
		for (const remove of toRemoves) {
			slug = slug.replace(remove, "");
		}
	}
	return slug;
};

export const getTagName = (url: string) => {
	const regex = /tagged\/(\w+)/;
	const match = url.match(regex);
	if (!match) return "";
	return match[1];
}


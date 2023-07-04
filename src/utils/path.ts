export const getTagName = (url: string) => {
	const regex = /tagged\/(\w+)/;
	const match = url.match(regex);
	if (!match) return "";
	return match[1];
}

export const getQuestionId = (url: string) => {
	const regex = /question\/(\w+)/;
	const match = url.match(regex)
	if (!match) return ""
	return match[1]
}

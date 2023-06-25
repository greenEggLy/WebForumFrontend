export const parseDateFormat = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	const min = date.getMinutes();
	return new Date(year, month, day, hour, min);
};

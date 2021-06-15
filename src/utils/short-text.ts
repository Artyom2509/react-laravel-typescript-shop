export const shortText = (text: string, max: number) =>
	text ? text.substr(0, max).concat(text.length > max ? '...' : '') : null;

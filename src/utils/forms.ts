export const setFormData = (data: { [x: string]: any }) => {
	const formData = new FormData();

	const keys = Object.keys(data);
	keys.forEach((key) => formData.append(key, data[key]));

	return formData;
};

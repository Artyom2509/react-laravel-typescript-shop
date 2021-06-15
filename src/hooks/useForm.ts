import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';

type UseFormType<T> = [
	T,
	(event: ChangeEvent<HTMLInputElement>) => void,
	Dispatch<SetStateAction<T>>
];

export const useForm = <T>(initialState: T): UseFormType<T> => {
	const [form, setForm] = useState<T>(initialState);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();
		setForm((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	return [form, handleChange, setForm];
};

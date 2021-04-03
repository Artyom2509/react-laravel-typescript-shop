import classNames from 'classnames';

export const createBEM = (namespace: string) => {
	return {
		create: (blockName: string) => {
			let block = blockName;

			if (typeof namespace === 'string') {
				block = `${namespace}-${blockName}`;
			}

			return {
				b: (...more: string[]) => {
					return classNames(block, more);
				},
				e: (className: string, ...more: string[]) => {
					return classNames(`${block}__${className}`, more);
				},
				m: (className: string, ...more: string[]) => {
					return classNames(`${block}--${className}`, more);
				},
			};
		},
	};
};

export const bemNames = createBEM('cr');

export default bemNames;

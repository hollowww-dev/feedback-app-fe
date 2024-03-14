import { Category } from '../types';

export const isCategory = (param: string): param is Category => {
	return Object.keys(Category)
		.map(v => v.toString())
		.includes(param);
};

export const findCategoryValue = (categoryKey: Category) => {
	const category = Object.entries(Category).find(entry => categoryKey === entry[0]);
	if (category) {
		return category[1];
	}
};

export const findCategoryKey = (categoryValue: Category) => {
	const category = Object.entries(Category).find(entry => categoryValue === entry[1]);
	if (category) {
		return category[0];
	}
};

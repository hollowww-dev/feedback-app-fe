import { Category } from '../../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../../Buttons';

import { Bracket } from './Bracket';

const Categories = styled(Bracket)`
	${ButtonCategory} {
		margin: 0.5em 0.75em 0.5em 0;
	}
`;

const CategoriesBoard = () => {
	return (
		<Categories>
			<ButtonCategory>All</ButtonCategory>
			{Object.keys(Category).map(category => {
				return <ButtonCategory key={category}>{category}</ButtonCategory>;
			})}
		</Categories>
	);
};

export default CategoriesBoard;

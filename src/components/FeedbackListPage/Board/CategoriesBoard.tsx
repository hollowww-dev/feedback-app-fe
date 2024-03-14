import { Category, Filter } from '../../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../../Buttons';

import { Bracket } from './Bracket';

const Categories = styled(Bracket)`
	${ButtonCategory} {
		margin: 0.5em 0.75em 0.5em 0;
	}
`;

const CategoriesBoard = ({
	filter,
	updateFilter,
}: {
	filter: Filter;
	updateFilter: (category: string) => void;
}) => {
	return (
		<Categories>
			<ButtonCategory
				className={filter === 'all' ? 'active' : ''}
				onClick={() => {
					updateFilter('all');
				}}>
				All
			</ButtonCategory>
			{Object.entries(Category).map(category => {
				return (
					<ButtonCategory
						key={category[1]}
						className={filter === category[1] ? 'active' : ''}
						onClick={() => {
							updateFilter(category[0]);
						}}>
						{category[0]}
					</ButtonCategory>
				);
			})}
		</Categories>
	);
};

export default CategoriesBoard;

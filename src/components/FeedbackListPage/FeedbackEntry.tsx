import { Entry } from '../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';
import { findCategoryKey } from '../../utils/utils';

const FeedbackSingle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1em;
	padding: 1.5em 1.5em;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
`;

const FeedbackEntry = ({
	entry,
	updateFilter,
}: {
	entry: Entry;
	updateFilter: (category: string) => void;
}) => {
	const categoryKey = findCategoryKey(entry.category);

	return (
		<FeedbackSingle>
			<h3>{entry.title}</h3>
			<p>{entry.description}</p>
			{categoryKey ? (
				<ButtonCategory onClick={() => updateFilter(categoryKey)}>{categoryKey}</ButtonCategory>
			) : (
				<ButtonCategory>Undefined</ButtonCategory>
			)}
		</FeedbackSingle>
	);
};

export default FeedbackEntry;

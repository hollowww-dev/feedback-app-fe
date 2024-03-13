import { Entry, Category } from '../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';

const FeedbackSingle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1em;
	padding: 1.5em 1.5em;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
`;

const FeedbackEntry = ({ entry }: { entry: Entry }) => {
	const category = Object.entries(Category).find(a => a[1] === entry.category);

	return (
		<FeedbackSingle>
			<h3>{entry.title}</h3>
			<p>{entry.description}</p>
			<ButtonCategory>{category ? category[0] : 'Undefined'}</ButtonCategory>
		</FeedbackSingle>
	);
};

export default FeedbackEntry;

import { Entry } from '../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';
import { findCategoryKey } from '../../utils/utils';

import IconArrowUp from '../../assets/shared/icon-arrow-up.svg?react';
import IconComments from '../../assets/shared/icon-comments.svg?react';
import breakpoints from '../../utils/breakpoints';

const FeedbackSingle = styled.div`
	.content {
		width: 100%;
		display: flex;
		order: 1;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
		@media (min-width: ${breakpoints.tablet}) {
			order: 2;
		}
	}
	.votes {
		padding: 0.5em 1em;
		display: flex;
		order: 2;
		align-self: flex-start;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		border-radius: 10px;
		font-size: 1.3rem;
		font-weight: 600;
		color: ${({ theme }) => theme.headline};
		background-color: ${({ theme }) => theme.bodyBackground};
		&:hover {
			background-color: ${({ theme }) => theme.hoverBackground};
		}
		@media (min-width: ${breakpoints.tablet}) {
			width: 40px;
			padding: 0.5em;
			flex-direction: column;
			gap: 0.25em;
			svg {
				margin-top: 0.5em;
			}
		}
	}
	.comments {
		display: flex;
		order: 3;
		align-self: center;
		align-items: center;
		gap: 0.75em;
		padding: 0.5em 1em;
		color: ${({ theme }) => theme.headline};
		font-weight: 600;
		&.noComments {
			opacity: 0.75;
		}
	}
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 1em;
	padding: 1.5em 1.5em;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	&:hover {
		cursor: pointer;
	}
	&:hover h3 {
		color: ${({ theme }) => theme.secondary};
	}
	@media (min-width: ${breakpoints.tablet}) {
		flex-wrap: nowrap;
	}
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
			<div className="votes">
				<IconArrowUp />
				{entry.upvotes}
			</div>
			<div className="content">
				<h3>{entry.title}</h3>
				<p>{entry.description}</p>
				{categoryKey ? (
					<ButtonCategory onClick={() => updateFilter(categoryKey)}>{categoryKey}</ButtonCategory>
				) : (
					<ButtonCategory>Undefined</ButtonCategory>
				)}
			</div>
			<div className={entry.comments > 0 ? 'comments' : 'comments noComments'}>
				<IconComments />
				{entry.comments}
			</div>
		</FeedbackSingle>
	);
};

export default FeedbackEntry;

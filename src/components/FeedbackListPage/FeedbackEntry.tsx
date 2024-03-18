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
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
		@media (min-width: ${breakpoints.tablet}) {
			order: 2;
		}
	}
	.votes {
		padding: 0.5em 1em;
		overflow: hidden;
		display: flex;
		align-self: flex-start;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		border-radius: 10px;
		font-size: 1.3rem;
		font-weight: 600;
		color: ${({ theme }) => theme.headline};
		background-color: ${({ theme }) => theme.bodyBackground};
		svg {
			color: ${({ theme }) => theme.secondary};
		}
		&:hover {
			background-color: ${({ theme }) => theme.hoverBackground};
		}
		&.active {
			background-color: ${({ theme }) => theme.secondary};
			color: ${({ theme }) => theme.white};
			svg {
				color: ${({ theme }) => theme.white};
			}
		}
		@media (min-width: ${breakpoints.tablet}) {
			width: 40px;
			padding: 0.5em;
			flex-direction: column;
			order: 1;
			gap: 0.25em;
			svg {
				margin-top: 0.5em;
			}
		}
	}
	.comments {
		display: flex;
		align-self: center;
		align-items: center;
		gap: 0.75em;
		padding: 0.5em 1em;
		color: ${({ theme }) => theme.headline};
		font-weight: 600;
		&.noComments {
			opacity: 0.7;
		}
		@media (min-width: ${breakpoints.tablet}) {
			order: 3;
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
		gap: 2em;
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
			<div className="content">
				<h3>{entry.title}</h3>
				<p>{entry.description}</p>
				{categoryKey ? (
					<ButtonCategory onClick={() => updateFilter(categoryKey)}>{categoryKey}</ButtonCategory>
				) : (
					<ButtonCategory>Undefined</ButtonCategory>
				)}
			</div>
			<div className="votes">
				<IconArrowUp />
				{entry.upvotes}
			</div>
			<div className={entry.comments > 0 ? 'comments' : 'comments noComments'}>
				<IconComments />
				{entry.comments}
			</div>
		</FeedbackSingle>
	);
};

export default FeedbackEntry;

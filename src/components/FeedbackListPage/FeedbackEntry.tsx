import { Entry, LoggedUser } from '../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';
import { findCategoryKey } from '../../utils/utils';

import IconArrowUp from '../../assets/shared/icon-arrow-up.svg?react';
import IconComments from '../../assets/shared/icon-comments.svg?react';
import breakpoints from '../../utils/breakpoints';
import { useMutation, useQueryClient } from 'react-query';
import { useToken, useUpdate } from '../../context/loginHooks';
import feedbackService from '../../services/feedbackService';

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
		padding: 0.4em 1em;
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
			padding: 0.4em;
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
	voted,
	updateFilter,
}: {
	entry: Entry;
	voted: boolean;
	updateFilter: (category: string) => void;
}) => {
	const token = useToken();
	const update = useUpdate();

	const queryClient = useQueryClient();
	const voteMutation = useMutation(
		({ id, token }: { id: string; token: string }) => feedbackService.vote(id, token),
		{
			onSuccess: (response: { entry: Entry; user: LoggedUser }) => {
				const feedback = queryClient.getQueryData<Entry[]>(['feedback']);
				queryClient.setQueryData(
					['feedback'],
					feedback
						? feedback.map(entry => (entry.id !== response.entry.id ? entry : response.entry))
						: [response.entry]
				);
				update({ user: response.user });
			},
			onError: (error: unknown) => {
				console.log(error);
			},
		}
	);

	const vote = (id: string) => {
		if (!token) {
			return console.log('No token...');
		}
		voteMutation.mutate({ id, token });
	};
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
			<div className={voted ? 'votes active' : 'votes'} onClick={() => vote(entry.id)}>
				<IconArrowUp />
				{entry.upvotes}
			</div>
			<div className="comments">
				<IconComments />
				{entry.comments}
			</div>
		</FeedbackSingle>
	);
};

export default FeedbackEntry;

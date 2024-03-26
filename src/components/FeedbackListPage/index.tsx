import { Entry, RoadmapCount, Filter, SortBy } from '../../types';

import { isCategory, findCategoryValue } from '../../utils/utils';

import { useState, useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useLoggedUser, useToken } from '../../context/loginHooks';

import feedbackService from '../../services/feedbackService';

import _ from 'lodash';

import Board from './Board';
import FeedbackEntry from './FeedbackEntry';
import NoFeedback from './NoFeedback';

import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import { ButtonPrimary } from '../Buttons';

import IconSuggestions from '../../assets/suggestions/icon-suggestions.svg?react';
import IconPlus from '../../assets/shared/icon-plus.svg?react';

const FeedbackPageContainer = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	@media (min-width: ${breakpoints.tablet}) {
		padding: 1em 1em;
		gap: 1em;
	}
	@media (min-width: ${breakpoints.desktop}) {
		flex-direction: row;
	}

	@media (min-width: ${breakpoints.bigDesktop}) {
		max-width: ${breakpoints.bigDesktop};
	}
`;

const FeedbackList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1em;
	.entries {
		padding: 1em 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		@media (min-width: ${breakpoints.tablet}) {
			padding: 0;
		}
	}
`;

const FeedbackListHeader = styled.div`
	padding: 0.5em 1em;
	display: flex;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.headerBackground};
	@media (min-width: ${breakpoints.tablet}) {
		border-radius: 10px;
	}
	.left {
		display: flex;
		align-items: center;
		gap: 4em;
		color: ${({ theme }) => theme.white};
		svg {
			margin: 0 0.5em;
		}
		h2 {
			display: flex;
			align-items: center;
			gap: 0.75em;
		}
		.sortBy {
			display: flex;
			align-items: center;
			gap: 0.5em;
			select {
				background: none;
				border: none;
				color: inherit;
				font-family: inherit;
				font-weight: 600;
				option {
					color: ${({ theme }) => theme.paragraph};
					background-color: ${({ theme }) => theme.white};
				}
			}
		}
	}
`;

const sortByOptions: SortBy[] = [
	{ label: 'Most Upvotes', value: ['upvotes', 'desc'] },
	{ label: 'Least Upvotes', value: ['upvotes', 'asc'] },
	{ label: 'Most Comments', value: ['comments', 'desc'] },
	{ label: 'Least Comments', value: ['comments', 'asc'] },
];

const FeedbackListPage = () => {
	const queryClient = useQueryClient();

	const {
		data: feedback,
		isLoading,
		isIdle,
		isError,
		error,
	} = useQuery<Entry[], Error>('feedback', feedbackService.getAll);
	const [suggestions, setSuggestions] = useState<Entry[]>([]);
	const [filter, setFilter] = useState<Filter>('all');
	const [sortBy, setSortBy] = useState<SortBy['value']>(['upvotes', 'desc']);
	const [roadmapCount, setRoadmapCount] = useState<RoadmapCount>({
		planned: 0,
		inprogress: 0,
		live: 0,
	});

	useEffect(() => {
		if (feedback) {
			const suggestions = feedback.filter(entry => entry.status === 'suggestion');
			filter !== 'all'
				? setSuggestions(suggestions.filter(entry => entry.category === filter))
				: setSuggestions(suggestions);

			const count = _.countBy(_.flatMap(feedback, 'status'));

			const roadmapCountObject: RoadmapCount = {
				planned: count.planned ? count.planned : 0,
				inprogress: count.inprogress ? count.inprogress : 0,
				live: count.live ? count.live : 0,
			};

			if (roadmapCount !== roadmapCountObject) {
				setRoadmapCount(roadmapCountObject);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [feedback]);

	useEffect(() => {
		if (feedback) {
			const suggestions = feedback.filter(entry => entry.status === 'suggestion');
			filter !== 'all'
				? setSuggestions(suggestions.filter(entry => entry.category === filter))
				: setSuggestions(suggestions);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const user = useLoggedUser();
	const token = useToken();

	const voteMutation = useMutation(
		({ id, token }: { id: string; token: string }) => feedbackService.vote(id, token),
		{
			onSuccess: (votedEntry: Entry) => {
				if (feedback) {
					queryClient.setQueryData(
						['feedback'],
						feedback.map(entry => (entry.id === votedEntry.id ? votedEntry : entry))
					);
				} else {
					queryClient.refetchQueries(['feedback']);
				}
			},
			onError: (error: unknown) => {
				console.log(error);
			},
		}
	);

	const voteFunction = (id: string) => {
		if (!token) {
			return console.log('No token...');
		}
		voteMutation.mutate({ id, token });
	};

	if (isLoading || isIdle) {
		return <p>Fetching feedback...</p>;
	}

	if (isError) {
		return <p>{error.message}</p>;
	}

	const updateFilter = (category: string) => {
		window.scrollTo(0, 0);
		if (category === 'all') {
			return setFilter(category);
		}
		if (!isCategory(category)) {
			return console.error('Wrong category');
		}
		const categoryValue = findCategoryValue(category);
		if (!categoryValue) {
			return console.error('Missing category value');
		}
		setFilter(categoryValue);
	};

	const updateSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value.split(',');
		if (typeof value[0] === 'string' && (value[1] === 'asc' || value[1] === 'desc')) {
			setSortBy([value[0], value[1]]);
		}
	};

	return (
		<FeedbackPageContainer>
			<Board roadmapCount={roadmapCount} updateFilter={updateFilter} filter={filter} />
			<FeedbackList>
				<FeedbackListHeader>
					<div className="left">
						<MediaQuery minWidth={breakpoints.tablet}>
							<h2>
								<IconSuggestions />
								{suggestions ? suggestions.length : 0} Suggestions
							</h2>
						</MediaQuery>
						<div className="sortBy">
							<p>Sort by: </p>
							<select onChange={updateSortBy}>
								{sortByOptions.map(option => (
									<option value={option.value} key={option.label}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
					<ButtonPrimary>
						<IconPlus />
						Add Feedback
					</ButtonPrimary>
				</FeedbackListHeader>
				<div className="entries">
					{suggestions.length !== 0 ? (
						_.orderBy(suggestions, sortBy[0], sortBy[1]).map((entry: Entry) => (
							<FeedbackEntry
								entry={entry}
								key={entry.id}
								updateFilter={updateFilter}
								voted={user?.upvoted.includes(entry.id) || false}
								vote={voteFunction}
							/>
						))
					) : (
						<NoFeedback />
					)}
				</div>
			</FeedbackList>
		</FeedbackPageContainer>
	);
};

export default FeedbackListPage;

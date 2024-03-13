import { useEffect, useState } from 'react';

import { Entry, RoadmapCount } from '../../types';

import feedbackService from '../../services/feedbackService';

import axios from 'axios';

import _ from 'lodash';

import Board from './Board';
import FeedbackEntry from './FeedbackEntry';

import { styled } from 'styled-components';

import breakpoints from '../../utils/breakpoints';

const FeedbackPageContainer = styled.div`
	width: 100vw;
	margin: auto;
	display: flex;
	flex-direction: column;
	@media (min-width: ${breakpoints.tablet}) {
		padding: 1em 1em;
		gap: 1em;
	}
	@media (min-width: ${breakpoints.desktop}) {
		max-width: 1220px;
		flex-direction: row;
	}
`;

const FeedbackList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1em;
	.list {
		padding: 1em 1em;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1em;
		@media (min-width: ${breakpoints.tablet}) {
			padding: 0;
		}
	}
`;

const FeedbackListPage = () => {
	const [feedback, setFeedback] = useState<Entry[]>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchFeedback = async () => {
			const feedback = await feedbackService.getAll();
			setFeedback(feedback);
		};
		void fetchFeedback().catch((error: unknown) => {
			if (axios.isAxiosError(error)) {
				if (error?.response?.data && typeof error?.response?.data === 'string') {
					setError(error.response.data);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', error);
				setError('Unknown error');
			}
		});
	}, []);
	if (error) {
		return <p>{error}</p>;
	}

	if (!feedback) {
		return <p>Fetching feedback...</p>;
	}

	const count = _.countBy(_.flatMap(feedback, 'status'));
	const roadmapCount: RoadmapCount = {
		planned: count.planned,
		inprogress: count.inprogress,
		live: count.live,
	};

	return (
		<FeedbackPageContainer>
			<Board roadmapCount={roadmapCount} />
			<FeedbackList>
				<div className="list">
					{feedback.map((entry: Entry) => (
						<FeedbackEntry entry={entry} key={entry.id} />
					))}
				</div>
			</FeedbackList>
		</FeedbackPageContainer>
	);
};

export default FeedbackListPage;

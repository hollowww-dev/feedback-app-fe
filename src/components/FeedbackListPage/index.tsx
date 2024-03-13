import { useEffect, useState } from 'react';

import { Entry } from '../../types';

import feedbackService from '../../services/feedbackService';

import axios from 'axios';

// import _ from 'lodash';

import Board from './Board';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';

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
	return (
		<FeedbackSingle>
			<h3>{entry.title}</h3>
			<p>{entry.description}</p>
			<ButtonCategory>{entry.category}</ButtonCategory>
		</FeedbackSingle>
	);
};

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

	return (
		<FeedbackPageContainer>
			<Board />
			<FeedbackList>
				<div className="list">
					{feedback.map((entry: Entry) => (
						<FeedbackEntry entry={entry} key={entry.title} />
					))}
				</div>
			</FeedbackList>
		</FeedbackPageContainer>
	);
};

export default FeedbackListPage;

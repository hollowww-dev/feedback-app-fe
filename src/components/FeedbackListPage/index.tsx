import { useEffect, useState } from 'react';

import { Entry } from '../../types';

import feedbackService from '../../services/feedbackService';

import axios from 'axios';

import _ from 'lodash';

import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import Container from '../Container';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';
import FeedbackHeader from './FeedbackHeader';
import { ButtonCategory } from '../Buttons';

const FeedbackContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5em;

	@media (min-width: ${breakpoints.minDesktop}) {
		flex-direction: row;
	}
`;

const FeedbackList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1em;
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
		return (
			<Container>
				<p>{error}</p>
			</Container>
		);
	}

	if (!feedback) {
		return (
			<Container>
				<p>Fetching feedback...</p>
			</Container>
		);
	}

	const countWithStatus = _.countBy(_.flatMap(feedback), 'status');

	return (
		<>
			<MediaQuery maxWidth={breakpoints.maxMobile}>
				<MobileHeader
					planned={countWithStatus.planned}
					inprogress={countWithStatus.inprogress}
					live={countWithStatus.live}
				/>
			</MediaQuery>
			<Container>
				<FeedbackContainer>
					<MediaQuery minWidth={breakpoints.minTablet}>
						<Sidebar
							planned={countWithStatus.planned}
							inprogress={countWithStatus.inprogress}
							live={countWithStatus.live}
						/>
					</MediaQuery>
					<FeedbackList>
						<MediaQuery minWidth={breakpoints.minTablet}>
							<FeedbackHeader suggestions={countWithStatus.suggestions} />
						</MediaQuery>
						{feedback.map(entry => {
							return <FeedbackEntry entry={entry} key={entry.title} />;
						})}
					</FeedbackList>
				</FeedbackContainer>
			</Container>
		</>
	);
};

export default FeedbackListPage;

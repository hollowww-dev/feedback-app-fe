import { useEffect, useState } from 'react';

import { Entry } from '../../types';

import feedbackService from '../../services/feedbackService';

import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import Container from '../Container';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';
import FeedbackHeader from './FeedbackHeader';

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
`;

const FeedbackListPage = () => {
	const [feedback, setFeedback] = useState<Entry[]>();

	useEffect(() => {
		const fetchFeedback = async () => {
			const feedback = await feedbackService.getAll();
			setFeedback(feedback);
		};
		void fetchFeedback();
	}, []);

	console.log(feedback);
	return (
		<>
			<MediaQuery maxWidth={breakpoints.maxMobile}>
				<MobileHeader />
			</MediaQuery>
			<Container>
				<FeedbackContainer>
					<MediaQuery minWidth={breakpoints.minTablet}>
						<Sidebar />
					</MediaQuery>
					<FeedbackList>
						<MediaQuery minWidth={breakpoints.minTablet}>
							<FeedbackHeader suggestionsLength={Number(2)} />
						</MediaQuery>
						<h1>Hello</h1>
					</FeedbackList>
				</FeedbackContainer>
			</Container>
		</>
	);
};

export default FeedbackListPage;

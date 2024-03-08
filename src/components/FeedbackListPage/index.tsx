import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const FeedbackContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5em;

	@media (min-width: ${breakpoints.tablet}) {
		flex-direction: row;
	}
`;

const FeedbackList = styled.div`
	display: flex;
	flex-direction: column;
`;

const FeedbackListPage = () => {
	return (
		<>
			<MediaQuery maxWidth={breakpoints.mobile}>
				<MobileHeader />
			</MediaQuery>
			<MediaQuery minWidth={breakpoints.mobile}>
				<FeedbackContainer>
					<Sidebar />
					<FeedbackList>
						<h1>Hello</h1>
						<h2>Hello</h2>
						<h3>Hello</h3>
						<h4>Hello</h4>
					</FeedbackList>
				</FeedbackContainer>
			</MediaQuery>
		</>
	);
};

export default FeedbackListPage;

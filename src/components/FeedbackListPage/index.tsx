import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const FeedbackContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5em;

	@media (min-width: ${breakpoints.minDesktop}) {
		flex-direction: row;
	}
`;

const FeedbackList = styled.div`
	display: flex;
	flex-direction: column;
`;

const FeedbackListPage = () => {
	return (
		<FeedbackContainer>
			<MediaQuery maxWidth={breakpoints.maxMobile}>
				<MobileHeader />
			</MediaQuery>
			<MediaQuery minWidth={breakpoints.minTablet}>
				<Sidebar />
			</MediaQuery>
			<FeedbackList>
				<h1>Hello</h1>
			</FeedbackList>
		</FeedbackContainer>
	);
};

export default FeedbackListPage;

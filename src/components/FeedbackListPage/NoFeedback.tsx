import { styled } from 'styled-components';

import IllustrationEmpty from '../../assets/suggestions/illustration-empty.svg?react';

import { ButtonPrimary } from '../Buttons';
import IconPlus from '../../assets/shared/icon-plus.svg?react';
import breakpoints from '../../utils/breakpoints';

const NoFeedbackContainer = styled.div`
	padding: 10em 3em;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5em;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	text-align: center;
	p {
		@media (min-width: ${breakpoints.tablet}) {
			max-width: 58%;
		}
		@media (min-width: ${breakpoints.desktop}) {
			max-width: 50%;
		}
	}
`;

const NoFeedback = () => {
	return (
		<NoFeedbackContainer>
			<IllustrationEmpty />
			<h3>There is no feedback yet.</h3>
			<p>
				Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to
				improve our app.
			</p>
			<ButtonPrimary>
				<IconPlus />
				Add Feedback
			</ButtonPrimary>
		</NoFeedbackContainer>
	);
};

export default NoFeedback;

import { styled } from 'styled-components';

import { ButtonPrimary } from '../Buttons';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

import IconSuggestions from '../../assets/suggestions/icon-suggestions.svg?react';
import IconPlus from '../../assets/shared/icon-plus.svg?react';

const HeaderContainer = styled.div`
	padding: 0.8em 1.5em;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.headerBackground};
	.left {
		display: flex;
		align-items: center;
		gap: 1.5em;
		h3,
		.sortBy {
			color: ${({ theme }) => theme.white};
		}
		.sortBy {
			font-weight: 400;
		}
	}
	@media (min-width: ${breakpoints.minTablet}) {
		border-radius: 10px;
	}
`;

const FeedbackHeader = ({ suggestionsLength }: { suggestionsLength?: number }) => {
	return (
		<HeaderContainer>
			<div className="left">
				<MediaQuery minWidth={breakpoints.minTablet}>
					{suggestionsLength && (
						<>
							<IconSuggestions />
							<h3>{suggestionsLength} Suggestions</h3>
						</>
					)}
				</MediaQuery>
				<span className="sortBy">Sort by:</span>
			</div>
			<div>
				<ButtonPrimary>
					<IconPlus />
					Add Feedback
				</ButtonPrimary>
			</div>
		</HeaderContainer>
	);
};

export default FeedbackHeader;

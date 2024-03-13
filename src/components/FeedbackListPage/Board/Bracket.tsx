import { styled } from 'styled-components';
import breakpoints from '../../../utils/breakpoints';

export const Bracket = styled.div`
	padding: 1.25em 1.5em;
	width: 100%;
	max-width: 225px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	@media (min-width: ${breakpoints.tablet}) {
		max-width: 100%;
	}
	@media (min-width: ${breakpoints.desktop}) {
		max-width: 245px;
	}
`;

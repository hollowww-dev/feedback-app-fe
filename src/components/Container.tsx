import { styled } from 'styled-components';

export const Container = styled.div`
	flex-direction: column;
	display: flex;
	width: calc(100vw - 2em);
	padding: 1em 0.5em;

	@media (min-width: 1280px) {
		max-width: calc(1280px - 2em);
	}
`;

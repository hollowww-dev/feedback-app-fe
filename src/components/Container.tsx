import { styled } from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100vw - 2em);
	padding: 1em 0.5em;

	@media (min-width: 1280px) {
		max-width: calc(1280px - 2em);
	}
`;

export default Container;

import { styled } from 'styled-components';

export const ButtonCategory = styled.button`
	padding: 0.4em 1.2em;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.bodyBackground};
	font-size: 1.3rem;
	font-weight: 600;
	color: ${({ theme }) => theme.secondary};
	&:hover {
		background-color: ${({ theme }) => theme.hoverBackground};
	}
	&.active {
		background-color: ${({ theme }) => theme.secondary};
		color: ${({ theme }) => theme.white};
	}
`;
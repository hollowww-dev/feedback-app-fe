import { styled } from 'styled-components';

import { ButtonCategory } from './Buttons';

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25em;
	div.bracket {
		display: flex;
		flex-wrap: wrap;
		padding: 2em 1.5em;
		width: 100%;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.white};
		&.categories {
			gap: 0.75em;
		}
	}
`;

const Sidebar = () => {
	return (
		<SidebarContainer>
			<div className="bracket categories">
				<ButtonCategory>All</ButtonCategory>
				<ButtonCategory>UI</ButtonCategory>
				<ButtonCategory>UX</ButtonCategory>
				<ButtonCategory>Enhancement</ButtonCategory>
				<ButtonCategory>Bug</ButtonCategory>
				<ButtonCategory>Feature</ButtonCategory>
			</div>
			<div className="bracket">
				<p>Hello</p>
			</div>
		</SidebarContainer>
	);
};

export default Sidebar;

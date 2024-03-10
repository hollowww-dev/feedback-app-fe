import { Category } from '../../types';

import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	@media (min-width: ${breakpoints.minTablet}) {
		flex-direction: row;
		align-items: stretch;
	}
	@media (min-width: ${breakpoints.minDesktop}) {
		flex-direction: column;
		flex-shrink: 0;
	}
`;

const Bracket = styled.div`
	display: flex;
	padding: 2em 1.5em;
	width: 100%;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	max-width: 225px;
	@media (min-width: ${breakpoints.minTablet}) {
		max-width: 100%;
		padding: 1.5em 1.5em;
	}
	@media (min-width: ${breakpoints.minDesktop}) {
		max-width: 245px;
	}
`;

const Title = styled(Bracket)`
	align-items: flex-end;
	background: rgb(232, 77, 112);
	background: linear-gradient(
		195deg,
		rgba(232, 77, 112, 1) 0%,
		rgba(163, 55, 246, 1) 50%,
		rgba(40, 167, 237, 1) 100%
	);
	@media (min-width: ${breakpoints.minDesktop}) {
		padding-top: 4em;
	}
	div {
		h2,
		p {
			color: ${({ theme }) => theme.white};
		}
		p {
			opacity: 0.75;
			text-shadow: ${({ theme }) => theme.paragraph} 2px 2.5px 5px;
		}
	}
`;

const Categories = styled(Bracket)`
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 0.75em;
`;

const Roadmap = styled(Bracket)`
	flex-direction: column;
	gap: 1.5em;
	div.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div.feedbacks {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
		div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				display: flex;
				align-items: center;
				position: relative;
				font-weight: 400;
				font-size: 1.6rem;
				&.planned::before,
				&.inProgress::before,
				&.live::before {
					margin-right: 1em;
					width: 0.35em;
					height: 0.35em;
					border-radius: 50%;
					content: '';
					@media (min-width: ${breakpoints.minDesktop}) {
						width: 0.5em;
						height: 0.5em;
					}
				}
				&.planned::before {
					background-color: ${({ theme }) => theme.planned};
				}
				&.inProgress::before {
					background-color: ${({ theme }) => theme.primary};
				}
				&.live::before {
					background-color: ${({ theme }) => theme.live};
				}
				&.number {
					font-weight: 600;
				}
			}
		}
	}
`;

const Sidebar = ({
	planned,
	inprogress,
	live,
}: {
	planned: number;
	inprogress: number;
	live: number;
}) => {
	return (
		<SidebarContainer>
			<MediaQuery minWidth={breakpoints.minTablet}>
				<Title>
					<div>
						<h2>Frontend Mentor</h2>
						<p>Feedback Board</p>
					</div>
				</Title>
			</MediaQuery>
			<Categories>
				<ButtonCategory>All</ButtonCategory>
				{Object.keys(Category).map(category => {
					return <ButtonCategory key={category}>{category}</ButtonCategory>;
				})}
			</Categories>
			<Roadmap>
				<div className="top">
					<h3>Roadmap</h3>
					<a href="#">View</a>
				</div>
				<div className="feedbacks">
					<div>
						<span className="planned">Planned</span>
						<span className="number">{planned}</span>
					</div>
					<div>
						<span className="inProgress">In-Progress</span>
						<span className="number">{inprogress}</span>
					</div>
					<div>
						<span className="live">Live</span> <span className="number">{live}</span>
					</div>
				</div>
			</Roadmap>
		</SidebarContainer>
	);
};

export default Sidebar;

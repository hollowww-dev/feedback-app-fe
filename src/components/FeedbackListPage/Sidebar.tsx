import { styled } from 'styled-components';

import { ButtonCategory } from '../Buttons';

import MediaQuery from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.25em;
	@media (min-width: ${breakpoints.mobile}) {
		flex-direction: row;
		align-items: stretch;
	}
	@media (min-width: ${breakpoints.tablet}) {
		flex-direction: column;
		width: 25%;
	}
	div.bracket {
		display: flex;
		flex-wrap: wrap;
		padding: 2em 1.5em;
		width: 100%;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.white};
		&.title {
			display: flex;
			align-items: flex-end;
			background: rgb(232, 77, 112);
			background: linear-gradient(
				195deg,
				rgba(232, 77, 112, 1) 0%,
				rgba(163, 55, 246, 1) 50%,
				rgba(40, 167, 237, 1) 100%
			);
			@media (min-width: ${breakpoints.tablet}) {
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
		}
		&.categories {
			gap: 0.8em;
			@media (min-width: ${breakpoints.tablet}) {
				gap: 1em;
			}
		}
		&.roadmap {
			display: flex;
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
				font-size: 1.6rem;
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
						&::before {
							margin-right: 1em;
							width: 0.35em;
							height: 0.35em;
							border-radius: 50%;
							content: '';
							@media (min-width: ${breakpoints.mobile}) {
								width: 0.5em;
								height: 0.5em;
							}
						}

						&.planned::before {
							background-color: ${({ theme }) => theme.planned};
						}
						&.in-progress::before {
							background-color: ${({ theme }) => theme.primary};
						}
						&.live::before {
							background-color: ${({ theme }) => theme.live};
						}
					}
					span.number {
						font-weight: 600;
					}
				}
			}
		}
	}
`;

const Sidebar = () => {
	return (
		<SidebarContainer>
			<MediaQuery minWidth={breakpoints.mobile}>
				<div className="bracket title">
					<div>
						<h2>Frontend Mentor</h2>
						<p>Feedback Board</p>
					</div>
				</div>
			</MediaQuery>
			<div className="bracket categories">
				<ButtonCategory>All</ButtonCategory>
				<ButtonCategory>UI</ButtonCategory>
				<ButtonCategory>UX</ButtonCategory>
				<ButtonCategory>Enhancement</ButtonCategory>
				<ButtonCategory>Bug</ButtonCategory>
				<ButtonCategory>Feature</ButtonCategory>
			</div>
			<div className="bracket roadmap">
				<div className="top">
					<h3>Roadmap</h3>
					<a href="#">View</a>
				</div>
				<div className="feedbacks">
					<div>
						<span className="planned">Planned</span> <span className="number">2</span>
					</div>
					<div>
						<span className="in-progress">In-Progress</span> <span className="number">3</span>
					</div>
					<div>
						<span className="live">Live</span> <span className="number">1</span>
					</div>
				</div>
			</div>
		</SidebarContainer>
	);
};

export default Sidebar;

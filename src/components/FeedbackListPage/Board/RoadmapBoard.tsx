import { RoadmapCount } from '../../../types';

import { styled } from 'styled-components';

import { Bracket } from './Bracket';

import breakpoints from '../../../utils/breakpoints';

const Roadmap = styled(Bracket)`
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
		gap: 0.75em;
		div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				display: flex;
				align-items: center;
				font-size: 1.6rem;
				&.planned::before,
				&.inProgress::before,
				&.live::before {
					margin-right: 1em;
					width: 0.35em;
					height: 0.35em;
					border-radius: 50%;
					content: '';
					@media (min-width: ${breakpoints.desktop}) {
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

const RoadmapBoard = ({
	roadmapCount,
}: {
	roadmapCount: RoadmapCount;
}) => {
	return (
		<Roadmap>
			<div className="top">
				<h3>Roadmap</h3>
				<a href="#">View</a>
			</div>
			<div className="feedbacks">
				<div>
					<span className="planned">Planned</span>
					<span className="number">{roadmapCount.planned}</span>
				</div>
				<div>
					<span className="inProgress">In-Progress</span>
					<span className="number">{roadmapCount.inprogress}</span>
				</div>
				<div>
					<span className="live">Live</span> <span className="number">{roadmapCount.live}</span>
				</div>
			</div>
		</Roadmap>
	);
};

export default RoadmapBoard;

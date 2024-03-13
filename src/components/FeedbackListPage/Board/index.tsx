import { RoadmapCount } from '../../../types';

import { styled } from 'styled-components';

import { useMediaQuery } from 'react-responsive';
import breakpoints from '../../../utils/breakpoints';

import TitleBoard from './TitleBoard';
import CategoriesBoard from './CategoriesBoard';
import RoadmapBoard from './RoadmapBoard';

const BoardContainer = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	gap: 1em;
	@media (min-width: ${breakpoints.tablet}) {
		position: static;
	}
	@media (min-width: ${breakpoints.desktop}) {
		flex-direction: column;
	}
`;

const Board = ({ roadmapCount }: { roadmapCount: RoadmapCount }) => {
	const isMobile = useMediaQuery({
		query: `(max-width: ${breakpoints.mobile})`,
	});
	return (
		<BoardContainer>
			{isMobile ? (
				<TitleBoard>
					<CategoriesBoard />
					<RoadmapBoard roadmapCount={roadmapCount} />
				</TitleBoard>
			) : (
				<>
					<TitleBoard />
					<CategoriesBoard />
					<RoadmapBoard roadmapCount={roadmapCount} />
				</>
			)}
		</BoardContainer>
	);
};

export default Board;

import { useState } from 'react';

import { Category } from '../../types';

import { styled } from 'styled-components';

import IconHamburger from '../../assets/shared/mobile/icon-hamburger.svg?react';
import IconClose from '../../assets/shared/mobile/icon-close.svg?react';

import { ButtonCategory } from '../Buttons';

import MediaQuery, { useMediaQuery } from 'react-responsive';
import breakpoints from '../../utils/breakpoints';

const BoardContainer = styled.div`
	display: flex;
	gap: 0.75em;
	@media (min-width: ${breakpoints.desktop}) {
		flex-direction: column;
	}
`;

const TitleBoardStyled = styled.div`
	position: sticky;
	z-index: 100;
	padding: 0.5em 1em;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(
		-120deg,
		rgba(232, 77, 112, 1) 0%,
		rgba(163, 55, 246, 1) 50%,
		rgba(40, 167, 237, 1) 100%
	);
	@media (min-width: ${breakpoints.tablet}) {
		position: static;
		padding: 1em 1em;
		max-width: 100%;
		justify-content: flex-start;
		align-items: flex-end;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.white};
	}
	@media (min-width: ${breakpoints.desktop}) {
		padding: 5em 1em 1em 1em;
		max-width: 245px;
	}
	.title {
		color: ${({ theme }) => theme.white};
		p {
			opacity: 0.75;
			text-shadow: ${({ theme }) => theme.paragraph} 2px 2.5px 5px;
		}
	}
	svg {
		cursor: pointer;
	}
	.open {
		position: absolute;
		top: 100%;
		left: 0;
		display: flex;
		justify-content: flex-end;
		width: 100vw;
		height: calc(100vh - 100%);
		background-color: rgba(0, 0, 0, 0.5);
		.content {
			padding: 0.75em 1.5em;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 0.75em;
			background-color: ${({ theme }) => theme.bodyBackground};
		}
	}
`;

const Bracket = styled.div`
	padding: 2em 1.5em;
	width: 100%;
	max-width: 235px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.white};
	@media (min-width: ${breakpoints.tablet}) {
		max-width: 100%;
	}
	@media (min-width: ${breakpoints.desktop}) {
		max-width: 245px;
	}
`;

const Categories = styled(Bracket)`
	${ButtonCategory} {
		margin: 0.5em 0.5em;
	}
`;

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

const TitleBoard = ({ children }: { children?: string | JSX.Element | JSX.Element[] }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<TitleBoardStyled>
				<div className="title">
					<h2>Frontend Mentor</h2>
					<p>Feedback board</p>
				</div>
				<MediaQuery maxWidth={breakpoints.mobile}>
					{isOpen ? (
						<IconClose onClick={() => setIsOpen(false)} />
					) : (
						<IconHamburger onClick={() => setIsOpen(true)} />
					)}
					{isOpen && (
						<div className="open">
							<div className="content">{children}</div>
						</div>
					)}
				</MediaQuery>
			</TitleBoardStyled>
		</>
	);
};

const CategoriesBoard = () => {
	return (
		<Categories>
			<ButtonCategory>All</ButtonCategory>
			{Object.keys(Category).map(category => {
				return <ButtonCategory key={category}>{category}</ButtonCategory>;
			})}
		</Categories>
	);
};

const RoadmapBoard = () => {
	return (
		<Roadmap>
			<div className="top">
				<h3>Roadmap</h3>
				<a href="#">View</a>
			</div>
			<div className="feedbacks">
				<div>
					<span className="planned">Planned</span>
					<span className="number">0</span>
				</div>
				<div>
					<span className="inProgress">In-Progress</span>
					<span className="number">0</span>
				</div>
				<div>
					<span className="live">Live</span> <span className="number">0</span>
				</div>
			</div>
		</Roadmap>
	);
};

const Board = () => {
	const isMobile = useMediaQuery({
		query: `(max-width: ${breakpoints.mobile})`,
	});
	return (
		<BoardContainer>
			{isMobile ? (
				<TitleBoard>
					<CategoriesBoard />
					<RoadmapBoard />
				</TitleBoard>
			) : (
				<>
					<TitleBoard />
					<CategoriesBoard />
					<RoadmapBoard />
				</>
			)}
		</BoardContainer>
	);
};

export default Board;

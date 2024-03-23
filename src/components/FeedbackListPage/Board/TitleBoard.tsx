import { useState } from 'react';

import { styled } from 'styled-components';

import MediaQuery from 'react-responsive';
import breakpoints from '../../../utils/breakpoints';

import IconHamburger from '../../../assets/shared/mobile/icon-hamburger.svg?react';
import IconClose from '../../../assets/shared/mobile/icon-close.svg?react';

import { useLoggedUser } from '../../../context/loginHooks';
import { Link } from 'react-router-dom';

const TitleBoardStyled = styled.div`
	padding: 1em 1em;
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
		padding: 1.25em 1.5em;
		max-width: 100%;
		justify-content: flex-start;
		align-items: flex-end;
		border-radius: 10px;
		background-color: ${({ theme }) => theme.white};
	}
	@media (min-width: ${breakpoints.desktop}) {
		padding: 3.5em 1em 1.5em 1em;
		max-width: 245px;
	}
	.title {
		color: ${({ theme }) => theme.white};
		p {
			opacity: 0.75;
			text-shadow: ${({ theme }) => theme.paragraph} 2px 2.5px 5px;
		}
		a {
			color: ${({ theme }) => theme.white};
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

const TitleBoard = ({ children }: { children?: string | JSX.Element | JSX.Element[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useLoggedUser();

	return (
		<>
			<TitleBoardStyled>
				<div className="title">
					<h2>Frontend Mentor</h2>
					<p>
						Hello{' '}
						{user ? (
							`${user.name}!`
						) : (
							<>
								stranger! - <Link to="/login">Login</Link>
							</>
						)}
					</p>
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

export default TitleBoard;

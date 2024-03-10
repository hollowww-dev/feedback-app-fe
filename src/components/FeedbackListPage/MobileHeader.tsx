import { useState } from 'react';

import { styled } from 'styled-components';

import IconHamburger from '../../assets/shared/mobile/icon-hamburger.svg?react';
import IconClose from '../../assets/shared/mobile/icon-close.svg?react';

import FeedbackHeader from './FeedbackHeader';
import Sidebar from './Sidebar';

const StickyContainer = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	width: 100vw;
`;

const HeaderContainer = styled.div`
	z-index: 100;
	padding: 1em 1.5em;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgb(232, 77, 112);
	background: linear-gradient(
		195deg,
		rgba(232, 77, 112, 1) 0%,
		rgba(163, 55, 246, 1) 50%,
		rgba(40, 167, 237, 1) 100%
	);
	div.left {
		h2,
		p {
			color: ${({ theme }) => theme.white};
		}
		p {
			opacity: 0.75;
			text-shadow: ${({ theme }) => theme.paragraph} 2px 2.5px 5px;
		}
	}
	div.right {
		svg {
			cursor: pointer;
			color: ${({ theme }) => theme.white};
		}
	}
`;

const Opened = styled.div`
	position: fixed;
	right: 0;
	display: flex;
	justify-content: flex-end;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	div.content {
		padding: 1.5em;
		height: 100%;
		background-color: ${({ theme }) => theme.bodyBackground};
	}
`;

const MobileHeader = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<StickyContainer>
			<HeaderContainer>
				<div className="left">
					<h2>Frontend Mentor</h2>
					<p>Feedback Board</p>
				</div>
				<div className="right">
					{sidebarOpen ? (
						<IconClose onClick={() => setSidebarOpen(false)} />
					) : (
						<IconHamburger onClick={() => setSidebarOpen(true)} />
					)}
				</div>
			</HeaderContainer>
			<FeedbackHeader />
			{sidebarOpen && (
				<Opened>
					<div className="content">
						<Sidebar />
					</div>
				</Opened>
			)}
		</StickyContainer>
	);
};

export default MobileHeader;

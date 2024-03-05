import { useState } from 'react';

import { styled } from 'styled-components';

import IconHamburger from '../assets/shared/mobile/icon-hamburger.svg?react';
import IconClose from '../assets/shared/mobile/icon-close.svg?react';

import Sidebar from './Sidebar';

const StickyContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	div.headerContainer {
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
			}
		}
		div.right {
			svg {
				cursor: pointer;
				color: ${({ theme }) => theme.white};
			}
		}
	}
	div.sidebarMobile {
		display: flex;
		justify-content: flex-end;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		div.content {
			padding: 1.5em;
			width: 80%;
			height: 100%;
			background-color: ${({ theme }) => theme.bodyBackground};
		}
	}
`;

const MobileHeader = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<StickyContainer>
			<div className="headerContainer">
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
			</div>
			{sidebarOpen && (
				<div className="sidebarMobile">
					<div className="content">
						<Sidebar />
					</div>
				</div>
			)}
		</StickyContainer>
	);
};

export default MobileHeader;

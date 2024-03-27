import { Dispatch } from 'react';

export enum Category {
	'UI' = 'ui',
	'UX' = 'ux',
	'Enhancement' = 'enhancement',
	'Bug' = 'bug',
	'Feature' = 'feature',
}

export enum Status {
	'Suggestion' = 'suggestion',
	'Planned' = 'planned',
	'In-Progress' = 'inprogress',
	'Live' = 'live',
}

export interface Entry {
	id: string;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	comments: number;
}

export type Credentials = {
	username: string;
	password: string;
};

export type LoginContextValue = {
	token: string;
	user?: LoggedUser;
};

export type LoginContextAction =
	| { type: 'SET'; payload: LoginContextValue }
	| { type: 'CLEAR' }
	| { type: 'UPDATE'; payload: Omit<LoginContextValue, 'token'> & { token?: string } };
export type LoginContextType = {
	state: LoginContextValue | null;
	dispatch: Dispatch<LoginContextAction>;
};

export type User = {
	name: string;
	username: string;
	passwordHash: string;
	upvoted: string[];
};

export type Author = Omit<User, 'passwordHash' | 'upvoted'>;
export type LoggedUser = Omit<User, 'passwordHash'>;

export type Reply = {
	content: string;
	replyingTo: string;
	user: Author;
};

export type Comment = {
	id: string;
	content: string;
	user: Author;
	replies?: Reply[];
};

export type EntryDetailed = Omit<Entry, 'comments'> & { comments?: Comment[] };

export type Filter = Category | 'all';

export type RoadmapCount = {
	planned: number;
	inprogress: number;
	live: number;
};

export type SortBy = {
	label: string;
	value: [string, 'asc' | 'desc'];
};

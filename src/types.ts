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

export type User = {
	name: string;
	username: string;
};

export type Reply = {
	content: string;
	replyingTo: string;
	user: User;
};

export type Comment = {
	id: number;
	content: string;
	user: User;
	replies?: Reply[];
};

export interface Entry {
	id: number;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	comments: number;
}

export interface EntryDetailed {
	id: number;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	comments?: Comment[];
}

export type Count = {
	planned: number;
	inprogress: number;
	live: number;
	suggestion: number;
};

export type Filter = Category | 'all';

export type RoadmapCount = Omit<Count, 'suggestion'>;

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
	id: number;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	comments: number;
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

export type EntryDetailed = Omit<Entry, 'comments'> & { comments?: Comment[] };

export type Filter = Category | 'all';

export type RoadmapCount = {
	planned: number;
	inprogress: number;
	live: number;
};

export type sortBy = {
	label: string;
	value: [string, 'asc' | 'desc'];
};

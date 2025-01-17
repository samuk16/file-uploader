import type { Session } from "express-session";

export interface CustomSession extends Session {
	user: {
		id: number;
		username: string;
		first_name: string;
		last_name: string;
		email: string;
	};
	passport: {
		user: number;
	};
	messages: string[];
}

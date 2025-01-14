import type { Session } from "express-session";

export interface CustomSession extends Session {
	passport: {
		user: number;
	};
	messages: string[];
}

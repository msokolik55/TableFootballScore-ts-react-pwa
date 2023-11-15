import { AlertColor } from "@mui/material";

export type Player = {
	name: string;
};

export type Team = {
	abbreviation: string;
	name: string;
	players: Player[];
};

export type Score = {
	players: { name: string; goals: number }[];
};

export type Period = {
	id: string;
	home: Score;
	away: Score;
};

export type Match = {
	periods: Period[];
	teams: {
		home: Team;
		away: Team;
	};
};

export type SnackbarConfig = {
	open: boolean;
	severity: AlertColor;
	message: string;
};

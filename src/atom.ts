import { Period, SnackbarConfig, Team } from "./types";
import { TEAMS } from "./teams";
import { atom } from "recoil";

export const teamHomeAtom = atom<Team>({
	key: "teamHomeAtom",
	default: TEAMS[0],
});

export const teamAwayAtom = atom<Team>({
	key: "teamAwayAtom",
	default: TEAMS[1] || TEAMS[0],
});

export const periodsAtom = atom<Period[]>({
	key: "periodsAtom",
	default: [],
});

export const snackbarAtom = atom<SnackbarConfig>({
	key: "snackbarAtom",
	default: {
		open: false,
		severity: "info",
		message: "",
	},
});

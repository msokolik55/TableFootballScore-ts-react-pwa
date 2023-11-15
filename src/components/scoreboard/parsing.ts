import { Score } from "../../types";

export const sumScore = (score: Score) => {
	return score.players
		.map((player) => player.goals)
		.reduce((prev, curr) => prev + curr, 0);
};

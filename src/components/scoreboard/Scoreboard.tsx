import TeamScoreboard from "./TeamScoreBoard";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Period, Score } from "../../types";

export const sumScore = (score: Score) => {
	return score.players
		.map((player) => player.goals)
		.reduce((prev, curr) => prev + curr, 0);
};

const Scoreboard = () => {
	const [teamHome, setTeamHome] = useRecoilState(teamHomeAtom);
	const [teamAway, setTeamAway] = useRecoilState(teamAwayAtom);
	const periods = useRecoilValue(periodsAtom);

	const parsePeriod = (period: Period) => {
		return `${sumScore(period.home)}:${sumScore(period.away)}`;
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<TeamScoreboard
					reverse={false}
					team={teamHome}
					setTeam={setTeamHome}
					compare={(a, b) => a > b}
				/>
				:
				<TeamScoreboard
					reverse={true}
					team={teamAway}
					setTeam={setTeamAway}
					compare={(a, b) => a < b}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					marginBottom: "0.5em",
				}}
			>
				({periods.map(parsePeriod).join(", ")})
			</div>
		</>
	);
};

export default Scoreboard;

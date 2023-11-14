import TeamScoreboard from "./TeamScoreBoard";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Period, Score } from "../../types";

const Scoreboard = () => {
	const [teamHome, setTeamHome] = useRecoilState(teamHomeAtom);
	const [teamAway, setTeamAway] = useRecoilState(teamAwayAtom);
	const periods = useRecoilValue(periodsAtom);

	const sumScore = (score: Score) => {
		return score.players
			.map((player) => player.goals)
			.reduce((prev, curr) => prev + curr, 0);
	};

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
				/>
				:
				<TeamScoreboard
					reverse={true}
					team={teamAway}
					setTeam={setTeamAway}
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

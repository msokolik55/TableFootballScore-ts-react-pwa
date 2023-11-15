import TeamScoreboard from "./TeamScoreBoard";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Period } from "../../types";
import { sumScore } from "./parsing";

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
					alignItems: "center",
				}}
			>
				<TeamScoreboard
					reverse={false}
					team={teamHome}
					setTeam={setTeamHome}
					compare={(a, b) => a > b}
				/>
				<h1>:</h1>
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
				<h2>({periods.map(parsePeriod).join(", ")})</h2>
			</div>
		</>
	);
};

export default Scoreboard;

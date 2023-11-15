import TeamScoreboard from "./TeamScoreboard";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Period } from "../../types";
import { sumScore } from "./parsing";
import Report from "./Report";

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
					compare={(a: number, b: number) => a > b}
				/>
				<h1>:</h1>
				<TeamScoreboard
					reverse={true}
					team={teamAway}
					setTeam={setTeamAway}
					compare={(a: number, b: number) => a < b}
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
			<Report />
		</>
	);
};

export default Scoreboard;

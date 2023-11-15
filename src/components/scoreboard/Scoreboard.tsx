import TeamScoreboard from "./TeamScoreboard";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Period } from "../../types";
import { sumScore } from "./parsing";
import { saveAs } from "file-saver";

const Scoreboard = () => {
	const [teamHome, setTeamHome] = useRecoilState(teamHomeAtom);
	const [teamAway, setTeamAway] = useRecoilState(teamAwayAtom);
	const periods = useRecoilValue(periodsAtom);

	const parsePeriod = (period: Period) => {
		return `${sumScore(period.home)}:${sumScore(period.away)}`;
	};

	const formatPlayer = (player: { name: string; goals: number }) => {
		return `${player.name} - ${player.goals}`;
	};

	const exportMatch = () => {
		const header = `${teamHome.name} : ${teamAway.name}\n\n`;
		const text = periods
			.map((period, idx) => {
				const score = `${idx + 1}. zápas: ${sumScore(
					period.home
				)}:${sumScore(period.away)}`;

				const home = period.home.players.map(formatPlayer);
				const away = period.away.players.map(formatPlayer);
				const players = [home.join("\n"), away.join("\n")].join("\n\n");

				return `${score}\n\n${players}`;
			})
			.join(`\n\n${"-".repeat(25)}\n\n`);

		const blob = new Blob([header, text], { type: "text/plain" });
		const fileName = `${teamHome.abbreviation}-${teamAway.abbreviation}.txt`;
		saveAs(blob, fileName);
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
			<button style={{ marginBottom: "1em" }} onClick={exportMatch}>
				export
			</button>
		</>
	);
};

export default Scoreboard;

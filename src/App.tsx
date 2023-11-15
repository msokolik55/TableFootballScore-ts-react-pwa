import { Period, Team } from "./types";
import { teamHomeAtom, teamAwayAtom, periodsAtom, snackbarAtom } from "./atom";
import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import Scoreboard from "./components/scoreboard/Scoreboard";
import PeriodRow from "./components/period/PeriodRow";
import { Add } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

function App() {
	const [periods, setPeriods] = useRecoilState(periodsAtom);
	const teamHome = useRecoilValue(teamHomeAtom);
	const teamAway = useRecoilValue(teamAwayAtom);

	const [snackbar, setSnackbar] = useRecoilState(snackbarAtom);

	const addPeriod = () => {
		const emptyScore = (team: Team) => {
			return {
				players: team.players.map((player) => {
					return {
						name: player.name,
						goals: 0,
					};
				}),
			};
		};

		const emptyPeriod: Period = {
			id: `period-${periods.length}`,
			home: emptyScore(teamHome),
			away: emptyScore(teamAway),
		};
		setPeriods((periods) => [...periods, emptyPeriod]);
	};

	const handleClose = () => {
		setSnackbar((old) => {
			return { ...old, open: false };
		});
	};

	return (
		<div
			style={{ display: "flex", flexDirection: "column", width: "100%" }}
		>
			<Scoreboard />
			<button onClick={addPeriod}>
				<Add />
			</button>

			{periods.map((period) => (
				<PeriodRow key={period.id} period={period} />
			))}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default App;

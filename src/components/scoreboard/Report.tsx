import { FileDownload, ContentCopy } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import saveAs from "file-saver";
import { useState } from "react";
import { sumScore } from "./parsing";
import { useRecoilValue } from "recoil";
import { teamHomeAtom, teamAwayAtom, periodsAtom } from "../../atom";
import ReportButton from "./ReportButton";
import { SnackbarConfig } from "../../types";

const Report = () => {
	const teamHome = useRecoilValue(teamHomeAtom);
	const teamAway = useRecoilValue(teamAwayAtom);
	const periods = useRecoilValue(periodsAtom);

	const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
		open: false,
		severity: "info",
		message: "",
	});

	const formatPlayer = (player: { name: string; goals: number }) => {
		return `${player.name} - ${player.goals}`;
	};

	const handleClose = () => {
		setSnackbarConfig((old) => {
			return { ...old, open: false };
		});
	};

	const generateReport = () => {
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

		return [header, text];
	};

	const saveToClipboard = () => {
		navigator.clipboard
			.writeText(generateReport().join(""))
			.then((_) =>
				setSnackbarConfig((_) => {
					return {
						open: true,
						severity: "info",
						message: "Údaje skopírované do schránky!",
					};
				})
			)
			.catch((_) =>
				setSnackbarConfig((_) => {
					return {
						open: true,
						severity: "error",
						message: "Chyba pri kopírovaní do schránky!",
					};
				})
			);
	};

	const exportMatch = () => {
		const blob = new Blob(generateReport(), { type: "text/plain" });
		const fileName = `${teamHome.abbreviation}-${teamAway.abbreviation}.txt`;
		saveAs(blob, fileName);
	};

	return (
		<>
			<div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
				<ReportButton fn={exportMatch} icon={<FileDownload />} />
				<ReportButton fn={saveToClipboard} icon={<ContentCopy />} />
			</div>
			<Snackbar
				open={snackbarConfig.open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackbarConfig.severity}
					sx={{ width: "100%" }}
				>
					{snackbarConfig.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Report;

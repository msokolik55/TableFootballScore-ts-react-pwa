import { Period, Score, Team } from "../../types";
import PeriodPlayer from "./PeriodPlayer";

type PeriodTeamProps = {
	team: Team;
	prefix: string;
	period: Period;
	score: Score;
	home: boolean;
};
const PeriodTeam = (props: PeriodTeamProps) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "50%",
				gap: "0.5em",
			}}
		>
			{props.team.players.map((player, iPlayer) => (
				<PeriodPlayer
					key={`${props.prefix}-player-${iPlayer}`}
					period={props.period}
					player={player}
					score={props.score}
					home={props.home}
				/>
			))}
		</div>
	);
};

export default PeriodTeam;

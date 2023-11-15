import { Dispatch, SetStateAction } from "react";
import { Team } from "../../types";
import TeamPicker from "./TeamPicker";
import { periodsAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import { sumScore } from "./parsing";
import { GOALS_LIMIT } from "../../config";

type TeamScoreboardProps = {
	reverse: boolean;
	team: Team;
	setTeam: Dispatch<SetStateAction<Team>>;
	compare: (a: number, b: number) => boolean;
};
const TeamScoreboard = (props: TeamScoreboardProps) => {
	const periods = useRecoilValue(periodsAtom);

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<TeamPicker team={props.team} setTeam={props.setTeam} />
			<div
				style={{
					display: "flex",
					flexDirection: !props.reverse ? "row" : "row-reverse",
					justifyContent: "space-evenly",
					alignItems: "center",
					width: "100%",
				}}
			>
				<h2>{props.team.abbreviation}</h2>
				<h1>
					{
						periods.filter((period) => {
							const goalsHome = sumScore(period.home);
							const goalsAway = sumScore(period.away);

							return (
								(goalsHome >= GOALS_LIMIT ||
									goalsAway >= GOALS_LIMIT) &&
								props.compare(goalsHome, goalsAway)
							);
						}).length
					}
				</h1>
			</div>
		</div>
	);
};

export default TeamScoreboard;

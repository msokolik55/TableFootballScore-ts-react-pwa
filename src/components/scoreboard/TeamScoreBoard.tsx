import { Dispatch, SetStateAction } from "react";
import { Team } from "../../types";
import TeamPicker from "./TeamPicker";
import { periodsAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import { sumScore } from "./Scoreboard";
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
		<div
			style={{
				display: "flex",
				flexDirection: !props.reverse ? "row" : "row-reverse",
				justifyContent: "space-evenly",
				width: "100%",
			}}
		>
			<TeamPicker team={props.team} setTeam={props.setTeam} />
			<>
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
			</>
		</div>
	);
};

export default TeamScoreboard;

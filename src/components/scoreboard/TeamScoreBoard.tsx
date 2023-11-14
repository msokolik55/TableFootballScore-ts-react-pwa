import { Dispatch, SetStateAction } from "react";
import { Team } from "../../types";
import TeamPicker from "./TeamPicker";
import { periodsAtom } from "../../atom";
import { useRecoilValue } from "recoil";

type TeamScoreboardProps = {
	reverse: boolean;
	team: Team;
	setTeam: Dispatch<SetStateAction<Team>>;
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
			<>{periods.filter((period) => period.home > period.away).length}</>
		</div>
	);
};

export default TeamScoreboard;

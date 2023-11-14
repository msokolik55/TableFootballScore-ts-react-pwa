import { useRecoilValue, useSetRecoilState } from "recoil";
import { Period, Team } from "../../types";
import PeriodTeam from "./PeriodTeam";
import { teamAwayAtom, teamHomeAtom, periodsAtom } from "../../atom";

type PeriodProps = {
	period: Period;
};
const PeriodRow = (props: PeriodProps) => {
	const teamHome = useRecoilValue(teamHomeAtom);
	const teamAway = useRecoilValue(teamAwayAtom);

	const setPeriods = useSetRecoilState(periodsAtom);

	const prefix = (team: Team) => {
		return `${team.abbreviation}-${props.period.id}`;
	};

	const deletePeriod = () => {
		setPeriods((old) =>
			old.filter((period) => period.id !== props.period.id)
		);
	};

	return (
		<>
			<hr style={{ width: "100%" }} />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "1em",
					marginBottom: "0.5em",
				}}
			>
				<PeriodTeam
					key={prefix(teamHome)}
					prefix={prefix(teamHome)}
					team={teamHome}
					period={props.period}
					score={props.period.home}
					home={true}
				/>
				<hr />
				<PeriodTeam
					key={prefix(teamAway)}
					prefix={prefix(teamAway)}
					team={teamAway}
					period={props.period}
					score={props.period.away}
					home={false}
				/>
			</div>
			<button onClick={deletePeriod}>X</button>
		</>
	);
};

export default PeriodRow;

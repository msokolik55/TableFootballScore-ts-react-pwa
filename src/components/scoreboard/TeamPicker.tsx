import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Team } from "../../types";
import { TEAMS } from "../../teams";
import { useSetRecoilState } from "recoil";
import { periodsAtom } from "../../atom";

type TeamPickerProps = {
	team: Team;
	setTeam: Dispatch<SetStateAction<Team>>;
};
const TeamPicker = (props: TeamPickerProps) => {
	const setPeriods = useSetRecoilState(periodsAtom);

	const parseName = (name: string): string => {
		const firstName = name.split(" ")[0];
		const lastName = name.split(" ")[1];
		return `${firstName[0]}. ${lastName}`;
	};

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPeriods([]);

		const selectedTeam = TEAMS.filter(
			(team) => team.abbreviation === e.target.value
		)[0];

		props.setTeam((_) => selectedTeam);
	};

	return (
		<select value={props.team.abbreviation} onChange={handleChange}>
			{TEAMS.map((team) => (
				<option
					key={`team-${team.abbreviation}`}
					value={team.abbreviation}
				>{`${team.abbreviation} (${team.players
					.map((player) => parseName(player.name))
					.join(", ")})`}</option>
			))}
		</select>
	);
};

export default TeamPicker;

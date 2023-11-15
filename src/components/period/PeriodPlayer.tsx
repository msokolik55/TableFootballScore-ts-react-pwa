import { useSetRecoilState } from "recoil";
import { Period, Player, Score } from "../../types";
import { periodsAtom } from "../../atom";
import { Add, Remove } from "@mui/icons-material";

type PeriodPlayerProps = {
	player: Player;
	period: Period;
	score: Score;
	home: boolean;
};
const PeriodPlayer = (props: PeriodPlayerProps) => {
	const setPeriods = useSetRecoilState(periodsAtom);

	const getPlayerGoals = () => {
		return props.score.players.filter(
			(player) => player.name === props.player.name
		)[0].goals;
	};

	const updateGoals = (fn: () => number) => {
		setPeriods((old) =>
			old.map((period) => {
				if (period !== props.period) return period;

				const newScore = {
					players: props.score.players.map((player) => {
						if (player.name !== props.player.name) return player;
						return {
							...player,
							goals: fn(),
						};
					}),
				};
				return {
					...period,
					home: props.home ? newScore : period.home,
					away: !props.home ? newScore : period.away,
				};
			})
		);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<>{props.player.name}</>
			<div
				style={{
					display: "flex",
					gap: "0.5em",
					alignItems: "center",
				}}
			>
				<button onClick={() => updateGoals(() => getPlayerGoals() + 1)}>
					<Add />
				</button>
				<button
					onClick={() =>
						updateGoals(() => Math.max(0, getPlayerGoals() - 1))
					}
				>
					<Remove />
				</button>
				<>
					{
						props.score.players.filter(
							(playerScore) =>
								playerScore.name === props.player.name
						)[0].goals
					}
				</>
			</div>
		</div>
	);
};

export default PeriodPlayer;

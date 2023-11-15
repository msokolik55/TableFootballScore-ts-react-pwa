import { useRecoilValue } from "recoil";
import { periodsAtom } from "../../atom";

type ReportButtonProps = {
	fn: () => void;
	icon: JSX.Element;
};
const ReportButton = (props: ReportButtonProps) => {
	const periods = useRecoilValue(periodsAtom);

	return (
		<button
			style={{ marginBottom: "1em", flex: 1 }}
			disabled={periods.length <= 0}
			onClick={props.fn}
		>
			{props.icon}
		</button>
	);
};

export default ReportButton;

import React, { Component } from "react";
import { teamScore } from "./util";

class Total extends Component {
	static defaultProps = {
		position: "right"
	};
	render() {
		const { team, position } = this.props;
		const { def, med, att, score } = teamScore(team);

		return (
			<table className="total" style={{ textAlign: position }}>
				<tbody>
					<tr>
						{position === "left" && <td>{"|".repeat(def)}</td>}
						<td width={50}>{def}</td>
						{position === "right" && <td>{"|".repeat(def)}</td>}
					</tr>
					<tr>
						{position === "left" && <td>{"|".repeat(med)}</td>}
						<td width={50}>{med}</td>
						{position === "right" && <td>{"|".repeat(med)}</td>}
					</tr>
					<tr>
						{position === "left" && <td>{"|".repeat(att)}</td>}
						<td width={50}>{att}</td>
						{position === "right" && <td>{"|".repeat(att)}</td>}
					</tr>
					<tr>
						{position === "left" && <td>{"|".repeat(Math.ceil(score))}</td>}
						<td width={50}>{score}</td>
						{position === "right" && <td>{"|".repeat(Math.ceil(score))}</td>}
					</tr>
				</tbody>
			</table>
		);
	}
}

export default Total;

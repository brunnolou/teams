import React, { Component } from "react";

class ComparisonBar extends Component {
	render() {
		const [scoreA, scoreB] = this.props.scores;
		const [childA, childB] = this.props.children || [];

		const total = Number(scoreA) + Number(scoreB);
		const widthA = scoreA / total * 100;
		const widthB = scoreB / total * 100;

		return (
			<div class="bar">
				<div className="teamA-bar" style={{ width: `${widthA}%` }}>
					{childA}
				</div>
				<div className="teamB-bar" style={{ width: `${widthB}%` }}>
					{childB}
				</div>
			</div>
		);
	}
}

export default ComparisonBar;

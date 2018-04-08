import React, { Component } from "react";

class SortToggle extends Component {
	render() {
		const { name, onChange } = this.props;
		return (
			<div>
				<label className="toggle-button" htmlFor={name + "def"}>
					<input
						onChange={onChange}
						type="radio"
						name={name}
						value="def"
						id={name + "def"}
					/>
					<span class="toggle-text">Def</span>
				</label>
				<label className="toggle-button" htmlFor={name + "med"}>
					<input
						onChange={onChange}
						type="radio"
						name={name}
						value="med"
						id={name + "med"}
					/>
					<span class="toggle-text">Med</span>
				</label>
				<label className="toggle-button" htmlFor={name + "att"}>
					<input
						onChange={onChange}
						type="radio"
						name={name}
						value="att"
						id={name + "att"}
					/>
					<span class="toggle-text">Att</span>
				</label>
				<label className="toggle-button" htmlFor={name + "bal"}>
					<input
						onChange={onChange}
						type="radio"
						name={name}
						value="bal"
						id={name + "bal"}
					/>
					<span class="toggle-text">Bal</span>
				</label>
			</div>
		);
	}
}

export default SortToggle;

import React, { Component } from "react";

class Toggle extends Component {
	render() {
		const { name, value, onChange, children } = this.props;

		return (
			<label className="toggle-button" htmlFor={name + value}>
				<input
					onChange={onChange}
					type="radio"
					name={name}
					value={value}
					id={name + value}
				/>
				<span class="toggle-text">{children || value}</span>
			</label>
		);
	}
}

export default Toggle;

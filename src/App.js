import React, { Component } from "react";
import "./App.css";
import Total from "./Total";
import SortToggle from "./SortToggle";
import posed, { PoseGroup } from "react-pose";
import { teamScore } from "./util";
import base from "./base";
import ComparisonBar from "./components/ComparisonBar";
import Toggle from "./components/Toggle";

const Item = posed.li({});

const playerAvg = p =>
	(p.def + p.med + p.att + p.gk, Math.random()) / 5 * (1 + p.gkF / 10);

const by = position => {
	if (["def", "med", "att", "gk"].includes(position)) {
		return (a, b) => a[position] < b[position];
	}

	return (a, b) => playerAvg(a) < playerAvg(b);
};

const randomize = arr => arr.sort(() => Math.random() > 0.5);

class App extends Component {
	static defaultProps = {
		group: ""
	};

	state = {
		players: [],
		teamA: [],
		teamB: []
	};

	constructor(...args) {
		super(...args);
	}

	getTeams(statePlayers, sortA = "bal", sortB = "bal") {
		const a = [];
		const b = [];

		const players = statePlayers.filter(x => x.fixed);

		players.forEach((x, k) => {
			if (k % 2 === 0) {
				const [player] = players
					.filter(
						p =>
							!a
								.concat(b)
								.map(x => x.name)
								.includes(p.name)
					)
					.sort(by(sortA));
				if (!player) return;
				a.push(player);
				return;
			}

			const [player] = players
				.filter(
					p =>
						!b
							.concat(a)
							.map(x => x.name)
							.includes(p.name)
				)
				.sort(by(sortB));
			if (!player) return;
			b.push(player);
		});

		return [
			a, // .sort((a, b) => a.name > b.name),
			b // .sort((a, b) => a.name > b.name)
		];
	}

	sortA = "bal";
	sortB = "bal";

	handleSortBy = team => ({ target }) => {
		const { players } = this.state;
		const { value } = target;

		if (team === "a") this.sortA = value;
		if (team === "b") this.sortB = value;

		const [teamA, teamB] = this.getTeams(
			randomize(players),
			this.sortA,
			this.sortB
		);

		this.setState({
			teamA,
			teamB
		});
	};

	componentDidMount() {
		base.bindToState(`players`, {
			context: this,
			state: "players",
			queries: {
				orderByChild: "group",
				equalTo: this.props.group
			},
			asArray: true
		});
	}

	add = player => event => {
		if (player.fixed && this.state.players.filter(x => x.fixed).length <= 8)
			return;

		this.setState(prev => ({
			players: prev.players.map(p => ({
				...p,
				...(player.key === p.key ? { fixed: !player.fixed } : {})
			}))
		}));
	};

	render() {
		const { players } = this.state;
		const [teamA, teamB] = this.getTeams(players);
		const {
			score: scoreA,
			def: defA,
			med: medA,
			att: attA,
			gk: gkA
		} = teamScore(teamA);
		const {
			score: scoreB,
			def: defB,
			med: medB,
			att: attB,
			gk: gkB
		} = teamScore(teamB);

		const reserves = players
			.filter(x => !x.fixed)
			.sort((a, b) => a.name > b.name);

		return (
			<div>
				{players.length ? (
					<div className="App">
						<div class="l-inline l-p">
							<div className="team teamA left">
								<SortToggle
									name="a"
									selected={this.sortA}
									onChange={this.handleSortBy("a")}
								/>
							</div>

							<div className="team teamB right">
								<SortToggle
									name="b"
									selected={this.sortB}
									onChange={this.handleSortBy("b")}
								/>
							</div>
						</div>

						<ComparisonBar scores={[scoreA, scoreB]}>
							<h1>A</h1>
							<h1>B</h1>
						</ComparisonBar>

						<button onClick={this.handleSortBy()}>Random</button>

						<div class="l-inline">
							<ul className="teamsList teamA left">
								{teamA.sort((a, b) => a.name > b.name).map(a => (
									<li className=" player" key={a.name}>
										<a onClick={this.add(a)}>{a.name}</a>
									</li>
								))}
							</ul>
							<ul className="teamsList teamB right">
								{teamB.sort((a, b) => a.name > b.name).map(b => (
									<li className=" player" key={b.name}>
										<a onClick={this.add(b)}>{b.name}</a>
									</li>
								))}
							</ul>
						</div>

						<ComparisonBar scores={[defA, defB]}>
							<small>Def</small>
							<small>Def</small>
						</ComparisonBar>

						<ComparisonBar scores={[medA, medB]}>
							<small>Med</small>
							<small>Med</small>
						</ComparisonBar>

						<ComparisonBar scores={[attA, attB]}>
							<small>Att</small>
							<small>Att</small>
						</ComparisonBar>

						<ComparisonBar scores={[gkA, gkB]}>
							<small>Gk</small>
							<small>Gk</small>
						</ComparisonBar>

						<div className="reservers">
							{reserves.map(reserve => (
								<a
									className="player"
									key={reserve.name}
									value={reserve.name}
									onClick={this.add(reserve)}
								>
									{reserve.name}
								</a>
							))}
						</div>
					</div>
				) : (
					<a href="?group=?">Loading</a>
				)}
			</div>
		);
	}
}

export default App;

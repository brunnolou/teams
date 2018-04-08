export const teamScore = team => {
	const def = team.reduce((acc, curr) => acc + curr.def, 0);
	const med = team.reduce((acc, curr) => acc + curr.med, 0);
	const att = team.reduce((acc, curr) => acc + curr.att, 0);
	const gk = team.reduce((acc, curr) => acc + curr.gk, 0);
	const gkF = team.reduce((acc, curr) => acc + curr.gkF, 0);

	const score = ((def + med + att + gk) / 4 * (1 + gkF / 10)).toFixed(2);

	return {
		def: def,
		med: med,
		att: att,
		gk: gk,
		gkF: gkF,
		score
	};
};

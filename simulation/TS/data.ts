let g = 980; //gravity in CGS
let A = 0.1256; //cross sectional area
let initial_wt = 5;
let final_wt: number[];
let table_data: number[][];
let susceptibility = 0;
let selected_specimen = 1;
// let susc_ca = -38.2 * 10 ** -6;
// let susc_k = parseFloat((20 * 10 ** -6).toFixed(6));
let susc_ca = -0.0000382;
let susc_k = 0.00002;
let percentage_error: number;
let susc_compare: number; // camparision btwn cal susc & standrd susc

let H = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]; //in tesla

// ========== Data for calcium carbonate ========== //

let final_wt_Ca = [
	5, 4.998, 4.99, 4.978, 4.961, 4.939, 4.912, 4.88, 4.843, 4.802, 4.755,
];

// H, H^2, initial weight, final weight, delta M(difference btwn final & initial wt), susceptibility
let Ca = [[0, 0, 5, 5, 0, 0]];

// ========== Data for Potassium permagnate ========== //

let final_wt_K = [
	5, 5.001, 5.005, 5.012, 5.021, 5.032, 5.046, 5.063, 5.082, 5.104, 5.128,
];

// H, H^2, initial weight, final weight, delta M(difference btwn final & initial wt), susceptibility
let K = [[0, 0, 5, 5, 0, 0]];

// ========== calculations ========== //

function calculate_susceptibility(data: number[][]) {
	let susc_sum = 0;
	for (let i = 1; i < data.length; i++) {
		let sus = parseFloat(
			((2 * data[i][4] * g) / (A * data[i][1])).toFixed(6)
		);
		data[i].push(sus);
		susc_sum += sus;
	}

	susceptibility = parseFloat((susc_sum / (data.length - 1)).toFixed(6));
}

function cal_data(arr: number[][], final_wt: number[]) {
	for (let i = 1; i < H.length; i++) {
		let ar: number[] = [];
		ar.push(H[i]);
		ar.push(H[i] ** 2);
		ar.push(initial_wt);
		ar.push(final_wt[i]);
		ar.push(parseFloat((ar[3] - ar[2]).toFixed(3)));
		arr.push(ar);
	}
}

function cal_percentage_error(standard_susc: number) {
	let error = Math.round(
		Math.abs((susceptibility - standard_susc) / standard_susc) * 100
	);

	console.log('error', error);

	if (error <= 1) {
		percentage_error = 1;
	} else if (error > 1 && error <= 5) {
		percentage_error = 5;
	} else if (error > 5 && error <= 10) {
		percentage_error = 10;
	} else if (error > 10) {
		percentage_error = 15;
	}
}

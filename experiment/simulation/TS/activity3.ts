declare var MathJax;

function activity3() {
	// internal_calculations(selected_specimen); //remove this line

	console.log('table data', table_data);

	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(`<p id="exp-title">Calculate susceptibility</p>`, 3);
	pp.showdescription(
		`
      <p class='discription_text'>
         $$ \χ = \\frac{2 \× \μ_0 \× \Δm \× g}{AH^2} $$
         The radius of the sample = 0.1 cm <br>
         A = cross sectional area of the sample <br>
         &Delta;m = change in the mass <br>
         g = acceleration due to gravity <br>
         &mu;<sub>0</sub> value is unity(1) in CGS

      </p>
      `,
		3
	);

	pp.addtorightpannel(
		`<button  class="btn btn-primary" onclick="a3_verify_table()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`,
		3
	);

	show_panel(3);
	a3_load_table1();

	setTimeout(() => MathJax.typeset(), 150);
}

function a3_load_table1() {
	let tbody = ``;
	for (let i = 1; i < 6; i++) {
		tbody += `<tr>
                  <td style="width:15vw">${i}</td>
                  <td style="width:15vw">${table_data[i][0]}</td>
                  <td style="width:15vw"><input type='text' class='form-control' id='a3-H-sq-inp-${i}' /></td>
                  <td style="width:15vw">${table_data[i][2]}</td>
                  <td style="width:15vw">${table_data[i][3]}</td>
                  <td style="width:15vw"><input type='text' class='form-control' id='a3-dm-inp-${i}' /></td>
                  <td style="width:15vw"><input type='text' class='form-control' id='a3-sus-inp-${i}' /></td>
            </tr>`;
	}

	let template = `<div id="a3-table-1" class='table-responsive' style="margin-top:5px;">
      <table class='table' id="a3-datatable" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>H(tesla)</td>
               <td>H<sup>2</sup></td>
               <td>Initial weight</td>
               <td>Final Weight</td>
               <td>&Delta;m</td>
               <td>Susceptibility (&chi;)</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>`;

	pp.addtoleftpannel(template);
	// a3_resizeTable();
}

// function a3_resizeTable() {
// 	let tab: HTMLDivElement = <HTMLDivElement>(
// 		document.getElementById('a3-table-1')
// 	);
// 	tab.style.width = window.innerWidth * 0.8 + 'px';
// 	tab.style.height =
// 		((window.innerWidth * 0.91 * 1080.0) / 1920) * 0.75 + 'px';
// }

function a3_verify_table() {
	let h_sq_inp: HTMLInputElement;
	let dm_inp: HTMLInputElement;
	let susc_inp: HTMLInputElement;

	for (let i = 1; i < 6; i++) {
		h_sq_inp = <HTMLInputElement>(
			document.getElementById(`a3-H-sq-inp-${i}`)
		);
		dm_inp = <HTMLInputElement>document.getElementById(`a3-dm-inp-${i}`);
		susc_inp = <HTMLInputElement>document.getElementById(`a3-sus-inp-${i}`);

		console.log(table_data[i][1]);
		console.log(table_data[i][4]);
		console.log(table_data[i][5]);

		if (!verify_values(parseFloat(h_sq_inp.value), table_data[i][1])) {
			h_sq_inp.style.border = '1px solid red';
			alert('Incorrect value');
			return;
		} else {
			h_sq_inp.style.border = '1px solid #ced4da';
			h_sq_inp.disabled = true;
		}
		if (!verify_values(parseFloat(dm_inp.value), table_data[i][4])) {
			dm_inp.style.border = '1px solid red';
			alert('Incorrect value');
			return;
		} else {
			dm_inp.style.border = '1px solid #ced4da';
			dm_inp.disabled = true;
		}
		if (!verify_values(parseFloat(susc_inp.value), table_data[i][5])) {
			susc_inp.style.border = '1px solid red';
			alert('Incorrect value');
			return;
		} else {
			susc_inp.style.border = '1px solid #ced4da';
			susc_inp.disabled = true;
		}
	}
	a3_load_data_table();
}

function a3_load_data_table() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(`<p id="exp-title">Gouy's method</p>`, 3);
	pp.showdescription(
		`<p class='discription_text'>Calculations correct. Calculate average susceptibility.</p>`,
		3
	);
	show_panel(3);

	let tbody = ``;
	for (let i = 1; i < 11; i++) {
		tbody += `<tr>
                  <td style="width:15vw">${i}</td>
                  <td style="width:15vw">${table_data[i][0]}</td>
                  <td style="width:15vw">${table_data[i][1]}</td>
                  <td style="width:15vw">${table_data[i][2]}</td>
                  <td style="width:15vw">${table_data[i][3]}</td>
                  <td style="width:15vw">${table_data[i][4]}</td>
                  <td style="width:15vw">${table_data[i][5]}</td>
            </tr>`;
	}

	let template = `<div class='table-responsive' style="margin-top:5px;">
      <table class='table' id="a3-datatable2" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>H(tesla)</td>
               <td>H<sup>2</sup></td>
               <td>Initial weight</td>
               <td>Final Weight</td>
               <td>&Delta;m</td>
               <td>Susceptibility (&chi;)</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>
   <br>
   <div class="row" id='avg-susc-div'>
         <h4 class="col-md-4">Calculated average susceptibility = </h4>
         <input class="col-md-2 " type="text" id='avg-susc'/>
         <button id="avg-susc-btn" class="btn btn-primary col-md-2" onclick="verify_average_susceptibility()" style="margin-left:10px;" >Verify</button>
      </div>
   `;

	pp.addtoleftpannel(template);
}

function verify_average_susceptibility() {
	let avg_susc_inp = <HTMLInputElement>document.getElementById('avg-susc');
	let btn = <HTMLButtonElement>document.getElementById('avg-susc-btn');

	console.log(susceptibility);

	if (!verify_values(parseFloat(avg_susc_inp.value), susceptibility)) {
		alert('Incorrect answer');
		return;
	} else {
		pp.showdescription(
			`<p class='discription_text'>Calculations correct. Click on next.</p>`,
			3
		);

		pp.addtorightpannel(
			`<button id="panel1_btn" class="btn btn-primary" onclick="activity4()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`,
			3
		);
		show_panel(3);
	}
	btn.remove();
	avg_susc_inp.disabled = true;
}

// activity2();

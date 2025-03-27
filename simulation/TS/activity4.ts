function activity4() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(`<p id="exp-title">Gouy's method</p>`, 3);

	let text = `
      <div style="margin-top:10px;">
         <h4>Standard value of Susceptibility = ${
				selected_specimen === 1
					? '-38.2 &times; 10<sup>-6</sup>'
					: '20 &times; 10<sup>-6</sup>'
			} cm<sup>3</sup>/mol </h4>
      </div>
      <br>
      <br>
      <div class="row" id='cal-susc-div'>
         <h4 class="col-md-4">Calculated value of Susceptibility = </h4>
         <input class="col-md-2 " type="text" id='cal-susc'/>
         <button id="cal-susc-btn" class="btn btn-primary col-md-2" onclick="verify_cal_susceptibility()" style="margin-left:10px;" >Verify</button>
      </div>
   `;

	pp.addtoleftpannel(text);
}

function verify_cal_susceptibility() {
	let val: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('cal-susc')
	);

	let div: HTMLDivElement = <HTMLDivElement>(
		document.getElementById('cal-susc-div')
	);

	console.log(susceptibility);

	if (!verify_values(parseFloat(val.value), susceptibility)) {
		alert('Calculated value and entered value are different');
		return;
	} else {
		div.innerHTML = '';
		div.innerHTML = `
      <h4>Calculated value of Susceptibility = ${
			susceptibility * 10 ** 6
		} &times; 10<sup>-6</sup> cm<sup>3</sup>/mol </h4>
      `;
	}

	load_percentage_error_div();
}
function load_percentage_error_div() {
	let text = `
      <div id='percentage-error-div' style="position:absolute; top:15vw;">
         <p style="font-size:23px; font-weight:500">
            The experimentally found out value
            <select id="susc-compare" style=' width: 10vw; height:2.5vw; top: 5vw; border: none; border-radius:5px; background-color: black; color: white; font-size: 1.2vw; text-align:center;' >
               <option selected value="">Select answer</option>
               <option value="1">=</option>
               <option value="2">&lt;</option>
               <option value="3">&gt;</option>
            </select>
            standard value.
         </p>

         <br>

         <p style="font-size:23px; font-weight:500">
            Is the % error is 
            <select id="percentage-error" style=' width: 10vw; height:2.5vw; top: 5vw; border: none; border-radius:5px; background-color: black; color: white; font-size: 1.2vw; text-align:center;' >
               <option selected value="">Select answer</option>
               <option value="1">&leq; 1%</option>
               <option value="5">&leq; 5%</option>
               <option value="10">&leq; 10%</option>
               <option value="15">&gt; 10%</option>
            </select>
         </p>
         <button id="cal-susc-btn" class="btn btn-primary col-md-2" onclick="verify_dropdowns()"  style="width:10vw;">Verify</button>
      </div>
   `;

	pp.addtoleftpannel(text);
}

function verify_dropdowns() {
	let compare_inp = <HTMLInputElement>document.getElementById('susc-compare');
	let percentage_inp = <HTMLInputElement>(
		document.getElementById('percentage-error')
	);
	console.log(`option ${susc_compare}`);
	console.log(percentage_error);

	if (parseInt(compare_inp.value) !== susc_compare) {
		alert('Incorrect selection');
		compare_inp.style.backgroundColor = '#C63C51';
		return;
	} else {
		compare_inp.style.backgroundColor = 'black';
	}

	if (parseInt(percentage_inp.value) != percentage_error) {
		alert('Incorrect percentage error');
		percentage_inp.style.backgroundColor = '#C63C51';
		return;
	} else {
		percentage_inp.style.backgroundColor = 'black';
	}
	experiment_complete();
}

function experiment_complete() {
	let btn = <HTMLButtonElement>document.getElementById('cal-susc-btn');
	let value_dd = <HTMLInputElement>document.getElementById('susc-compare');
	let percent_dd = <HTMLInputElement>(
		document.getElementById('percentage-error')
	);

	btn.remove();
	value_dd.disabled = true;
	percent_dd.disabled = true;
	pp.showdescription(
		`
      <p class='discription_text'>
         Experiment Successfull.
      </p>
      `,
		3
	);

	show_panel(3);
}

// activity3();

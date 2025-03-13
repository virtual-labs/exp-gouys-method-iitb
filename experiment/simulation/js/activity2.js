//global variables for activity2
let incr_btn;
let weight;
let magnetic_fld;
let specimen;
let probe_btn_status;
let reading_count = 0;
let tab;
let h_inp;
let in_wt_inp;
let fi_wt_inp;
let exp_setup_img;
function activity2() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="exp-title">Simulation with experimental setup</p>`, 3);
    let inp_fields = `
	<div>
	   <label style='position: absolute; left: 10.5vw; width: 11.2vw; top: 4.7vw; font-size: 1.6vw; font-weight: 600;' for="specimen" id='specimen-label'>Specimen</label>

	   <select onchange="specimen_selected(this.value);" isDisabled="false"; name="specimen" id="specimen" style='position: absolute; left: 7vw; width: 15vw; height:2.5vw; top: 7vw; border: none; border-radius:5px; background-color: black; color: white; font-size: 1.2vw; text-align:center;' >
	      <option selected value="">Select specimen</option>
	      <option value="1">Calcium carbonate</option>
	      <option value="2">Potassium permanganate</option>
	  </select>
	</div>

   <div>
     
     <input disabled class="form-control" type="text" id="weight" style='position: absolute; left: 34vw; top:5vw; width: 10vw; font-size: 1.3vw; text-align:right; font-weight:800;color:black; background-color: transparent; border:none;' placeholder="g" />
 </div>

   <div>
     
     <input disabled class="form-control" type="text" id="mag-field" style='position: absolute; left: 16vw; top:36.7vw; width: 10vw; font-size: 1.3vw; font-weight:800; text-align:right; color:white; background-color:dodgerblue ;' placeholder="H" />
 </div>
	`;
    pp.addtoleftpannel(inp_fields);
    a2_load_table1();
    pp.addcanvas('mycanvas');
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    scene = new Scene();
    exp_setup_img = new Chemistry.Custome_image(exp_setup1, new Chemistry.Point(600, 470), 2390 * 0.5, 1930 * 0.5, canvas);
    scene.add(exp_setup_img);
    incr_btn = new Chemistry.Polygon(new Chemistry.Point(530, 125), 20, 3, canvas);
    incr_btn.color = 'black';
    incr_btn.stang = 90;
    scene.add(incr_btn);
    scene.draw();
    pp.showdescription(`<p class='discription_text'>Select specimen</p>`, 3);
    show_panel(3);
    // add canvas sizing
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //canvas mapping
    a2_canvas_mapping();
    a2_resizeTable();
    //draw scene
    scene.draw();
}
function a2_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a2_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function specimen_selected(val) {
    console.log(val);
    specimen = document.getElementById('specimen');
    weight = document.getElementById('weight');
    magnetic_fld = document.getElementById('mag-field');
    in_wt_inp = (document.getElementById(`a2-in-wt-inp-${reading_count + 1}`));
    in_wt_inp.disabled = false;
    selected_specimen = parseInt(specimen.value);
    weight.value = '5 g';
    magnetic_fld.value = '0 H';
    probe_btn_status = true;
    canvas.addEventListener('click', a2_mouse_click_probe);
    internal_calculations(selected_specimen);
    pp.showdescription(`<p class='discription_text'>Note initital weight to observation table</p>
      <p class='discription_text'>Then put probe on wooden stand</p>
      `, 3);
    show_panel(3);
}
function a2_load_table1() {
    let tbody = ``;
    for (let i = 1; i < 6; i++) {
        tbody += `<tr>
                  <td>${i}</td>
                  <td style="width:10vw"><input disabled  type='text' class='form-control' id='a2-H-inp-${i}' /></td>
                  <td style="width:10vw"><input disabled  type='text' class='form-control' id='a2-in-wt-inp-${i}' /></td>
                  <td style="width:10vw"><input disabled  type='text' class='form-control' id='a2-fi-wt-inp-${i}' /></td>
            </tr>`;
    }
    let template = `<div id="a2-table-1" class='table-responsive' style=" width:5%; position:absolute; right:8vw; top:4vw; ">
      <p style="font-size:19px; font-weight:500">Initial weight is 5g</p>
      <table class='table' id="a2-datatable" style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>H(tesla)</td>
               <td>Initial weight</td>
               <td>Final Weight</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   </div>`;
    pp.addtoleftpannel(template);
    a2_resizeTable();
}
function a2_resizeTable() {
    let tab = (document.getElementById('a2-table-1'));
    tab.style.width = window.innerWidth * 0.3 + 'px';
    tab.style.height =
        ((window.innerWidth * 0.91 * 1080.0) / 1920) * 0.75 + 'px';
}
function verify_reading() {
    h_inp = (document.getElementById(`a2-H-inp-${reading_count}`));
    in_wt_inp = (document.getElementById(`a2-in-wt-inp-${reading_count}`));
    fi_wt_inp = (document.getElementById(`a2-fi-wt-inp-${reading_count}`));
    if (reading_count == 1) {
        if (in_wt_inp.value == null ||
            in_wt_inp.value != final_wt[reading_count - 1].toString()) {
            alert('Please note initial weight in observation table');
            return;
        }
    }
    else {
        if (in_wt_inp.value == null ||
            in_wt_inp.value != initial_wt.toString()) {
            alert('Please note correct initial weight in observation table which is the final weight of previous reading');
            return;
        }
    }
    if (h_inp.value == null || h_inp.value != H[reading_count - 1].toString()) {
        alert('Please note correct magnetic field in observation table');
        return;
    }
    if (fi_wt_inp.value == null ||
        fi_wt_inp.value != final_wt[reading_count - 1].toString()) {
        alert('Please note correct final weight in observation table');
        return;
    }
    if (reading_count < 5) {
        pp.showdescription(`<p class='discription_text'>For reading ${reading_count + 1}, note given initial weight to observation table.</p>
         <p class='discription_text'>Then put probe on wooden stand</p>
         `, 3);
    }
    else {
        canvas.removeEventListener('click', a2_mouse_click_probe);
        hide_panel(3);
        load_full_obervation_table();
    }
    h_inp.disabled = true;
    in_wt_inp.disabled = true;
    fi_wt_inp.disabled = true;
    let temp_inp = (document.getElementById(`a2-in-wt-inp-${reading_count + 1}`));
    if (reading_count < 5) {
        temp_inp.disabled = false;
    }
    canvas.addEventListener('click', a2_mouse_click_probe);
    probe_btn_status = true;
}
function a2_mouse_click_increase_btn(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 115 && y <= 144) {
        if (x >= 510 && x <= 547) {
            console.log('inside button on');
            pp.showdescription(`<p class='discription_text'>Note magnetic field to observation table</p>
            <p class='discription_text'>Then remove probe from wooden stand</p>
            `, 3);
            magnetic_fld.value = H[reading_count].toString() + ' H';
            show_panel(3);
            probe_btn_status = false;
            canvas.removeEventListener('click', a2_mouse_click_increase_btn);
            canvas.addEventListener('click', a2_mouse_click_probe);
            scene.draw();
        }
    }
}
var currentTime = 5;
function animateTimer() {
    if (selected_specimen === 1) {
        currentTime = parseFloat((currentTime - 0.001).toFixed(3));
        weight.value = currentTime.toString() + ' g';
        if (currentTime <= final_wt[reading_count - 1])
            return;
    }
    else {
        currentTime = parseFloat((currentTime + 0.001).toFixed(3));
        weight.value = currentTime.toString() + ' g';
        if (currentTime >= final_wt[reading_count - 1])
            return;
    }
    console.log('currentTime', currentTime);
    window.requestAnimationFrame(animateTimer);
}
function internal_calculations(value) {
    if (value === 1) {
        final_wt = final_wt_Ca.map((data, index) => index === 0
            ? data
            : parseFloat((data + (Math.random() - 0.5) * 0.004).toFixed(3)));
        cal_data(Ca, final_wt);
        calculate_susceptibility(Ca);
        cal_percentage_error(susc_ca);
        table_data = Ca;
        susc_compare =
            susc_ca === susceptibility ? 1 : susceptibility < susc_ca ? 2 : 3;
    }
    else {
        final_wt = final_wt_K.map((data, index) => index === 0
            ? data
            : parseFloat((data + (Math.random() - 0.5) * 0.002).toFixed(3)));
        cal_data(K, final_wt);
        calculate_susceptibility(K);
        cal_percentage_error(susc_k);
        table_data = K;
        susc_compare =
            susc_k === susceptibility ? 1 : susceptibility < susc_k ? 2 : 3;
    }
    console.log('final_wt', final_wt);
    console.log('table data', table_data);
    console.log('susceptibility', susceptibility);
}
function load_full_obervation_table() {
    pp.showdescription(`<p class='discription_text'>Simulation complete. Click next for calculations.</p>
	   `, 3);
    pp.addtorightpannel(`<button id="panel1_btn" class="btn btn-primary" onclick="activity3()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`, 3);
    let table_div = document.getElementById('a2-table-1');
    let tbody = ``;
    for (let i = 0; i < 11; i++) {
        tbody += `<tr>
                  <td>${i + 1}</td>
                  <td style="width:10vw">${table_data[i][0]}</td>
                  <td style="width:10vw">${table_data[i][2]}</td>
                  <td style="width:10vw">${table_data[i][3]}</td>
            </tr>`;
    }
    table_div.innerHTML = '';
    table_div.innerHTML = `
      <table class='table' style="text-align:center;">
         <thead class='table-dark'>
            <tr>
               <td>S No.</td>
               <td>H(tesla)</td>
               <td>Initial weight</td>
               <td>Final Weight</td>
            </tr>
         </thead>
         <tbody>
            ${tbody}
         </tbody>
      </table>
   `;
}
function a2_mouse_click_probe(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    //for probe on
    if (probe_btn_status) {
        if (y >= 74 && y <= 281) {
            if (x >= 965 && x <= 994) {
                console.log('probe on');
                h_inp = (document.getElementById(`a2-H-inp-${reading_count + 1}`));
                if (specimen.getAttribute('isDisabled')) {
                    specimen.disabled = true;
                    specimen.removeAttribute('isDisabled');
                }
                if (reading_count < 1) {
                    pp.showdescription(`<p class='discription_text'>Note magnetic field to observation table</p>
            <p class='discription_text'>Then remove probe from wooden stand</p>
            `, 3);
                    show_panel(3);
                    probe_btn_status = false;
                }
                else {
                    canvas.addEventListener('click', a2_mouse_click_increase_btn);
                    pp.showdescription(`<p class='discription_text'>Increase electromagnet power supply</p>
            `, 3);
                    show_panel(3);
                    canvas.removeEventListener('click', a2_mouse_click_probe);
                }
                h_inp.disabled = false;
                exp_setup_img.img = exp_setup2;
                scene.draw();
            }
        }
    }
    else {
        //for probe off
        if (y >= 206 && y <= 358) {
            if (x >= 761 && x <= 778) {
                console.log('probe off');
                canvas.removeEventListener('click', a2_mouse_click_probe);
                reading_count++;
                fi_wt_inp = (document.getElementById(`a2-fi-wt-inp-${reading_count}`));
                fi_wt_inp.disabled = false;
                if (reading_count > 1)
                    animateTimer();
                pp.showdescription(`
                  <p class='discription_text'>Reading ${reading_count} is complete.</p>
                  <p class='discription_text'>Note final weight to observation table then click on next.</p>
               `, 3);
                pp.addtorightpannel(`<button id="panel1_btn" class="btn btn-primary" onclick="verify_reading()" style="position: absolute; bottom: 12vh; width: 91%;">Next</button>`, 3);
                show_panel(3);
                exp_setup_img.img = exp_setup1;
                scene.draw();
            }
        }
    }
}
// activity2();
//# sourceMappingURL=activity2.js.map
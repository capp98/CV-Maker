function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling
  let cursosInput = document.querySelectorAll('.cursos');
  let cursoss = [];
  cursosInput.forEach((c) => {
    let a = c.querySelectorAll('input');
    cursoss.push({
      local: a[0].value,
      curso: a[1].value,
      periodo: a[2].value,
    });
  });
  formJSON.cursos = cursoss;

  formJSON.telefone = data.getAll('telefone');

  let trabalhosInput = document.querySelectorAll('.trabalhos');
  let trabalhoss = [];
  trabalhosInput.forEach((c) => {
    let a = c.querySelectorAll('input');
    trabalhoss.push({
      local: a[0].value,
      cargo: a[1].value,
      periodo: a[2].value,
    });
  });

  formJSON.trabalhos = trabalhoss;

  const results = document.querySelector('.results pre');
  results.innerText = JSON.stringify(formJSON, null, 2);

  var BOM = '\uFEFF';
  const a = document.createElement('a');
  const file = new Blob([BOM + results.innerText], {
    type: 'text/plain;charset=utf-8',
  });
  a.href = URL.createObjectURL(file);
  a.download = 'cv.json';
  a.click();
}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

const bAdicionarTelefone = document.querySelector('input.adicionarTelefone');
bAdicionarTelefone.addEventListener('click', addTelefone);

const bRemoveTelefone = document.querySelector('input.removerTelefone');
bRemoveTelefone.addEventListener('click', removeTelefone);

const bAdicionarCurso = document.querySelector('input.adicionarCurso');
bAdicionarCurso.addEventListener('click', addCurso);

const bRemoveCurso = document.querySelector('input.removerCurso');
bRemoveCurso.addEventListener('click', removeCurso);

const bAdicionarTrabalho = document.querySelector('input.adicionarTrabalho');
bAdicionarTrabalho.addEventListener('click', addTrabalho);

const bRemoveTrabalho = document.querySelector('input.removerTrabalho');
bRemoveTrabalho.addEventListener('click', removeTrabalho);

const radioGenero = document.forms[0].genero;
radioGenero.forEach((r) => r.addEventListener('change', oi));

const divTelefones = document.querySelector('div.telefones');
const divCursos = document.querySelector('div.cursosField');
const divTrabalhos = document.querySelector('div.trabalhosField');

let cursoIndex = 1;
let trabalhoIndex = 1;

function addTelefone() {
  let telefone = document.createElement('input');
  telefone.type = 'tel';
  telefone.name = 'telefone';
  divTelefones.append(telefone);
}

function removeTelefone() {
  divTelefones.removeChild(divTelefones.lastElementChild);
}

function addCurso() {
  ++cursoIndex;

  let fset = document.createElement('fieldset');
  fset.classList.add('cursos');
  fset.style.marginTop = '15px';
  let legend = document.createElement('legend');
  legend.innerHTML = `Curso ${cursoIndex}`;
  fset.appendChild(legend);

  let labelLocal = document.createElement('label');
  let inputLocal = document.createElement('input');
  inputLocal.id = `local${cursoIndex}`;
  labelLocal.htmlFor = inputLocal.id;
  labelLocal.innerText = 'Local';

  let labelCurso = document.createElement('label');
  let inputCurso = document.createElement('input');
  inputCurso.id = `curso${cursoIndex}`;
  labelCurso.htmlFor = inputCurso.id;
  labelCurso.innerText = 'Curso';

  let labelPeriodo = document.createElement('label');
  let inputPeriodo = document.createElement('input');
  inputPeriodo.id = `periodo${cursoIndex}`;
  labelPeriodo.htmlFor = inputPeriodo.id;
  labelPeriodo.innerText = 'Período';

  fset.appendChild(labelLocal).appendChild(inputLocal);
  fset.appendChild(labelCurso).appendChild(inputCurso);
  fset.appendChild(labelPeriodo).appendChild(inputPeriodo);

  divCursos.append(fset);
}

function removeCurso() {
  if (divCursos.childElementCount > 1) {
    divCursos.removeChild(divCursos.lastElementChild);
    cursoIndex--;
  }
}

function addTrabalho() {
  ++trabalhoIndex;

  let fset = document.createElement('fieldset');
  fset.classList.add('trabalhos');
  fset.style.marginTop = '15px';
  let legend = document.createElement('legend');
  legend.innerHTML = `Trabalho ${trabalhoIndex}`;
  fset.appendChild(legend);

  let labelLocal = document.createElement('label');
  let inputLocal = document.createElement('input');

  inputLocal.id = `local${trabalhoIndex}`;

  labelLocal.htmlFor = inputLocal.id;
  labelLocal.innerText = 'Local';

  let labelCargo = document.createElement('label');
  let inputCargo = document.createElement('input');

  inputCargo.id = `cargo${trabalhoIndex}`;

  labelCargo.htmlFor = inputCargo.id;
  labelCargo.innerText = 'Cargo';

  let labelPeriodo = document.createElement('label');
  let inputPeriodo = document.createElement('input');

  inputPeriodo.id = `periodo${trabalhoIndex}`;

  labelPeriodo.htmlFor = inputPeriodo.id;
  labelPeriodo.innerText = 'Período';

  fset.appendChild(labelLocal).appendChild(inputLocal);
  fset.appendChild(labelCargo).appendChild(inputCargo);
  fset.appendChild(labelPeriodo).appendChild(inputPeriodo);

  divTrabalhos.append(fset);
}

function removeTrabalho() {
  if (divTrabalhos.childElementCount > 1) {
    trabalhoIndex--;
    divTrabalhos.removeChild(divTrabalhos.lastElementChild);
  }
}

function oi() {
  let isHomem = document.forms[0].genero[0].checked;
  let genero = isHomem ? 'o' : 'a';

  document.getElementById('solteirx').value = 'Solteir' + genero;
  document.querySelector('[for="solteirx"]').innerHTML = 'Solteir' + genero;

  document.getElementById('casadx').value = 'Casad' + genero;
  document.querySelector('[for="casadx"]').innerHTML = 'Casad' + genero;

  document.getElementById('viuvx').value = 'Viúv' + genero;
  document.querySelector('[for="viuvx"]').innerHTML = 'Viúv' + genero;

  document.getElementById('divorciadx').value = 'Divorciad' + genero;
  document.querySelector('[for="divorciadx"]').innerHTML = 'Divorciad' + genero;
}

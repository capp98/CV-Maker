let cursoIndex = 1;
let trabalhoIndex = 1;

//#region SELETORES E EVENTOS
const divTelefones = document.querySelector('div.telefones');
const divCursos = document.querySelector('div.cursosField');
const divTrabalhos = document.querySelector('div.trabalhosField');

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
radioGenero.forEach((r) => r.addEventListener('change', mudaGenero));

const telefoneField = document.forms[0].telefone;
telefoneField.addEventListener('input', formataTelefone);

const dataDeNascimentoField = document.forms[0].dataNasc;
dataDeNascimentoField.addEventListener('input', formataDataDeNascimento);

//#endregion

//HANDLERS

function handleFormSubmit(event) {
   event.preventDefault();

   const data = new FormData(event.target);

   const formJSON = Object.fromEntries(data.entries());

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

   gen(formJSON);
}

//#region MANIPULA CAMPOS

function formataDataDeNascimento(event) {
   let dataDeNascimento = event.target;

   let dataDeNascimentoFormatado = dataDeNascimento.value.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3'
   );
   dataDeNascimento.value = dataDeNascimentoFormatado;
}

function formataTelefone(event) {
   let telefone = event.target;
   let telefoneFormatado;
   if (telefone.value.length == 9) {
      telefoneFormatado = telefone.value[0] != '1' ? telefone.value.replace(
         /(\d{5})(\d{4})/,
         '$1-$2'
      ) : telefone.value.replace(
         /(\d{2})(\d{5})(\d{2})/,
         '($1) $2-$3'
      );
   } else telefoneFormatado = telefone.value;

   telefone.value = telefoneFormatado;
}

function addTelefone() {
   let telefone = document.createElement('input');
   telefone.type = 'text';
   telefone.maxLength = 15;
   telefone.name = 'telefone';
   telefone.addEventListener('input', formataTelefone);
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

function mudaGenero() {
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

//#endregion

function gen(dados) {
   const texto = docx.TextRun;
   const paragrafo = docx.Paragraph;
   const genero = dados.genero == "H" ? "o" : "a";

   const paragrafoNome = new paragrafo({
      children: [
         new texto({
            text: dados.nome,
            bold: true,
            font: 'Verdana',

            size: 22 * 2,
         }),
      ],
      border: {
         bottom: {
            color: 'auto',
            style: 'thinThickSmallGap',
            size: 26,
         },
      },
      spacing: {
         after: (14 * 100) / 5,
      },
   });

   const paragrafoNascimento = new paragrafo({
      children: [
         new texto({
            text: 'Data de Nascimento: ',
            bold: true,
         }),
         new texto(dados.dataNasc),
      ],
      style: 'normal',
   });

   const paragrafoEndereco = new paragrafo({
      children: [
         new texto({
            text: 'Endereço: ',
            bold: true,
         }),
         new texto(
            `${dados.endereco}, nº ${dados.numero}, ${dados.bairro} – Guarujá/SP.`
         ),
      ],
      style: 'normal',
   });

   const paragrafoTelefones = new paragrafo({
      children: [
         new texto({
            text: 'Tel.: ',
            bold: true,
         }),
         new texto({
            text: dados.telefone.join(' / '),
            bold: true
         }),
      ],
      style: 'normal',
   });

   const paragrafoEstadoCivil = new paragrafo({
      children: [
         new texto({
            text: 'Estado Civil: ',
            bold: true,
         }),
         new texto(dados.estadoCivil),
      ],
      style: 'normal',
   });

   let paragrafoCnh

   console.log(dados.cnh)

   if (dados.cnh) {

      paragrafoCnh = new paragrafo({
         children: [
            new texto({
               text: 'CNH: ',
               bold: true,
            }),
            new texto({
               text: dados.cnh,
               color: 'ff0000',
               bold: true
            }),
         ],
         style: 'normal',
      });
   }

   let paragrafoEmail
   if (dados.email) {

      paragrafoEmail = new paragrafo({
         children: [
            new texto({
               text: 'E-mail: ',
               bold: true,
            }),
            new texto({
               text: dados.email,
               bold: true
            }),
         ],
         style: 'normal',
      })
   }

   const paragrafoQualiProf = new docx.Paragraph({
         text: `Atencios${genero}, pontual e sendo concedida a devida oportunidade crescerei passo a passo nos exercícios das minhas futuras responsabilidades, porque acredito no meu potencial e na minha capacidade de aprender sempre.`,
         alignment: docx.AlignmentType.JUSTIFIED,
         indent: {
            firstLine: 500,
         },
         style: 'normal',
      }),

      const paragrafoFormacaoEscolar = new docx.Paragraph({
            text: dados.formacaoEscolar,
            style: 'normal',
         }),

         const paragrafoCursos = () => {

            let paragraphArray = [];

            if (dados.cursos[0].curso) {

               paragraphArray.push(new docx.Paragraph({
                  text: 'Cursos Extracurriculares:',
                  style: 'topico',
               }), )

               dados.cursos.map(curso => {

                  if (curso.local) {

                     paragraphArray.push(
                        new docx.Paragraph({
                           text: curso.local,
                           style: 'topicoLista',
                           numbering: {
                              reference: 'bolinha',
                              level: 0,
                           },
                        }),
                     )

                  }


                  paragraphArray.push(

                     new docx.Paragraph({
                        children: [
                           new docx.TextRun({
                              text: 'Curso: ',
                              bold: true,
                           }),
                           new docx.TextRun(curso.curso),
                        ],
                        style: 'normal',
                        numbering: {
                           reference: 'bolinha',
                           level: curso.local ? 1 : 0,
                        },
                     })
                  )

                  if (curso.periodo) {

                     paragraphArray.push(
                        new docx.Paragraph({
                           children: [
                              new docx.TextRun({
                                 text: 'Período: ',
                                 bold: true,
                              }),
                              new docx.TextRun(curso.periodo),
                           ],
                           style: 'normal',
                           numbering: {
                              reference: 'bolinha',
                              level: curso.local ? 1 : 0,
                           },
                           spacing: {
                              after: (14 * 100) / 5,
                           },
                        })

                     )
                  }

               })
            }
            return paragraphArray;
         };

   const paragrafoTrabalhos = () => {

      let paragraphArray = [];
      if (dados.trabalhos[0].cargo) {
         paragraphArray.push(
            new docx.Paragraph({
               text: 'Experiência Profissional',
               style: 'topico',
            }), )

         dados.trabalhos.map(trabalho => {

            if (trabalho.local) {
               paragraphArray.push(
                  new docx.Paragraph({
                     text: trabalho.local,
                     style: 'topicoLista',
                     numbering: {
                        reference: 'bolinha',
                        level: 0,
                     },
                  }))
            }

            paragraphArray.push(
               new docx.Paragraph({
                  children: [
                     new docx.TextRun({
                        text: 'Cargo: ',
                        bold: true,
                     }),
                     new docx.TextRun(trabalho.cargo),
                  ],
                  style: 'normal',
                  numbering: {
                     reference: 'bolinha',
                     level: 1,
                  },
               })
            )

            if (trabalho.periodo) {
               paragraphArray.push(
                  new docx.Paragraph({
                     children: [
                        new docx.TextRun({
                           text: 'Período: ',
                           bold: true,
                        }),
                        new docx.TextRun(trabalho.periodo),
                     ],
                     style: 'normal',
                     numbering: {
                        reference: 'bolinha',
                        level: 1,
                     },
                     spacing: {
                        after: (14 * 100) / 5,
                     },
                  }))
            }



         })
      }
      return paragraphArray;
   };

   const doc = new docx.Document({
      creator: 'Batata - Lan house e Informática',
      title: dados.nome,
      description: 'Currículo',
      numbering: {
         config: [{
            reference: 'bolinha',
            levels: [{
                  level: 0,
                  format: 'bullet',
                  text: '•',
                  alignment: docx.AlignmentType.CENTER,
                  run: {
                     bold: true,
                  },
                  style: {
                     paragraph: {
                        indent: {
                           left: '0.9cm',
                        },
                     },
                  },
               },
               {
                  level: 1,
                  format: 'bullet',
                  text: 'o',
                  based: 'topicoLista',
                  alignment: docx.AlignmentType.CENTER,
                  style: {
                     paragraph: {
                        indent: {
                           left: '2cm',
                        },
                     },
                  },
               },
            ],
         }, ],
      },
      styles: {
         paragraphStyles: [{
               id: 'normal',
               name: 'normal',
               quickFormat: true,
               run: {
                  font: 'Verdana',
                  size: 12 * 2,
               },
            },
            {
               id: 'lista',
               based: 'normal',
               name: 'lista',
               quickFormat: true,
               run: {
                  font: 'Verdana',
                  size: 12 * 2,
               },
            },
            {
               id: 'topicoLista',
               name: 'tópico',
               quickFormat: true,
               run: {
                  font: 'Verdana',
                  bold: true,
                  size: 12 * 2,
               },
            },
            {
               id: 'topico',
               name: 'tópico',
               quickFormat: true,
               run: {
                  font: 'Verdana',
                  bold: true,
                  color: 'ffffff',
                  size: 12 * 2,
                  allCaps: true,
               },
               paragraph: {
                  shading: {
                     type: docx.ShadingType.SOLID,
                     color: '000000',
                  },
                  spacing: {
                     before: (12 * 100) / 5,
                     after: (12 * 100) / 5,
                  },
               },
            },
            {
               id: 'topico',
               name: 'tópico',
               quickFormat: true,
               run: {
                  font: 'Verdana',
                  bold: true,
                  color: 'ffffff',
                  size: 12 * 2,
                  allCaps: true,
               },
               paragraph: {
                  shading: {
                     type: docx.ShadingType.SOLID,
                     color: '000000',
                  },
                  spacing: {
                     before: (12 * 100) / 5,
                     after: (12 * 100) / 5,
                  },
               },
            },
         ],
      },
      sections: [{
         properties: {
            page: {
               margin: {
                  top: '1.27cm',
                  right: '1.27cm',
                  bottom: '1.27cm',
                  left: '1.27cm',
               },
            },
         },
         children: [
            paragrafoNome,
            paragrafoNascimento,
            paragrafoEndereco,
            paragrafoTelefones,
            paragrafoEstadoCivil,
            paragrafoEmail,
            paragrafoCnh,

            new docx.Paragraph({
               text: 'Qualificações Profissionais:',
               style: 'topico',
            }),

            paragrafoQualiProf,

            new docx.Paragraph({
               text: 'Formação Escolar:',
               style: 'topico',
            }),

            paragrafoFormacaoEscolar,

            ...paragrafoCursos(),



            ...paragrafoTrabalhos(),

            new docx.Paragraph({
               text: 'Perfil',
               style: 'topico',
            }),

            new docx.Paragraph({
               text: 'Dinâmico;',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),
            new docx.Paragraph({
               text: 'Possuo muito esforço e iniciativa em crescer;',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),
            new docx.Paragraph({
               text: 'Em minhas tarefas procuro ter o máximo de organização e agilidade;',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),
            new docx.Paragraph({
               text: 'Bom relacionamento interpessoal;',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),
            new docx.Paragraph({
               text: 'Disponibilidade de horário de início imediato;',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),
            new docx.Paragraph({
               text: 'Interesse em fazer um bom trabalho e ajudar no bom desempenho da empresa.',
               numbering: {
                  reference: 'bolinha',
                  level: 0
               },
               style: 'normal',
            }),

         ],
      }, ],
   });

   docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, dados.nome + '.docx');
      console.log('Document created successfully');
   });
}
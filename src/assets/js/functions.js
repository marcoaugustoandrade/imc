let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function limparForm(){
  nome.value = '';
  peso.value = '';
  altura.value = '';
  nome.focus();
}

function calcularIMC(peso, altura){
  return peso / (altura * altura);
}

let tabela = document.querySelector('.table');

// function addTabela(nome, peso, altura, imc){
function addTabela(nome, peso, altura, imc, indice){
  
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  let colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc;

  let colunaDeletar = document.createElement('td');
  let btnDeletar = document.createElement('button');
  btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');
  
  btnDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    deletarLinha(indice);
    // console.log(indice);
  });
  
  colunaDeletar.appendChild(btnDeletar);

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaDeletar);

  tabela.appendChild(linha);
}

function limparTabela(){
  let qtdLinhas = tabela.rows.length;
  for (let i = qtdLinhas - 1; i > 0; i--){
    tabela.deleteRow(i);
  }
}

function deletarLinha(index){
  
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();
}

function addLocalStorage(nome, peso, altura, imc){

  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  
  } else {

    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }
}

function carregarLocalStorage(){
  
  limparTabela();

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
    // listaIMC.forEach((pessoa) => {
      // addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc);
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });
  }
}

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  // addTabela(nome.value, peso.value, altura.value, imc);
  // Trocadopor carregarLocalStorage
  carregarLocalStorage();
  limparForm();
});

window.onload =  carregarLocalStorage();

"use strict";

var nome = document.querySelector("#nome");
var peso = document.querySelector("#peso");
var altura = document.querySelector("#altura");

function limparForm() {
  nome.value = '';
  peso.value = '';
  altura.value = '';
  nome.focus();
}

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

var tabela = document.querySelector('.table'); // function addTabela(nome, peso, altura, imc){

function addTabela(nome, peso, altura, imc, indice) {
  var colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;
  var colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;
  var colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;
  var colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc;
  var colunaDeletar = document.createElement('td');
  var btnDeletar = document.createElement('button');
  btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');
  btnDeletar.addEventListener("click", function (event) {
    event.preventDefault();
    deletarLinha(indice); // console.log(indice);
  });
  colunaDeletar.appendChild(btnDeletar);
  var linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaDeletar);
  tabela.appendChild(linha);
}

function limparTabela() {
  var qtdLinhas = tabela.rows.length;

  for (var i = qtdLinhas - 1; i > 0; i--) {
    tabela.deleteRow(i);
  }
}

function deletarLinha(index) {
  var pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();
}

function addLocalStorage(nome, peso, altura, imc) {
  var pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  };

  if (localStorage.getItem("listaIMC")) {
    var listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  } else {
    var _listaIMC = [];

    _listaIMC.push(pessoa);

    localStorage.setItem("listaIMC", JSON.stringify(_listaIMC));
  }
}

function carregarLocalStorage() {
  limparTabela();

  if (localStorage.getItem("listaIMC")) {
    var listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach(function (pessoa, indice) {
      // listaIMC.forEach((pessoa) => {
      // addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc);
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });
  }
}

document.querySelector("#btn-calcular").addEventListener("click", function (event) {
  event.preventDefault();
  var imc = calcularIMC(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc); // addTabela(nome.value, peso.value, altura.value, imc);
  // Trocadopor carregarLocalStorage

  carregarLocalStorage();
  limparForm();
});
window.onload = carregarLocalStorage();
//# sourceMappingURL=functions.js.map
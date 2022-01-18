//Inicius - Abrindo e fechando modal
const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}
//fim do code modal

//Inicio - Criando um array com as informaçoes das transações
const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Aluguel',
    amount: -120000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Criação de site',
    amount: 500000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
    date: '23/01/2021'
  }
]

//Criando uma função que some as entrada e saida e devolva o resultado pra total
const Transaction = {
  incomes() {
    //somar as entradas
  },
  expenses() {
    //somar as saídas
  },
  total() {
    //Entradas menos saídas
  }
}

//Para trocar os dados do html
const DOM = {
  addTransaction(Transaction, index) {
    //local do documento que vai add
    const tr = document.createElement('tr') //criando um elemento "tr"
    tr.innerHTML = DOM.innerHTMLTransaction() //"tr.innerHTML" para receber o HTML "innerHTMLTransaction()"
  },
  innerHTMLTransaction() {
    const html = `
     <td class="description">Luz</td>
     <td class="expense">R$ -500,00</td>
     <td class="date">23/01/2022</td>
     <td class="img">
       <img src="./assets/minus.svg" alt="Remover transação" />
     </td>
  `
  }
}
//fim do code Transaçoes

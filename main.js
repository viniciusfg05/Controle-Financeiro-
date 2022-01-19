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

//Criando uma função que some as entrada e saida e devolva o resultado pra total
const Transaction = {
  all: [
    //Inicio - Criando um array com as informaçoes das transações
    {
      description: 'Luz',
      amount: -50000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
      date: '23/01/2021'
    },
    {
      description: 'Aluguel',
      amount: -120000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
      date: '23/01/2021'
    },
    {
      description: 'Criação de site',
      amount: 500000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
      date: '23/01/2021'
    },
    {
      description: 'Venda Aplicativo',
      amount: 2000000, // se tratando de valores, nao usamos $ , . add somente mais dois zeros
      date: '23/01/2021'
    }
  ], //pega todas as transaçoes da linha 13

  //add um nova transação
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload(index)
  },

  remove(index) {
    Transaction.all.splice(index, 1) //remove uma transação

    App.reload()
  },

  incomes() {
    //somar as entradas
    //pegar todas as transaçoes //se for maior que zero // somar a uma variavel e retornar a variavel
    let income = 0

    //para cada transação
    Transaction.all.forEach(transaction => {
      //se ela for maior que zero
      if (transaction.amount > 0) {
        income = income + transaction.amount
      }
    })

    return income
  },
  expenses() {
    //somar as saídas
    let expense = 0
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense = expense + transaction.amount
      }
    })
    return expense
  },
  total() {
    //Entradas menos saídas
    return Transaction.incomes() + Transaction.expenses()
  }
}

//INICIO - Para trocar os dados do html
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'), //transactionsContainer:vai pegar o tbody que ta contendo do elemento "tr"

  addTransaction(transaction, index) {
    //transaction, é a const na linha 13 // index, é o nome do arquivo  que ta o HTML
    //local do documento que vai add
    const tr = document.createElement('tr') //criando um elemento "tr"
    tr.innerHTML = DOM.innerHTMLTransaction(transaction) //"tr.innerHTML" para receber o HTML "innerHTMLTransaction() e "innerHTMLTransaction(transaction)" recebe transaction tb

    DOM.transactionsContainer.appendChild(tr) // appendChild(tr) é um funcionabilidade para pegar o elemento que foi criando "tr"
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense' //se o valor for maior que 0 ele add income se ñ add expense

    const amount = Utils.formatCurrency(transaction.amount) // pegar a função da linha 85 trandormando o valor em moeda

    const html = `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td class="img">
      <img src="./assets/minus.svg" alt="Remover transação" />
    </td>
    `

    return html
  },

  //INICIO - Atualizar o valor da entrada - saida
  //ligado com o Transactio da linha 41
  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    )
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    )
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },
  //FIM - Atualizar o valor da entrada - saida

  //vai limpar o tbody para da o reload e nao add dublicado
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}
//FIM - Para trocar os dados do html

//Inicio -Formatação do numero (valor)
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '' //se o value for um string ele será forçado a ser um Number // se for menor q 0 entao recebe - se nao +

    value = String(value).replace(/\D/g, '') //se for Number tranforma em um string pq o "replace" (uma função de trocar caracteres da string - so funciona em strings)
    // /\D/g = "/\/" seguinifica expreção regular com o D -  /\D/ o D seguinifica ache tudo que não é numero (tirando o menos) - g significa na string global

    value = Number(value) / 100

    value = value.toLocaleString('pt-BR', {
      // "toLocaleString" tranforma e moeda real brasileiro
      style: 'currency',
      currency: 'BRL'
    })

    return signal + value //manda pra fora da função
  }
}
//fim -Formatação do numero (valor)

const Form = {
  //add o submit="Form.submit(event)" no form
  submit(event) {
    console.log(event)
  }
}
//

const App = {
  //quando add um novo Transaction ele vai da um reload e da um app init fazendo o forEach add a nova transação
  init() {
    //INICIO - Para pegar cada elemento do transations (arrays)
    Transaction.all.forEach(transaction => {
      //forEach pega cada elemento do array joga no transactio(html) //
      DOM.addTransaction(transaction)
    })
    //FIM - Para pegar cada elemento do transations (arrays)

    //fim do code Transaçoes

    DOM.updateBalance()
  },
  reload() {
    //antes do realaoad limpamos o tbody
    DOM.clearTransactions()
    App.init()
  }
}

App.init() //inicia a aplicação

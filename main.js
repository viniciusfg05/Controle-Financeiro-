//Inicius - Abrindo e fechando modal------------------------------------------------------------------------------------
const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },
  set(transactions) {
    localStorage.setItem(
      'dev.finances:transactions',
      JSON.stringify(transactions)
    )
  }
}

//fim do code modal------------------------------------------------------------------------------------

//Criando uma função que some as entrada e saida e devolva o resultado pra total------------------------------------------------------------------------------------
const Transaction = {
  all: Storage.get(),

  //add um nova transação
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1) //remove uma transação // 1 é o numero de transaçoes para apagar

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
//FIM - Criando uma função que some as entradas e saídas e devolva os resultado para total------------------------------------------------------------------------------------

//INICIO - Para trocar os dados do html------------------------------------------------------------------------------------
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'), //transactionsContainer:vai pegar o tbody que ta contendo do elemento "tr"

  addTransaction(transaction, index) {
    //transaction, é a const na linha 13 // index, é o nome do arquivo  que ta o HTML
    //local do documento que vai add
    const tr = document.createElement('tr') //criando um elemento "tr"
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index) //"tr.innerHTML" para receber o HTML "innerHTMLTransaction() e "innerHTMLTransaction(transaction)" recebe transaction tb
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr) // appendChild(tr) é um funcionabilidade para pegar o elemento que foi criando "tr"
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense' //se o valor for maior que 0 ele add income se ñ add expense

    const amount = Utils.formatCurrency(transaction.amount) // pegar a função da linha 85 trandormando o valor em moeda

    const html = `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td class="img">
      <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
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
//FIM - Para trocar os dados do html---------------------------------------------------------------------

//Inicio -Formatação do numero (valor)
const Utils = {
  formatAmount(value) {
    //formata os valores recebidos
    value = Number(value) * 100

    return value
  },

  formatDate(date) {
    //formata a data, invertendo a posição dela
    const splittedDate = date.split('-') // remove os - da data
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}` //ordena as data no formato BRL
  },

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

// INICIO - Captura os dados da modal------------------------------------------------------------------------------------
const Form = {
  //linkando o html com javascript
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  validateFields() {
    const { description, amount, date } = Form.getValues() //desagrupamento buscando somente description amount e date no getValue

    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos')
    } //trim faz um limpeza dos espaços vazios //estou verificando se decription amount e date está vazio
    //tentar fazer esse passo, se um deles falhar vai da erro
    //verificar se todas as inforções fora preencidas
  },
  formatValue() {
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },
  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    //add o submit="Form.submit(event)" no form
    event.preventDefault() //deixa padrao as configuraçoes do form

    try {
      Form.validateFields() //Verifica se os campos estao vazios
      const transaction = Form.formatValue() //formatar os dados para salvar
      Transaction.add(transaction) //salvar
      Form.clearFields() //apagar os dados do formulario
      Modal.close() //modal fechar
    } catch (error) {
      alert(error.message) //aq vai captura o erro que o throw emitir
    }
  }
}
//Fim da captura de dados da modal ------------------------------------------------------------------------------------

const App = {
  //quando add um novo Transaction ele vai da um reload e da um app init fazendo o forEach add a nova transação
  init() {
    //INICIO - Para pegar cada elemento do transations (arrays)
    Transaction.all.forEach((transaction, index) => {
      //forEach pega cada elemento do array joga no transactio(html) //
      DOM.addTransaction(transaction, index)
    })
    //FIM - Para pegar cada elemento do transations (arrays)

    DOM.updateBalance()

    Storage.set(Transaction.all) //atualizando o local storage
  },
  reload() {
    //antes do realaoad limpamos o tbody
    DOM.clearTransactions()
    App.init()
  }
}

App.init() //inicia a aplicação

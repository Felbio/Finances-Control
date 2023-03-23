const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total")

let items; //armazenar nossos itens

btnNew.onclick = () => {
    if(descItem.value === "" || amount.value === "" || type.value === ""){
      return alert("Preencha todos os campos");
    }

    items.push({
      desc: descItem.value,
      amount: Math.abs(amount.value).toFixed(2),
      type: type.value,
    });

    setItensDB();
    loadItems();

    descItem.value = "";
    amount.value = "";
};

function deleteItem(index){
  items.splice(index, 1);
  setItensDB();
  loadItems();
}

function insertItem(item , index){
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${item.type === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
  }</td>
   <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
   </td>
  `;

  tbody.appendChild(tr);
}

function loadItems(){
  items = getItensDB();
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    insertItem(item, index); 
  });

  getTotals();
}

function getTotals(){
  const amountIncomes = items
    .filter((item) => item.type == "Entrada")
    .map((transaction) => Number(transaction.amount));

  const amountExpenses = items
    .filter((item) => item.type == "Saidas")
    .map((transaction) => Number(transaction.amount));

  const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur , 0)
    .toFixed(2);

  const totalExpenses = Math.abs(
    amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

  const totalItems = (totalIncomes - totalExpenses).toFixed(2);  

  incomes.innerHTML = totalIncomes;
  expenses.innerHTML = totalExpenses;
  total.innerHTML = totalItems;
}



const getItensDB = () => JSON.parse(localStorage.getItem("db_items")) ?? [];

const setItensDB = () => localStorage.setItem("db_items", JSON.stringify(items));

loadItems();

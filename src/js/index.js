let allTransctions = [];
const _filter = { searchItem: "" };

//axios set
const app = axios.create({ baseURL: "http://localhost:3000/" });
app.interceptors.request.use(
  (request) => request,
  (err) => Promise.reject(err)
);
app.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

const transctionsBtn = document.querySelector(".btn");
const transactionsTable = document.querySelector(".trans__table");
const transactionsTbody = document.querySelector(".trans__tbody");
const inputSearch = document.querySelector(".trans__search");
const searchContainer = document.querySelector(".search__container");
const sortPriceBtn = document.querySelector(".trans-price");
const ss = document.querySelector("#ss");
const iconId = document.querySelector("#iconid");
const sortDateBtn = document.querySelector(".trans-date");

//load transctions with btn
transctionsBtn.addEventListener("click", transctionloaded);
function transctionloaded() {
  transctionsBtn.classList.add("hidden");
  searchContainer.classList.remove("hidden");
  transactionsTable.classList.remove("hidden");
  app
    .get("/transactions")
    .then((res) => {
      allTransctions = res.data;
      renderFilter(allTransctions, _filter);
    })
    .catch((error) => console.log(error));
}

// add table in webPage
function addTransctionsToTable(_allTransctions) {
  transactionsTbody.innerHTML = "";
  _allTransctions.forEach((e) => {
    const event = new Date(e.date).toLocaleString("fa-IR");
    const transactionTr = document.createElement("tr");
    transactionTr.innerHTML = ` 
        <td>${e.id}</td>
        <td>${e.type}</td>
        <td>${e.price}</td>
        <td>${e.refId}</td>
        <td>${event}ساعت</td>
      `;
    transactionsTbody.appendChild(transactionTr);
  });
}

// render transctions
async function renderFilter(_transctions, _filter) {
  try {
    const response = await axios.get(
      `http://localhost:3000/transactions?refId_like=${_filter.searchItem}&_sort=price&_order=asc`
    );
    addTransctionsToTable(response.data);
  } catch (err) {
    console.log(err);
  }
}

// inputBox
inputSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  _filter.searchItem = e.target.value;
  console.log(_filter.searchItem);
  renderFilter(allTransctions, _filter);
});


///sort by priceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
sortPriceBtn.addEventListener("click", transctionDateSort);
async function transctionDateSort() {
 
  try {
    if (ss.className == "fa-solid fa-arrow-down") {
      
      sortPriceBtn.classList.add("degre");
      ss.classList.remove("fa-arrow-down");
      ss.classList.add("fa-arrow-up");
      const transctionSortDesc = await axios.get(
        `http://localhost:3000/transactions?_sort=price&_order=asc`
      );
      addTransctionsToTable(transctionSortDesc.data);
    }
    else {
      sortPriceBtn.classList.remove("degre");
      sortPriceBtn.classList.add("down");  
      ss.classList.remove("fa-arrow-up");      
      ss.classList.add("fa-arrow-down");
      const transctionSortAsc = await axios.get(
        `http://localhost:3000/transactions?_sort=price&_order=desc`
      );
      addTransctionsToTable(transctionSortAsc.data);
    }

  } catch (err) {
    console.log(err);
  }
  
}
///sort by dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
sortDateBtn.addEventListener("click", transctionPriceSort);
async function transctionPriceSort() {
  try {
    if (iconId.className == "fa-solid fa-arrow-down") {
      
      sortPriceBtn.classList.add("degre");
      iconId.classList.remove("fa-arrow-down");
      iconId.classList.add("fa-arrow-up");
      sortDateBtn.classList.add("degre");
      const transctionSortDesc = await axios.get(
        `http://localhost:3000/transactions?_sort=date&_order=asc`
      );
      addTransctionsToTable(transctionSortDesc.data);
    }
    else {
      sortPriceBtn.classList.remove("degre");
      sortPriceBtn.classList.add("down");  
      iconId.classList.remove("fa-arrow-up");      
      iconId.classList.add("fa-arrow-down");
      const transctionSortAsc = await axios.get(
        `http://localhost:3000/transactions?_sort=price&_order=desc`
      );
      addTransctionsToTable(transctionSortAsc.data);
    }
  } catch (err) {
    console.log(err);
  }
}
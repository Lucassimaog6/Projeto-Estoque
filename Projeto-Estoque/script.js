const btnCadastrar = document.getElementById("cadastrar");
const btnExcluir = document.getElementById("excluir");
const btnEditar = document.getElementById("editar");

const inputName = document.getElementById("name");
const inputAmount = document.getElementById("amount");
const inputPrice = document.getElementById("price");
const inputShelf = document.getElementById("shelf");
const inputDescription = document.getElementById("description");
const inputCategory = document.getElementById("category");

const tbody = document.querySelector("tbody");
let BD = [];
let InEdit = null;

btnCadastrar.addEventListener("click", () => {
	const product = {
		id: BD.length,
		nome: inputName.value,
		quantidade: inputAmount.value,
		preco: inputPrice.value,
		prateleira: inputShelf.value,
		descricao: inputDescription.value,
		categoria: inputCategory.value,
		checked: false,
	};

	BD.push(product);
	ReloadTable();
});

btnExcluir.onclick = function () {
	console.log("oi");
	BD = BD.filter((e) => !e.checked);
	ReloadTable();
};

function ReloadTable() {
	tbody.innerHTML = null;
	BD.forEach((e, i) => {
		tbody.innerHTML += `
            <tr class="text-center">
                <td>
                    <input type="checkbox" id="${i}" ${e.checked ? "checked" : null} onchange="CheckProduct(${i})">
                </td>
                <td>${e.nome}</td>
                <td>${e.quantidade}</td>
                <td>${e.preco}</td>
            </tr>`;
	});
}

btnEditar.onclick = function () {
	if (InEdit === null) {
		return;
	}

	const product = {
		id: BD.length,
		nome: inputName.value,
		quantidade: inputAmount.value,
		preco: inputPrice.value,
		prateleira: inputShelf.value,
		descricao: inputDescription.value,
		categoria: inputCategory.value,
		checked: false,
	};

	BD[InEdit] = product;
	ReloadTable();
};

const CheckProduct = (id) => {
	BD[id].checked = !BD[id].checked;
	InEdit = id;
	inputName.value = BD[id].nome;
	inputAmount.value = BD[id].quantidade;
	inputPrice.value = BD[id].preco;
	inputShelf.value = BD[id].prateleira;
	inputDescription.value = BD[id].descricao;
	inputCategory.value = BD[id].categoria;
};

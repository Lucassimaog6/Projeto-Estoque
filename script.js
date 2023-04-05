const btnCadastrar = document.getElementById('cadastrar');
const btnExcluir = document.getElementById('excluir');
const btnEditar = document.getElementById('editar');

const inputName = document.getElementById('name');
const inputAmount = document.getElementById('amount');
const inputPrice = document.getElementById('price');
const inputShelf = document.getElementById('shelf');
const inputDescription = document.getElementById('description');
const inputCategory = document.getElementById('category');

const tbody = document.querySelector('tbody');
let BD = localStorage.getItem('BD') ? JSON.parse(localStorage.getItem('BD')) : [];
ReloadTable();

let InEdit = null;

btnCadastrar.addEventListener('click', () => {
	if (!CheckInput()) {
		alert('Preencha todos os campos!');
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

	BD.push(product);
	ReloadTable();
});

btnExcluir.onclick = () => {
	console.log('oi');
	BD = BD.filter((e) => !e.checked);
	ReloadTable();
	Limpar();
};

btnEditar.onclick = () => {
	if (InEdit === null) {
		return;
	}

	if (!CheckInput()) {
		alert('Preencha todos os campos!');
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
		checked: BD[InEdit].checked,
	};

	BD[InEdit] = product;
	ReloadTable();
	Limpar();
};

function CheckProduct(id) {
	if (BD[id].checked) {
		InEdit = null;
		Limpar();
		BD[id].checked = false;
	} else {
		InEdit = id;
		inputName.value = BD[id].nome;
		inputAmount.value = BD[id].quantidade;
		inputPrice.value = BD[id].preco;
		inputShelf.value = BD[id].prateleira;
		inputDescription.value = BD[id].descricao;
		inputCategory.value = BD[id].categoria;
		BD[id].checked = true;
	}
}

function ReloadTable() {
	tbody.innerHTML = null;
	BD.forEach((e, i) => {
		tbody.innerHTML += `
            <tr class="text-center">
                <td>
                    <input type="checkbox" id="${i}" ${e.checked ? 'checked' : null} onchange="CheckProduct(${i})">
                </td>
                <td>${e.nome}</td>
                <td>${e.quantidade}</td>
                <td>${e.preco}</td>
                <td>${e.descricao}</td>
                <td>${e.prateleira}</td>
                <td>${e.categoria}</td>
            </tr>`;
	});
	localStorage.setItem('BD', JSON.stringify(BD));
}

function Limpar() {
	inputName.value = '';
	inputAmount.value = '';
	inputPrice.value = '';
	inputShelf.value = '';
	inputDescription.value = '';
	inputCategory.value = '';
}

function CheckInput() {
	if (
		inputName.value === '' ||
		inputAmount.value === '' ||
		inputPrice.value === '' ||
		inputShelf.value === '' ||
		inputDescription.value === '' ||
		inputCategory.value === ''
	) {
		return false;
	} else {
		return true;
	}
}

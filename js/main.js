const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal__close');
const cancelarCambios = document.getElementById('cancelar_cambios');
const agregar = document.getElementById('agregar');
const guardarCambios = document.getElementById('guardar_cambios');
const btnEliminar = document.getElementById('btn__eliminar');
let id =1 ;
const modal_warnig = document.getElementById('modal_warnig');
const btnSi = document.getElementById('btn__si');
const btnNo = document.getElementById('btn__no');
function closeModal() {
    modal.classList.remove('modal__open');
}
function openModal() {
    modal.classList.add('modal__open');
}
function openModalWarning() {
    modal_warnig.classList.add('modal_warnings__open');
}
function closeModalWarning() {
    modal_warnig.classList.remove('modal_warnings__open');
    modal_warnig.classList.add('modal_warnings__close');
}

modalClose.addEventListener('click', () => {
    closeModal();
});
cancelarCambios.addEventListener('click', () => {
    closeModal();
    resetForm();
});
agregar.addEventListener('click', () => {
    openModal();
});
btnNo.addEventListener('click', () => {
    closeModalWarning();
});


class Producto {
    constructor(id,nombre, descripcion, uid, referencia,variante1,variante2, categoria, subcategoria, tags, destacado,especificacion,imagenes) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.uid = uid;
        this.referencia = referencia;
        this.variante1 = variante1;
        this.variante2 = variante2;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.tags = tags;
        this.destacado = destacado;
        this.especificacion = especificacion;
        this.imagenes = imagenes;
    }
}
let nombre = document.getElementById('nombre');
let descripcion = document.getElementById('descripcion');
let uid = document.getElementById('uid');
let referencia = document.getElementById('referencia');
let variante1 = document.getElementById('variante1');
let variante2 = document.getElementById('variante2');
let categoria = document.getElementById('categoria');
let subcategoria = document.getElementById('subcategoria');
let tags = document.getElementById('tags');
let destacado = document.getElementById('destacado');
let especificacion = document.getElementById('especificacion');
let imagenes = '';

let categorias = [
    'Ropa',
    'Zapatos',
    'Accesorios',
    'Joyeria',
    'Electronica',
    'Hogar',
];

let subcategorias = [
    {'Ropa': ['Camisas', 'Pantalones', 'Busos']},
    {'Zapatos': ['Zapatos de vestir', 'Zapatos de trabajo', 'Zapatos de deporte']},
    {'Accesorios': ['Gorras', 'Gafas', 'Relojes']},
    {'Joyeria': ['Anillos', 'Pulseras', 'Collares']},
    {'Electronica': ['Celulares', 'Computadores', 'Tablets']},
    {'Hogar': ['Cocina', 'Baño', 'Sala']},
    ];

resetForm = () => {
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('uid').value = '';
    document.getElementById('referencia').value = '';
    document.getElementById('variante1').value = '0';
    document.getElementById('variante2').value = '0';
    document.getElementById('categoria').value = '0';
    document.getElementById('subcategoria').value = '0';
    document.getElementById('tags').value = '0';
    document.getElementById('destacado').value = '';
    document.getElementById('especificacion').value = '';
}


categorias.forEach(categoria => {
    let option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    document.getElementById('categoria').appendChild(option);
});

categoria.addEventListener('change', () => {
    let categoria = document.getElementById('categoria').value;
    let subcategoria = document.getElementById('subcategoria');
    subcategoria.textContent = '';
    let option = document.createElement('option');
    option.value = '0';
    option.textContent = 'Seleccione una subcategoria';
    subcategoria.appendChild(option);
    subcategorias.forEach(subcategoria => {
        if (subcategoria[categoria]) {
            subcategoria[categoria].forEach(subcategoria => {
                let option = document.createElement('option');
                option.value = subcategoria;
                option.textContent = subcategoria;
                document.getElementById('subcategoria').appendChild(option);
            });
        }
    });
});



addProducto = () => {
    let producto = new Producto(id,nombre.value, descripcion.value, uid.value, referencia.value,variante1.value,variante2.value, categoria.value, subcategoria.value, tags.value, destacado.value,especificacion.value,imagenes);
    id++;
    const tbody = document.getElementById('tbody');
    const tr = document.createElement('tr');
    const tdCheck = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.className = 'check';
    checkbox.classList.add('check1');
    const tdId = document.createElement('td');
    const tdImagen = document.createElement('td');
    const Image = document.createElement('img');
    const tdUid = document.createElement('td');
    const tdReferencia = document.createElement('td');
    const tdNombre = document.createElement('td');
    const tdCategoria = document.createElement('td');
    const tdSubcategoria = document.createElement('td');
    tdId.textContent = producto.id;
    Image.src = 'img/img1.jpg';
    Image.style.width = '70px';
    Image.style.height = '70px';
    tdImagen.appendChild(Image);
    tdUid.textContent = producto.uid;
    tdReferencia.textContent = producto.referencia;
    tdNombre.textContent = producto.nombre;
    tdCategoria.textContent = producto.categoria;
    tdSubcategoria.textContent = producto.subcategoria;

    tdCheck.appendChild(checkbox);
    tr.appendChild(tdCheck);
    tr.appendChild(tdId);
    tr.appendChild(tdImagen);
    tr.appendChild(tdUid);
    tr.appendChild(tdReferencia);
    tr.appendChild(tdNombre);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdSubcategoria);

    tbody.appendChild(tr);
    closeModal();
}

guardarCambios.addEventListener('click', () => {
    addProducto();
    closeModal();
    resetForm();
});


deleteProducto = () => {
    const checks = document.querySelectorAll('.check1');
    console.log(checks);
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            checks[i].parentElement.parentElement.remove();
        }
    }
}

btnEliminar.addEventListener('click', () => {
    //verificar si hay algun check seleccionado
    const checks = document.querySelectorAll('.check1');
    let check = false;
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            check = true;
        }
    }
    if (check) {
    openModalWarning();
    } else {
        alert('No hay ningun producto seleccionado');
    }
});

btnSi.addEventListener('click', () => {
    deleteProducto();
    closeModalWarning();
});


const checkall = document.getElementById('checkall');
checkall.addEventListener('change', () => {
    const checks = document.querySelectorAll('.check');
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = checkall.checked;
    }
});
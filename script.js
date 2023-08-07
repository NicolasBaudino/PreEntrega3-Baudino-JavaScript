// DECLARACION DE VARIABLES
let contenedorProds = document.getElementById("prods");
let tablaCarrito = document.getElementById("tablacarrito");
let carro = JSON.parse(localStorage.getItem('carro')) || [];
let totalCarrito = document.getElementById("total");
let resultado = 0;

//RENDERIZADO DE PRODUCTOS
renderizarProductos(productos);

//PRIMER RENDERIZADO DEL CARRITO
if (carro.length != 0) {
    for (const producto of carro) {
        //agregar fila a la tabla de carrito
        tablaCarrito.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
            </tr>
        `;

        //CALCULO DEL TOTAL
        resultado += producto.precio;
    }

    totalCarrito.innerHTML = "";
    //RESULTADO
    totalCarrito.innerHTML += `
    Total a pagar $: ${resultado}
    `;
}

//BOTON BORRAR ELEMENTOS FORMULARIO
let textoNombre = document.getElementById("nombre");
let textoEmail = document.getElementById("email");

const botonBorrar = document.getElementById("btnBorrar");
botonBorrar.onclick = () => {
    textoNombre.value = "";
    textoEmail.value = "";
}

//MENSAJE DE ADVERTENCIA EMAIL
textoEmail.oninput = () => {
    if(!textoEmail.value.includes('@') || !textoEmail.value.includes('.')){
        document.getElementById('mensaje').style.color = "red";
        document.getElementById('mensaje').innerText = "No olvides el @ ni el .";
    }
    else{
        document.getElementById('mensaje').innerText = "";
    }
}

//VALIDACION DE FORMULARIO
let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar(ev){
    if(textoNombre.value == '' || textoEmail.value == ''){
        ev.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese nombre o email faltante.',
        })
    }
}

//ORDENAR MAYOR A MENOR
function mayorMenor(){
    productos.sort((a,b) => b.precio - a.precio);
    renderizarProductos(productos);
}

//ORDENAR MENOR A MAYOR
function menorMayor(){
    productos.sort((a,b) => a.precio - b.precio);
    renderizarProductos(productos);
}

//BOTONES CONFIGURACION ORDEN DE PRODUCTOS
const boton1 = document.getElementById("btnMenorMayor");
const boton2 = document.getElementById("btnMayorMenor");

boton1.onclick = () => menorMayor();
boton2.onclick = () => mayorMenor();


// DOM
resultado = 0;

function renderizarProductos(listaProductos) {
    // RESETEAMOS
    contenedorProds.innerHTML = "";
    // MOSTRAMOS LAS CARTAS
    for(const producto of listaProductos){
        contenedorProds.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top" alt="${producto.nombre}" style="height: 300px">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <button id=${producto.id} class="btn btn-primary compra">Comprar</button>
        </div>
        </div>
        `;
    }

    let botones = document.getElementsByClassName('compra');
    for (const boton of botones){
        // PARA AGREGAR PRODUCTOS AL CARRO
        boton.onclick = () =>{
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            agregarACarrito(prodACarro);
        }
    }
}

// PARA SUBIR LOS ELEMENTOS AL CARRO
function agregarACarrito(producto){
    carro.push(producto);
    tablaCarrito.innerHTML +=`
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;

    //CALCULO DEL TOTAL
    totalCarrito.innerHTML = "";
    resultado += producto.precio;
    //RESULTADO
    totalCarrito.innerHTML += `
    Total a pagar $: ${resultado}
    `;

    //LOCAL STORAGE Y JSON
    localStorage.setItem("carro", JSON.stringify(carro));
}

//FINALIZAR COMPRA
let botonFinalizar = document.getElementById("btnFinalizarCompra");

botonFinalizar.onclick = () => {
    //AVISO CON TOASTIFY
    Toastify({
        text: "Tu pedido fue realizado. Lo recibirás dentro de 48hs.",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
        }).showToast();

    //VACIAR CARRO Y TABLA
    carro = [];
    tablaCarrito.innerHTML = "";
    totalCarrito.innerText = "Total a pagar $: ";
    localStorage.removeItem("carro");
}
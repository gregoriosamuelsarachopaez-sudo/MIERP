// =============================
// PRODUCTOS
// =============================

let productos =
    JSON.parse(localStorage.getItem("productos"));


// =============================
// CONVERTIR PRODUCTOS ANTIGUOS
// =============================

if (!Array.isArray(productos)) {

    productos = [];

}


productos = productos.map(function(producto) {

    if (typeof producto === "string") {

        return {

            nombre: producto,

            proveedores: []

        };

    }


    if (!Array.isArray(producto.proveedores)) {

        producto.proveedores = [];

    }


    return producto;

});


localStorage.setItem(
    "productos",
    JSON.stringify(productos)
);


// =============================
// PROVEEDORES
// =============================

let proveedores =
    JSON.parse(
        localStorage.getItem("proveedores")
    );


if (!Array.isArray(proveedores)) {

    proveedores = [];

}


// =============================
// MOSTRAR PRODUCTOS
// =============================

function mostrarProductos() {

    let cuerpo =
        document.getElementById(
            "cuerpoProductos"
        );


    if (!cuerpo) {

        return;

    }


    cuerpo.innerHTML = "";


    productos.forEach(
        function(producto, indice) {

            let fila =
                document.createElement("tr");


            fila.classList.add(
                "producto"
            );


            // PRODUCTO

            let celdaProducto =
                document.createElement("td");

            celdaProducto.textContent =
                producto.nombre;


            // UNIDADES

            let celdaUnidades =
                document.createElement("td");

            celdaUnidades.innerHTML = `
                <button class="restar">-</button>
                <span class="cantidad">0</span>
                <button class="sumar">+</button>
            `;


            // EDITAR

            let celdaEditar =
                document.createElement("td");

            celdaEditar.innerHTML = `
                <button
                    class="editar"
                    data-indice="${indice}">
                    ✏️
                </button>
            `;


            // ELIMINAR

            let celdaEliminar =
                document.createElement("td");

            celdaEliminar.innerHTML = `
                <button
                    class="eliminar"
                    data-indice="${indice}">
                    ❌
                </button>
            `;


            fila.appendChild(
                celdaProducto
            );

            fila.appendChild(
                celdaUnidades
            );

            fila.appendChild(
                celdaEditar
            );

            fila.appendChild(
                celdaEliminar
            );


            cuerpo.appendChild(
                fila
            );

        }
    );

}


// =============================
// ABRIR VENTANA NUEVO PRODUCTO
// =============================

let botonNuevoProducto =
    document.getElementById(
        "nuevoProducto"
    );


if (botonNuevoProducto) {

    botonNuevoProducto.addEventListener(
        "click",
        function() {

            abrirVentanaProducto();

        }
    );

}


// =============================
// ABRIR VENTANA
// =============================

function abrirVentanaProducto() {

    let ventana =
        document.getElementById(
            "ventanaProducto"
        );


    let nombre =
        document.getElementById(
            "nombreProducto"
        );


    // Limpiar el campo

    nombre.value = "";


    // =============================
    // PRODUCTO ALEATORIO DE EJEMPLO
    // =============================

    if (productos.length > 0) {

        let productoAleatorio =
            productos[
                Math.floor(
                    Math.random() * productos.length
                )
            ];


        nombre.placeholder =
            "Ej. " + productoAleatorio.nombre;

    } else {

        nombre.placeholder =
            "Ej. Tornillo M8";

    }


    // Limpiar buscador

    document.getElementById(
        "buscarProveedor"
    ).value = "";


    // Mostrar ventana

    ventana.style.display =
        "flex";


    // Mostrar proveedores

    mostrarListaProveedores();

}


// =============================
// MOSTRAR PROVEEDORES
// =============================

function mostrarListaProveedores() {

    let lista =
        document.getElementById(
            "listaProveedores"
        );


    if (!lista) {

        return;

    }


    lista.innerHTML = "";


    proveedores.forEach(
        function(proveedor, indice) {

            let fila =
                document.createElement("label");


            fila.classList.add(
                "proveedor-opcion"
            );


            fila.dataset.nombre =
                proveedor.nombre.toLowerCase();


            fila.innerHTML = `

                <input
                    type="checkbox"
                    class="proveedor-checkbox"
                    value="${indice}">

                <span>
                    ${proveedor.nombre}
                </span>

            `;


            lista.appendChild(
                fila
            );

        }
    );


    filtrarProveedores();

}


// =============================
// BUSCAR PROVEEDOR
// =============================

let buscarProveedor =
    document.getElementById(
        "buscarProveedor"
    );


if (buscarProveedor) {

    buscarProveedor.addEventListener(
        "input",
        function() {

            filtrarProveedores();

        }
    );

}


// =============================
// FILTRAR PROVEEDORES
// =============================

function filtrarProveedores() {

    let buscador =
        document.getElementById(
            "buscarProveedor"
        );


    if (!buscador) {

        return;

    }


    let texto =
        buscador.value
        .toLowerCase()
        .trim();


    let opciones =
        document.querySelectorAll(
            ".proveedor-opcion"
        );


    opciones.forEach(
        function(opcion) {

            let nombre =
                opcion.dataset.nombre;


            if (
                nombre.includes(texto)
            ) {

                opcion.style.display =
                    "flex";

            } else {

                opcion.style.display =
                    "none";

            }

        }
    );

}


// =============================
// CANCELAR
// =============================

let cancelarProducto =
    document.getElementById(
        "cancelarProducto"
    );


if (cancelarProducto) {

    cancelarProducto.addEventListener(
        "click",
        function() {

            document.getElementById(
                "ventanaProducto"
            ).style.display =
                "none";

        }
    );

}


// =============================
// GUARDAR PRODUCTO
// =============================

let guardarProducto =
    document.getElementById(
        "guardarProducto"
    );


if (guardarProducto) {

    guardarProducto.addEventListener(
        "click",
        function() {

            let nombre =
                document.getElementById(
                    "nombreProducto"
                ).value.trim();


            if (nombre === "") {

                alert(
                    "Escribe el nombre del producto."
                );

                return;

            }


            // =============================
            // OBTENER PROVEEDORES MARCADOS
            // =============================

            let seleccionados = [];


            document
                .querySelectorAll(
                    ".proveedor-checkbox:checked"
                )
                .forEach(
                    function(casilla) {

                        seleccionados.push(
                            Number(
                                casilla.value
                            )
                        );

                    }
                );


            // =============================
            // CREAR PRODUCTO
            // =============================

            let producto = {

                nombre: nombre,

                proveedores:
                    seleccionados

            };


            productos.push(
                producto
            );


            // Guardar

            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );


            // Cerrar ventana

            document.getElementById(
                "ventanaProducto"
            ).style.display =
                "none";


            // Actualizar tabla

            mostrarProductos();

        }
    );

}


// =============================
// BOTONES + Y -
// =============================

document.addEventListener(
    "click",
    function(event) {


        if (
            event.target.classList.contains(
                "sumar"
            )
        ) {

            let cantidad =
                event.target.parentElement
                .querySelector(
                    ".cantidad"
                );


            cantidad.textContent =
                Number(
                    cantidad.textContent
                ) + 1;

        }


        if (
            event.target.classList.contains(
                "restar"
            )
        ) {

            let cantidad =
                event.target.parentElement
                .querySelector(
                    ".cantidad"
                );


            if (
                Number(
                    cantidad.textContent
                ) > 0
            ) {

                cantidad.textContent =
                    Number(
                        cantidad.textContent
                    ) - 1;

            }

        }

    }
);


// =============================
// EDITAR PRODUCTO
// =============================

document.addEventListener(
    "click",
    function(event) {


        if (
            event.target.classList.contains(
                "editar"
            )
        ) {

            let indice =
                Number(
                    event.target.dataset.indice
                );


            let producto =
                productos[indice];


            let nuevoNombre =
                prompt(
                    "Nuevo nombre del producto:",
                    producto.nombre
                );


            if (
                nuevoNombre === null ||
                nuevoNombre.trim() === ""
            ) {

                return;

            }


            producto.nombre =
                nuevoNombre.trim();


            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );


            mostrarProductos();

        }

    }
);


// =============================
// ELIMINAR PRODUCTO
// =============================

document.addEventListener(
    "click",
    function(event) {


        if (
            event.target.classList.contains(
                "eliminar"
            )
        ) {

            let indice =
                Number(
                    event.target.dataset.indice
                );


            let confirmar =
                confirm(
                    "¿Seguro que quieres eliminar " +
                    productos[indice].nombre +
                    "?"
                );


            if (confirmar) {

                productos.splice(
                    indice,
                    1
                );


                localStorage.setItem(
                    "productos",
                    JSON.stringify(productos)
                );


                mostrarProductos();

            }

        }

    }
);


// =============================
// IR A PROVEEDORES
// =============================

let botonProveedores =
    document.getElementById(
        "gestionarProveedores"
    );


if (botonProveedores) {

    botonProveedores.addEventListener(
        "click",
        function() {

            window.location.href =
                "proveedores.html";

        }
    );

}


// =============================
// MOSTRAR PROVEEDORES
// =============================

function mostrarProveedores() {

    let tabla =
        document.getElementById(
            "tablaProveedores"
        );


    if (!tabla) {

        return;

    }


    tabla.innerHTML = "";


    proveedores.forEach(
        function(proveedor, indice) {

            let fila =
                document.createElement("tr");


            let nombre =
                document.createElement("td");

            nombre.textContent =
                proveedor.nombre;


            let email =
                document.createElement("td");

            email.textContent =
                proveedor.email;


            let editar =
                document.createElement("td");

            editar.innerHTML = `
                <button
                    class="editarProveedor"
                    data-indice="${indice}">
                    ✏️
                </button>
            `;


            let eliminar =
                document.createElement("td");

            eliminar.innerHTML = `
                <button
                    class="eliminarProveedor"
                    data-indice="${indice}">
                    ❌
                </button>
            `;


            fila.appendChild(nombre);

            fila.appendChild(email);

            fila.appendChild(editar);

            fila.appendChild(eliminar);


            tabla.appendChild(fila);

        }
    );

}


// =============================
// AÑADIR PROVEEDOR
// =============================

let botonNuevoProveedor =
    document.getElementById(
        "nuevoProveedor"
    );


if (botonNuevoProveedor) {

    botonNuevoProveedor.addEventListener(
        "click",
        function() {

            let nombre =
                prompt(
                    "Nombre del proveedor:"
                );


            if (
                nombre === null ||
                nombre.trim() === ""
            ) {

                return;

            }


            let email =
                prompt(
                    "Correo electrónico del proveedor:"
                );


            if (
                email === null ||
                email.trim() === ""
            ) {

                return;

            }


            proveedores.push({

                nombre:
                    nombre.trim(),

                email:
                    email.trim()

            });


            localStorage.setItem(
                "proveedores",
                JSON.stringify(proveedores)
            );


            mostrarProveedores();

        }
    );

}


// =============================
// EDITAR PROVEEDOR
// =============================

document.addEventListener(
    "click",
    function(event) {


        if (
            event.target.classList.contains(
                "editarProveedor"
            )
        ) {

            let indice =
                Number(
                    event.target.dataset.indice
                );


            let nuevoNombre =
                prompt(
                    "Nuevo nombre del proveedor:",
                    proveedores[indice].nombre
                );


            if (
                nuevoNombre === null ||
                nuevoNombre.trim() === ""
            ) {

                return;

            }


            let nuevoEmail =
                prompt(
                    "Nuevo correo electrónico:",
                    proveedores[indice].email
                );


            if (
                nuevoEmail === null ||
                nuevoEmail.trim() === ""
            ) {

                return;

            }


            proveedores[indice].nombre =
                nuevoNombre.trim();


            proveedores[indice].email =
                nuevoEmail.trim();


            localStorage.setItem(
                "proveedores",
                JSON.stringify(proveedores)
            );


            mostrarProveedores();

        }

    }
);


// =============================
// ELIMINAR PROVEEDOR
// =============================

document.addEventListener(
    "click",
    function(event) {


        if (
            event.target.classList.contains(
                "eliminarProveedor"
            )
        ) {

            let indice =
                Number(
                    event.target.dataset.indice
                );


            let confirmar =
                confirm(
                    "¿Seguro que quieres eliminar " +
                    proveedores[indice].nombre +
                    "?"
                );


            if (confirmar) {

                proveedores.splice(
                    indice,
                    1
                );


                localStorage.setItem(
                    "proveedores",
                    JSON.stringify(proveedores)
                );


                mostrarProveedores();

            }

        }

    }
);


// =============================
// INICIAR
// =============================

mostrarProductos();

mostrarProveedores();
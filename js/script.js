$(function() {




    let carrito = {}
        /******************EJEMPLO STORAGE************** */
    $("DOMContentLoaded", e => {
        fetchData()
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'))
            pintarCarrito()
        }
    });



    ////////////////////////////////////////////////////////


    const contendorProductos = $('#contenedor-productos')
    const items = document.querySelector('#items')
    const footer = document.querySelector('#footer-carrito')




    // Traer productos desde json como si fuera una api

    const fetchData = async() => {
        try {
            const res = await fetch('/json/api.json')
            const data = await res.json()
                // console.log(data)
            pintarProductos(data)
            detectarBotones(data)
        } catch (error) {
            console.log(error)
        }

    }

    const pintarProductos = (data) => {
        const template = document.querySelector('#template-productos').content
        const fragment = $(document.createDocumentFragment());
        // console.log(template)
        data.forEach(producto => {
            // console.log(producto)
            template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
            template.querySelector('h5').textContent = producto.title
            template.querySelector('p').textContent = producto.description
            template.querySelector('p span').textContent = producto.precio
            template.querySelector('button').dataset.id = producto.id
            const clone = template.cloneNode(true)
            $(fragment).append(clone);
        })
        $(contendorProductos).append(fragment);
    }



    /**********************Ejemploooo**********************/
    // let carritoVenta = {}
    // carritoVenta = {
    //     1: { id: 1, titulo: 'razer', precio: 35000, cantidad: 1},
    //     2: { id: 1, titulo: 'MSI', precio: 45000, cantidad: 1},
    //     3: { id: 1, titulo: 'Legion', precio: 35000, cantidad: 1},
    //     4: { id: 1, titulo: 'Omen', precio: 35000, cantidad: 1},
    //     5: { id: 1, titulo: 'Helios 900', precio: 35000, cantidad: 1},
    //     6: { id: 1, titulo: 'Macbook pro', precio: 35000, cantidad: 1}
    // }




    const detectarBotones = (data) => {
        const botones = document.querySelectorAll('.card button')

        botones.forEach(btn => {
            btn.addEventListener('click', () => {
                // console.log(btn.dataset.id)
                const producto = data.find(item => item.id === parseInt(btn.dataset.id))
                producto.cantidad = 1
                if (carrito.hasOwnProperty(producto.id)) {
                    producto.cantidad = carrito[producto.id].cantidad + 1
                }
                carrito[producto.id] = {...producto }
                    // console.log('carrito', carrito)

                pintarCarrito()
            })
        })
    }




    const pintarCarrito = () => {

        //pendiente innerHTML
        items.innerHTML = ''

        const template = document.querySelector('#template-carrito').content
        const fragment = document.createDocumentFragment()

        Object.values(carrito).forEach(producto => {
            // console.log('producto', producto)
            template.querySelector('th').textContent = producto.id
            template.querySelectorAll('td')[0].textContent = producto.title
            template.querySelectorAll('td')[1].textContent = producto.cantidad
            template.querySelector('span').textContent = producto.precio * producto.cantidad

            //botones
            template.querySelector('.btn-info').dataset.id = producto.id
            template.querySelector('.btn-danger').dataset.id = producto.id

            const clone = template.cloneNode(true)
            $(fragment).append(clone);
        })

        $(items).append(fragment)

        pintarFooter()
        accionBotones()


        localStorage.setItem('carrito', JSON.stringify(carrito))

    }



    const pintarFooter = () => {

        footer.innerHTML = ''; // elimina carrito para borrar todo hasta que compremos algo.
        document.querySelector('#cart__total').innerHTML = '0'; // iniciamiento de carrito cantidad en 0
        if (Object.keys(carrito).length === 0) {
            footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío, compra algo antes de que se termine la oferta!</th>
        
        `
            return
        }

        const template = document.querySelector('#template-footer').content
        const fragment = document.createDocumentFragment()

        // necesitamos sumar la cantidad la cant de productos y el valor total
        const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
        const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
            // console.log(nPrecio)

        template.querySelectorAll('td')[0].textContent = nCantidad
        template.querySelector('span').textContent = nPrecio
        document.querySelector('#cart__total').innerHTML = nCantidad; // aumentamos el numero de items en el carrito por click



        const clone = template.cloneNode(true)
        $(fragment).append(clone);

        footer.appendChild(fragment)

        const boton = document.querySelector('#vaciar-carrito')
        boton.addEventListener('click', () => {
            carrito = {}
            pintarCarrito()

        })
    }

    const accionBotones = () => {



            const botonesAgregar = document.querySelectorAll('#items .btn-info')
            const botonesEliminar = document.querySelectorAll('#items .btn-danger')

            botonesAgregar.forEach(btn => {
                btn.addEventListener('click', () => {
                    // console.log(btn.dataset.id)
                    const producto = carrito[btn.dataset.id]
                    producto.cantidad++
                        carrito[btn.dataset.id] = {...producto }
                    pintarCarrito()

                })
            })
            botonesEliminar.forEach(btn => {
                btn.addEventListener('click', () => {
                    // console.log(`eliminando...`)
                    const producto = carrito[btn.dataset.id]
                    producto.cantidad--
                        if (producto.cantidad === 0) {
                            delete carrito[btn.dataset.id]
                        } else {
                            carrito[btn.dataset.id] = {...producto }

                        }
                    pintarCarrito()
                })
            })

        }
        ////////////////////
    document.getElementById("shopping").addEventListener("click", function() {
        const cart = document.getElementById("cart");
        cart.classList.toggle("show__cart");
        console.log(cart);
    });
});

/***** Validation form Jquery */

$('#validate').val({
    roles: {
        nombre: {
            required: true,
        },
        apellido: {
            required: true,
        },
        email: {
            required: true,
        },
        address: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zip: {
            required: true,
        },
        cardname: {
            required: true,
        },
        cardnumber: {
            required: true,
        },
        expmonth: {
            required: true,
        },
        expyear: {
            required: true,
        },
        cvv: {
            required: true,
        },

    },

    messages: {
        nombre: "Por favor ingrese su nombre*",
        apellido: "Por favor ingrese su apellido",
        email: "Por favor ingrese su email*",
        ciudad: "Por favor ingrese su ciudad*",
        direccion: "Por favor ingrese su direccion*",
        country: "Por favor ingrese su pais*",
        zip: "Por favor ingrese su codigo postal`*",
        cardname: "Nombre titular de la tarjeta*",
        cardnumber: "Numero de la tarjeta*",
        expmonth: "Por favor ingrese mes de expiracion*",
        expyear: "Por favor ingrese año de expiracion*",
        cvv: "Por favor ingrese codigo de seguridad*",
    },
});



// if (roles == true) {
//     $("#btn__compra").click(function() {
//         alert("Felicitaciones, la compra ha sido exitosa");
//     })
// }
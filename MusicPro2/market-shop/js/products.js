function cargarProductos(api_url) {
  let productos = [];
  fetch(api_url+"/productos")
    .then((response) => response.json())
    .then((data) => {
      const shopContent = document.getElementById("shopContent");
      const verCarrito = document.getElementById("verCarrito");
      const modalContainer = document.getElementById("modal-container");
      const showAlert = document.getElementById("showAlert");
      const cantidadCarrito = document.getElementById("cantidadCarrito");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const saveLocal = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
      };

      productos = data;
      if (productos.length === 0) {
        shopContent.innerHTML = `<h1>Problema de Conexión con el Servidor</h1>`;
      }

      productos.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
          <img src="${product.imagen}">
          <h3>${product.nombre}</h3>
          <p class="price">$${product.precio}</p>
          <p class="price">USD $${product.precio_dolar}</p>
        `;
      
        shopContent.append(content);
      
        let comprar = document.createElement("button");
        comprar.innerText = "comprar";
        comprar.className = "comprar";
      
        content.append(comprar);
      
        comprar.addEventListener("click", () => {
          const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
      
          if (repeat) {
            carrito.map((prod) => {
              if (prod.id === product.id) {
                prod.cantidad++;
              }
            });
          } else {
            carrito.push({
              id: product.id,
              img: product.imagen,
              nombre: product.nombre,
              precio: product.precio,
              precio_dolar: product.precio_dolar,
              cantidad: 1,
            });
            carritoCounter();
            saveLocal();
          }
        });
      });
      const pintarCarrito = () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
        modalHeader.innerHTML = `
            <h1 class="modal-header-title">Carrito</h1>
          `;
        modalContainer.append(modalHeader);
      
        const modalbutton = document.createElement("h1");
        modalbutton.innerText = "x";
        modalbutton.className = "modal-header-button";
      
        modalbutton.addEventListener("click", () => {
          modalContainer.style.display = "none";
        });
      
        modalHeader.append(modalbutton);
      
        carrito.forEach((product) => {
          let carritoContent = document.createElement("div");
          carritoContent.className = "modal-content";
          console.log(product);
          carritoContent.innerHTML = `
              <img src="${product.img}">
              <h3>${product.nombre}</h3>
              <p>${product.precio} $</p>
              <span class="restar"> - </span>
              <!--recomiendo no escribir la palabra cantidad para que no quede tan largo :)-->
              <p>${product.cantidad}</p>
              <span class="sumar"> + </span>
              <p>Total: ${product.cantidad * product.precio} $</p>
              <span class="delete-product"> ❌ </span>
            `;
      
          modalContainer.append(carritoContent);
      
          let restar = carritoContent.querySelector(".restar");
      
          restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
              product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
          });
      
          let sumar = carritoContent.querySelector(".sumar");
          sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
          });
      
          let eliminar = carritoContent.querySelector(".delete-product");
      
          eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
          });
      
          // let eliminar = document.createElement("span");
          // eliminar.innerText = "❌";
          // eliminar.classList = "delete-product";
          // carritoContent.append(eliminar);
      
          // eliminar.addEventListener("click", eliminarProducto);
        });
      
        const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
      
        const totalBuying = document.createElement("div");
        totalBuying.className = "total-content";
        totalBuying.innerHTML = `Total a pagar: ${total} $`;
        modalContainer.append(totalBuying);
      };
      
      verCarrito.addEventListener("click", pintarCarrito);
      
      const eliminarProducto = (id) => {
        const foundId = carrito.find((element) => element.id === id);
      
        console.log(foundId);
      
        carrito = carrito.filter((carritoId) => {
          return carritoId !== foundId;
        });
      
        carritoCounter();
        saveLocal();
        pintarCarrito();
      };
      
      const carritoCounter = () => {
        cantidadCarrito.style.display = "block";
      
        const carritoLength = carrito.length;
      
        localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
      
        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
      };
      
      carritoCounter();


      
    });
}

/*const productos = [
  {
    id: 1,
    nombre: "Sire M7-6 Transparent Black (2nd Gen)",
    precio: 1998.29 ,
    img:
      "https://cdn.shopify.com/s/files/1/0025/5511/7612/products/slapstore_sire_m7_6_transparent_black_2_1800x1800.png?v=1661285567",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "F10 KIT BK GUITARRA ELECTRICA",
    precio: 412.02,
    img:
      "https://falabella.scene7.com/is/image/Falabella/gsc_120986635_2878519_1?wid=1500&hei=1500&qlt=70",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Yamaha TRBJP2 John Patitucci Red",
    precio: 5620.21,
    img:
      "https://cdn.shopify.com/s/files/1/0025/5511/7612/products/slapstore_yamaha_trbjp2_john_patitucci_signature_translucent_dark_red_body_full_1x1_b350fa3e-ba56-48d4-8bc1-27008c45237d_1800x1800.png?v=1663001083",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "TELSTAR SET BATERIA VOX VOX",
    precio: 2330.9,
    img:
      "https://falabella.scene7.com/is/image/Falabella/gsc_115843008_1286488_1?wid=1500&hei=1500&qlt=70",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "SG50H4C BK BATERIA STAGESTAR 5 PIEZAS",
    precio: 1024.17,
    img:
      "https://falabella.scene7.com/is/image/Falabella/gsc_115854456_1286466_1?wid=1500&hei=1500&qlt=70",
    cantidad: 1,
  },
  {
    id: 6,
    nombre: "Batería Electrónica Nitro Mesh Kit",
    precio: 874.39,
    img:
      "https://images.lider.cl/wmtcl?source=url[file:/productos/1221240a.jpg]&sink",
    cantidad: 1,
  },
];*/

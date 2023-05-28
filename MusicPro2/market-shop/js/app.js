const api_url = "https://mptiendaapi.azurewebsites.net/";
const urlParams = new URLSearchParams(window.location.search);
const token_ws = urlParams.get('token_ws');

cargarProductos(api_url);

if (token_ws) {
    getResponse();
}

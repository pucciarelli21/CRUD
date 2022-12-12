const pantalla = document.getElementById("results")
const url = "https://638067522f8f56e28ea28778.mockapi.io/users"

// Fetch
async function fetchJson(url) {
    let crud = await fetch(url)
    if (crud.ok) {
        let users = await crud.json()
        return users;
    }
}

//Search users
document.getElementById("btnGet1").addEventListener("click", async () => {
    let users = await fetchJson(url);
    let id = document.getElementById("inputGet1Id").value;
    if (id == "") {
        pantalla.innerHTML = "";
        users.forEach(user => {
            pantalla.innerHTML +=
                `
            <li>ID: ${user.id}</li>
            <li>Nombre: ${user.nombre}</li>
            <li>Apellido: ${user.apellido}</li>
        `
        });
    } else if (users.findIndex(user => user.id == id) >= 0) {
        pantalla.innerHTML = "";
        let user = users.findIndex(user => user.id == id)
        pantalla.innerHTML +=
            `
                <li>ID: ${users[user].id}</li>
                <li>Nombre: ${users[user].nombre}</li>
                <li>Apellido: ${users[user].apellido}</li>
            `
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            html: 'El registro ' + id + ' no Existe.',
            timer: 2000,
            timerProgressBar: true,
        })
    }
})
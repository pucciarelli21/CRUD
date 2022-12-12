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

//Add new user
document.getElementById("btnPost").addEventListener("click", async () => {
    let users = await fetchJson(url);
    let newNombre = document.getElementById("inputPostNombre").value;
    let newApellido = document.getElementById("inputPostApellido").value;
    if (newNombre != "" || newApellido != "") {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                id: users.id,
                nombre: newNombre,
                apellido: newApellido,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(async function () {
                pantalla.innerHTML = ""
                let users = await fetchJson(url);
                users.forEach(user => {
                    pantalla.innerHTML +=
                        `
                    <li>ID: ${user.id}</li>
                    <li>Nombre: ${user.nombre}</li>
                    <li>Apellido: ${user.apellido}</li>
                `
                });
                document.getElementById("inputPostNombre").value = ""
                document.getElementById("inputPostApellido").value = ""
                Swal.fire({
                    icon: 'success',
                    title: 'Registro guardado con exito',
                    showConfirmButton: true,
                    confirmButtonText: 'Confirmar'
                })
                
            })
    }
})

//Modify users

document.getElementById("btnPut").addEventListener("click", async () => {
    let users = await fetchJson(url)
    let id = document.getElementById("inputPutId").value;
    let user = users.findIndex(user => user.id == id)
    if (user >= 0) {
        $('#dataModal').modal('show');
        document.getElementById("inputPutNombre").setAttribute("value", users[user].nombre)
        document.getElementById("inputPutApellido").setAttribute("value", users[user].apellido)
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

document.getElementById("btnSendChanges").addEventListener("click", async () => {
    let id = document.getElementById("inputPutId").value;
    let newNombre = document.getElementById("inputPutNombre").value
    let newApellido = document.getElementById("inputPutApellido").value
    fetch(url + "/" + id, {
        method: "PUT",
        body: JSON.stringify({
            nombre: newNombre,
            apellido: newApellido
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(async function () {
            let users = await fetchJson(url);
            pantalla.innerHTML = ""
            users.forEach(user => {
                pantalla.innerHTML +=
                    `
                <li>ID: ${user.id}</li>
                <li>Nombre: ${user.nombre}</li>
                <li>Apellido: ${user.apellido}</li>
            `
            });
            Swal.fire({
                icon: 'success',
                title: 'Registro modificado con exito',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'
            })
        })
})

//Delete users
document.getElementById("btnDelete").addEventListener("click", async () => {
    let users = await fetchJson(url);
    let id = document.getElementById("inputDelete").value;
    let user = users.findIndex(user => user.id == id)
    if (id != "" && user >= 0) {
        fetch(url + "/" + id, {
            method: "DELETE",
        })
            .then(async function () {
                let userList = await fetchJson(url);
                pantalla.innerHTML = ""
                userList.forEach(user => {
                    pantalla.innerHTML +=
                        `
                    <li>ID: ${user.id}</li>
                    <li>Nombre: ${user.nombre}</li>
                    <li>Apellido: ${user.apellido}</li>
                `
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Registro eliminado con exito',
                    showConfirmButton: true,
                    confirmButtonText: 'Confirmar'
                })
            })
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
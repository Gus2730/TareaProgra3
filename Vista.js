const app = new Vue({
    el: '#app2',
    data: {
        titulo: 'Tramites',


    }, methods: {
        traer() {
            var dato;
            fetch('http://localhost:8099/usuarios', {

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": "bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYwMTA1NDA3NiwiZXhwIjoxNjAxMDkwMDc2fQ.WTPiaErMAvyrJpnLNzWyVjMgKlaPxOuLIDHkCTKcYqoMakOWciJKKqGJ7uMFNYciMPz8fkmL6cNIYPjAA8ycTA"
                }
            }).then(function (response) {

                if (response.status != 200) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexíon a internet!',
                        confirmButtonText: `OK`,
                        timer: 10000
                    })

                }
                return response.json();
            })
                .then(function (data) {
                    dato = data;
                    $(document).ready(function () {
                        $("tbody").children().remove()

                        $.each(dato, function (i, item) {
                            var fila = "<tr><td>" + dato[i].id + "</td><td>" + dato[i].nombreCompleto + "</td><td>" + dato[i].cedula + "</td><td>" + dato[i].estado + "</td><td>" + dato[i].fechaRegistro + "</td></tr>" +
                                '</td><td><button type="button" onclick="imprimir(this)" name="remove" id="' + dato[i].id + '" class="btn btn-danger btn_remove">Editar</button></td></tr>';
                            var btn = document.createElement("TR");
                            btn.innerHTML = fila;
                            document.getElementById("contenido").appendChild(btn);
                        })

                    })

                })
                .catch(error => console.error('Error:', error)
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Ocurrió un error al tratar de ingresar, por favor verifique su conexíon a internet y revise si el servidor se encuentra en linea!',
                    //     confirmButtonText: `OK`,
                    //     timer: 20000
                    // }))
                ).then(response => console.log('Success:', response));

        },
    }
})




$(document).ready(function () {
    $(document).on('click', '.dropdown-item', function () {

        var selected = $(this).attr("id");
        if (selected == "id") {
            document.getElementById("busqueda").placeholder = "Ingrese el id del tramite ha buscar";
        }
        if (selected == "estado") {
            document.getElementById("busqueda").placeholder = "Ingrese el estado del tramite ha buscar";
        }
        if (selected == "cedula") {
            document.getElementById("busqueda").placeholder = "Ingrese la cedula del tramite ha buscar";
        }
        if (selected == "fecha") {
            document.getElementById("busqueda").placeholder = "Ingrese la fecha de ingreso del tramite ha buscar";
        }
    });;

});

function volverLogin() {
    document.formulario1.submit()
}
function imprimir(comp) {
    var button_id = comp.id;
    alert(button_id);
}

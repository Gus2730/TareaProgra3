<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <td></td>
            <h3>{{ titulo }}</h3>
          </div>
          <div class="card-body">
            <form>
              <div class="input-group form-group">
                <input
                  type="text"
                  id="busqueda"
                  class="form-control"
                  placeholder="Ingrese su busqueda"
                  required
                />
                <div class="input-group-append">
                  <button
                    id="busqueda"
                    class="btn btn-primary"
                    type="button"
                    @click="Conseguir"
                  >
                    <span class="fa fa-search"></span>
                  </button>
                  
                </div>
                <div><br></div>
                <div class="inner-form">
                  <div class="input-field first-wrap">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-danger dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Filtro
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" value="id" id="id" href="#"
                          >Id Tramite</a
                        >
                        <a
                          class="dropdown-item"
                          value="estado"
                          id="estado"
                          href="#"
                        >
                          Estado</a
                        >
                        <a
                          class="dropdown-item"
                          value="cedula"
                          id="cedula"
                          href="#"
                          >Cedula cliente</a
                        >
                        <a
                          class="dropdown-item"
                          value="fecha"
                          id="fecha"
                          href="#"
                          >Fecha de ingreso</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <div class="table-responsive">
                  <table class="table table-dark table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">cedula</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha registro</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
                    <tbody id="contenido"></tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div><br></div>
    <div  class="btn btn-info">
      <input
        type="button"
        value="Volver al inicio"
        @click="volverLogin"
        class="btn float-right login_btn"
      />
    </div>
  </div>
</template>

<script>
require("@/css/style2.css");
import store from "vuex";
export default {
  name: "Tramites",
  data() {
     return {
    titulo: "Trámites"
     }
  },
  methods: {
    Conseguir() {
      var dato;
      fetch("http://localhost:8099/usuarios", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization:
            "bearer " +
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYwMTMzMjI3OCwiZXhwIjoxNjAxMzY4Mjc4fQ.ocHAbAM6bB_QBKN5Qqzie7gX_2V0qjG_eMpVGOgBNMZlE5sOv9a9LZcRyDnP2qcVpXUFFHip57j4O9SGUb7LAQ",
        },
      })
        .then(function (response) {
          if (response.status != 200) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                "Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexíon a internet!",
              confirmButtonText: `OK`,
              timer: 10000,
            });
          }
          return response.json();
        })
        .then(function (data) {
          dato = data;
          $(document).ready(function () {
            $("tbody").children().remove();

            $.each(dato, function (i, item) {
              var fila =
                "<tr><td>" +
                dato[i].id +
                "</td><td>" +
                dato[i].nombreCompleto +
                "</td><td>" +
                dato[i].cedula +
                "</td><td>" +
                dato[i].estado +
                "</td><td>" +
                dato[i].fechaRegistro +
                "</td></tr>" +
                '</td><td><button type="button" v-on:click="imprimir(this)" name="remove" id="' +
                dato[i].id +
                '" class="btn btn-danger btn_remove">Editar</button></td></tr>';
              var btn = document.createElement("TR");
              btn.innerHTML = fila;
              document.getElementById("contenido").appendChild(btn);
            });
          });
        })
        .catch(
          (error) => console.error("Error:", error)
          // Swal.fire({
          //     icon: 'error',
          //     title: 'Oops...',
          //     text: 'Ocurrió un error al tratar de ingresar, por favor verifique su conexíon a internet y revise si el servidor se encuentra en linea!',
          //     confirmButtonText: `OK`,
          //     timer: 20000
          // }))
        )
        .then((response) => console.log("Success:", response));
    },
    volverLogin() {
      window.location.href = "/";
    },
    imprimir(comp) {
      var button_id = comp.id;
      alert(button_id);
    },
  },created:function(){
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
  }
};
</script>

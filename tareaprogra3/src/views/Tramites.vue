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
                  id="txtbusqueda"
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
                <div><br /></div>
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
                <div class="table-responsive table-light table-bordered">
                  <div class="center " >
                    <vs-table>
                      <template #thead>
                        <vs-tr>
                          <vs-th>Nombre</vs-th>
                          <vs-th>Id</vs-th>
                          <vs-th>Cedula</vs-th>
                          <vs-th>Estado</vs-th>
                          <vs-th>Fecha Registro </vs-th>
                        </vs-tr>
                      </template>
                      <template #tbody>
                        <vs-tr :key="i" v-for="(tr, i) in tramites">
                          <vs-td>
                            {{ tr.nombreCompleto }}
                          </vs-td>
                          <vs-td>
                            {{ tr.id }}
                          </vs-td>
                          <vs-td>
                            {{ tr.cedula }}
                          </vs-td>
                          <vs-td>
                            {{ tr.estado }}
                          </vs-td>
                          <vs-td>
                            {{ tr.fechaRegistro }}
                          </vs-td>

                          <template #expand>
                            <div class="con-content">
                              <div>
                                <!-- <vs-avatar>
                                  <img
                                    :src="`/avatars/avatar-${i + 1}.png`"
                                    alt=""
                                  />
                                </vs-avatar> -->
                                <p>
                                  {{ tr.nombreCompleto }}
                                </p>
                              </div>
                              <div>                              
                                <vs-button flat icon> Editar </vs-button>
                                <!-- <vs-button border danger>
                                  Remove User
                                </vs-button> -->
                              </div>
                            </div>
                          </template>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
                <!-- <div class="table-responsive">
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
                </div> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div><br /></div>
    <div class="btn btn-info">
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
import Vue from "vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {
  // options here
});
import store from "vuex";
import { mapState } from "vuex";
export default {
  name: "Tramites",
  data() {
    return {
      titulo: "Trámites",
      tramites: [],
    };
  },computed: {
    ...mapState(["token"])
  },
  methods: {
    Conseguir() {
      var dato;
      var tokens =  sessionStorage.getItem("tok");
      console.log(tokens);
      fetch("http://localhost:8099/usuarios", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization:
            "bearer " + tokens
            
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
        .then((data) => {   
          this.tramites=null;
          this.tramites = data;
          dato = data;
          // $(document).ready(function () {
          //   $("tbody").children().remove();

          //   $.each(dato, function (i, item) {
          //     var fila =
          //       "<tr><td>" +
          //       dato[i].id +
          //       "</td><td>" +
          //       dato[i].nombreCompleto +
          //       "</td><td>" +
          //       dato[i].cedula +
          //       "</td><td>" +
          //       dato[i].estado +
          //       "</td><td>" +
          //       dato[i].fechaRegistro +
          //       "</td></tr>" +
          //       '</td><td><button type="button" v-on:click="imprimir(this)" name="remove" id="' +
          //       dato[i].id +
          //       '" class="btn btn-danger btn_remove">Editar</button></td></tr>';
          //     var btn = document.createElement("TR");
          //     btn.innerHTML = fila;
          //     document.getElementById("contenido").appendChild(btn);
          //   });
          // });
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
  },
  created: function () {
    $(document).ready(function () {
      $(document).on("click", ".dropdown-item", function () {
        var selected = $(this).attr("id");
        if (selected == "id") {
          document.getElementById("busqueda").placeholder =
            "Ingrese el id del tramite ha buscar";
        }
        if (selected == "estado") {
          document.getElementById("busqueda").placeholder =
            "Ingrese el estado del tramite ha buscar";
        }
        if (selected == "cedula") {
          document.getElementById("busqueda").placeholder =
            "Ingrese la cedula del tramite ha buscar";
        }
        if (selected == "fecha") {
          document.getElementById("busqueda").placeholder =
            "Ingrese la fecha de ingreso del tramite ha buscar";
        }
      });
    });
  },
};
</script>

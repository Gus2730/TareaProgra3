<template>
  <!-- <div> -->
  <div class="container-sm">
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
              <div class="center con-selects">
                <!-- <vs-select
                    v-for="(color, i) in colors"
                    :key="i"
                    :state="color.color"
                    :label="color.color"
                    placeholder="Filtro"
                    v-model="color.value"
                  > -->
                <vs-select class="item" placeholder="Filtro" v-model="value">
                  <vs-option class="item" label="Id Tramite" value="id" id="id">
                    Id Tramite
                  </vs-option>
                  <vs-option
                    class="item"
                    label="Estado"
                    value="estado"
                    id="estado"
                  >
                    Estado
                  </vs-option>
                  <vs-option
                    class="item"
                    label="Cedula cliente"
                    value="cedula"
                    id="cedula"
                  >
                    Cedula cliente
                  </vs-option>
                  <vs-option
                    class="item"
                    label="Fecha de ingreso"
                    value="fecha"
                    id="fecha"
                  >
                    Fecha de ingreso
                  </vs-option>
                </vs-select>
              </div>
            </div>
            <div class="mt-5">
              <div class="table-responsive-sm table-light table-bordered">
                <div class="center">
                  <vs-table>
                    <template #thead>
                      <vs-tr>
                        <vs-th>Id</vs-th>
                        <vs-th>cliente</vs-th>
                        <vs-th>Tramite estado</vs-th>
                        <vs-th>Fecha registro</vs-th>
                      </vs-tr>
                    </template>
                    <template #tbody>
                      <vs-tr :key="i" v-for="(tr, i) in tramites">
                        <vs-td>
                          {{ tr.id }}
                        </vs-td>
                        <vs-td>
                          {{ tr.cliente.cedula }}
                        </vs-td>
                        <vs-td>
                          {{ tr.cambioEstadoActual.tramiteEstado.nombre }}
                        </vs-td>
                        <vs-td>
                          {{ tr.cambioEstadoActual.fechaRegistro }}
                        </vs-td>
                        <!-- <vs-td>
                            {{ tr.estado }}
                          </vs-td>
                          <vs-td>
                            {{ tr.fechaRegistro }}
                          </vs-td> -->

                        <template #expand>
                          <div class="con-content">
                            <div>
                              <!-- <vs-avatar>
                                  <img
                                    :src="`/avatars/avatar-${i + 1}.png`"
                                    alt=""
                                  />
                                </vs-avatar> -->
                              <!-- <p>
                                  {{ tr.nombreCompleto }}
                                </p> -->
                            </div>
                            <div>
                              <vs-button flat icon @click="imprimir(tr)">
                                Editar
                              </vs-button>
                            </div>
                          </div>
                        </template>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="btn btn-info">
          <input
            type="button"
            value="Volver al inicio"
            @click="volverLogin"
            class="btn btn-sm login_btn"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- </div> -->
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
      value: "Ingrese su busqueda",
      colors: [
        // {
        //   color: 'primary',
        //   value: '1'
        // },
        // {
        //   color: 'danger',
        //   value: '1'
        // },
        // {
        //   color: "success",
        //   value: "2",
        // },
        // {
        //   color: 'warn',
        //   value: '3'
        // },
        // {
        //   color: 'dark',
        //   value: '4'
        // }
      ],
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    Conseguir() {
      var dato;
      var tokens = sessionStorage.getItem("tok");
      console.log(tokens);
      fetch("http://localhost:8099/tramites_registrados", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: "bearer " + tokens,
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
          this.tramites = null;
          this.tramites = data;
          dato = data;
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
      var button_id = comp.nombreCompleto;
      alert(button_id);
    },
  },
  created: function () {
    // var casa=this.value;
    // $(document).ready(function () {
    //   $(document).on("click", ".item", function () {
    //     var selected = $(this).attr("value");
    //     console.log(selected);
    //     if (selected== "id") {
    //       document.getElementById("busqueda").placeholder =
    //         "Ingrese el id del tramite ha buscar";
    //     }
    //     if (selected == "estado") {
    //       document.getElementById("busqueda").placeholder =
    //         "Ingrese el estado del tramite ha buscar";
    //     }
    //     if (selected== "cedula") {
    //       document.getElementById("busqueda").placeholder =
    //         "Ingrese la cedula del tramite ha buscar";
    //     }
    //     if (selected == "fecha") {
    //       document.getElementById("busqueda").placeholder =
    //         "Ingrese la fecha de ingreso del tramite ha buscar";
    //     }
    //   });
    // });
    this.Conseguir();
  },
};
</script>

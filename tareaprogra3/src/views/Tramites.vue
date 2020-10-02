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
                v-model="filtro"
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
                <vs-select
                  class="item"
                  placeholder="Filtro"
                  @input="setSelected"
                  v-model="value"
                >
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
                      <vs-tr
                        :key="i"
                        v-for="(tr, i) in $vs.getPage(tramites, page, max)"
                      >
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
                    <template #footer>
                      <vs-pagination circle
                        :color="color"
                        v-model="page"
                        :length="$vs.getLength(tramites, max)"
                      />
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
      color: 'dark',
      page: 1,
      max: 6,
      value: "Ingrese su busqueda",
      filtro: "",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    Conseguir() {
      var dato;
      var textfiltro = "";
      var tokens = sessionStorage.getItem("tok");
      if (this.value == "id") {
        textfiltro = "/" + this.filtro;
      } else if (this.value == "cedula") {
        textfiltro = "/cedula/" + this.filtro;
      } else if (this.value == "id") {
        textfiltro = "/id" + this.filtro;
      } else if (this.value == "id") {
        textfiltro = "/id" + this.filtro;
      }
      fetch("http://localhost:8099/tramites_registrados" + textfiltro, {
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
          var i;
          for (i = 0; i < data.length; i++) {
            if (data[i].cambioEstadoActual != null) {
              var date = new Date(data[i].cambioEstadoActual.fechaRegistro);
              if (data)
                data[i].cambioEstadoActual.fechaRegistro =
                  date.getFullYear() +
                  "-" +
                  date.getMonth() +
                  "-" +
                  date.getDay();
            }
          }
          // var date = new Date(data[i].cambioEstadoActual.fechaRegistro);
          // data[i].cambioEstadoActual.fechaRegistro=date;
          // console.log(date);
          // data.cambioEstadoActual.fechaRegistro =date;
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
      var button_id = comp;
      alert(
        "ID: " +
          button_id.id +
          " cedula: " +
          button_id.cliente.cedula +
          "Estado: " +
          button_id.cambioEstadoActual.tramiteEstado.nombre
      );
    },
    setSelected(values) {
      if (values == "id") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese el id del trámite ha buscar";
      }
      if (values == "estado") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese true o false para buscar por estado";
      }
      if (values == "cedula") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese la cedula del tramite ha buscar";
      }
      if (values == "fecha") {
        document.getElementById("txtbusqueda").placeholder =
          "Digite la fecha de ingreso con el siguiente formato yyyy-mm-dd";
      }
    },
  },
  created: function () {
    this.Conseguir();
  },
};
</script>

<template>
  <div class="container-sm">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="boton text-left">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="ConfirmacionAlertSalir"
          >
            <b-icon icon="box-arrow-left" aria-hidden="true"> </b-icon>
            SALIR
          </button>
        </div>
        <div class="card-header">
          <td />
          <h3>{{ titulo }}</h3>
        </div>

        <div class="card-body">
          <form>
            <div class="row justify-content-md-center">
              <div class="input-group form-group-center">
                <div class="col-8">
                  <input
                    type="text"
                    id="txtbusqueda"
                    class="form-control"
                    placeholder="Ingrese su búsqueda"
                    v-model="filtro"
                    required
                  />
                </div>
                <div class="col-1">
                  <div class="input-group-append">
                    <button
                      id="busqueda"
                      class="btn-fil btn-primary"
                      type="button"
                      @click="Conseguir"
                    >
                      <span class="fa fa-search"></span>
                    </button>
                  </div>
                </div>
                <div class="col-3">
                  <div class="center con-selects">
                    <vs-select
                      placeholder="Seleccion"
                      v-model="value"
                      @input="setSelected"
                    >
                      <vs-option
                        class="item"
                        label="Id Trámite"
                        value="id"
                        id="id"
                      >
                        Id Trámite
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
                        label="Cédula cliente"
                        value="cedula"
                        id="cedula"
                      >
                        Cédula cliente
                      </vs-option>
                      <vs-option
                        class="item"
                        label="Fecha registro"
                        value="fecha"
                        id="fecha"
                      >
                        Fecha registro
                      </vs-option>
                      <vs-option
                        class="item"
                        label="Todos los datos"
                        value="todos"
                        id="todos"
                      >
                        Todos los datos
                      </vs-option>
                      <template #message-success>
                        <label>
                          Seleccione un item a filtrar
                        </label>
                      </template>
                    </vs-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="text-right">
                <button
                  id="editar"
                  class="btn btn-outline-primary"
                  type="button"
                  @click="editar"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"> </b-icon>
                  Editar
                </button>
              </div>
              <div class="table-responsive-sm table-light table-bordered">
                <div class="center">
                  <vs-table v-model="selected">
                    <template #thead>
                      <vs-tr>
                        <vs-th>Id trámite</vs-th>
                        <vs-th>Cédula cliente</vs-th>
                        <vs-th>Trámite estado</vs-th>
                        <vs-th>Fecha registro</vs-th>
                      </vs-tr>
                    </template>
                    <template #tbody>
                      <vs-tr
                        :key="i"
                        v-for="(tr, i) in $vs.getPage(tramites, page, max)"
                        :data="tr"
                        :is-selected="selected == tr"
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
                          {{
                            getHumanDate(tr.cambioEstadoActual.fechaRegistro)
                          }}
                        </vs-td>
                      </vs-tr>
                    </template>
                    <template #footer>
                      <div class="overflow-auto">
                        <div class="text-center">
                          <b-pagination
                            v-model="page"
                            pills
                            first-text="⏮"
                            prev-text="⏪"
                            next-text="⏩"
                            last-text="⏭"
                            :total-rows="rows"
                            :per-page="max"
                            :color="color"
                            align="center"
                          ></b-pagination>
                        </div>
                      </div>
                    </template>
                  </vs-table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("@/css/style2.css");
import Vue from "vue";
import Vuesax from "vuesax";
import moment from "moment";
import "vuesax/dist/vuesax.css";
Vue.use(Vuesax, {
});
Vue.use(require("vue-moment"));
import store from "vuex";
import { mapState } from "vuex";
export default {
  name: "Tramites",
  data() {
    return {
      type: "square",
      titulo: "Trámites",
      tramites: [],
      color: "dark",
      page: 1,
      max: 6,
      value: "todos",
      filtro: "",
      currentPage: 1,
      selected: null,
      datoSelect: null,
    };
  },
  computed: {
    ...mapState(["token"]),
    rows() {
      return this.tramites.length;
    },
  },
  methods: {
    getHumanDate: function (date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
    Conseguir() {
      const loading = this.$vs.loading({
        text: "Cargando...",
        type: this.type,
      });
      var dato=[];
      var textfiltro = "";
      var tokens = sessionStorage.getItem("tok");
      if (this.value == "id") {
        textfiltro = "/" + this.filtro;
      } else if (this.value == "cedula") {
        textfiltro = "/cedula/" + this.filtro;
      } else if (this.value == "estado") {
        textfiltro = "/estado/" + this.filtro;
      } else if (this.value == "fecha") {
        textfiltro = "/fecha/" + this.filtro;
      }
      fetch("http://localhost:8099/tramites_registrados" + textfiltro, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: "bearer " + tokens,
        },
      })
       .then((response)=> {
          if (response.status == 401) {
            loading.close();
            this.alertErrorToken("Su token ha expirado, se le redirigirá al login");
          }else if (response.status == 403) {
            loading.close();
            this.alertErrorToken("No cuenta con los permisos adecuados para realizar esta acción, se le redirigirá al login");
          } else if (response.status != 200) {
            loading.close();
            this.alertError(
              "Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexíon a internet!"
            );
          }else{
          }
          
          return response.json();
        })
        .then((data) => {
            this.tramites = null;
            var i;
            for (i = 0; i < data.length; i++) {
              if (data[i].cambioEstadoActual != null) {
                var date = new Date(data[i].cambioEstadoActual.fechaRegistro);
                var Horas = 1000 * 60 * 60 * 1;
                console.log(date.getTime() - Horas);
                var horaZona = new Date(date.getTime() - Horas);
                console.log(horaZona);
                data[i].cambioEstadoActual.fechaRegistro = horaZona;
              }
            }

            this.tramites = data;
            console.log(data);
            dato = data;
          loading.close();
        })
        .catch((error) =>
         this.alertError(
            "Ocurrió un error al obtener lo datos, por favor verifique los datos ingresados o su conexión a internet!"
          )
        )
        .then((response) => console.log(response)
         );
    },
    volverLogin() {
      window.location.href = "/";
    },
    editar() {
      this.datoSelect = null;
      this.datoSelect = this.selected;
      if (this.datoSelect) {
        sessionStorage.setItem("user", JSON.stringify(this.datoSelect));
        window.location.href = "/Mantenimiento";
      } else {
        this.alertError("Seleccione un objeto para editarlo");
      }
    },
    setSelected(values) {
      this.filtro = "";
      if (values == "todos") {
        this.Conseguir();
      }
      if (values == "id") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese el id del trámite ha buscar";
      }
      if (values == "estado") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese finalizado, suspendido , cancelado o recibido";
      }
      if (values == "cedula") {
        document.getElementById("txtbusqueda").placeholder =
          "Ingrese la cédula del trámite ha buscar";
      }
      if (values == "fecha") {
        document.getElementById("txtbusqueda").placeholder =
          "Digite la fecha con el formato yyyy-mm-dd";
      }
    },
    alertError(mensaje) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: mensaje,
        confirmButtonText: `OK`,
        timer: 10000,
      });
    },
    alertErrorToken(mensaje) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text:
          mensaje,
        confirmButtonText: `OK`,
      }).then(() => {
        window.location.href = "/";
      });
    },
    ConfirmacionAlertSalir() {
      Swal.fire({
        title: "SALIR",
        text: "¿Quiere volver al login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, volver",
        cancelButtonText: "No, cancelar",
      }).then((resultado) => {
        if (resultado.value) {
          this.volverLogin();
        }
      });
    },
  },
  created: function () {
    this.Conseguir();
  },
};
</script>

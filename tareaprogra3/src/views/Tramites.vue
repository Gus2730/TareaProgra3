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
                  class="btn-fil btn-primary"
                  type="button"
                  @click="Conseguir"
                >
                  <span class="fa fa-search"></span>
                </button>
              </div>
              <div><br /></div>
              <div class="center con-selects">
                <vs-select
                  placeholder="Seleccione filtro"
                  v-model="value"
                  @input="setSelected"
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
                  <vs-option
                    class="item"
                    label="Todos los datos"
                    value="todos"
                    id="todos"
                  >
                    Todos los datos
                  </vs-option>
                  <template #message-success>
                    Seleccione un item a filtrar
                  </template>
                </vs-select>
              </div>
            </div>
            <div class="mt-5">
              <div class="table-responsive-sm table-light table-bordered">
                <div class="center">
                  <vs-table>
                    <template #thead>
                      <vs-tr>
                        <vs-th>Id tramite</vs-th>
                        <vs-th>Cedula clientte</vs-th>
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
                          {{ getHumanDate(tr.cambioEstadoActual.fechaRegistro) }}
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
                                Cambiar estado
                              </vs-button>
                            </div>
                          </div>
                        </template>
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
        <input
          type="button"
          value="Volver al inicio"
          @click="volverLogin"
          class="btn btn-sm login_btn"
        />
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
require("@/css/style2.css");
import Vue from "vue";
import Vuesax from "vuesax";
import moment from 'moment';
import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {
  // options here
});
Vue.use(require('vue-moment'));
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
      value: "Ingrese su busqueda",
      filtro: "",
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["token"]),
    rows() {
      return this.tramites.length;
    },
  },
  methods: {
    getHumanDate : function (date) {
                   return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
               },
    Conseguir() {
      const loading = this.$vs.loading({
        text: "Cargando...",
        type: this.type,
      });
      var dato;
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
        .then(function (response) {
          if (response.status == 401) {
            loading.close();
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text:
                "Ocurrió un error el token es incorrecto o ha expirado, por favor vuelva a identificarse!",
              confirmButtonText: `OK`
            })
            .then(() => {
                  window.location.href = "/";
            });
           
          }else if (response.status != 200) {
            loading.close();
            Swal.fire({
              icon: "error",
              title: "ERROR",
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
    imprimir(dato) {
      sessionStorage.setItem("user", JSON.stringify(dato));
      window.location.href = "/Mantenimiento";
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
          "Ingrese finalizado, suspendido o terminado";
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

<template>
  <div class="container-sm">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="imgcontainer"></div>
        <div class="card-header">
          <td></td>
          <h3>{{ titulo }}</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group text-white">
              <div class="row justify-content-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>ID:</h6>
                </div>
                <div class="col-3">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="ID"
                    placeholder="ID"
                    v-model="id"
                    readonly
                  />
                </div>
              </div>
              <br />
              <div class="row justify-content-left">
                <div class="col-1-left">
                  <td></td>
                  <h6>Nombre Completo:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="Nombre Completo"
                    placeholder="Nombre Completo"
                    v-model="nombre"
                    readonly
                  />
                </div>
              </div>
              <br />
              <div class="row justify-content-center">
                <div class="col-1-left">
                  <td></td>
                  <h6>Cédula:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="cedula"
                    placeholder="Cedula"
                    v-model="cedula"
                    readonly
                  />
                </div>
              </div>
              <br />
              <div class="row justify-content-md-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>Fecha Registro:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="Fecha Registro"
                    placeholder="Fecha registro"
                    v-model="fecha"
                    readonly
                  />
                </div>
              </div>
              <br />
              <div class="row justify-content-md-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>Estado:</h6>
                </div>
                <div class="col">
                  <select
                    name="myselect"
                    id="myselect"
                    class="d-flex form-control form-control-sm"
                    v-model="value"
                  >
                    <option
                      :key="index"
                      v-for="(item, index) in estados"
                      :value="item.nombre"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                </div>
              </div>
              <br />
              <div class="row justify-content-md-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>Notas:</h6>
                </div>
                <div class="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="notas"
                      rows="3"
                      readonly
                      v-model="resulNota"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="row justify-content-md-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>Trámite Tipo:</h6>
                </div>
                <div class="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="notas"
                      rows="3"
                      v-model="tramitetipo"
                      readonly
                    ></textarea>
                  </div>
                </div>
              </div>
              <br />
              <div class="d-flex row justify-content-center">
                <div class="col-3">
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="ConfirmacionAlertCancelar"
                    >
                      <b-icon icon="box-arrow-left" aria-hidden="true">
                      </b-icon>
                      CANCELAR
                    </button>
                  </div>
                </div>
                <div class="col-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="ConfirmacionAlertGuardar"
                  >
                    <b-icon icon="hdd" aria-hidden="true"> </b-icon>
                    GUARDAR
                  </button>
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
require("@/css/style3.css");
import "vuesax/dist/vuesax.css";
import { mapState } from "vuex";
Vue.use(Vuesax, {
});
import Vue from "vue";
import Vuesax from "vuesax";
import moment from "moment";
import store from "vuex";
Vue.use(require("vue-moment"));
export default {
  data() {
    return {
      type: "square",
      value: null,
      titulo: "Mantenimiento trámites",
      estados: [],
      dato: [],
      cedula: "",
      id: "",
      nombre: "",
      fecha: "",
      tramitetipo: "",
      nota: [],
      resulNota: "",
      tokens: "",
      usu: "",
      tra: "",
      selectt: "",
      respon: "",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    clickGuarda() {
      const loading = this.$vs.loading({
        text: "Cargando...",
        type: this.type,
      });
      var estadoID = null;
      var idex;
      var select = this.tra.cambioEstadoActual.tramiteEstado.nombre;

      for (idex = 0; idex < this.estados.length; idex++) {
        if (this.value != select) {
          if (this.estados[idex].nombre == this.value) {
            estadoID = this.estados[idex].id;
          }
        }
      }
      if (estadoID != null) {
        
        var respon;
        fetch("http://161.22.46.230:8099/tramites_cambio_estado/", {
          method: "POST",
          body: JSON.stringify({
            tramiteEstado: {
              id: estadoID,
            },
            usuario: {
              id: this.usu.id,
            },
            tramiteRegistrado: {
              id: this.tra.id,
            },
          }),

          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "bearer " + this.tokens,
          },
        }).then((response)=> {
          loading.close();
          if (response.status == 401) {
            this.alertErrorToken("Su token ha expirado, se le redirigirá al login","/");
          }else if (response.status == 403) {
            this.alertErrorToken("No cuenta con los permisos adecuados para realizar esta acción, se le redirigirá a la lista de tramites","/Tramites");
          } else if (response.status != 201) {
              this.alertError("Error al guardar el estado");
          } else if (response.status == 201) {
            this.guardadoExitoso();
          }
          return response;
        });
      } else {
         loading.close();
        this.alertError("No hubo ningún cambio de estado");
      }
    },
    seleccionar() {
      var obj = JSON.parse(sessionStorage.getItem("user"));
      console.log("Objeto: ", obj);
      this.cedula = obj.cliente.cedula;
      this.id = obj.cliente.id;
      obj.cliente.nombreCompleto;
      this.nombre = obj.cliente.nombreCompleto;
      this.fecha = moment(
        obj.cambioEstadoActual.fechaRegistro,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");
      this.tramitetipo = obj.tramiteTipo.descripcion;
      this.nota = obj.notas;
      var idex;
      for (idex = 0; idex < this.nota.length; idex++) {
        if (idex > 0) {
          this.resulNota =
            this.resulNota + "\n" + this.nota[idex].contenido + ".";
        } else {
          this.resulNota = this.resulNota + this.nota[idex].contenido + ".";
        }
      }
      $(document).ready(function () {
        $("#myselect").val(obj.cambioEstadoActual.tramiteEstado.nombre);
      });
    },
    volverTramites() {
      //window.location.href = "/Tramites";
      this.$router.push('Tramites');
    },
    ConfirmacionAlertGuardar(data) {
      Swal.fire({
        title: "GUARDAR",
        text: "¿Desea guardar el cambio de estado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "No, cancelar",
      }).then((resultado) => {
        if (resultado.value) {
          this.clickGuarda();
        }
      });
    },
    guardadoExitoso() {
      Swal.fire({
        title: "GUARDAR",
        text: "Se guardó correctamente",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: `OK`,
      }).then((resultado) => {
        if (resultado.value) {
          this.volverTramites();
        }
      });
    },
    ConfirmacionAlertCancelar() {
      Swal.fire({
        title: "CANCELAR",
        text: "¿Desea cancelar la edición del trámite?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No",
      }).then((resultado) => {
        if (resultado.value) {
          this.volverTramites();
        }
      });
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
    alertErrorToken(mensaje,url) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: mensaje,
        confirmButtonText: `OK`,
      }).then(() => {
        window.location.href = url;
      });
    },
    obtenerEstados() {
      const loadings = this.$vs.loading({
        text: "Cargando...",
        type: this.type,
      });
      this.tokens = sessionStorage.getItem("tok");
      this.usu = JSON.parse(sessionStorage.getItem("user1"));
      this.tra = JSON.parse(sessionStorage.getItem("user"));
      fetch("http://161.22.46.230:8099/tramites_estados", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: "bearer " + this.tokens,
        },
      })
        .then((response)=> {
          loadings.close();
           if (response.status == 401) {
            this.alertErrorToken("Su token ha expirado, se le redirigirá al login","/");
          }else if (response.status == 403) {
            this.alertErrorToken("No cuenta con los permisos adecuados para realizar esta accion, se le redirigirá a la lista de tramites","/Tramites");
          } else if (response.status != 200) {
            this.alertError("Ocurrió un error al obtener infromación, por favor verifique su conexíon a internet!");
          }
          return response.json();
        })
        .then((datos) => {
          this.estados = datos;
          this.seleccionar();
        })
        .catch((error) =>
       
          this.alertError(
            "Ocurrió un error al obtener lo datos, por favor verifique los datos ingresados o su conexión a internet!"
          )
        )
        .then((response) => console.log("Success:", response));
    },
  },
  created: function () {
    this.obtenerEstados();
  },
};
</script>




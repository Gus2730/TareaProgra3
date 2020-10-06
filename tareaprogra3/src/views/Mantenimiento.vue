<template>
  <div class="container-sm">
    <!-- <link rel="stylesheet" type="text/css" href="@./css/style1.css"> -->
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="imgcontainer">
          <!-- <img
            src="@/assets/usuario.png"
            alt="Avatar"
            class="avatar"
            style="background-color: transparent"
          /> -->
        </div>
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
                      :value="item"
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
              <div class="row justify-content-center">
                <div class="col-3-left">
                  <div class="input-group-append">
                  <button type="button" class="btn btn-outline-danger" @click="showModal">
                    <b-icon icon="box-arrow-left" aria-hidden="true"> </b-icon>
                    Cancelar
                  </button>
                  <div>
                    <b-modal ref="my-modal" hide-footer title="Alerta">
                      <div class="d-block text-center">
                        <h3>¿Seguro que quieres cancelar?</h3>
                      </div>
                      <b-button
                        class="mt-3"
                        variant="outline-warning"
                        block
                        @click="hideModal"
                        >Cancelar</b-button
                      >
                      <b-button
                        class="mt-2"
                        variant="outline-danger"
                        block
                        @click="volverTramites"
                        >Aceptar</b-button
                      >
                    </b-modal>
                  </div>
                  </div>
                </div>
                <div class="col-3-left">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="clickGuarda"
                  >
                    Guardar
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
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
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
      // tramite:[]
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    clickGuarda: function () {
      console.log(this.value.id);
      var usu = JSON.parse(sessionStorage.getItem("user1"));
      var tra = JSON.parse(sessionStorage.getItem("user"));
      fetch("http://localhost:8099/tramites_cambio_estado/", {
        method: "POST",
        body: JSON.stringify({
          tramiteEstado: {
            id: this.value.id,
          },

          usuario: {
            id: usu.id,
          },
          tramiteRegistrado: {
            id: tra.id,
          },
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "bearer " + this.tokens,
        },
      });
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
      //console.log(obj.cliente.cedula);
      $(document).ready(function () {
        $("#myselect").val(obj.cambioEstadoActual.tramiteEstado.nombre);
      });
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    volverTramites() {
      window.location.href = "/Tramites";
    },
  },
  created: function () {
    this.tokens = sessionStorage.getItem("tok");
    fetch("http://localhost:8099/tramites_estados", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: "bearer " + this.tokens,
      },
    })
      .then(function (response) {
        // if (response.status != 200) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text:
        //       "Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexíon a internet!",
        //     confirmButtonText: `OK`,
        //     timer: 10000,
        //   });
        // }
        return response.json();
      })
      .then((datos) => {
        this.estados = datos;
        this.seleccionar();
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },
  
};
</script>




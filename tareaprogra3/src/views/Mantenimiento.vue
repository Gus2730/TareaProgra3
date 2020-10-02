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
                    readonly
                  />
                </div>
              </div>
              <br>
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
                    readonly
                  />
                </div>
              </div>
              <br>
              <div class="row justify-content-center">
                <div class="col-1-left">
                  <td></td>
                  <h6>Cedula:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="ID"
                    placeholder="Cedula"
                    readonly
                  />
                </div>
              </div>
              <br>
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
                    placeholder="Fecha Registro"
                    readonly
                  />
                </div>
              </div>
              <br>
              <div class="row justify-content-md-center">
                <div class="col-3-left">
                  <td></td>
                  <h6>Estado:</h6>
                </div>
                <div class="col">
                  <select
                    class="d-flex form-control form-control-sm"
                    v-model="value"
                  >
                    <option>True</option>
                    <option>False</option>
                  </select>
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
export default {
  data() {
    return {
      value: "",
      titulo: "Mantenimiento",
    };
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>
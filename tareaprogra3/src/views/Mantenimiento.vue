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
          <h3>Mantenimiento de tramites</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <div class="row justify-content-md-center">
                <div class="col-3">
                  <td></td>
                  <h6>ID:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="ID"
                    placeholder="ID"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <td></td>
              <h6>.</h6>
              <div class="row justify-content-md-center">
                <div class="col-3">
                  <td></td>
                  <h5>Cedula:</h5>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="ID"
                    placeholder="ID"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <td></td>
              <h4>.</h4>
              <div class="row justify-content-md-center">
                <div class="col-3">
                  <td></td>
                  <h6>Fecha Registro:</h6>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="d-flex form-control form-control-sm"
                    id="ID"
                    placeholder="ID"
                    readonly
                  />
                </div>
              </div>
            </div>
            <td></td>
            <h6>Estado</h6>
            <div class="row justify-content-md-center">
              <select class="d-flex form-control form-control-sm">
                <option>True</option>
                <option>False</option>
              </select>
            </div>
            <!-- <b-form-input type="text" id="Id" v-model="Id"> </b-form-input>
            <b-form-input type="text"> </b-form-input> -->

            <!-- <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <input
                type="text"
                id="cedula"
                v-model="cedula"
                class="form-control"
                placeholder="Cédula"
                required
              />
              <INPUT type="hidden" id="token" name="token" value="" />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                id="password"
                v-model="contra"
                @keyup.enter="inicio"
                class="form-control"
                placeholder="Password"
                required
              />
              <div class="input-group-append">
                <button
                  id="show_password"
                  class="btn btn-primary"
                  type="button"
                  @click="mostrarPassword"
                >
                  <span class="fa fa-eye-slash icon"></span>
                </button>
              </div>
            </div>
            <div class="btn text-center">
              <input
                type="button"
                @click="inicio"
                value="Ingresar"
                id="inicio"
                class="btn float-right login_btn"
              />
            </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("@/css/style2.css");
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["token"]),
  },
};
</script>
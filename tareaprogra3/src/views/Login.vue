<template>
  <div class="container-sm">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="imgcontainer">
          <img
            src="@/assets/usuario.png"
            alt="Avatar"
            class="avatar"
            style="background-color: transparent"
          />
        </div>
        <div class="card-header">
          <td></td>
          <h3>{{ titulo1 }}</h3>
        </div>
        <div class="card-body">
          <form>
            <div class="input-group form-group">
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
                placeholder="Contraseña"
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
            <div class="form-group">
              <div class="btn text-center">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="inicio"
                  id="inicio"
                >
                  <b-icon icon="box-arrow-in-right" aria-hidden="true"> </b-icon>
                    INGRESAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
require("@/css/style1.css");
import Vue from "vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; 
Vue.use(Vuesax, {
});
export default {
  name: "Login",
  data() {
    return {
      titulo1: "Inicio sesión",
      contra: "",
      cedula: "",
      type: "square",
    };
  },
  methods: {
    inicio() {
      let dato = "";
      let estado1 = false;
      const loading = this.$vs.loading({
        text: "Cargando...",
        color: this.color,
        type: this.type,
      });
      let time = 1000;
      fetch("http://localhost:8099/login/login", {
        method: "POST",
        body: JSON.stringify({
          cedula: this.cedula,
          password: this.contra,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          if (response.status != 200) {
            estado1 = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                "Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexión a internet!",
              confirmButtonText: `OK`,
              timer: 10000,
            });
          } else {
            estado1 = true;
          }
          return response.json();
        })
        .then((data) => {
          dato = data.jwt;
          sessionStorage.setItem("tok", dato);
          sessionStorage.setItem("user1", JSON.stringify(data.usuario));
          if (estado1 == true) {
            console.log("Estado: " + estado1);
            window.location.href = "/Tramites";
          }else{
            alertError("Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexión a internet!");
          }
        })
        .catch((error) => 
          this.alertError("Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexión a internet!")
        )
        .then((response) => console.log("Success:", response));
      setTimeout(() => {
        loading.close();
      }, time);
    },
    alertError(mensaje){
      Swal.fire({
                icon: "error",
                title: "ERROR",
                text: mensaje,
                confirmButtonText: `OK`,
                timer: 10000,
              });
    },
    mostrarPassword() {
      var cambio = document.getElementById("password");
      if (cambio.type == "password") {
        cambio.type = "text";
        $(".icon").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
      } else {
        cambio.type = "password";
        $(".icon").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
      }
    },
  },
};
</script>


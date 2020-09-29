<template>
  <div class="container">
    <!-- <link rel="stylesheet" type="text/css" href="@./css/style1.css"> -->
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import store from "vuex";
export default {
  name: "Login",
  data() {
    return {
      titulo1: "Inicio sesion",
      contra: "",
      cedula: "",

    };
  },
  methods: {
    ...mapActions(["SET_TOKEN1"]),
    inicio() {
      let dato = "";
      let estado1 = false;
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
          // document.getElementById("token").value = data.jwt;
          // alert(data.jwt);
          if (estado1 == true) {
            console.log("Estado: " + estado1);
            // this.guardarToken("coco");

            window.location.href = "/About";
          }
        })
        .catch(
          (error) => console.error("Error:", error) //,
          // Swal.fire({
          //     icon: 'error',
          //     title: 'Oops...',
          //     text: 'Ocurrió un error al tratar de ingresar, por favor verifique su conexíon a internet y revise si el servidor se encuentra en linea!',
          //     confirmButtonText: `OK`,
          //     timer: 20000})
        )
        .then((response) => console.log("Success:", response));
        this.guardarToken("mario")
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
    guardarToken(caso) {
      this.SET_TOKEN1(caso);
    },
  },
};
require("@/css/style1.css");
</script>


<template>
  <div>
    <div class="container">
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
                  id="busqueda"
                  class="form-control"
                  placeholder="Ingrese su busqueda"
                  required
                />
                <div class="input-group-append">
                  <button
                    id="busqueda"
                    class="btn btn-primary"
                    type="button"
                    @click="traer"
                  >
                    <span class="fa fa-search"></span>
                  </button>
                </div>
                <div class="inner-form">
                  <div class="input-field first-wrap">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-danger dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Filtro
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" value="id" id="id" href="#"
                          >Id Tramite</a
                        >
                        <a
                          class="dropdown-item"
                          value="estado"
                          id="estado"
                          href="#"
                        >
                          Estado</a
                        >
                        <a
                          class="dropdown-item"
                          value="cedula"
                          id="cedula"
                          href="#"
                          >Cedula cliente</a
                        >
                        <a
                          class="dropdown-item"
                          value="fecha"
                          id="fecha"
                          href="#"
                          >Fecha de ingreso</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <div class="table-responsive">
                  <table class="table table-dark table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">cedula</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha registro</th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
                    <tbody id="contenido"></tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="btn btn-info">
      <input
        type="button"
        value="Volver al inicio"
        @click="volverLogin"
        class="btn float-right login_btn"
      />
    </div>
  </div>
 
</template>

<script>
require("@/css/style2.css");
export default {};
</script>

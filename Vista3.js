const app = new Vue({
    el: '#app',
    data: {
        titulo1: 'Inicio sesion',
        contra: '',
        cedula: '',
        estado: false,
        token: ''
        // costOfBananas: 2,
        // costOfCoconuts: 8
    },
    methods: {
        traer() {
            let dato;
            fetch('http://localhost:8099/login/login', {
                method: 'POST',
                body: JSON.stringify({
                    cedula: this.cedula,
                    password: this.contra
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            }).then(function (response) {

                if (response.status != 200) {
                    estado = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió un error al ingresar, por favor verifique los datos ingresados o su conexión a internet!',
                        confirmButtonText: `OK`,
                        timer: 10000
                    })

                } else {
                    estado = true;
                }
                return response.json();
            })
                .then(function (data) {
                    dato = data;
                    document.getElementById("token").value = data.jwt;
                    alert(data.jwt);
                    if (estado == true) {
                        document.formulario1.submit();
                    }
                })
                .catch(error => console.error('Error:', error)//,
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: 'Ocurrió un error al tratar de ingresar, por favor verifique su conexíon a internet y revise si el servidor se encuentra en linea!',
                    //     confirmButtonText: `OK`,
                    //     timer: 20000
                )
                .then(response => console.log('Success:', response));

        },
        mostrarPassword() {
            var cambio = document.getElementById("password");
            if (cambio.type == "password") {
                cambio.type = "text";
                $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
            } else {
                cambio.type = "password";
                $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
            }
        }
    }
})

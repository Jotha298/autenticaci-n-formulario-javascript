const firebaseConfig = {
  apiKey: "AIzaSyDCO8AwvZpVCwV2kMDXPrO9puZNNLliMqo",
  authDomain: "datos-de-formulario-f5d34.firebaseapp.com",
  projectId: "datos-de-formulario-f5d34",
  storageBucket: "datos-de-formulario-f5d34.appspot.com",
  messagingSenderId: "227647112432",
  appId: "1:227647112432:web:8024b7c91320dd2da42e35",
  measurementId: "G-XB777MN6SQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //validar campo nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");
  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Debes de diligenciar el campo nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  //validar correo electrónico
  let emailEntrada = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPatern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPatern.test(emailEntrada.value)) {
    emailError.textContent = "Debes de introducir un email válido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }

  //validar contraseña
  let contrasenaEntrada = document.getElementById("password");
  let contrasenaError = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent =
      "La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúculas y caractéres especiales";
    contrasenaError.classList.add("error-message");
  } else {
    contrasenaError.textContent = "";
    contrasenaError.classList.remove("error-message");
  }

  //si todos los campos son válidos enviar formulario
  if (
    !errorNombre.textContent &&
    !emailError.textContent &&
    !passwordError.textContent
  ) {
    //Traemos los datos del Backend
    db.collection("users")
      .add({
        name: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});

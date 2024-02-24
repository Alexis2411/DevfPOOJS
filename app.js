class alumno {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.materias = [];
  }

  addMateria(materia) {
    this.materias.push(materia);
  }

  getPromedio() {
    let total = 0;
    this.materias.forEach((materia) => {
        total += parseFloat(materia.calificacion);
    });
    return total != 0 ? total / this.materias.length : 0;
  }
}

class grupo {
  constructor(nombre) {
    this.nombre = nombre;
    this.alumnos = [];
  }

  addAlumno(alumno) {
    this.alumnos.push(alumno);
    return true;
  }
}

class materia {
  constructor(nombre, calificacion) {
    this.nombre = nombre;
    this.calificacion = calificacion;
  }
}

document.onload = showData();
document.onload = showGrupos();

//validation form
function validateForm() {
  let nombre = document.getElementById("inputNombre").value;
  let apellido = document.getElementById("inputApellido").value;
  let edad = document.getElementById("inputEdad").value;

  if (nombre == "") {
    alert("El nombre es requerido");
    return false;
  }

  if (apellido == "") {
    alert("El apellido es requerido");
    return false;
  }

  if (edad == "") {
    alert("La edad es requerido");
    return false;
  }

  return true;
}

//read
function showData() {
  let listaAlumno;

  if (localStorage.getItem("listaAlumno") == null) {
    listaAlumno = [];
  } else {
    listaAlumno = JSON.parse(localStorage.getItem("listaAlumno"));
  }

  var html = "";

  listaAlumno.forEach(function (element, index) {
    let ialumno = new alumno(element.nombre, element.apellido, element.edad);
    ialumno.materias = element.materias;
    html += "<tr>";
    html += "<td>" + element.nombre + "</td>";
    html += "<td>" + element.apellido + "</td>";
    html += "<td>" + element.edad + "</td>";
    html += "<td>" + ialumno.getPromedio() + "</td>";
    html +=
      '<td><button onclick="addMateria(' +
      index +
      ')" class="btn btn-danger">+ Materia</button> <button onclick="updateData(' +
      index +
      ')" class="btn btn-warning">Editar</button></td>';
    html += "</tr>";
  });

  document.querySelector("#tbody-alumno").innerHTML = html;
}

function AddData() {
  if (validateForm() == true) {
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let edad = document.getElementById("inputEdad").value;

    var listaAlumno;
    if (localStorage.getItem("listaAlumno") == null) {
      listaAlumno = [];
    } else {
      listaAlumno = JSON.parse(localStorage.getItem("listaAlumno"));
    }

    let newAlumno = new alumno(nombre, apellido, edad);

    listaAlumno.push(newAlumno);

    localStorage.setItem("listaAlumno", JSON.stringify(listaAlumno));

    showData();

    document.getElementById("inputNombre").value = "";
    document.getElementById("inputApellido").value = "";
    document.getElementById("inputEdad").value = "";
  }
}

function addMateria(index) {
  document.getElementById("btnAdd").style.display = "none";

  
  var listaAlumno = JSON.parse(localStorage.getItem("listaAlumno"));
  

  document.getElementById("inputNombre").value = listaAlumno[index].nombre;
  document.getElementById("inputApellido").value = listaAlumno[index].apellido;
  document.getElementById("inputEdad").value = listaAlumno[index].edad;
  document.getElementById("materia").style.display = "block";
  showMaterias(listaAlumno[index].materias);

  let ialumno = new alumno(listaAlumno[index].nombre, listaAlumno[index].apellido, listaAlumno[index].edad);
  ialumno.materias = listaAlumno[index].materias;

  document.querySelector("#btnAddMateria").onclick = function () {
    if (
      document.getElementById("inputMateria").value != "" &&
      document.getElementById("inputCalificacion").value != ""
    ) {
      let imateria = new materia(
        document.getElementById("inputMateria").value,
        document.getElementById("inputCalificacion").value
      );
      ialumno.addMateria(imateria);
      localStorage.setItem("listaAlumno", JSON.stringify(listaAlumno));
      document.getElementById("inputMateria").value = "";
        document.getElementById("inputCalificacion").value = "";
      showData();
      showMaterias(ialumno.materias);
    }
  };
  document.querySelector("#btnTermine").onclick = function () {
    document.getElementById("materia").style.display = "none";
    document.getElementById("btnAdd").style.display = "block";
  
  }

}

function updateData(index) {
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate", btnAdd).style.display = "block";

  var listaAlumno;
  if (localStorage.getItem("listaAlumno") == null) {
    listaAlumno = [];
  } else {
    listaAlumno = JSON.parse(localStorage.getItem("listaAlumno"));
  }

  document.getElementById("inputNombre").value = listaAlumno[index].nombre;
  document.getElementById("inputApellido").value = listaAlumno[index].apellido;
  document.getElementById("inputEdad").value = listaAlumno[index].edad;

  document.querySelector("#btnUpdate").onclick = function () {
    if (validateForm() == true) {
      listaAlumno[index].nombre = document.getElementById("inputNombre").value;
      listaAlumno[index].apellido =
        document.getElementById("inputApellido").value;
      listaAlumno[index].edad = document.getElementById("inputEdad").value;

      localStorage.setItem("listaAlumno", JSON.stringify(listaAlumno));
      showData();

      document.getElementById("inputNombre").value = "";
      document.getElementById("inputApellido").value = "";
      document.getElementById("inputEdad").value = "";

      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("btnUpdate", btnAdd).style.display = "none";
    }
  };
}

// Método para agregar datos de grupo
function AddGrupo() {
  let nombreGrupo = document.getElementById("inputNombreGrupo").value;

  if (nombreGrupo == "") {
    alert("El nombre del grupo es requerido");
    return false;
  }

  var listaGrupos;
  if (localStorage.getItem("listaGrupos") == null) {
    listaGrupos = [];
  } else {
    listaGrupos = JSON.parse(localStorage.getItem("listaGrupos"));
  }

  let newGrupo = new grupo(nombreGrupo);

  listaGrupos.push(newGrupo);

  localStorage.setItem("listaGrupos", JSON.stringify(listaGrupos));

  showGrupos();

  document.getElementById("inputNombreGrupo").value = "";
}

// Método para mostrar los datos de grupo
function showGrupos() {
  let listaGrupos;

  if (localStorage.getItem("listaGrupos") == null) {
    listaGrupos = [];
  } else {
    listaGrupos = JSON.parse(localStorage.getItem("listaGrupos"));
  }

  var html = "";

  listaGrupos.forEach(function (grupo, index) {
    html += "<tr>";
    html += "<td>" + grupo.nombre + "</td>";
    html += "<td>" + grupo.alumnos.length + "</td>";
    html +=
      '<td><button onclick="updateGrupo(' +
      index +
      ')" class="btn btn-primary">Agregar</button>';
    html += "</tr>";
  });

  document.querySelector("#tbody-grupo").innerHTML = html;
}

function updateGrupo(index) {
  document.getElementById("btnAddGrupo").style.display = "none";
  document.getElementById("btnUpdateGrupo", btnAdd).style.display = "block";
  document.getElementById("inputAlumnoLabel").style.display = "block";
  document.getElementById("inputAlumno").style.display = "block";

  var listaGrupos;
  if (localStorage.getItem("listaGrupos") == null) {
    listaGrupos = [];
  } else {
    listaGrupos = JSON.parse(localStorage.getItem("listaGrupos"));
  }

  document.getElementById("inputNombreGrupo").value = listaGrupos[index].nombre;

  document.querySelector("#btnUpdateGrupo").onclick = function () {
    if (
      document.getElementById("inputNombreGrupo").value != "" &&
      document.getElementById("inputAlumno").value != ""
    ) {
      let grupoI = new grupo(document.getElementById("inputNombreGrupo").value);
      grupoI.alumnos = listaGrupos[index].alumnos;

      let listaAlumno;

      if (localStorage.getItem("listaAlumno") == null) {
        listaAlumno = [];
      } else {
        listaAlumno = JSON.parse(localStorage.getItem("listaAlumno"));
      }

      let resp = false;

      listaAlumno.forEach(function (element, index) {
        if (element.nombre == document.getElementById("inputAlumno").value) {
          resp = grupoI.addAlumno(element);
        }
      });

      if (resp) {
        listaGrupos[index] = grupoI;

        localStorage.setItem("listaGrupos", JSON.stringify(listaGrupos));
      } else {
        alert("El alumno no existe");
      }

      showGrupos();

      document.getElementById("inputNombreGrupo").value = "";

      document.getElementById("btnAddGrupo").style.display = "block";
      document.getElementById("inputAlumnoLabel").style.display = "none";
      document.getElementById("inputAlumno").style.display = "none";
      document.getElementById("btnUpdateGrupo", btnAdd).style.display = "none";
    }
  };
}

// Método para agregar datos de materia
function AddMateria() {
  let nombreMateria = document.getElementById("inputMateria").value;
  let calificacionMateria = document.getElementById("inputCalificacion").value;

  if (nombreMateria == "" || calificacionMateria == "") {
    alert("El nombre y la calificación de la materia son requeridos");
    return false;
  }

  var listaMaterias;
  if (localStorage.getItem("listaMaterias") == null) {
    listaMaterias = [];
  } else {
    listaMaterias = JSON.parse(localStorage.getItem("listaMaterias"));
  }

  let newMateria = new materia(nombreMateria, calificacionMateria);

  listaMaterias.push(newMateria);

  localStorage.setItem("listaMaterias", JSON.stringify(listaMaterias));

  showMaterias();

  document.getElementById("inputMateria").value = "";
  document.getElementById("inputCalificacion").value = "";
}

// Método para mostrar los datos de materia
function showMaterias(materias) {
  var html = "";

  materias.forEach(function (materia, index) {
    html += "<tr>";
    html += "<td>" + materia.nombre + "</td>";
    html += "<td>" + materia.calificacion + "</td>";
    html += "</tr>";
  });

  document.querySelector("#tbody-materia").innerHTML = html;
}

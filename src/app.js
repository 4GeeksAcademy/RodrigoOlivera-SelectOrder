/* eslint-disable */
import "bootstrap";
import "./style.css";
import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
// creo un array de cada tipo de carta
/* eslint-disable */
import "bootstrap";
import "./style.css";
const Numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let iconsArray = ["♦", "♥", "♠", "♣"];
// aqui definiremos mi array para ir accediendo a el mismo
const ArrCartas = [
  {
    tipo: "Corazones",
    Numeros: Numeros,
    icon: iconsArray[1]
  },
  {
    tipo: "Pica",
    Numeros: Numeros,
    icon: iconsArray[2]
  },
  {
    tipo: "Clubes",
    Numeros: Numeros,
    icon: iconsArray[3]
  },
  {
    tipo: "Diamantes",
    Numeros: Numeros,
    icon: iconsArray[0]
  }
];

// funcion que genere numeros aleatorios
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let arrChildGeneratedLast = [];

// tomamos valores de el input y los botones
const input = document.getElementById("inputNumber");
const Button1 = document.getElementById("buttonSend");
const Button2 = document.getElementById("buttonSort");
// div padre de el contenedor de las tarjetas
const padre = document.getElementById("col-Cards");

// creamos una funcion para ver si es un numero o una letra
function NumOrLetter(num) {
  if (num === 11) {
    return (num = "J");
  } else if (num === 12) {
    return (num = "Q");
  } else if (num === 13) {
    return (num = "K");
  } else if (num === 14) {
    return (num = "A");
  } else {
    return num;
  }
}

// funcion que genere una carta con el diseño de la misma
function createCard(num, icon, tipo) {
  const divTarjeta = document.createElement("div");
  divTarjeta.style.boxShadow = "7px 7px 11px -3px rgba(0,0,0,0.69)";
  divTarjeta.style.borderRadius = "5px";
  divTarjeta.style.width = "70px";
  divTarjeta.classList.add("d-flex", "flex-column", "bg-light", "mx-2");
  // creando primer p que contendra el primer icono
  const pIcon = document.createElement("p");
  pIcon.innerHTML = icon;
  pIcon.classList.add("align-self-start", "mx-1", "my-1");
  // creando el p que contendra numero
  const Num = document.createElement("p");
  const numInsert = NumOrLetter(num);
  Num.innerHTML = numInsert;
  Num.classList.add("text-center", "my-3");
  // creando el segundo p que tendra el icono pero inverso
  const pIconReverse = document.createElement("p");
  pIconReverse.innerHTML = icon;
  pIconReverse.classList.add("align-self-end", "mx-1", "my-1");
  pIconReverse.style.transform = "rotate(-180deg);";
  // esta condicion pondra en rojo si el tipo es de corazones o diamantes
  if (tipo === "Corazones") {
    pIcon.style.color = "red";
    pIconReverse.style.color = "red";
  } else if (tipo === "Diamantes") {
    pIcon.style.color = "red";
    pIconReverse.style.color = "red";
  }
  // insertando en mi nuevo div
  divTarjeta.appendChild(pIcon);
  divTarjeta.appendChild(Num);
  divTarjeta.appendChild(pIconReverse);

  return divTarjeta;
}
// funcion que al darle click , dependiendo de el numero insertado genere esa cantidad de cartas
Button1.addEventListener("click", () => {
  if (input.value === "") {
    return console.log("es vacio,debe de insertar algo");
  }
  while (padre.firstChild) {
    padre.removeChild(padre.firstChild);
  }
  const arrelements = [];
  for (let i = 1; i <= input.value; i++) {
    // num aleatorio para elegir que tipo de carta y cual numero generaremos
    const genNumALeatoryTipo = getRandomIntInclusive(0, ArrCartas.length - 1);
    const objetAleatory = ArrCartas[genNumALeatoryTipo];
    // aqui elegiremos el numero aleatorio en base a nuestro arr de numeros
    const numberAleatoryObjet = getRandomIntInclusive(
      2,
      objetAleatory.Numeros.length - 1
    );
    const icon = objetAleatory.icon;
    const newCardAleatory = createCard(
      objetAleatory.Numeros[numberAleatoryObjet],
      icon,
      objetAleatory.tipo
    );
    const newObj = {
      icono: icon,
      number: objetAleatory.Numeros[numberAleatoryObjet],
      tipo: objetAleatory.tipo
    };
    arrelements.push(newObj);
    padre.appendChild(newCardAleatory);
  }
  arrChildGeneratedLast.push(arrelements);
});

// funcion para ordenar un array
const selectSort = arr => {
  let min = 0;
  console.log(arr.length - 1);
  while (arr.length - 1 === 0 ? min < arr.length : min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      console.log(arr[min].number);
      console.log(arr[i].number);
      if (arr[min].number > arr[i].number) {
        console.log("Aqui lleo xd");
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
      }
    }
    min++;
  }

  return arr;
};
Button2.addEventListener("click", () => {
  const padreOrdenado = document.getElementById("divOrdenados");
  const arrOrdenado = selectSort(arrChildGeneratedLast);
  arrOrdenado.map(arr => {
    const col12 = document.createElement("div");
    col12.classList.add("col-12", "d-flex", "flex-row", "my-3");
    const newArrOrder = selectSort(arr);
    for (let i = 0; i < newArrOrder.length; i++) {
      const obj = newArrOrder[i];
      const card = createCard(obj.number, obj.icono, obj.tipo);
      col12.append(card);
    }
    padreOrdenado.appendChild(col12);
  });
  arrChildGeneratedLast = [];
});

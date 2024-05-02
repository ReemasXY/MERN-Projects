const all = document.getElementsByClassName('cross-circle');
const winner= document.querySelector(".winner");
const closebtn= document.querySelector(".close-btn");
const wincheck= document.querySelector(".win h1");

// console.log(all);
const arrayall = Array.from(all)
// console.log(arrayall)
let turn = '';

const select = (value) => {
  turn = value;
}
let nowin = 0;
// let changeturn=()=>{
//     if(turn==="X")
//     {
//         return "O";

//     }
//     else
//     {
//         return "X"
//     }
// }

let checkwin = () => {
  let win = [
    [0, 1, 2, 0, -109, 0, 0, -92, 0],
    [3, 4, 5, 0, 0, 0, 0, 0, 0],
    [6, 7, 8, 0, 110, 0, 0, 92, 0],
    [0, 3, 6, -98, 0, 90, -98, 0, 90],
    [1, 4, 7, 0, 0, 90, 0, 0, 90],
    [2, 5, 8, 101, 0, 90, 101, 0, 90],
    [0, 4, 8, 6, 3, 48, 6, 3, 43],
    [2, 4, 6, 0, 2, 132, 2, 0, 138]
  ];
  win.forEach((value) => {
    const all = document.getElementsByClassName('cross-circle');
    const arrayall = Array.from(all)
    const line = document.getElementById('aniline');
    var x = window.matchMedia("(max-height: 471px)")
    console.log(arrayall[value[0]].innerText)
    if ((arrayall[value[0]].innerText === arrayall[value[1]].innerText) && (arrayall[value[1]].innerText === arrayall[value[2]].innerText) && arrayall[value[0]].innerText !== "") {


      if (x.matches)//respomsive
      {
        line.style.width = "276px"
        line.style.transform = `translate(${value[6]}px,${value[7]}px) rotate(${value[8]}deg)`;
        line.style.display = "block";
      }
      else {

        line.style.transform = `translate(${value[3]}px,${value[4]}px) rotate(${value[5]}deg)`;
        line.style.display = "block";

      }
      setTimeout(() => {
        wincheck.textContent=(` Player ${arrayall[value[0]].innerText} won`);
        winner.classList.add("showvisibility");
      }, 200)
    }
    else {
      nowin++;
    }

  })
}
arrayall.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.innerText === '') {
      if (turn === "X") {
        button.style.color = "red"
      }
      else {
        button.style.color = "blue"

      }
      button.innerText = turn;
      // turn= changeturn();
      if (turn === "X") {
        // button.style.color="blue"
        turn = "O"
      }
      else {
        // button.style.color="blue"
        turn = "X";
      }
      checkwin();
      console.log(nowin)
      if (nowin === 72) {
        nowin = 0
        reset();
        setTimeout(() => {
          alert("draw");
        }, 100)
      }
    }

  })
})

let reset = () => {
  nowin = 0;
  const welcome = document.getElementById('welcome')
  const container = document.getElementById('container');
  const clear = document.getElementsByClassName('clear');
  const line = document.getElementById('aniline');
  setTimeout(() => {
    for (let i = 0; i < arrayall.length; i++) {
      arrayall[i].innerText = '';
      line.style.display = "none";
    }


    Array.from(clear).forEach((a) => {
      const nodisplay = document.getElementsByClassName('nodisplay');

      Array.from(nodisplay).forEach((no) => {
        no.style.display = "block";
      })
      welcome.style.display = "none";
      container.style.display = "none";

    })

  }, 450)

}


//show overlays
closebtn.addEventListener("click",()=>{
  winner.classList.remove("showvisibility");
  reset()

})

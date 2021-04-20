// Grab img element that display the character selected on the left
// It is going to be used to dynamically change the img.src to the character selected by the grid
const charSelected = document.getElementById("char-selected");

// Each square is one character in the grid
const squares = document.querySelectorAll(".squares");

// We need this to make thr grid move, to know where the selected square is at;
let position = 0;

// We need this to know if we are at the top or bottom of the selection grid
let topOrBottom = "top";

// ========================================

function dynamicChange() {
  new Audio("sound/move-grid.mp3").play();

  // :: CreateSelectedSquare ::
  // Creates selected "1p" square and move to the position

  const image = document.createElement("img");
  image.src = "images/selected.png";
  image.classList.add("selected");
  squares[position].appendChild(image);

  // :: DeletePreviousFlagSelected ::
  // Grab the element with the class ".flag-selected"
  const flagSelectedClass = document.querySelector(".flag-selected");
  // Then remove it
  flagSelectedClass.classList.remove("flag-selected");

  // :: CreateStringForFlagClass ::
  // Create a string with the classname we need to change the flag of the selected char in the grid selection
  //grab the id name of the previous sibling of "image", which contains the name of the character, then replace the prefix "grid" by "flag"

  // In our PUG file:
  // img.characters#grid-ryu(src="images/char-grid-ryu.png")
  // img.selected(src="images/selected.png")

  // We are grabbing "grid-ryu" and transforming into "flag-ryu"
  const flagCountryString = image.previousSibling.id.replace("grid", "flag");

  // Then we add the "flag-selected" class to the element that holds the flag with the image we want
  // In our CSS all our flags received the display: none by default:

  // .flags {
  //   width: 60px;
  //   position: absolute;
  //   display: none;
  // }

  // What "flag-selected" does is to overwrite "display: none" with "display: inline"

  // .flag-selected {
  //   display: inline;
  // }

  document
    .querySelector(`.${flagCountryString}`)
    .classList.add("flag-selected");

  // :: ChangeSelectedPlayerImg ::

  // Change the character displayed left of the grid according to who we are selecting.

  // "charSelected" was declared at the beginning of the document

  // Similar to the previus section, here we are grabbing the id value from the previous sibling of element and replacing "grid" with "char", then using it to change the img.src of charSelected

  // "charSelected" is a single img element declared in our pug file under the ".row2":
  // .row2
  //   img#char-selected(src="images/char-ryu.png", alt="")

  charSelectedString = image.previousSibling.id.replace("grid", "char");
  charSelected.src = `images/${charSelectedString}.png`;
}

// ========================================

document.addEventListener("keydown", (x) => {
  if (x.key == "l" || x.keyCode == "39") {
    if (position == 5) {
      squares[position].removeChild(document.querySelector(".selected"));
      position = 0;
      charSelected.src = "images/char-ryu.png";
      dynamicChange();
      return;
    }

    if (position == 11) {
      squares[position].removeChild(document.querySelector(".selected"));
      position = 6;
      charSelected.src = "images/char-ken.png";
      dynamicChange();
      return;
    }

    squares[position].removeChild(document.querySelector(".selected"));

    position++;
    dynamicChange();
  }

  if (x.key == "h" || x.keyCode == "37") {
    if (position == 0) {
      squares[position].removeChild(document.querySelector(".selected"));
      position = 5;
      charSelected.src = "images/char-vega.png";
      dynamicChange();
      return;
    }

    if (position == 6) {
      squares[position].removeChild(document.querySelector(".selected"));
      position = 11;
      charSelected.src = "images/char-bison.png";
      dynamicChange();
      return;
    }

    squares[position].removeChild(document.querySelector(".selected"));
    position--;

    dynamicChange();
  }

  if (x.key == "j" || x.key == "k" || x.keyCode == 38 || x.keyCode == "40") {
    if (topOrBottom == "top") {
      squares[position].removeChild(document.querySelector(".selected"));
      position += 6;
      dynamicChange();
      topOrBottom = "bottom";
      return;
    }
    if (topOrBottom == "bottom") {
      squares[position].removeChild(document.querySelector(".selected"));
      position -= 6;
      dynamicChange();
      topOrBottom = "top";
      return;
    }
  }

  if (x.key == "Enter" || x.keyCode == 32) {
    new Audio("sound/selected_sf2.mp3").play();
  }
});

// ==========================
// Toggle volume button

const volumeBtn = document.getElementById("volumeBtn");
const audio = document.getElementById("audio");

volumeBtn.addEventListener("click", (x) => {
  volumeBtn.classList.toggle("fa-volume-up");
  volumeBtn.classList.toggle("fa-volume-mute");

  if (audio.muted == false) {
    audio.muted = true;
    return;
  }
  if (audio.muted == true) {
    audio.muted = false;
  }
});

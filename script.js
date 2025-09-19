const container = document.querySelector('.container');
let num = 25;
let isRgb = false;
let hoverColor = '';


// function to change grid color
function gridColor(){
    const myColorPicker = document.querySelector('#myColorPicker');
    hoverColor = myColorPicker.value;
    myColorPicker.addEventListener('change', (e) => {
        hoverColor = e.target.value;
    })
}

//function to add progressive darkening effect (still hasnt figured it out :/ )
// function darkeningEffect() {
//     const myDarkeningEffect = document.querySelector('#myDarkeningEffect');
//     const gridSquare = document.querySelectorAll('.grid-square');
//     gridSquare.forEach(item => {
//         if (myDarkeningEffect.checked) {
//             item.addEventListener('mouseenter', (e) => {
//                     let darkCount = +(e.target.dataset.dark || "0");

//                     if (darkCount < 10) {
//                         darkCount += 1;
//                         e.target.dataset.dark = darkCount;
//                         e.target.style.opacity = darkCount * 0.1;
//                     }
//             })
//         } else {
//             item.style.opacity = 1;
//         }
//     })
// };


// function to set rgb for the grid color
function rgbCheck(){
    const rgbBox = document.querySelector('#rgbCheckBox');
            rgbBox.addEventListener('change', () => {
                if (rgbBox.checked) {
                    isRgb = true;
                } else {
                    isRgb = false;
                }
            });
}

// function to build grid
function buildGrid(size){
    container.innerHTML = '';
    
    for (let i=1; i <= size*size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.width = (num % 2 === 0) ? `${(650/num)}px` : `${Math.round(650/num)}px`;
        gridSquare.style.height = (num % 2 === 0) ? `${(650/num)}px` : `${Math.round(650/num)}px`;
        container.appendChild(gridSquare);
};

    //add hover effect
    const gridSquare = document.querySelectorAll('.grid-square');

    gridColor();
    rgbCheck();

    gridSquare.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            e.target.classList.add('grid-square-hover');
            e.target.style.backgroundColor = hoverColor;


            if (isRgb) {
                let arr = [];
                for (let i = 0; i < 3; i++) {
                    const randNum = Math.floor(Math.random() * 256);
                    arr.push(randNum);
            };
                e.target.style.backgroundColor = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
                }
            });
    })
};

// function to change grid square wide
function setGridSquare(){
    while (true) {
        const promptInput = prompt("Enter number up to 100", 10);
        if (promptInput > 100 || promptInput < 0) {
            alert('Sorry, only positive and max number 100 wide grid')
        } else {
            num = +promptInput;
            buildGrid(num);
            break;
        }
    }
}

const promptBtn = document.querySelector('.prompt-grid-user');
promptBtn.addEventListener('click', setGridSquare);

// Function reset every grid square to original
function resetDraw() {
    const gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach(item => {
        item.classList.remove('grid-square-hover');
        item.style.backgroundColor = '';
    })
}

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', resetDraw);


//initial grid
buildGrid(num)
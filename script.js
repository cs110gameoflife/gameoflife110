//we set the initial data to zero 
let grbyhb = 0; // The number of grasses eaten by herbivores
let hbbypd = 0; // The number of herbivores eaten by predators
let grbysp = 0; // The number of grasses eaten by super animals
let hbbysp = 0; // The number of herbivores eaten by super animals 
let pdbysp = 0; // The number of predators eaten by super animals  
let hbdie = 0;
let pddie = 0;
let spdie = 0;
let year0 = 0;
socket = io.connect();

//T1 
//We have created a handleSubmit function in order to pass the data using a socket
// to the server also this function changes the content on our screen 
//according to the data.  
function handleSubmit(evt) {
    let stat = [
        [grassArr.length, herbArr.length, predArr.length, superArr.length],
        [grbyhb, hbbypd, grbysp, hbbysp, pdbysp, year0],
        [hbdie, pddie, spdie]
    ];

    statistics.innerText = "The current number of grasses: " + stat[0][0] + "\n" + 
        "The current number of herbivores: " + stat[0][1] + 
        "\nThe current number of predators: " + stat[0][2] +
        "\n The current number of super animals:" + stat[0][3] +
        "\n The number of grasses eaten by herbivores:" + stat[1][0] +
        "\n The number of herbivores eaten by predators:" + stat[1][1] +
        "\n The number of grasses eaten by super animals:" + stat[1][2] +
        "\n The number of herbivores eaten by super animals:" + stat[1][3] +
        "\n The number of predators eaten by super animals:" + stat[1][4] +
        "\n Years passed:" + stat[1][5] +
        "\n The percentage of herbivores dead as a result of hunger:" + stat[2][0] +
        "\n The percentage of predators dead as a result of hunger:" + stat[2][1] +
        "\n The number of dead super animals:" + stat[2][2];

    socket.emit("send data", stat);
}
let statistics = document.getElementById("statistics");

// the lennggth of each side of cell is 25px, matrix initially chooses randomly from the rand array.
//the number of grasses and empty spaces are more than the other character because of 
//the distribution of types in the array
//for each type we create the correspondingg array 

let side = 25;
let rnd = [0, 1];
let rand = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4];
let arr = [];
let n = 32;//prompt("Please, specify the number of rows!");
let m = 32;//prompt("Please, specify the number of colums!");
let grassArr = [];
let herbArr = [];
let predArr = [];
let superArr = [];
let genArr = [];
let ggt = [0, Grass, Herb, Predator, Super];
let gga = [0, grassArr, herbArr, predArr, superArr];
let matrix = [];

//there are four seasons in the gggame of life. winter, srpingg, summer and autumn
//that change each 5 seconds corresponding to each season the multiplying rate of grgasses changes
//also the colors of the character change. 
let st = document.getElementById("season");
let seasons = ["Winter", "Spring", "Summer", "Autumn"];
let si = 0;
function changeSeason() {
    si++;
    if (si >= seasons.length) {
        si = 0;
        year0 += 1;
    }
    st.innerText = seasons[si];
    //console.log(st.innerText);
    for(let i in bombArr){
        matrix[bombArr[i][1]][bombArr[i][0]] = 0;
    }
    bombArr = [];
}
setInterval(changeSeason, 5000);

let colorGrass = "Green";
let multGrass = 8;

//10the kill function searches for object with coordinates(X,Y) and
// index then deletes it, both from our matrix and from the corresponnding array. 
function kill(x, y, index) {
    for (let a in gga[index]) {
        //console.log(a);
        if (gga[index][a].x == x && gga[index][a].y == y) {
            matrix[y][x] = 0;
            gga[index].splice(a, 1);
            //console.log("as");
        }
    }
}
//6we have created a character that appears in a random location on the canvas. , 
let bombArr = [];

function bomb() {
    let bl = 2;
    let bombY = floor(random(2, 30));
    let bombX = floor(random(2, 30));
    // 7we check the bomb not to be on the generators and then create an array of adjacent cells 
    if(!(bombY == 7 && bombX == 7) || !(bombY == 24 && bombX == 7) || !(bombY == 7 && bombX == 24) || !(bombY == 24 && bombX == 24)){
        let bombmatrix = [
            [bombY - 1, bombX - 1],
            [bombY - 1, bombX],
            [bombY - 1, bombX + 1],
            [bombY, bombX - 1],
            [bombY, bombX],
            [bombY, bombX + 1],
            [bombY + 1, bombX - 1],
            [bombY + 1, bombX],
            [bombY + 1, bombX + 1],
        ];
        // 8as each character is respresnted in the matrix we put six instead of bomb
        //then we add the bombs coordinates to our bomb array 
        matrix[bombY][bombX] = 6;
        bombArr.push([bombX, bombY]);
        //9 we check what is in the adjacent cells and call a function called kill with 
        //corrresponding 
        //coordinates and parametr j that represents the type of neigghbouring character 
        for (let i in bombmatrix) {
            for (let j = 1; j < 5; j++) {
                //reminder to ggo up and telll about kill 
                kill(bombmatrix[i][1], bombmatrix[i][0], j);
            }
        }
    }
}
//we call the function bomb each 5 seconds, using ser Interval function. 
setInterval(bomb, 5000);
 function setup() {
    frameRate(3);
    let cnv = createCanvas(n * side, m * side);
    background('#acacac');
    cnv.parent("#canvas");
    for (i = 0; i < n; i++) {
        matrix[i] = [];
        for (a = 0; a < m; a++) {
            matrix[i][a] = random(rand);
        }
    }


//to place the generators in the specificed cells
    matrix[24][24] = 11;
    matrix[7][24] = 12;
    matrix[7][7] = 13;
    matrix[24][7] = 14;


    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                herbArr.push(new Herb(x, y, 2, 5, 1));
            }
            else if (matrix[y][x] == 3) {
                predArr.push(new Predator(x, y, 3, 10, 1));
            }
            else if (matrix[y][x] == 4) {
                superArr.push(new Super(x, y, 4, 15, 1));
            }
            else if (matrix[y][x] == 11) {
                genArr.push(new Generator(x, y, 1));
            }
            else if (matrix[y][x] == 12) {
                genArr.push(new Generator(x, y, 2));
            }
            else if (matrix[y][x] == 13) {
                genArr.push(new Generator(x, y, 3));
            }
            else if (matrix[y][x] == 14) {
                genArr.push(new Generator(x, y, 4));
            }
        }
    }
    //we call handesubmit in order to represent the initial values on the screen  
    handleSubmit();
}


function draw() {
    //here is the part of changing the colors according to the seasons 
    if (si == 0) {
        colorGrass = "#3F4B2E";
        multGrass = 8;
    }
    else if (si == 1) {
        colorGrass = "Green";
        multGrass = 5;
    }
    else if (si == 2) {
        colorGrass = "#06500B";
        multGrass = 6;
    }
    else {
        colorGrass = "#4C6A41";
        multGrass = 7;
    }

    //in this way we fill the cannvas with corresponding colors according to the 
    //matrix
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(colorGrass);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 11) {
                fill("#0B2D00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 12) {
                fill("#DADA00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 13) {
                fill("#801515");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 14) {
                fill("#140888");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            for (let a in grassArr) {
                if (grassArr[a].x == x && grassArr[a].y == y && matrix[y][x] == 0) {
                    grassArr.splice(a, 1);
                }
            }
        }
    }

// this loops over each grass and calls its mult method
    for (let i in grassArr) {
        grassArr[i].mult(multGrass);
    }
//this loops over each herbivore and eats one of its neihbouring grasses, if not moves
//in case it meets another herbivore of the opposite gender calls its mult method and if its energy becomes zero it dies 

    for (let i in herbArr) {
        if (herbArr[i].freespace(1)[0]) {
            herbArr[i].eat();
            grbyhb += 1;
        }
        else {
            herbArr[i].move();
        }

        herbArr[i].mult();


        if (herbArr[i].energy == 0) {
            herbArr[i].die();
            hbdie += 1;
        }
    }



//this loops over each predator and eats one of its neihbouring herbivores, if not moves
//in case it meets another predator of the opposite gender calls its mult method and if its energy becomes zero it dies 

    for (let i in predArr) {
        if (predArr[i].freespace(2)[0]) {
            predArr[i].eat();
            hbbypd += 1;
        }
        else {
            predArr[i].move();
        }

        predArr[i].mult();


        if (predArr[i].energy == 0) {
            predArr[i].die();
            pddie = + 1;
        }
    }


//this loops over each super predator and eats one of its neihbouring characters, depending on what types there are , if not moves
//in case it meets another predator of the opposite gender calls its mult method and if its energy becomes zero it dies 


    for (let i in superArr) {
        if (superArr[i].freespace(1)[0] || superArr[i].freespace(2)[0] || superArr[i].freespace(3)[0]) {
            superArr[i].eat1();
        }
        else {
            superArr[i].move();
        }

        superArr[i].mult();

        if (superArr[i].energy == 0) {
            for (let a in superArr) {
                if (superArr[a].x == superArr[i].x && superArr[a].y == superArr[i].y) {
                    matrix[superArr[i].y][superArr[i].x] = 0;
                    superArr.splice(a, 1);
                }
            }
            spdie += 1;
        }
    }
//for each generator we call its mult method
    for (let i in genArr) {
        genArr[i].mult();
    }

    if (frameCount % 60 == 0) {
    //2 each 60 frame  we call the handelsubmit function. 
    // each time when sending the data, we print on the console the data sent. 
                            
        console.log("Data Sent");
        handleSubmit();
    }

}
//besides four main characters there are ggenerators for each type of the character,
//that provide infinity .....
//each generator has its coordinates index, directionn... 
//the type attribute represents the type of the generator 
class Generator{
    constructor(x, y, ind){
        this.x = x;
        this.y = y;
        this.index = ind;
        this.directions = [];
        this.multiply = 0;
        this.type = ggt[this.index];
        this.sga = gga[this.index];
    }
//getnewcoordinates generates the coordinates of  neihbouring cells for each generator
    getnewcoordinates() {
        this.directions = [];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
// freespace searches for an empty cell among our directions and
//returns the array of found cells 

    freespace(ch) {
        this.getnewcoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

// mult randomly chooses cell from our found array annd creates a new character 
//of the corresponding type on that cell 
    mult() {
        this.multiply++;
        let newcord = random(this.freespace(0));
        let elsec = random(this.freespace(1));
        if (this.multiply >= 5  && newcord) {
            this.sga.push(new this.type(newcord[0], newcord[1], this.index, (this.index-1)*10, random(rnd)));
            matrix[newcord[1]][newcord[0]] = this.index;
            this.multiply = 0;
        }
        else if(this.multiply >= 5  && elsec &&  (this.index == 2 || this.index == 4)) {
            this.sga.push(new this.type(elsec[0], elsec[1], this.index, (this.index-1)*5));
            matrix[elsec[1]][elsec[0]] = this.index;
            this.multiply = 0;
        }
    }

}

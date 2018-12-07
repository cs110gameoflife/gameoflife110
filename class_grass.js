class Grass{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;

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

    freespace(ch) {
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

    mult(mG) {
        this.multiply++;
        let newcord = random(this.freespace(0));
        if (this.multiply >= mG && newcord && matrix[this.y][this.x] != 0) {
            grassArr.push(new Grass(newcord[0], newcord[1]));
            matrix[newcord[1]][newcord[0]] = 1;
            this.multiply = 0;
        }
    }
}






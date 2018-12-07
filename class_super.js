class Super extends Livcreature {

    constructor(x, y, index,energy) {
        super(x, y, index, energy);
        this.pts = 0;


    }

    eat1() {
        let dir;
        let src;
        let pts;
        if (this.freespace(3)[0]) {
            dir = random(this.freespace(3));
            src = predArr;
            pts = 3;
            pdbysp += 1;
        }
        else if (this.freespace(2)[0]) {
            dir = random(this.freespace(2));
            src = herbArr;
            pts = 2;
            hbbysp += 1;
        }
        else if (this.freespace(1)[0]) {
            dir = random(this.freespace(1));
            src = grassArr;
            pts = 1;
            grbysp += 1;
        }


        if (dir) {
            matrix[this.y][this.x] = 0;
            this.x = dir[0];
            this.y = dir[1];
            matrix[this.y][this.x] = 4;
            for (let a in src) {
                if (src[a].x == dir[0] && src[a].y == dir[1]) {
                    src.splice(a, 1);
                }
            }

            this.ttl += pts;
            this.energy = 15;
        }
    }
}


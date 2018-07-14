function Block(blockSize) {
    this.visited=false;
    this.side= [];
    for (var i = 0; i < 4; i++)
      this.side.push(true);
    this.show= function(){
      stroke(255);
      strokeWeight(3);
      if(this.side[0])
        line(0,0,blockSize,0);
      if(this.side[1])
        line(blockSize,0,blockSize,blockSize);
      if(this.side[2])
        line(blockSize,blockSize,0,blockSize);
      if(this.side[3])
        line(0,blockSize,0,0);
    }
}

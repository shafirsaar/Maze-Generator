var grid;//array of blocks
var gridSize;// in px
var mazeSize;// number of blocks in one size of the maze
var blockSize;// block width in px
var current;
var allVisited;
var stack;
function setup()
{
  stack=[-1];
  grid=[];
  gridSize=1000;
  mazeSize=20;
  blockSize=floor(gridSize/mazeSize);
  current=0;
  createCanvas(gridSize+20,gridSize+20);
  background(150);
  for (var i = 0; i < mazeSize*mazeSize; i++)
      grid.push(new Block(blockSize));
}
function draw()
{
   background(52);
   allVisited= true;
   translate(10,10);
   for (var i = 0; i < mazeSize*mazeSize; i++) {
      push();
      translate(place(i).x,place(i).y);
      grid[i].show();
      if(!grid[i].visited)
        allVisited=false;
      if (current==i)
      {
        fill(255,0,255);
        rect(5,5,blockSize-10,blockSize-10);
        grid[i].visited = true;
      }
      else if (grid[i].visited) {
        fill(52);
        noStroke();
        rect(4,4,blockSize-4,blockSize-4);
      }
      pop();
  }
//////////////////////////////////////////////
  if(stack.length!=0)
  {
    if(hasNeighbors(current))
    {
      var rnd= floor(random(0,4));
      var nbrs=neighbors(current).slice();
      while(nbrs[rnd]==-1||grid[nbrs[rnd]].visited)
        rnd=floor(random(0,4));
      //
      grid[current].side[rnd]=false;
      grid[nbrs[rnd]].side[(rnd+2)%4]=false;
      //
      stack.push(current);
      grid[current].visited= true;
      current= nbrs[rnd];
    }
    else {
      current=stack.pop();
    }
  }
}
function place(i)
{
    this.x=(i%mazeSize)*blockSize;
    this.y=floor((i/mazeSize))*blockSize;
  return this;
}

function hasNeighbors(i)
{
  var arr=neighbors(i).slice();
  for (var j = 0; j < arr.length; j++) {
    if (arr[j]!=-1)
      if (!grid[arr[j]].visited)
        return true;
  }
  return false;
}
function neighbors(i){
    this.arr=[];
    this.arr.push(-1);
    this.arr.push(-1);
    this.arr.push(-1);
    this.arr.push(-1);

    if (i%mazeSize!=0)
      this.arr[3]=i-1;
    if (i%mazeSize!=mazeSize-1)
      this.arr[1]=i+1;
    if (floor(i/mazeSize)>0)
      this.arr[0]=i-mazeSize;
    if (floor(i/mazeSize)<mazeSize-1)
      this.arr[2]=i+mazeSize;
    return this.arr;
  }

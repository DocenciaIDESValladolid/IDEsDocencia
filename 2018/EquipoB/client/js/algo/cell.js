var contaminedCells = [];

class Cell {
    constructor(cx, cy) {
        this.x = cx;
        this.y = cy;
		this.unit = []
		this.contamined = false;
    }

    getNeighbours()	{
		var n = [];
		
		for(var y = (this.y - 1); y<= (this.y + 1); y++)
		{
			for(var x = (this.x - 1); x <= (this.x + 1); x++)
			{
				if(y < 0 || x < 0 || x >= map.width || y >= map.height) { continue; }
				
				n.push((y * map.width) + x);
			}
		}
		
		return n;
	}
}
(function () {
    /* VARIABLES */
    var c, ctx,
        grid, gWidth, gHeight,
        nbBlocks, blockSize,
        blocksPerLine, numLines,
        colors, background,
        i, j, k, l, m, n;

    /* INITIALIZATION */
    c = document.getElementById('c');
    ctx = c.getContext("2d");
    grid = [];
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gWidth = c.width;
    gHeight = c.height;
    nbBlocks = 80;
    blockSize = gWidth / nbBlocks;
    blocksPerLine = gWidth / blockSize;
    numLines = gHeight / blockSize;


    // Palette from http://www.colourlovers.com/palette/617935/Dutch_Seas
    background = '#fff',
    colors = [{
        normal: 'hsl(188,76%,37%)',
        alpha1: 'hsl(188,76%,52%)',
        alpha2: 'hsl(188,76%,77%)',
        alpha3: 'hsl(188,76%,100%)',
        white: background
    }, {
        normal: 'hsl(187,52%,52%)',
        alpha1: 'hsl(187,52%,67%)',
        alpha2: 'hsl(187,52%,82%)',
        alpha3: 'hsl(187,52%,100%)',
        white: background
    }, {
        alpha1: 'hsla(177,45%,65%)',
        normal: 'hsla(177,45%,77%)',
        alpha2: 'hsla(177,45%,90%)',
        alpha3: 'hsla(177,45%,100%)',
        white: background
    }, {
        normal: 'hsl(172,48%,75%)',
        alpha1: 'hsl(172,48%,83%)',
        alpha2: 'hsl(172,48%,91%)',
        alpha3: 'hsl(172,48%,100%)',
        white: background
    }, {
        normal: 'hsl(172,51%,85%)',
        alpha1: 'hsl(172,51%,88%)',
        alpha2: 'hsl(172,51%,91%)',
        alpha3: 'hsl(172,51%,100%)',
        white: background
    }];

    createGrid();
    draw();

    function waterColor() {
        var random = Math.floor(Math.random() * 5);
        return colors[random];
    }

    function initCounters() {
        i = j = k = l = m = n = 0;
    }

    function createGrid() {
        initCounters();

        /* grid of blocks */
        for (i = 0; i < blocksPerLine; i += 1) {
            for (j = 0; j < numLines; j += 1) {
                grid.push({
                    color: waterColor(),
                    x: j * blockSize,
                    y: i * blockSize
                });
            }
        }

        initCounters();
    }

    function drawLine(lineNumber, color) {
        var cpt, linePos, blockPos;

        linePos = lineNumber * blocksPerLine;

        for (cpt = 0; cpt < blocksPerLine; cpt++) {
            blockPos = linePos + cpt;
            ctx.fillStyle = grid[blockPos].color[color];
            ctx.fillRect(grid[blockPos].x, grid[blockPos].y, blockSize, blockSize);
        }
    }

    function draw(timestamp) {

        // Display with normal colors
        if (i < numLines) {
            // Draw one line of blocks
            drawLine(i, 'normal');
            i = i + 1;
        }

        // **************
        // Fade blocks...

        // ... with alpha 1 colors
        if (i >= 2 && j < numLines) {
            drawLine(j, 'alpha1');
            j = j + 1;
        }

        // ... with alpha 2 colors
        if (j >= 3 && k < numLines) {
            drawLine(k, 'alpha2');
            k = k + 1;
        }

        // ... with alpha 3 colors
        if (k >= 4 && l < numLines) {
            drawLine(l, 'alpha3');
            l = l + 1;
        }

        // ... with white
        if (l >= 5 && m < numLines) {
            drawLine(m, 'white');
            m = m + 1;
        }

        // End fading
        // **********

        // Draw only as long as we have blocks in the grid
        if (m < numLines) {
            requestAnimationFrame(draw);
        }

        // console.log("i:"+i);
        // console.log("j:"+j);
        // console.log("k:"+k);
        // console.log("l:"+l);
        // console.log("m:"+m);
        // console.log("n:"+n);
    }
})();

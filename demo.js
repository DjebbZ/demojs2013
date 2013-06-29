(function () {
    /* VARIABLES */
    var c, ctx,
        grid, gWidth, gHeight,
        nbBlocks, blockSize,
        blocksPerLine, numLines,
        colors, background,
        waveSize, waves,
        i, j;

    /* INITIALIZATION */
    c = document.getElementById('c');
    ctx = c.getContext("2d");
    grid = [];
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gWidth = c.width;
    gHeight = c.height;
    blocksPerLine = 80;
    blockSize = Math.floor(gWidth / blocksPerLine);
    numLines = Math.floor(gHeight / blockSize);
    waveSize = 10;
    waves = [{
        direction: 'down', position: 0
    }, {
        direction: 'up', position: numLines - waveSize
    }];

    // Palette from http://www.colourlovers.com/palette/617935/Dutch_Seas
    background = '#fff',
    colorsAll = [{
        alpha0: 'hsl(188,76%,37%)',
        alpha1: 'hsl(188,76%,43%)',
        alpha2: 'hsl(188,76%,51%)',
        alpha3: 'hsl(188,76%,58%)',
        alpha4: 'hsl(188,76%,66%)',
        alpha5: 'hsl(188,76%,74%)',
        alpha6: 'hsl(188,76%,82%)',
        alpha7: 'hsl(188,76%,88%)',
        alpha8: 'hsl(188,76%,94%)',
        alpha9: background
    }, {
        alpha0: 'hsl(187,52%,52%)',
        alpha1: 'hsl(187,52%,57%)',
        alpha2: 'hsl(187,52%,62%)',
        alpha3: 'hsl(187,52%,67%)',
        alpha4: 'hsl(187,52%,72%)',
        alpha5: 'hsl(187,52%,77%)',
        alpha6: 'hsl(187,52%,82%)',
        alpha7: 'hsl(187,52%,87%)',
        alpha8: 'hsl(187,52%,92%)',
        alpha9: background
    }, {
        alpha0: 'hsl(177,45%,65%)',
        alpha1: 'hsl(177,45%,68%)',
        alpha2: 'hsl(177,45%,71%)',
        alpha3: 'hsl(177,45%,74%)',
        alpha4: 'hsl(177,45%,77%)',
        alpha5: 'hsl(177,45%,80%)',
        alpha6: 'hsl(177,45%,83%)',
        alpha7: 'hsl(177,45%,86%)',
        alpha8: 'hsl(177,45%,89%)',
        alpha9: background
    }, {
        alpha0: 'hsl(172,48%,75%)',
        alpha1: 'hsl(172,48%,77%)',
        alpha2: 'hsl(172,48%,79%)',
        alpha3: 'hsl(172,48%,81%)',
        alpha4: 'hsl(172,48%,83%)',
        alpha5: 'hsl(172,48%,85%)',
        alpha6: 'hsl(172,48%,87%)',
        alpha7: 'hsl(172,48%,89%)',
        alpha8: 'hsl(172,48%,91%)',
        alpha9: background
    }, {
        alpha0: 'hsl(172,51%,85%)',
        alpha1: 'hsl(172,51%,86%)',
        alpha2: 'hsl(172,51%,87%)',
        alpha3: 'hsl(172,51%,88%)',
        alpha4: 'hsl(172,51%,89%)',
        alpha5: 'hsl(172,51%,90%)',
        alpha6: 'hsl(172,51%,91%)',
        alpha7: 'hsl(172,51%,92%)',
        alpha8: 'hsl(172,51%,93%)',
        alpha9: background
    }];

    createGrid();
    draw();
    // drawWave(0);

    function waterColor() {
        var random = Math.floor(Math.random() * 5);
        return colorsAll[random];
    }

    function initCounters() {
        i = j = 0;
    }

    function createGrid() {
        initCounters();

        /* grid of blocks */
        for (i = 0; i < numLines; i += 1) {
            for (j = 0; j < blocksPerLine; j += 1) {
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

        if (lineNumber < 0 || lineNumber >= numLines) {
            return;
        }

        linePos = lineNumber * blocksPerLine;

        for (cpt = 0; cpt < blocksPerLine; cpt++) {
            blockPos = linePos + cpt;
            ctx.fillStyle = grid[blockPos].color[color];
            ctx.fillRect(grid[blockPos].x, grid[blockPos].y, blockSize, blockSize);
        }
    }

    function drawWave(waveNumber) {
        var pos, colors, delta, cpt, offset, wd, wp, currentWavePos;

        wd = waves[waveNumber].direction;
        wp = waves[waveNumber].position;

        if (wp < 0 || wp >= numLines - 1) {
            return;
        }

        if (wd === 'down') {
            pos = wp + waveSize;
        } else {
            pos = wp - waveSize;
        }

        colors = Object.keys(colorsAll[0]).sort();
        delta = wd === 'down' ? -1 : 1;
        offset = delta;

        for (cpt = 0; cpt < waveSize; cpt++, offset += delta) {
            currentWavePos = pos + offset;
            drawLine(currentWavePos, colors[cpt]);
        }

        waves[waveNumber].position = wd === 'down' ? wp + 1 : wp + numLines - 1;
    }

    function draw() {
        requestAnimationFrame(draw);
        drawWave(0);
        // drawWave(1);
    }
})();

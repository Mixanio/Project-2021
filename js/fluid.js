
(function(w) {

    var canvas, ctx;

    var mouse = {
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        down: false
    };

    var canvas_width = 500; //Needs to be a multiple of the resolution value below.
    var canvas_height = 500; //This too.

    var resolution = 10; //Width and height of each cell in the grid.

    var pen_size = 40; //Radius around the mouse cursor coordinates to reach when stirring

    var num_cols = canvas_width / resolution; //This value is the number of columns in the grid.
    var num_rows = canvas_height / resolution; //This is number of rows.
    var speck_count = 5000; //This determines how many particles will be made.

    var vec_cells = []; //The array that will contain the grid cells
    var particles = []; //The array that will contain the particles

    function init() {

        //These lines get the canvas DOM element and canvas context, respectively.
        canvas = document.getElementById("c");
        ctx = canvas.getContext("2d");

        //These two set the width and height of the canvas to the defined values.
        canvas.width = canvas_width;
        canvas.height = canvas_height;

        for (i = 0; i < speck_count; i++) {

            particles.push(new particle(Math.random() * canvas_width, Math.random() * canvas_height));
        }

        //This loops through the count of columns.
        for (col = 0; col < num_cols; col++) {

            //This defines the array element as another array.
            vec_cells[col] = [];

            //This loops through the count of rows.
            for (row = 0; row < num_rows; row++) {

                var cell_data = new cell(col * resolution, row * resolution, resolution)

                //This pushes the cell object into the grid array.
                vec_cells[col][row] = cell_data;

                vec_cells[col][row].col = col;
                vec_cells[col][row].row = row;

            }
        }

        for (col = 0; col < num_cols; col++) {

            for (row = 0; row < num_rows; row++) {

                var cell_data = vec_cells[col][row];

                var row_up = (row - 1 >= 0) ? row - 1 : num_rows - 1;
                var col_left = (col - 1 >= 0) ? col - 1 : num_cols - 1;
                var col_right = (col + 1 < num_cols) ? col + 1 : 0;

                //Get the reference to the cell on the row above.
                var up = vec_cells[col][row_up];
                var left = vec_cells[col_left][row];
                var up_left = vec_cells[col_left][row_up];
                var up_right = vec_cells[col_right][row_up];

                cell_data.up = up;
                cell_data.left = left;
                cell_data.up_left = up_left;
                cell_data.up_right = up_right;

                up.down = vec_cells[col][row];
                left.right = vec_cells[col][row];
                up_left.down_right = vec_cells[col][row];
                up_right.down_left = vec_cells[col][row];

            }
        }

        w.addEventListener("mousedown", mouse_down_handler);
        w.addEventListener("touchstart", mouse_down_handler);

        w.addEventListener("mouseup", mouse_up_handler);
        w.addEventListener("touchend", touch_end_handler);

        canvas.addEventListener("mousemove", mouse_move_handler);
        canvas.addEventListener("touchmove", touch_move_handler);

        //When the page is finished loading, run the draw() function.
        w.onload = draw;

    }

    function update_particle() {

        //Loops through all of the particles in the array
        for (i = 0; i < particles.length; i++) {

            //Sets this variable to the current particle so we can refer to the particle easier.
            var p = particles[i];

            //If the particle's X and Y coordinates are within the bounds of the canvas...
            if (p.x >= 0 && p.x < canvas_width && p.y >= 0 && p.y < canvas_height) {

                var col = parseInt(p.x / resolution);
                var row = parseInt(p.y / resolution);

                //Same as above, store reference to cell
                var cell_data = vec_cells[col][row];

                var ax = (p.x % resolution) / resolution;
                var ay = (p.y % resolution) / resolution;

                p.xv += (1 - ax) * cell_data.xv * 0.05;
                p.yv += (1 - ay) * cell_data.yv * 0.05;

                p.xv += ax * cell_data.right.xv * 0.05;
                p.yv += ax * cell_data.right.yv * 0.05;

                p.xv += ay * cell_data.down.xv * 0.05;
                p.yv += ay * cell_data.down.yv * 0.05;

                //This adds the calculated velocity to the position coordinates of the particle.
                p.x += p.xv;
                p.y += p.yv;

                //For each axis, this gets the distance between the old position of the particle and it's new position.
                var dx = p.px - p.x;
                var dy = p.py - p.y;

                //Using the Pythagorean theorum (A^2 + B^2 = C^2), this determines the distance the particle travelled.
                var dist = Math.sqrt(dx * dx + dy * dy);

                //This line generates a random value between 0 and 0.5
                var limit = Math.random() * 0.5;

                //If the distance the particle has travelled this frame is greater than the random value...
                if (dist > limit) {
                    ctx.lineWidth = 1;
                    ctx.beginPath(); //Begin a new path on the canvas
                    ctx.moveTo(p.x, p.y); //Move the drawing cursor to the starting point
                    ctx.lineTo(p.px, p.py); //Describe a line from the particle's old coordinates to the new ones
                    ctx.stroke(); //Draw the path to the canvas
                }else{
                    //If the particle hasn't moved further than the random limit...

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);

                    ctx.lineTo(p.x + limit, p.y + limit);

                    ctx.stroke();
                }

                //This updates the previous X and Y coordinates of the particle to the new ones for the next loop.
                p.px = p.x;
                p.py = p.y;
            }
            else {
                //If the particle's X and Y coordinates are outside the bounds of the canvas...

                //Place the particle at a random location on the canvas
                p.x = p.px = Math.random() * canvas_width;
                p.y = p.py = Math.random() * canvas_height;

                //Set the particles velocity to zero.
                p.xv = 0;
                p.yv = 0;
            }

            //These lines divide the particle's velocity in half everytime it loops, slowing them over time.
            p.xv *= 0.5;
            p.yv *= 0.5;
        }
    }

    function draw() {

        var mouse_xv = mouse.x - mouse.px;
        var mouse_yv = mouse.y - mouse.py;

        //Loops through all of the columns
        for (i = 0; i < vec_cells.length; i++) {
            var cell_datas = vec_cells[i];

            //Loops through all of the rows
            for (j = 0; j < cell_datas.length; j++) {

                //References the current cell
                var cell_data = cell_datas[j];

                //If the mouse button is down, updates the cell velocity using the mouse velocity
                if (mouse.down) {
                    change_cell_velocity(cell_data, mouse_xv, mouse_yv, pen_size);
                }

                //This updates the pressure values for the cell.
                update_pressure(cell_data);
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //This sets the color to draw with.
        ctx.strokeStyle = "#00FFFF";

        //This calls the function to update the particle positions.
        update_particle();

        for (i = 0; i < vec_cells.length; i++) {
            var cell_datas = vec_cells[i];

            for (j = 0; j < cell_datas.length; j++) {
                var cell_data = cell_datas[j];

                update_velocity(cell_data);

            }
        }

        //This replaces the previous mouse coordinates values with the current ones for the next frame.
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //This requests the next animation frame which runs the draw() function again.
        requestAnimationFrame(draw);

    }

    function change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
        //This gets the distance between the cell and the mouse cursor.
        var dx = cell_data.x - mouse.x;
        var dy = cell_data.y - mouse.y;
        var dist = Math.sqrt(dy * dy + dx * dx);

        //If the distance is less than the radius...
        if (dist < pen_size) {

            //If the distance is very small, set it to the pen_size.
            if (dist < 4) {
                dist = pen_size;
            }

            //Calculate the magnitude of the mouse's effect (closer is stronger)
            var power = pen_size / dist;

            /*
            Apply the velocity to the cell by multiplying the power by the mouse velocity and adding it to the cell velocity
            */
            cell_data.xv += mvelX * power;
            cell_data.yv += mvelY * power;
        }
    }

    function update_pressure(cell_data) {

        //This calculates the collective pressure on the X axis by summing the surrounding velocities
        var pressure_x = (
            cell_data.up_left.xv * 0.5 //Divided in half because it's diagonal
            + cell_data.left.xv
            + cell_data.down_left.xv * 0.5 //Same
            - cell_data.up_right.xv * 0.5 //Same
            - cell_data.right.xv
            - cell_data.down_right.xv * 0.5 //Same
        );

        //This does the same for the Y axis.
        var pressure_y = (
            cell_data.up_left.yv * 0.5
            + cell_data.up.yv
            + cell_data.up_right.yv * 0.5
            - cell_data.down_left.yv * 0.5
            - cell_data.down.yv
            - cell_data.down_right.yv * 0.5
        );

        //This sets the cell pressure to one-fourth the sum of both axis pressure.
        cell_data.pressure = (pressure_x + pressure_y) * 0.25;
    }

    function update_velocity(cell_data) {

        cell_data.xv += (
            cell_data.up_left.pressure * 0.5
            + cell_data.left.pressure
            + cell_data.down_left.pressure * 0.5
            - cell_data.up_right.pressure * 0.5
            - cell_data.right.pressure
            - cell_data.down_right.pressure * 0.5
        ) * 0.25;

        //This does the same for the Y axis.
        cell_data.yv += (
            cell_data.up_left.pressure * 0.5
            + cell_data.up.pressure
            + cell_data.up_right.pressure * 0.5
            - cell_data.down_left.pressure * 0.5
            - cell_data.down.pressure
            - cell_data.down_right.pressure * 0.5
        ) * 0.25;

        /*
        This slowly decreases the cell's velocity over time so that the fluid stops
        if it's left alone.
        */
        cell_data.xv *= 0.99;
        cell_data.yv *= 0.99;
    }


    //This function is used to create a cell object.
    function cell(x, y, res) {

        //This stores the position to place the cell on the canvas
        this.x = x;
        this.y = y;

        //This is the width and height of the cell
        this.r = res;

        //These are the attributes that will hold the row and column values
        this.col = 0;
        this.row = 0;

        //This stores the cell's velocity
        this.xv = 0;
        this.yv = 0;

        //This is the pressure attribute
        this.pressure = 0;

    }


    //This function is used to create a particle object.
    function particle(x, y) {
        this.x = this.px = x;
        this.y = this.py = y;
        this.xv = this.yv = 0;
    }

    function mouse_down_handler(e) {
        e.preventDefault(); //Prevents the default action from happening (e.g. navigation)
        mouse.down = true; //Sets the mouse object's "down" value to true
    }


    //This function is called whenever the mouse button is released.
    function mouse_up_handler() {
        mouse.down = false;
    }


    //This function is called whenever a touch point is removed from the screen.
    function touch_end_handler(e) {
        if (!e.touches) mouse.down = false; //If there are no more touches on the screen, sets "down" to false.
    }

    function mouse_move_handler(e) {
        //Saves the previous coordinates
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //Sets the new coordinates
        mouse.x = e.offsetX || e.layerX;
        mouse.y = e.offsetY || e.layerY;
    }

    function touch_move_handler(e) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //This line gets the coordinates for where the canvas is positioned on the screen.
        var rect = canvas.getBoundingClientRect();

        mouse.x = e.touches[0].pageX - rect.left;
        mouse.y = e.touches[0].pageY - rect.top;
    }

    w.Fluid = {
        initialize: init
    }

}(window)); //Passes "window" into the self-invoking function.
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
Fluid.initialize();
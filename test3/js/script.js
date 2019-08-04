function ColorPicker() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.createPicker = function (picker) {
        var picker = document.getElementById(picker);
        var display = document.createElement('div');
        display.style.height = "50px";


      var red = document.createElement('input');
        red.dataset.color = "red";
        red.type = "range";

      var green = document.createElement('input');
        green.dataset.color = "green";
        green.type = "range";
      
      var blue = document.createElement('input');
        blue.dataset.color = "blue";
        blue.type = "range";

        red.min = 0;
        red.max = 255;
        green.min = 0;
        green.max = 255;
        blue.min = 0;
        blue.max = 255;

        picker.appendChild(display);
        picker.appendChild(red);
        picker.appendChild(green);
        picker.appendChild(blue);

        var self = this;
        display.style.backgroundColor = "rgb(" + [self.red,self.green,self.blue] + ")";
          [red,green,blue].forEach(function (elem) {
              elem.value = 125;
              elem.addEventListener('input',function (event) {
                    self[this.dataset.color] = this.value;
                    display.style.backgroundColor = "rgb(" + [self.red,self.green,self.blue] + ")"
              });
          });
    };
};

function Grid(w,h,picker) {
    this.cellSize = 20;
    this.width = w;
    this.height = h;
    this.mouseDown = false;
    this.picker = picker;
    this.createGrid = function (id) {
        var self = this;
        document.addEventListener('mousedown',function (event) {
           self.mouseDown = true;
        });

        document.addEventListener('mouseup',function (event) {
            self.mouseDown = false;
        });

        var grid = document.getElementById(id);
        grid.innerHTML = '';
        grid.style.width = (this.cellSize * this.width+2) + "px";
        grid.style.height = (this.cellSize * this.height+2) + "px";
        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                var div = document.createElement('div');
                var canvas = document.createElement('canvas');
                div.style.width = this.cellSize + "px";
                div.style.height = this.cellSize + "px";
                canvas.width = this.cellSize;
                canvas.height = this.cellSize;
                canvas.getContext("2d").fillStyle = "#ffffff";

                canvas.addEventListener('mouseover',function (event) {
                    if(self.mouseDown) {
                        var ctx = this.getContext("2d");
                        ctx.fillStyle = "rgb(" + [self.picker.red,self.picker.green,self.picker.blue].join() + ")";
                        ctx.fillRect(0, 0, this.width, this.height);
                    }
                });

                canvas.addEventListener('click',function (event) {
                        var ctx = this.getContext("2d");
                        console.log(ctx.fillStyle);
                        if(ctx.fillStyle == "#ffffff") {
                            ctx.fillStyle = "rgb(" + [self.picker.red, self.picker.green, self.picker.blue].join() + ")";
                        } else {
                            ctx.fillStyle = "#ffffff";
                        };
                        ctx.fillRect(0, 0, this.width, this.height);

                });

                div.appendChild(canvas);
                grid.appendChild(div);
            };

        };
    };
};

document.addEventListener("DOMContentLoaded",function (e) {
    var picker = new ColorPicker();
    picker.createPicker("picker");

    document.getElementById('btn-set').addEventListener('click', function(e) {
      var width = document.getElementById("img-width").value;
      var height = document.getElementById("img-height").value;
      var grid = new Grid(width,height,picker);
      grid.createGrid("app");
    });        
});

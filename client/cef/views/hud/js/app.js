let cWidth = $("#hunger").width();
let cHeight = $("#hunger").height();
var canvas = document.getElementById("hunger_arc");
canvas.width = cWidth;
canvas.height = cHeight;
var canvas1 = document.getElementById("thirst_arc");
canvas1.width = cWidth;
canvas1.height = cHeight;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radius = canvas.height / 2.5;
let lineWidth = canvas.width / 10;
var currentValues = {
    hunger: 100,
    thirst: 100
};

function findColorBetween(left, right, percentage) {
    newColor = {};
    components = ["r", "g", "b"];
    for (var i = 0; i < components.length; i++) {
        c = components[i];
        newColor[c] = Math.round(left[c] + (right[c] - left[c]) * percentage / 100);
    }
    return newColor;
}

function hide(specific) {
    if (!specific) {
        $("#hunger").hide();
        $("#thirst").hide();
    } else {
        $("#" + specific).hide();
    }
}

function show(specific) {
    if (!specific) {
        $("#hunger").show();
        $("#thirst").show();
    } else {
        $("#" + specific).show();
    }
}

function drawCircle(selector, val, color) {
    let canvasLocal = document.getElementById(selector);
    canvasLocal.width = cWidth;
    canvasLocal.height = cHeight;
    let cContext = canvasLocal.getContext('2d');
    cContext.clearRect(0, 0, canvasLocal.width, canvasLocal.height);
    cContext.beginPath();
    cContext.globalAlpha = 0.9;
    let start = 90 * (Math.PI / 180);
    let end = ((360 / 100 * val) + 90) * (Math.PI / 180);
    cContext.arc(centerX, centerY, radius, start, end, false);
    cContext.lineWidth = lineWidth;
    cContext.shadowBlur = 5;
    cContext.shadowColor = "rgba(0,0,0,0.5)";
    cContext.strokeStyle = `rgba(${color.r},${color.g},${color.b},0.8)`;
    cContext.stroke();
}

function drawHunger(val) {
    console.log("drawHunger", val)
    currentValues.hunger = val;
    let color = findColorBetween({
        r: 254,
        g: 80,
        b: 0
    }, {
        r: 142,
        g: 198,
        b: 62
    }, val);
    drawCircle("hunger_arc", val, color);
    return val;
}

function drawThirst(val) {
    console.log("drawThirst", val)
    currentValues.thirst = val;
    let color = findColorBetween({
        r: 254,
        g: 80,
        b: 0
    }, {
        r: 0,
        g: 174,
        b: 240
    }, val);
    drawCircle("thirst_arc", val, color);
    return val;
}

function drawThirst(val) {
    console.log("drawThirst", val)
    currentValues.thirst = val;
    let color = findColorBetween({
        r: 254,
        g: 80,
        b: 0
    }, {
        r: 0,
        g: 174,
        b: 240
    }, val);
    drawCircle("thirst_arc", val, color);
    return val;
}

function drawEnergy(val) {
    console.log("drawEnergy", val)
    currentValues.energy = val;
    let color = findColorBetween({
        r: 254,
        g: 80,
        b: 0
    }, {
        r: 0,
        g: 174,
        b: 240
    }, val);
    drawCircle("energy_arc", val, color);
    return val;
}

function setThirst(new_value) {
    if (new_value > currentValues.thirst) {
        let step = new_value / 200;
        if (step < 0.1) step = 0.1;
        drawThirst(currentValues.thirst + step);
        requestAnimationFrame(function() {
            setThirst(new_value);
        });
    } else {
        drawThirst(new_value);
    }
}

function setHunger(new_value) {
    if (new_value > currentValues.hunger) {
        let step = new_value / 200;
        if (step < 0.1) step = 0.1;
        drawHunger(currentValues.hunger + step);
        requestAnimationFrame(function() {
            setHunger(new_value);
        });
    } else {
        drawHunger(new_value);
    }
}

function setEnergy(new_value) {
    if (new_value > currentValues.energy) {
        let step = new_value / 200;
        if (step < 0.1) step = 0.1;
        drawEnergy(currentValues.energy + step);
        requestAnimationFrame(function() {
            setEnergy(new_value);
        });
    } else {
        drawEnergy(new_value)
    }
}

function init(minimap) {
    let height = $(window).height();
    let width = $(window).width();
    let offset = {
        top: 0,
        left: 15
    }
    let cell = 0;
    $("#hunger").css({
        top: (minimap.bottomY) * height - (cHeight) + offset.top,
        left: (minimap.rightX) * width + (cWidth * cell) + offset.left
    })
    cell += 1;
    $("#thirst").css({
        top: (minimap.bottomY) * height - (cHeight) + offset.top,
        left: (minimap.rightX) * width + (cWidth * cell) + offset.left
    })
    cell += 1;
    $("#energy").css({
        top: (minimap.bottomY) * height - (cHeight) + offset.top,
        left: (minimap.rightX) * width + (cWidth * cell) + offset.left
    })
}
$(document).ready(function(event) {
    mp.trigger("HUD:Ready");
});
/**
 * Created by aanappindi on 11/19/2015.
 */
(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes
    var rect; // used to reference frame bounds

// library properties:
    lib.properties = {
        width: 512,
        height: 512,
        fps: 60,
        color: "#000000"
    };
   (lib.LineSec = function() {
        this.initialize();

        // black/red circle
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#D33B3B").s("#000000").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);//FF9900
        this.shape.setTransform(0,0,0.725,0.725);

        // while circle around black/red circle
        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().de(-6.9,-6.9,13.8,13.8);
        this.shape_1.setTransform(0,0,1.159,1.159);

        // line
        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#D33B3B").s().dr(-0.65,-110,1.3,220);
        this.shape_2.setTransform(0.1,-90,1.04,1);

        this.addChild(this.shape_2, this.shape_1,this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-8,-200,16,220);
    p.frameBounds = [rect];


    (lib.LineMin = function() {
        this.initialize();
        var large = 12;
        var small = 6;
        function getTipCordinates (base) {
            return [
                {x: -base/2, y: base *( Math.tan(45 *  Math.PI / 180) ) /2 },
                { x: base/2, y :  base * ( Math.tan(45 *  Math.PI / 180) /2 )  }
            ];
        }
        var triangle = getTipCordinates(small);
        this.newHand = new cjs.Shape();
        this.newHand.graphics.f("white").s("White").moveTo(0,0)
            .lineTo(triangle[0 ].x,triangle[0 ].y )
            .lineTo(-large/2, 170)
            .lineTo(large/2, 170)
            .lineTo(triangle[1].x, triangle[1].y);
        this.newHand.setTransform(0,-170,1,1);
        this.addChild( this.newHand);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-7,-188,14,188);
    p.frameBounds = [rect];


    (lib.LineHour = function() {
        this.initialize();
        var large = 12;
        var small = 6;
        function getTipCordinates (base) {
            return [
                {x: -base/2, y: base *( Math.tan(45 *  Math.PI / 180) ) /2 },
                { x: base/2, y :  base * ( Math.tan(45 *  Math.PI / 180) /2 )  }
            ];
        }
        var triangle = getTipCordinates(small);
        this.newHand = new cjs.Shape();
        this.newHand.graphics.f("white").s("White").moveTo(0,0)
            .lineTo(triangle[0 ].x,triangle[0 ].y )
            .lineTo(-large/2, 100)
            .lineTo(large/2, 100)
            .lineTo(triangle[1].x, triangle[1].y);
        this.newHand.setTransform(0,-100,1,1);
        this.addChild( this.newHand);


    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-7,-112,14,112);
    p.frameBounds = [rect];

    (lib.DateDay = function () {
        this.initialize();

        //6A6C6C
        var currDate = new Date();
        var days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]
        var day = new createjs.Text(days[currDate.getDay()], "16px Arial", "#888");        //
        day.x = -10;
        day.y = 100;
        day.textAlign = "center";
        day.textBaseline = "middle";
        var dateString = currDate.getDate() < 10 ? "0" + currDate.getDate() : currDate.getDate();
        var date = new createjs.Text(dateString, "16px Arial", "#888");        //
        date.x = 20;
        date.y = 100;
        date.textAlign = "center";
        date.textBaseline = "middle";
        this.addChild( day, date );

    }).prototype = p = new cjs.Container();

    (lib.Empty = function() {
        this.initialize();

    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = null;
    p.frameBounds = [rect];


    (lib.ClockAsset = function() {
        this.initialize();

        // clockSec_mc
        this.clockSec_mc = new lib.LineSec();

        // clockHour_mc
        this.clockHour_mc = new lib.LineHour();

        // clockMin_mc
        this.clockMin_mc = new lib.LineMin();

        this.dateDay = new lib.DateDay()

        // layerBg
        this.layerBg = new lib.Empty();

        this.addChild(this.layerBg,this.clockMin_mc,this.clockHour_mc,this.clockSec_mc, this.dateDay);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(-201,-201,402,402);
    p.frameBounds = [rect];


// stage content:
    (lib.assetclock = function() {
        this.initialize();

        // Clock
        this.instance = new lib.ClockAsset();
        this.instance.setTransform(256,256);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = rect = new cjs.Rectangle(504,312,16,220);
    p.frameBounds = [rect];

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;

var project;
(function (project) {
    var ___extends = this.___extends || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };

    var Main = (function () {
        function Main() {
            this.handleComplete();
        }
        Main.prototype.handleComplete = function () {
            var _this = this;
            this.stage = new createjs.Stage("myCanvas");
            if (createjs.Touch.isSupported()) {
                createjs.Touch.enable(this.stage);
            }
            this.stage.enableMouseOver();
            this.container = new createjs.Container();
            this.clock = new Clock();
            this.container.addChild(this.clock);
            this.stage.addChild(this.container);
            createjs.Tween.get(this.clock)
                .to({ scaleX: 1.4, scaleY: 1.4 }, 0);
            //    .to({ scaleX: 1.0, scaleY: 1.0 }, 10000, createjs.Ease.cubicOut);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.on("tick", this.handleTick, this);
            this.handleResize();
            window.addEventListener("resize", function () { return _this.handleResize(); });
        };
        Main.prototype.handleTick = function (event) {
            this.stage.update();
        };
        Main.prototype.handleResize = function () {
            this.stage.canvas.width = window.innerWidth;
            this.stage.canvas.height = window.innerHeight;
            var scale = Math.min(window.innerWidth / 720, window.innerHeight / 720);
            this.container.scaleX = this.container.scaleY = scale;
            this.container.x = (window.innerWidth) / 2;
            this.container.y = (window.innerHeight) / 2;
        };
        return Main;
    })();
    project.Main = Main;
    var Clock = (function (_super) {
        ___extends(Clock, _super);
        function Clock() {
            _super.call(this);
            this.setup();
        }
        Clock.prototype.setup = function () {
         var wrapClockS = new createjs.Container();
            this.layerBg.addChild(wrapClockS);
            var shapeClock = new createjs.Shape();
            wrapClockS.addChild(shapeClock);
            var shapeClock2 = new createjs.Shape();
            wrapClockS.addChild(shapeClock2);
            var shapeClock4 = new createjs.Shape();
            wrapClockS.addChild(shapeClock4);
            var shapeClock3 = new createjs.Shape();
            wrapClockS.addChild(shapeClock3);
            var textM = new DisplayMotion(wrapClockS, 215, "#FFF", "20px Arial ", 12, 1);
            textM.start(2000);
            var circle2 = new CircleMotion(shapeClock, 200, 10, 40, 1.0, 75);
            circle2.start(0);
            var circle = new CircleMotion(shapeClock2, 200, 10, 40, 1.0, 150);
            circle.start(2000);
            var circle4 = new CircleMotion(shapeClock4, 170, 20, 60, 3.0, 12);
            circle4.start(2000);
            var circle3 = new CircleMotion(shapeClock3, 200, 10, 40, 1.0, 300);
            circle3.start(2000);
            this.on("tick", this.onTick, this);
        };

        Clock.prototype.drawLines = function (targetShape, radius, length, color, lineWidth, steps) {
            targetShape.graphics.setStrokeStyle(lineWidth).beginStroke(color);
            var ar = radius - length;
            var br = radius;
            for (var i = 0; i < steps; i++) {
                var theta = (i / steps) * (2 * Math.PI);
                theta -= Math.PI / 2;
                var ax = ar * Math.cos(theta);
                var ay = ar * Math.sin(theta);

                var bx = br * Math.cos(theta);
                var by = br * Math.sin(theta);

                targetShape.graphics.moveTo(ax, ay).lineTo(bx, by);
            }
        };
        Clock.prototype.onTick = function (event) {
            var now = new Date();
            var h = now.getHours();
            var s = now.getSeconds();
            var m = now.getMinutes();
            var ms = now.getMilliseconds();
            // setting rotation prop
            this.clockSec_mc.rotation = 360 - ((s + ms / 1000) * (360 / 60));
            this.clockMin_mc.rotation = 360 - ((m + s / 60) * (360 / 60));
            this.clockHour_mc.rotation = 360 - ((h + m / 60) * (360 / 12));
        };
        return Clock;
    })(lib.ClockAsset);
    var AbstractMotion = (function () {
        function AbstractMotion() {
        }
        AbstractMotion.prototype.start = function (delay) {
            this._count1 = new CountObject(0);
            this._count2 = new CountObject(0);
            var timeline = new createjs.Timeline([
                createjs.Tween.get(this._count1).wait(delay).to({ percent: 1.0 }, 2500 * 2, createjs.Ease.getPowInOut(5)),
                createjs.Tween.get(this._count2).wait(delay + 500).to({ percent: 1.0 }, 2500 * 2, createjs.Ease.getPowInOut(5))
            ]);
            timeline.on("change", this.drawLines, this);
            timeline.on("complete", this.drawLines, this);
            timeline.gotoAndPlay(0);
        };
        AbstractMotion.prototype.drawLines = function () {
        };
        return AbstractMotion;
    })();
    var DisplayMotion = (function (_super) {
        ___extends(DisplayMotion, _super);
        function DisplayMotion(container, radius, textColor, font, steps, xval) {
            _super.call(this);
            this.container = container;
            this.radius = radius;
            this.textColor = textColor;
            this.font = font;
            this.steps = steps;
            this.xval = xval;
            this.texts = [];
            for (var i = 0; i < steps; i++) {
                //
                var theta = ((steps - i) / steps) * (2 * Math.PI);
                //
                var str = this.digitNumber(i * xval); //
                var t = new createjs.Text(String(str), font, textColor);
                //
                t.x = radius * Math.cos(theta - Math.PI / 2);
                t.y = radius * Math.sin(theta - Math.PI / 2);
                //
                t.textAlign = "center";
                t.textBaseline = "middle";
                t.alpha = 0.0;
                t.scaleX = t.scaleY = 0.5;
                container.addChild(t);
                this.texts.push(t);
            }
        }
        DisplayMotion.prototype.digitNumber = function (val) {
            return val === 0 ? 12 : val ;
        };
        DisplayMotion.prototype.drawLines = function () {
            var percentForward = this._count1.percent;
            var percentBackward = this._count2.percent;
            var stepForward = percentForward * this.steps;
            for (var i = 0; i < this.texts.length; i++) {
                var t = this.texts[i];
                if (i < stepForward) {
                    if (t.alpha == 0) {
                        createjs.Tween.get(t).to({ alpha: 1.0, scaleX: 1.0, scaleY: 1.0 }, 1000, createjs.Ease.cubicOut);
                    }
                }
            }
        };
        return DisplayMotion;
    })(AbstractMotion);
    var CircleMotion = (function (_super) {
        ___extends(CircleMotion, _super);
        function CircleMotion(targetShape, radius, length, color, lineWidth, steps) {
            _super.call(this);
            this.targetShape = targetShape;
            this.radius = radius;
            this.length = length;
            this.color = color;
            this.lineWidth = lineWidth;
            this.steps = steps;
        }
        CircleMotion.prototype.drawLines = function () {
            var targetShape = this.targetShape;
            var radius = this.radius;
            var length = this.length;
            var color = this.color;
            var lineWidth = this.lineWidth;
            var steps = this.steps;
            //
            targetShape.graphics.clear().setStrokeStyle(lineWidth, "round");
            //
            var ar = radius - length;
            var br = radius;
            var percentForward = this._count1.percent;
            var percentBackward = this._count2.percent;
            percentForward = Math.min(1.0, Math.max(0.0, percentForward));
            percentBackward = Math.min(1.0, Math.max(0.0, percentBackward));
            var percent = this._count1.percent;
            //
            //
            var max = steps * percent;
            for (var i = 0; i < max; i++) {
                //
                var theta = (1 - i / steps) * (2 * Math.PI);
                theta -= Math.PI / 2;
                //
                var ax = ar * Math.cos(theta);
                var ay = ar * Math.sin(theta);
                //
                var bx = br * Math.cos(theta);
                var by = br * Math.sin(theta);
                var currentI = i / steps;
                if (currentI < 1.0) {
                    var hslColr;
                    if (currentI >= percentBackward) {
                        var currentStep = (currentI - percentBackward) / (percentForward - percentBackward);
                        var luminance = this.color + (100 - this.color) * currentStep;
                        hslColor = createjs.Graphics.getHSL(0, 0, luminance);
                    }
                    else {
                        hslColor = createjs.Graphics.getHSL(0, 0, this.color);
                    }
                    //
                    targetShape.graphics.beginStroke(hslColor).moveTo(ax, ay).lineTo(bx, by);
                }
            }
        };
        return CircleMotion;
    })(AbstractMotion);
    var CountObject = (function () {
        function CountObject(percent) {
            if (percent === void 0) { percent = 0; }
            this.percent = percent;
        }
        return CountObject;
    })();
})(project || (project = {}));
window.addEventListener("load", function (event) {
    new project.Main();
});

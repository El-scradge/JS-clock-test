/**
 * Created by Scradge on 31/03/2016.
 */
var ClockView = Backbone.View.extend({

    clockDate: null,
    clockType: 'digital',

    events: {
        'change input[type=radio]': 'render'
    },

    initialize: function (options) {
       

    },

    getTimeJSON: function(){


    },
    render: function(){
        var self = this;
        this.clockType = $('input[name=clock-switcher]:checked', '#clock__switcher').val();


        console.log(this.clockType);

        if (this.clockType == 'analogue'){
            $('#clock--digital').empty();
            $('#clock--analogue').html("<canvas id='clock--canvas' width='300' height='300'></canvas>");
            $.getJSON('http://worldclockapi.com/api/json/utc/now', this.updateAnalogueClock);

        } else {
            $('#clock--analogue').empty();
            $.getJSON('http://worldclockapi.com/api/json/utc/now', this.updateDigitalClock);

        }


        setTimeout(function(){
            self.reRender();
        }, 60000);

    },

    reRender: function(){
        var self = this;

        self.render();

    },
    isDST: function (dst){
        var DaylightSaving = 'Daylight Savings Time';
        if (false === dst){
            DaylightSaving = 'British Summer Time';
        }
        console.log(DaylightSaving);
        return DaylightSaving;
    },
    updateDigitalClock: function (data){
        var self = this;
        this.clockDate = data.currentDateTime;
        var dst = data.isDayLightSavingsTime;
        //var dayLightSaving = self.isDST(dst);


        //separate date and time/
        var dateTime = this.clockDate.split('T');
        //take date and split into separate units.
        var date = dateTime[0].split('-');
        $('#clock--digital').html(dateTime[1].split('Z'));
        $('#clock--date').html('The current day is <br>' + data.dayOfTheWeek + ' ' + date[2] + '-' + date[1] + '-' +date[0]);
        $('#clock--dst').html('Daylight Savings is currently ' + dst);
    },
    updateAnalogueClock: function(data) {
        var canvas = document.getElementById("clock--canvas");
        var ctx = canvas.getContext("2d");
        var radius = canvas.height / 2;
        var now = data.currentDateTime;

        ctx.translate(radius, radius);
        radius = radius * 0.90;

        drawClock();

        function drawClock() {
            ctx.arc(0, 0, radius, 0 , 2*Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawTime(ctx, radius, now);
        }

        function drawFace(ctx, radius) {
            var grad;

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2*Math.PI);
            ctx.fillStyle = '#000';
            ctx.fill();

            grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
            grad.addColorStop(0, '#E8600D');
            grad.addColorStop(1, '#E8600D');
            ctx.strokeStyle = grad;
            ctx.lineWidth = radius*0.1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
            ctx.fillStyle = '#E8600D';
            ctx.fill();
        }
        function drawNumbers(ctx, radius) {
            var ang;
            var num;
            ctx.font = radius*0.15 + "px arial";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for(num= 1; num < 13; num++){
                ang = num * Math.PI / 6;
                ctx.rotate(ang);
                ctx.translate(0, -radius*0.85);
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius*0.85);
                ctx.rotate(-ang);
            }
        }
        function drawTime(ctx, radius, now){
            var time = now.split('T');
            var timeArray = time[1].split('Z');
            timeArray = timeArray[0];
            timeArray = timeArray.split(':');
            var hour = parseInt(timeArray[0]);
            var minute = parseInt(timeArray[1]);
            //hour
            hour=hour%12;
            hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60));
            drawHand(ctx, hour, radius*0.5, radius*0.07);
            //minute
            minute=(minute*Math.PI/30);
            drawHand(ctx, minute, radius*0.8, radius*0.07);
        }
        function drawHand(ctx, pos, length, width) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.moveTo(0,0);
            ctx.rotate(pos);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-pos);
        }
    }


});

var clockView = new ClockView({
    model: clock
});

//setTimeout(clockView.getTimeJSON(), 60000);
'use strict';

Date.prototype.monthDays = function() {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

class App {
    constructor() {
        this.day = this.getToday();

        this.addListener();
        this.updateYear();
        this.updateMonth();
        this.updateCalendar(this.day);
        this.showDate();
    }

    getToday(){
    	var url = window.location.href;
    	if(!url || url == undefined){
    		return new Date();
    	}
    	var groups = url.match(/[^#]*#([\d]{2}),([\d]{2}),([\d]{4})/i);
    	var year = parseInt(groups[3]);
    	var month = parseInt(groups[2]) - 1;
    	var day = parseInt(groups[1]);
    	try {
    		return new Date(year, month, day);
    	} catch (ex){
    		return new Date();
    	}
    }

    addListener() {
        $('body').on('click', 'td.day', function() {
            alert('day!');
        });
    }

    updateYear() {
        var year = this.day.getFullYear();
        $('#year').text(year);
    }

    updateMonth() {
    	var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        var month = this.day.getMonth();
        $('#month').text(months[month]);
    }

    updateCalendar(today) {        
        var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        var startingDay = firstDay.getDay();
        var monthLength = firstDay.monthDays();

        var week = $('#table-calendar').find('thead').find('td');
        $(week[today.getDay()]).addClass('selected');

        var tbody = $('#table-calendar').find('tbody');
        var tr = '<tr>';
        var day = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {
                var td = '<td class="day">';
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    if (day == today.getDate()) {
                        td = '<td class="day selected">';
                    }
                    td += day;
                    day++;
                }
                td += '</td>';
                tr += td;
            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                break;
            } else {
                tr += '</tr>';
                tbody.append(tr);
                tr = '<tr>';
            }
        }
        tr += '</tr>';
        tbody.append(tr);
    }

    showDate() {

    }
}

class Note {
    constructor(day, text) {
        this.day = day;
        this.text = text;
    }
}

$(document).ready(() => {
    var app = new App();
});

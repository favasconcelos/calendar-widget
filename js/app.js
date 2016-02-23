'use strict';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

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
        this.showDate(this.day);
    }

    getToday() {
        var url = window.location.href;
        if (!url || url == undefined) {
            return new Date();
        }
        var groups = url.match(/[^#]*#([\d]{2}),([\d]{2}),([\d]{4})/i);
        if (groups == null) {
            return new Date();
        }
        var year = parseInt(groups[3]);
        var month = parseInt(groups[2]) - 1;
        var day = parseInt(groups[1]);
        try {
            return new Date(year, month, day);
        } catch (ex) {
            return new Date();
        }
    }

    addListener() {
        $('#today').click((e) => {
            this.showDate(new Date());
        });
        $('body').on('click', 'td.day', (e) => {
            var day = $(e.target).text();
            this.showDate(parseInt(day));
        });
    }

    updateYear() {
        var year = this.day.getFullYear();
        $('#year').text(year);
    }

    updateMonth() {
        var month = this.day.getMonth();
        $('#month').text(MONTHS[month]);
    }

    updateCalendar(today) {
        var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        var startingDay = firstDay.getDay();
        var monthLength = firstDay.monthDays();

        var tbody = $('#table-calendar').find('tbody');
        var tr = '<tr>';
        var day = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {
                var id = '';
                var classes = 'empty';
                var td = '';
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    classes = 'day';
                    if (day == today.getDate()) {
                        classes += ' selected';
                    }
                    id = 'day-'+day;
                    td = day;
                    day++;
                }
                tr += '<td id="'+id+'" class="' + classes + '">' + td + '</td>';
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

    showDate(day) {
        if (typeof day == 'number') {
            if(this.day.getDate() == day){
                return;
            }
            this.day.setDate(day);
        } else {
            if(this.day == day){
                return;
            }
            this.day = day;
        }
        $('td.selected').removeClass('selected');
        $('td#day-'+this.day.getDate()).addClass('selected');

        var text = WEEKDAYS[this.day.getDay()] + ' ' + this.day.getDate();
        $('#day').text(text);
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

"use strict";

$(document).ready(function() {
    getFromPage(1)
})


Horn.all = [];

function Horn(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
}

Horn.prototype.render = function() {
    let template = $('#hornTemplate').html();
    let html = Mustache.render(template, this);
    // $('main').append(html);
    let final = $('#photo-template').append(html);
    $('main').append(final);
}

function getFromPage(page) {
    $('#photo-template').empty();
    // $('main').empty();
    Horn.all = [];
    $.get(`data/page-${page}.json`)
        .then(data => {
            data.forEach((val, idx) => {
                let NewHorn = new Horn(val);
                Horn.all.push(NewHorn);
            })

            Horn.all.forEach((val, idx) => {
                val.render();
            })
            fillKeywords();
            filterByKeyword();
            sortHorns();
        })
}

function fillKeywords() {
    $('.filter').empty();
    $('.filter').append(`<option value="default">Filter By Keyword</option>`);
    let fillKeywordsList = [];
    Horn.all.forEach((val, idx) => {
        if (!fillKeywordsList.includes(val.keyword)) {
            fillKeywordsList.push(val.keyword);
        }
    })

    fillKeywordsList.forEach((val, idx) => {
        let optionTag = `<option value="${val}">${val}</option>`;
        $('.filter').append(optionTag);
    })
}

let afterFilter = '';
let selected = '';

function filterByKeyword() {
    afterFilter = '';
    $('.filter').on('change', function() {
        $('div').hide();
        let selected = $(this).val();
        if (selected === 'default') {
            $('div').show();
            $('div').eq(0).remove();
        } else {
            $(`div[id="${selected}"]`).fadeIn();
            afterFilter = selected;
        }


    })
}


$('button').on('click', function() {
    let buttonId = $(this).attr('id');
    getFromPage(buttonId);
})


function sortHorns() {
    $('.sort').on('change', function() {
        if ($(this).val() === 'title') {
            sortingAlgorithm(Horn.all, 'title');
        } else if ($(this).val() === 'number') {
            sortingAlgorithm(Horn.all, 'horns');
        }
    })
}


function sortingAlgorithm(array, property) {
    array.sort((a, b) => {
        let partA = a[property];
        let partB = b[property];
        if (partA > partB) return 1;
        if (partA < partB) return -1;
        else return 0;
    })
    $('#photo-template').html('');
    if (selected === 'default' || afterFilter === '') {
        Horn.all.forEach(val => {
            val.render();
        })
    } else {
        let newDataOfHorns = [];
        Horn.all.forEach(val => {
            if (val.keyword == afterFilter) {
                newDataOfHorns.push(val);
            }
        })
        newDataOfHorns.forEach(val => {
            val.render();
        })
    }
}
"use strict";

let arrayKeyword = [];
let userOption = [];
let uniqueOptionKey = [];


function GalleryHorn(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns
    arrayKeyword.push(this);
}


// function GalleryHorn2(horn2) {
//     this.image_url = horn2.image_url;
//     this.title = horn2.title;
//     this.description = horn2.description;
//     this.keyword = horn2.keyword;
//     this.horns = horn2.horns;
//     SecondArrayKeyword2.push(this);
// }


// GalleryHorn.prototype.cloneRender = function() {
//     let cloneSection = $('.photo-template').clone();
//     cloneSection.find('h2').text(this.title);
//     cloneSection.find('img').attr('src', this.image_url);
//     cloneSection.find('p').text(this.description);
//     cloneSection.removeClass('photo-template');
//     cloneSection.attr('class', this.title);
//     $('main').append(cloneSection);
// }

GalleryHorn.prototype.renderWithMustache = function() {
    let template = $("#template").html();
    $("main").append(Mustache.render(template, this))
        // let html = Mustache.render(template, this);
        // $("#photo-template").append(html);

}




// GalleryHorn2.prototype.renderWithMustache2 = function() {
//     let template = $("#template").html();
//     $("#secondPage").append(Mustache.render(template, this));
//     let html = Mustache.render(template, this);
//     $(".photo-template").append(html);

// }

const ajaxSettings = {
    method: 'get',
    dataType: 'json',
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new GalleryHorn(horn);
        hornObject.renderWithMustache();
        userOption.push(horn.keyword);
    });

    $.each(userOption, function(i, value) {
        if ($.inArray(value, uniqueOptionKey) === -1) uniqueOptionKey.push(value);
    });
    uniqueOptionKey.forEach(function(value, i) {
        $('#sortOptions').append(`<option value ="${value}"> ${value} </option>`)

        $('#sortOptions').on('change', function() {
            let keyName = this.options[this.selectedIndex].text;
            let newCloneSection = $('.photo-template').clone();
            $('main').html("");
            $('main').append(newCloneSection);
            arrayKeyword.forEach((function(value) {
                if (keyName === value.keyword) {
                    value.renderWithMustache();

                }
            }));
        });
    });
})
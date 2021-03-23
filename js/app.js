"use strict";

let arrayKeyword = [];
let userOption = [];
let uniqueOptionKey = [];

function GalleryHorn(horn){
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns
    arrayKeyword.push(this);
}

GalleryHorn.prototype.cloneRender = function(){
    let cloneSection = $('.photo-template').clone();
    cloneSection.find('h2').text(this.title);
    cloneSection.find('img').attr('src', this.image_url);
    cloneSection.find('p').text(this.description);
    cloneSection.removeClass('photo-template');
    cloneSection.attr('class', this.title);
    $('main').append(cloneSection);
}

const ajaxSettings = {
    method: 'get',
    dataType: 'json',
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
    data.forEach((horn) => {
        let hornObject = new GalleryHorn(horn);
        hornObject.cloneRender();
        userOption.push(horn.keyword);
    });
   
    $.each(userOption,function(i,value){
        if($.inArray(value,uniqueOptionKey) === -1) uniqueOptionKey.push(value);
    });
    uniqueOptionKey.forEach(function(value,i){
        $('select').append(`<option value ="${value}"> ${value} </option>`)

        $('select').on('change',function(){
            let keyName=this.options[this.selectedIndex].text;
            let newCloneSection=$('.photo-template').clone();
            $('main').html("");
            $('main').append(newCloneSection);
            arrayKeyword.forEach((function(value){
                if(keyName===value.keyword){
                    value.cloneRender();

                }
            }));
        });
    });
})
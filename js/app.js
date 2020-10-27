'use strict';
let optionArr = ['narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon', 'narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];
let allAnimal = [];

$('<p><input type="submit"></p>').appendTo('main');

function Animal(animalObj) {
    this.title = animalObj.title;
    this.keyword = animalObj.keyword;
    this.description = animalObj.description;
    this.horns = animalObj.horns;
    this.image_url = animalObj.image_url;
    allAnimal.push(this);
    // for (let element in animalObj){
    //     this[element]=animalObj[element];
    // }
}

Animal.prototype.render = function() {
    let templete = $('.photo-template').clone();

    templete.find('h2').text(this.title);
    templete.find('img').attr('src', this.image_url);
    templete.find('p').text(this.description);
    templete.removeClass('photo-template');
    templete.attr('class', this.keyword);
    // let myTemplate =$('templete').html();
    // let mustache = Mustache.render(myTemplate, this);
    $('main').append(templete);
}


let uniqueKeyArr = [];
//...new Set(allAnimal)];
// $.each(allAnimal.keyword, function(i, ele) {
//     if ($.inArray(ele, uniqueKeyArr) === -1) uniqueKeyArr.push(el);
// });
optionArr.forEach((ele) => {
    if (!uniqueKeyArr.includes(ele)) {
        uniqueKeyArr.push(ele);
    }
});

console.log(uniqueKeyArr);



function selectItem() {
    uniqueKeyArr.forEach(element => {
        let option = $(`<option value="${element}"> ${element}</option>`);
        console.log(option);
        $('select').append(option);
    });


};

Animal.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                animal_create.render();

            });
            selectItem();

        });
};
Animal.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                let animal_create = new Animal(element);
                animal_create.render();

            });
            selectItem();

        });
};
$(() => Animal.readJson());
$(() => Animal.readJson2());

$(document).ready(function() {

    $('select').on('change', changeing);

    function changeing(event) {
        let show = event.target.value;

        $('div').hide();
        $(`.${show}`).fadeIn(1000);
    };
});
document.addEventListener("DOMContentLoaded", function(){
    
    document.addEventListener("scroll", function(){
        const top = window.scrollY;
        const header = document.querySelector("#header");

        if(  top > 0 ){
            header.classList.add("inverted");
        } else {
            header.classList.remove("inverted");
        }
    });
   
    window.dispatchEvent(new Event('scroll'));
    const dpFrom = $("#from").datepicker({
        dateFormat : 'yy-mm-dd',
        minDate : 0,
        onSelect : function(){
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
        }
    });
    dpFrom.datepicker('setDate', new Date());

    const dpTo = $("#to").datepicker({
        dateFormat : 'yy-mm-dd',
        minDate : 0
    });
    dpTo.datepicker('setDate', 4);

    const form = document.querySelector("#form-search");
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const from = document.querySelector("#from").value;
        const to = document.querySelector("#to").value;

        search(from, to);
    });
});

function search(from, to){
    const url = 'https://javascript-basic.appspot.com/searchLocation';

    fetch(url, {
        // headers: {
        //     "Content-Type": "application/json; charset=utf-8"
        // }
    })
    .then(function(response){
        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        return response.arrayBuffer();
    })
    .then(function(response){
        const decoder = new TextDecoder('euc-kr');
        const result = JSON.parse(decoder.decode(response));

        const list = document.querySelector("#list-panel");
        
        result.forEach(data => {
            const item = createListItem(data);
            list.appendChild(item);
        });
       
        document.querySelector('#list-bg').style.display = "block";
    });
}

function createListItem(data){
    const tmp = document.querySelector("#list-item-template").cloneNode(true);
    tmp.removeAttribute('id');
    
    tmp.querySelector(".list-item-image").setAttribute('src', data.titleImageUrl);
    tmp.querySelector(".list-item-name").insertAdjacentHTML('afterend', data.name);
    tmp.querySelector(".list-item-city-name").insertAdjacentHTML('afterend',data.cityName);

    tmp.addEventListener('click', event => {
        const url = 'detail.html?id=' + data.id;
        window.location = url;
    });

    return tmp;
}
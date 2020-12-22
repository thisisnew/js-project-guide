document.addEventListener('DOMContentLoaded', () => {
    const id = parseId(window.location.search);
    getDetail(id);
});

function parseId(str){
    const s = str.substring(1);
    const args = s.split('&');

    for( let i = 0; i < args.length; i++ ){
        const tokens = args[i].split('=');

        if( tokens[0] === 'id' ){
            return tokens[1];
        }
    }

    return null;
}

function getDetail(id){

    let url = new URL('https://javascript-basic.appspot.com/locationDetail');
    const params = {id : id};
    url.search = new URLSearchParams(params).toString();

    fetch(url)
    .then(function(response){
        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }

        return response.arrayBuffer();
    })
    .then(function(response){
        const decoder = new TextDecoder('euc-kr');
        const result = JSON.parse(decoder.decode(response));

        document.querySelector(".detail-header-name").insertAdjacentHTML('afterend', result.name);
        document.querySelector(".detail-header-city-name").insertAdjacentHTML('afterend', result.cityName);
        document.querySelector(".detail-desc-text").insertAdjacentHTML('afterend', result.desc);

        const gallery = document.querySelector('#detail-images');
        const images = result.subImageList;

        images.forEach(item => {
            let image = document.createElement('img');
            image.src = item;

            gallery.appendChild(image);
        });


        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');
    })

}
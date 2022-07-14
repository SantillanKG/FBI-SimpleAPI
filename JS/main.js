                /*INICIADOR DE LOS BOTONES*/
/////////////////////////////////////////////////////////////
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		fetchcharcters();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		fetchcharcters();
	}
});

            /*INICIADOR DEL BUSCADOR*/
/////////////////////////////////////////////////////////////////
const inpsearch = document.getElementById("inp-search"),
      output    = document.getElementById("output"),
      audio = new Audio("theme.m4a")


window.addEventListener("load" , ()=>{
    audio.play();
    loader();
    fetchcharcters();
} )
//Una animacion de carga
function loader (){
    output.innerHTML=
    `
    <div class= "gif-spinner mx-auto" >
        <img src="img/loader.webp">
        <span class="text-white"> Cargando UwU...  </span>
    </div>
    `
}
//Buscador...
inpsearch.addEventListener("change",()=>{
    let searchquery = inpsearch.value;
    loader();
    fetchcharcters(searchquery)
})

async function fetchcharcters(query){

    let res;
    //SI DETECTA UN DATO EN EL BUSCADOR ENTRA AQUI
    if(query)
    {
        res = await fetch(`https://api.fbi.gov/wanted/v1?title=${query}`)
    }
    //SI NO DETECTA UN DATO EN EL BUSCADOR ENTRA AQUI Y SE GUIA POR EL NUMERO DE PAGINA QUE SE LE ASIGNA CON EL BOTON
    else
    {
        res = await fetch(`https://api.fbi.gov/wanted/v1?page=${pagina}`)
    }

    let results = await res.json();

    output.innerHTML=""

    results.items.map(result =>{
        //AQUI ES DONDE SE MANDA A LLAMAR LA INFO DE LA API
        const htmlstring = 
        `
        <img src=${result.images[0].original} class="img" >
      
        <div class="info-display">
        <a href="${result.files[0].url}"><h5> Caso : <span> ${result.title} </span> </h6></a>
            <hr>
            <h6>Alias:  <span> ${result.aliases} </span> </h6>
            <h6>Fecha de nacimiento: <span> ${result.dates_of_birth_used}</span> </h6>
            <h6>Lugar de nacimiento: <span> ${result.place_of_birth}</span> </h6>
            <h6>Nacionalidad: <span> ${result.nationality}</span> </h6>
            <h6>Sexo: <span> ${result.sex}</span> </h6>
            <h6>Advertencia: <span> ${result.warning_message}</span> </h6> 
            <h6>Cabello: <span> ${result.hair}</span> </h6>
            <h6>Cicatrices y marcas: <span> ${result.scars_and_marks}</span> </h6>
            <h6>Motivo: <span> ${result.subjects}</span> </h6>
        
        </div>
        `
        //AQUI MANDA LA INFO AL HTML
        let outstring = document.createElement("div")
        outstring.classList.add("col-md-3" , "mb-3" , "img-info")
        outstring.innerHTML=htmlstring
        output.appendChild(outstring)
    })

}
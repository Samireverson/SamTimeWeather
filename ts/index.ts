const form = document.querySelector('#pesquisar');
const input: HTMLInputElement | null = document.querySelector('#inputLocalizacao');
const sectionInfo = document.querySelector('#tempoInfo')

form?.addEventListener('submit', async (event) =>{
    event.preventDefault();

    if(!input || !sectionInfo)return ;

    const localizacao = input.value;

    if(localizacao.length < 3){
        alert('O local deve ter mais que 3 letras');
        return;
    }

 try{
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8d8ff1015c5f12a1b680fc149e0ba6be&lang=pt_br&units=metric`)

    const dados = await resposta.json();
    
    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };
    
    sectionInfo.innerHTML = ` 
                <div class="tempoDados">
                <h2>${infos.local}</h2>
        
                <span>${infos.temperatura} C</span>
        
            </div>
            <img src="${infos.icone}">`;
            // console.log(dados)
 }catch(err){
    console.log("Falha na obtenção de dados da API!!")
 }


   
})
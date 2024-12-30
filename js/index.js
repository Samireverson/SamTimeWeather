"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#pesquisar');
const input = document.querySelector('#inputLocalizacao');
const sectionInfo = document.querySelector('#tempoInfo');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert('O local deve ter mais que 3 letras');
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8d8ff1015c5f12a1b680fc149e0ba6be&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (err) {
        console.log("Falha na obtenção de dados da API!!");
    }
}));

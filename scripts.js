const filmeUm = {nome: 'Filme Um',
                imgSrc: './assets/movies/Filme1.png',
                sinopse: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae voluptas ab sapiente adipisci pariatur nulla ipsum dolor voluptatum, tempore deserunt ducimus itaque architecto, animi natus incidunt harum repellendus reiciendis! Impedit nam quisquam tenetur deserunt veniam, qui, ipsam explicabo assumenda ut voluptatum cum sed earum et sit quis provident sunt voluptas quos? Pariatur explicabo quo repudiandae reiciendis, provident quae est. Debitis, ab odio, quasi ex temporibus molestias maxime officia error, officiis eveniet nam perspiciatis numquam deserunt dignissimos excepturi doloribus sit vel repellat necessitatibus quis sapiente.',
                avaliacao: 3,
                lancamento: 2015
};

const reiLeao = {nome: 'Rei Leão',
                imgSrc: './assets/movies/ReiLeao.png',
                sinopse: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae voluptas ab sapiente adipisci pariatur nulla ipsum dolor voluptatum, tempore deserunt ducimus itaque architecto, animi natus incidunt harum repellendus reiciendis! Impedit nam quisquam tenetur deserunt veniam, qui, ipsam explicabo assumenda ut voluptatum cum sed earum et sit quis provident sunt voluptas quos? Pariatur explicabo quo repudiandae reiciendis, provident quae est. Debitis, ab odio, quasi ex temporibus molestias maxime officia error, officiis eveniet nam perspiciatis numquam deserunt dignissimos vel repellat necessitatibus quis sapiente.',
                avaliacao: 4,
                lancamento: 1994
};

const enrolados = {nome: 'Enrolados',
                imgSrc: './assets/movies/enroladosCapa.png',
                sinopse: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae voluptas ab sapiente adipisci pariatur nulla ipsum dolor voluptatum, tempore deserunt ducimus itaque architecto, animi natus incidunt harum repellendus reiciendis! Impedit nam quisquam tenetur deserunt veniam, qui, ipsam explicabo assumenda ut voluptatum cum sed earum et sit quis provident sunt voluptas quos? Pariatur explicabo quo repudiandae reiciendis, provident quae est. Debitis, ab odio, quasi ex temporibus molestias maxime officia error, officiis eveniet nam perspiciatis numquam deserunt dignissimos excepturi doloribus sit vel repellat necessitatibus quis sapiente. Ta diferente (so pra deixar claro)',
                avaliacao: 5,
                lancamento: 2014
};

const toyStory = {nome: 'Toy Story',
                imgSrc: './assets/movies/toyStoryCapa.png',
                sinopse: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae voluptas ab sapiente adipisci pariatur nulla ipsum dolor voluptatum, tempore deserunt ducimus itaque architecto, animi natus incidunt harum repellendus reiciendis! Impedit nam quisquam tenetur deserunt veniam, qui, ipsam explicabo assumenda ut voluptatum cum sed earum et sit quis provident sunt voluptas quos? Pariatur explicabo quo repudiandae reiciendis, provident quae est. Debitis, ab odio, quasi ex temporibus molestias maxime officia error, officiis eveniet nam perspiciatis numquam deserunt dignissimos excepturi doloribus sit vel repellat necessitatibus quis sapiente. Essa aqui definitivamente ta diferente :D',
                avaliacao: 5,
                lancamento: 2004
};

var filmes = [filmeUm, reiLeao, enrolados, toyStory, filmeUm, reiLeao];
const listaFilmes = document.querySelector('#lista-filmes')

var expansaoAberta = 0;

carregarPagina();



function carregarPagina() {
    
    let viewportWidth = document.body.clientWidth;
    const filmeWidth = 220; // Valor arbitrario

    let qtdFilmesLinha = ~~((0.8*viewportWidth) / filmeWidth)
    let minLinhas = 3;

    if (((filmes.length+1)/qtdFilmesLinha) > minLinhas) {
        minLinhas = ((filmes.length+1)/qtdFilmesLinha);
    }

    console.log(qtdFilmesLinha)
    console.log(minLinhas)

    const listaFilmesHtml = document.querySelector("#lista-filmes")
    const filmeVazio = document.createElement('div')
    const filmeAdd = document.createElement('div')
    filmeVazio.classList = "filme"
    filmeAdd.classList = "filme"

    filmeAdd.innerHTML = `<button id="botao-add-filme"></button>`

    let adicionarCriado = 0; // Flag
    for (let i = 0; i < minLinhas; i++) {
        let linhaFilmes = document.createElement('div')
        let index // Usado tambem como flag
        let qtdCarregados = 0

        linhaFilmes.classList = "linha-filmes"
        for (let j = 0; j < qtdFilmesLinha; j++) {
            // Calculo do indice atual do filme no array
            if (i == 0) {
                index = 1 * j;
            }
            else if (j == 0) {
                index = i*qtdFilmesLinha;
            }
            else {
                index = i*qtdFilmesLinha + j;
            }

            if (index >= filmes.length) {
                if (!adicionarCriado) {
                    linhaFilmes.append(filmeAdd)
                    adicionarCriado = 1
                    qtdCarregados++
                    console.log(linhaFilmes)
                }

                break
            }

            console.log(index);

            let filme = document.createElement('div')
            filme.classList = "filme"
            filme.innerHTML = `<button class="botao-filme" id="${index}" style="background-image: url(${filmes[index].imgSrc})";></button>`

            linhaFilmes.append(filme)
            qtdCarregados++
        }
        if (index >= filmes.length) {
            for (let j = 0; j < qtdFilmesLinha - qtdCarregados; j++) {
                linhaFilmes.append(filmeVazio.cloneNode(true))
            } 
        }

        listaFilmesHtml.append(linhaFilmes)
    }

    // Adicionando eventos novamente
    var botoesFilmes = document.querySelectorAll('.botao-filme')
    const botaoAdd = document.querySelector('#botao-add-filme')

    botaoAdd.addEventListener('click', addFilme);

    for (let i = 0; i < botoesFilmes.length; i++) {
        botoesFilmes[i].addEventListener('click', mostrarFilmes);
    }
}

function mostrarFilmes(event) {
    let botao = event.target
    let filme = filmes[botao.id]

    console.log(event)

    let conteudo = `
    <img id="imagem-capa" src="${filme.imgSrc}" alt="Capa do filme">
    <div id="informacao-filme">
        <div id="titulo-filme">
            <h2>${filme.nome.toUpperCase()}</h2>
            <span>${filme.lancamento}</span>
            <div id="avaliacao">
                
            </div>
            <button id="lixeira">
                <svg width="25" height="25" viewBox="0 0 172 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M145.186 38.0092H27.2036" stroke="#FF6565" stroke-width="10.7257" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M134.46 38.0092V139.903C134.46 141.326 133.895 142.69 132.89 143.695C131.884 144.701 130.52 145.266 129.098 145.266H43.292C41.8697 145.266 40.5057 144.701 39.4999 143.695C38.4942 142.69 37.9292 141.326 37.9292 139.903V38.0092" fill="#FFA6A6"/>
                    <path d="M134.46 38.0092V139.903C134.46 141.326 133.895 142.69 132.89 143.695C131.884 144.701 130.52 145.266 129.098 145.266H43.292C41.8697 145.266 40.5057 144.701 39.4999 143.695C38.4942 142.69 37.9292 141.326 37.9292 139.903V38.0092" stroke="#FF6565" stroke-width="10.7257" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M113.009 38.0092V27.2836C113.009 24.4389 111.879 21.7108 109.868 19.6993C107.856 17.6879 105.128 16.5579 102.284 16.5579H70.1066C67.2619 16.5579 64.5338 17.6879 62.5223 19.6993C60.5109 21.7108 59.3809 24.4389 59.3809 27.2836V38.0092" fill="#FFA6A6"/>
                    <path d="M113.009 38.0092V27.2836C113.009 24.4389 111.879 21.7108 109.868 19.6993C107.856 17.6879 105.128 16.5579 102.284 16.5579H70.1066C67.2619 16.5579 64.5338 17.6879 62.5223 19.6993C60.5109 21.7108 59.3809 24.4389 59.3809 27.2836V38.0092" stroke="#FF6565" stroke-width="10.7257" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M70.1064 70.1863V113.089" stroke="#FF6565" stroke-width="10.7257" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M102.283 70.1863V113.089" stroke="#FF6565" stroke-width="10.7257" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div id="sinopse-filme">
            <p>${filme.sinopse}</p>
        </div>
    </div>
    `

    let linhaClicada = botao.parentElement.parentElement
    let expansao = document.createElement('div');
    expansao.innerHTML = conteudo
    expansao.classList = "expansao-filme";

    let avaliacao = expansao.querySelector("#avaliacao")
    let noStar = document.createElement('div')
    let star = document.createElement('div')

    noStar.innerHTML = `<svg width="25" height="25" viewBox="0 0 148 144" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M76.6271 115.835L109.778 136.883C114.053 139.58 119.315 135.568 118.065 130.635L108.462 92.8799C108.203 91.8334 108.244 90.7348 108.581 89.7107C108.919 88.6867 109.539 87.7788 110.37 87.0917L140.1 62.2945C143.981 59.0715 142.008 52.5597 136.943 52.2309L98.1356 49.7314C97.0767 49.6698 96.0587 49.3011 95.206 48.6703C94.3533 48.0396 93.7028 47.174 93.334 46.1796L78.8634 9.74016C78.4804 8.68712 77.7826 7.77745 76.8648 7.13465C75.9469 6.49184 74.8535 6.14703 73.733 6.14703C72.6124 6.14703 71.519 6.49184 70.6012 7.13465C69.6834 7.77745 68.9856 8.68712 68.6025 9.74016L54.132 46.1796C53.7632 47.174 53.1127 48.0396 52.26 48.6703C51.4073 49.3011 50.3893 49.6698 49.3304 49.7314L10.5231 52.2309C5.45844 52.5597 3.48518 59.0715 7.36592 62.2945L37.0963 87.0917C37.9272 87.7788 38.5472 88.6867 38.8846 89.7107C39.2221 90.7348 39.2634 91.8334 39.0037 92.8799L30.1241 127.872C28.6113 133.792 34.9257 138.594 39.9904 135.371L70.8389 115.835C71.7039 115.285 72.7079 114.993 73.733 114.993C74.7581 114.993 75.762 115.285 76.6271 115.835Z" fill="#1F4B7A" stroke="#1F4B7A" stroke-width="10.524" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

    star.innerHTML = `<svg width="25" height="25" viewBox="0 0 148 144" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M77.1969 115.835L110.348 136.883C114.623 139.58 119.885 135.568 118.635 130.635L109.032 92.8799C108.772 91.8334 108.814 90.7348 109.151 89.7107C109.489 88.6867 110.109 87.7788 110.94 87.0917L140.67 62.2945C144.551 59.0715 142.577 52.5597 137.513 52.2309L98.7054 49.7314C97.6465 49.6698 96.6285 49.3011 95.7758 48.6703C94.9231 48.0396 94.2726 47.174 93.9038 46.1796L79.4333 9.74016C79.0502 8.68712 78.3524 7.77745 77.4346 7.13465C76.5168 6.49184 75.4234 6.14703 74.3028 6.14703C73.1823 6.14703 72.0889 6.49184 71.171 7.13465C70.2532 7.77745 69.5554 8.68712 69.1724 9.74016L54.7018 46.1796C54.333 47.174 53.6825 48.0396 52.8298 48.6703C51.9771 49.3011 50.9591 49.6698 49.9003 49.7314L11.0929 52.2309C6.02826 52.5597 4.05501 59.0715 7.93574 62.2945L37.6661 87.0917C38.4971 87.7788 39.117 88.6867 39.4545 89.7107C39.7919 90.7348 39.8332 91.8334 39.5736 92.8799L30.6939 127.872C29.1811 133.792 35.4955 138.594 40.5602 135.371L71.4087 115.835C72.2738 115.285 73.2777 114.993 74.3028 114.993C75.328 114.993 76.3319 115.285 77.1969 115.835Z" fill="#EEC318" stroke="#EEC318" stroke-width="10.524" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

    // Adicionando avaliacao
    for (let i = 0; i < 5 - filme.avaliacao; i++) {
        avaliacao.appendChild(noStar.cloneNode(true));
        //console.log("noStar")
    }

    for (let i = 0; i < filme.avaliacao; i++) {
        avaliacao.appendChild(star.cloneNode(true));
        //console.log("star")
    }

    if (expansaoAberta) {
        document.querySelector(".expansao-filme").remove()
        expansaoAberta = 0
    }
    listaFilmes.insertBefore(expansao, linhaClicada.nextSibling)
    expansaoAberta = 1;

    //console.log(`Quero mostrar um filme de nome ${filme.nome}`)
}

function addFilme() {
    console.log("Quero adicionar um filme")
}
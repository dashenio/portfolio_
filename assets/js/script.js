// Seção ABOUT;
const about = document.querySelector('#about');

// Seção PROJECTS
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Formulario
const formulario = document.querySelector('#formulario');

// RegEx de validação de email
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Função de preenchimento da seção ABOUT
async function getAboutGitHub(){
    
    try{
        // requisição do tipo GET para a API do GitHub
        const resposta = await fetch('https://api.github.com/users/dashenio');
        // converte a resposta par json
        const perfil = await resposta.json();
        // limpa conteúdo da seção about do porfólio
        about.innerHTML = '';
        // preenche a seção about com os dados da API do GitHub
        about.innerHTML = `
                 <!-- Imagem da seção About -->
                <figure class="about-image">
                    <img src="${perfil.avatar_url}" 
                    alt="${perfil.name}">
                 </figure>

                 <!-- Conteúdo da seção About -->
                 <article class="about-content">
                    <h2>Sobre mim</h2>
                    <p>Oi, eu sou a Vivian. Eu venho do universo do RPG e da estratégia, 
                    onde aprendi que todo sistema complexo pode ser otimizado com a lógica certa. 
                    Hoje, aplico essa mentalidade como estudante de ADS e desenvolvedora 
                    em formação focada em backend.</p>
                    
                    <!-- Links (Github + Currículo) e Dados do Github -->    
                    <div class="about-buttons-data">
                        <!-- Links -->
                        <div class="buttons-container">
                            <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                            <a href="https://drive.google.com/file/d/12frYRR-eu98YPTy6LtqycPHHLBOQpzw1/view?usp=sharing" target="_blank" class="botao-outline">Currículo</a>
                        </div>
                    
                        <!-- Dados -->
                        <div class="data-container">

                            <div class="data-item">
                                <span class="data-number">${perfil.followers}</span>
                                <span class="data-label">Seguidores</span>
                            </div>
                            <div class="data-item">
                                <span class="data-number">${perfil.public_repos}</span>
                                <span class="data-label">Repositórios</span>
                            </div>

                        </div>
                    </div>
                    
                 </article>`
    }catch(error){
        console.error('Erro ao buscar dados no GitHub', error);
    }
}

//Função para buscar oa dados dos projetos
async function getProjectsGitHub() {

     try{
        // requisição do tipo GET para a API do GitHub
        const resposta = await fetch('https://api.github.com/users/dashenio/repos?sort=updated&per_page=6');
        // converte a resposta par json
        const repositorios = await resposta.json();
        // limpa conteúdo da seção about do porfólio
        swiperWrapper.innerHTML = '';

        // Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        }
        
        repositorios.forEach( repositorio => {
            // ideentifica a linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub';
            // seleciona o ícone da linaguagem padrão
            const config = linguagens[linguagem] || linguagens['GitHub'];
            // monta a url que aponta para o ícone da linguagem padrão
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`
            // formata o nome do repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // Substitui _ e - por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // remove caracteres especiais
                .toUpperCase(); // converte a string em letras maiúsculas

            // Descrição do repositório
            const descricao = repositorio.description 
            ? repositorio.description.length > 100 
                ? repositorio.description.substring(0, 97) + '...'
                : repositorio.description
            : 'Projeto desenvolvido no GitHub';  
            // Tags do repositório
            const tags = repositorio.topics?.length > 0
            ? repositorio.topics.slice(0,3).map(topic => `<span class='tag'> ${topic}</span>`).join('')
            : `<span class='tag'> ${linguagem}</span>` 
            // Botões de ação (renderização condicional do botão deploy)
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                    Github
                    </a>
                    ${repositorio.homepage ?
                    `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                    Deploy
                    </a>`
                    : ''}
                </div>
            `
            // construir o card
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">

                                <article class="project-card">

                                    <!-- Ícone da tecnologia padrão do projeto -->
                                    <figure class="project-image">
                                        <img src="${urlIcone}" 
                                            alt="Ícone ${linguagem}">
                                    </figure>

                                    <!-- Conteúdo do Projeto -->
                                    <div class="project-content">

                                        <h3>${nomeFormatado}</h3>
                                        <p>${descricao}</p>

                                        <!-- Tags do Projeto -->
                                        <div class="project-tags">
                                            ${tags}
                                        </div>
                                    
                                        <!-- Links do Projeto -->
                                            ${botoesAcao}
                                    </div>
                                </article>
                    </div>
                `
        });
     
    iniciarSwiper();
        
    }catch(error){
        console.error('Erro ao buscar dados no GitHub', error)
    }
}

    function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        autoHeight: false, // Garante que ele não tente ajustar a altura individualmente
        alignItems: 'stretch', // Força o alinhamento vertical dos slides
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
                navigation: {
                    enabled: false, // Reativa as setas
                }
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false,
                navigation: {
                    enabled: true, // Reativa as setas
                }
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
        });
    }


formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');

    let isValid = true;
    
    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3){
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres.'
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!email.value.trim().match(emailRegex)){
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido.'
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5){
        erroAssunto.innerHTML = 'O assunto deve ter no mínimo 5 caracteres.'
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length === 0){
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.'
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid){
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }
})


// EXECUTA A FUNÇÃO PARA QUE AS INFORMAÇÕES SEJAM EXIBIDAS NA PÁGINA
getAboutGitHub();
// EXECUTA A FUNÇÃO PARA QUE AS INFORMAÇÕES SEJAM EXIBIDAS NA PÁGINA
getProjectsGitHub();

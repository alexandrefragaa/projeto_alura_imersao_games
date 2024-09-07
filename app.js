let comentarios = [];

function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

    if (!campoPesquisa) {
        section.innerHTML = "<p>Não encontrado. Digite o nome do jogo ou plataforma.</p>";
        return;
    }

    let resultados = "";

    for (let dado of dados) {
        if (
            dado.trailer.toLowerCase().includes(campoPesquisa) ||
            dado.descricao.toLowerCase().includes(campoPesquisa) ||
            dado.plataforma.toLowerCase().includes(campoPesquisa) ||
            dado.lancamento.toLowerCase().includes(campoPesquisa) ||
            dado.tags.toLowerCase().includes(campoPesquisa)
        ) {
            resultados += `
                <div class="item-resultado" id="resultado-${dado.id}">
                    <h2><a href="#" target="_blank">${dado.titulo}</a></h2>
                    <img src="${dado.imagem}">
                    <p class="descricao-meta">${dado.descricao}.</p>
                    <p class="plataforma">${dado.plataforma}</p>
                    <p>${dado.lancamento}.</p>
                    <a href="${dado.link}" target="_blank">Veja o trailer</a>
                    <div id="comentarios-${dado.id}">
                        <h3>Comentários</h3>
                        <div id="lista-comentarios-${dado.id}"></div>
                        <textarea id="novo-comentario-${dado.id}" placeholder="Adicione um comentário"></textarea>
                        <button onclick="adicionarComentario(${dado.id})">Comentar</button>
                    </div>
                </div>
            `;
        }
    }

    if (!resultados) {
        resultados = "<p>Não foi encontrado a palavra.</p>";
    }

    section.innerHTML = resultados;
}

function adicionarComentario(id) {
    let comentarioTexto = document.getElementById(`novo-comentario-${id}`).value;
    if (comentarioTexto) {
        let comentarioId = Date.now();
        comentarios.push({ id: comentarioId, texto: comentarioTexto, itemId: id });

        let listaComentarios = document.getElementById(`lista-comentarios-${id}`);
        let novoComentario = document.createElement("div");
        novoComentario.setAttribute("id", `comentario-${comentarioId}`);
        novoComentario.innerHTML = `
            <p>${comentarioTexto}</p>
            <div class="menu">
                <button onclick="toggleComentarioMenu(${comentarioId})">⋮</button>
                <div class="menu-opcoes" id="menu-comentario-${comentarioId}">
                    <button onclick="editarComentario(${comentarioId})">Editar</button>
                    <button onclick="excluirComentario(${comentarioId})">Excluir</button>
                </div>
            </div>
        `;
        listaComentarios.appendChild(novoComentario);

        document.getElementById(`novo-comentario-${id}`).value = "";
    }
}

function toggleComentarioMenu(id) {
    let menu = document.getElementById(`menu-comentario-${id}`);
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function editarComentario(comentarioId) {
    let comentario = comentarios.find(c => c.id === comentarioId);
    let novoTexto = prompt("Edite seu comentário:", comentario.texto);
    if (novoTexto) {
        comentario.texto = novoTexto;
        let comentarioDiv = document.getElementById(`comentario-${comentarioId}`);
        comentarioDiv.querySelector("p").textContent = novoTexto;
    }
}

function excluirComentario(comentarioId) {
    comentarios = comentarios.filter(c => c.id !== comentarioId);
    let comentarioDiv = document.getElementById(`comentario-${comentarioId}`);
    comentarioDiv.remove();
}

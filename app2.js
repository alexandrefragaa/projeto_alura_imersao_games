let comentarios = {};

function pesquisar() {
    let section = document.getElementById("resultados-trailer");
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

    if (!campoPesquisa) {
        section.innerHTML = "<p>Não encontrado. Digite o nome.</p>";
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
                <div class="item-resultado">
                    <iframe width="560" height="315" src="${dado.trailer}" title=" " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <p class="descricao">${dado.descricao}</p>
                    <p><strong>Plataforma:</strong> ${dado.plataforma}</p>
                    <p><strong>Lançamento:</strong> ${dado.lancamento}</p>
                    <div class="item-resultado" id="resultado-${dado.id}">
                    <div class="comentarios" id="comentarios-${dado.id}">
                    <h3>Comentários</h3>
                    <textarea id="novo-comentario-${dado.id}" placeholder="Adicione um comentário"></textarea>
                    <button onclick="adicionarComentario(${dado.id})">Comentar</button>
                    <div id="lista-comentarios-${dado.id}"></div>
                    </div>
                    </div>
                </div>
            `;
        }
    }

    section.innerHTML = resultados || "<p>Não foi encontrado a palavra.</p>";
}
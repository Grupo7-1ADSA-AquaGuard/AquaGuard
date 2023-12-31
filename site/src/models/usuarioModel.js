var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
     SELECT id_usuario, nome_usuario, email_usuario, tipo_usuario, fk_empresa, DE.nome_empresa FROM usuarioEmpresa join dadosEmpresa as DE on fk_empresa = id_empresa WHERE email_usuario = '${email}' AND senha_usuario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeEmpresa, cnpj, nomeUsuario, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeUsuario, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores e na ordem de inserção dos dados. 
    var instrucao1 = `
        INSERT INTO dadosEmpresa (cnpj_empresa, nome_empresa) VALUES ('${cnpj}', '${nomeEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao1);
    database.executar(instrucao1);


    var instrucao2 = `
        INSERT INTO usuarioEmpresa (id_usuario, nome_usuario, email_usuario, senha_usuario, permissao_usuario, fk_empresa) 
        values (1, '${nomeUsuario}', '${email}', '${senha}', 'administrador', (SELECT id_empresa FROM dadosEmpresa ORDER BY id_empresa DESC LIMIT 1));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao2);
    return database.executar(instrucao2);
}

function cadastroDadosEmpresa(telefoneEmpresa, cepEmpresa, numEmpresa, emailEmpresa, fkEmpresa) {
    var instrucao1 = `
        UPDATE dadosEmpresa SET telefone_empresa = '${telefoneEmpresa}', email_empresa = '${emailEmpresa}' WHERE id_empresa = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucao1);
    database.executar(instrucao1);

    var instrucao2 = `
        INSERT INTO enderecoEmpresa (cep_empresa,numero_empresa,fk_empresa) 
        VALUES ('${cepEmpresa}', '${numEmpresa}', '${fkEmpresa}')
    `
    console.log("Executando a instrução SQL: \n" + instrucao1);
    return database.executar(instrucao2);
}

function cadastroUsuarioEmpresa(nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuarioEmpresa (nome_usuario, email_usuario, senha_usuario, tipo_usuario, fk_empresa) 
        VALUES ('${nomeUsuario}', '${emailUsuario}', '${senhaUsuario}', '${tipoUsuario}', '${fkEmpresa}')
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscasUsuariosEmpresa(fkEmpresa) {
    instrucaoSql = `
    select id_usuario, nome_usuario, email_usuario, tipo_usuario from usuarioEmpresa where fk_empresa = ${fkEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function numUsuarios(fkEmpresa) {

    instrucaoSql = `
      SELECT count(id_usuario) numUsuarios from usuarioEmpresa where fk_empresa = ${fkEmpresa}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUsuario);
    var instrucao = `
        DELETE FROM usuarioEmpresa WHERE id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastroDadosEmpresa,
    cadastroUsuarioEmpresa,
    buscasUsuariosEmpresa,
    numUsuarios,
    deletar
};
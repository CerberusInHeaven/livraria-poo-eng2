"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_sync_1 = require("prompt-sync");
var Membro_1 = require("./classes/Membro");
var Livro_1 = require("./classes/Livro");
var Emprestimo_1 = require("./classes/Emprestimo");
var key = (0, prompt_sync_1.default)();
while (true) {
    console.log("+----------------------+");
    console.log("| Administrar:         |");
    console.log("| 1. Livros            |");
    console.log("| 2. Membros           |");
    console.log("| 3. Empréstimos       |");
    console.log("| 0. Sair              |");
    console.log("+----------------------+");
    var menuSelecionado = +key("- ");
    // LIVROS
    if (menuSelecionado == 1) {
        while (true) {
            console.log("+---------------------------------------+");
            console.log("| 1. Adicionar novo livro               |");
            console.log("| 2. Listar livros                      |");
            console.log("| 3. Atualizar um livro                 |");
            console.log("| 4. Remover livro                      |");
            console.log("| 0. Sair                               |");
            console.log("+---------------------------------------+");
            var opcao = +key("- ");
            if (opcao == 0) {
                break;
            }
            switch (opcao) {
                case 1:
                    var titulo = key("Título: ");
                    var autor = key("Autor: ");
                    var ISBN = key("ISBN: ");
                    var ano = +key("Ano: ");
                    var livro = new Livro_1.Livro(titulo, autor, ISBN, ano);
                    livro.adicionar();
                    break;
                case 2:
                    var livroList = new Livro_1.Livro("", "", "", 0);
                    livroList.listar();
                    break;
                case 3:
                    var livroUpdate = new Livro_1.Livro("", "", "", 0);
                    livroUpdate.atualizar();
                    break;
                case 4:
                    var livroDelete = new Livro_1.Livro("", "", "", 0);
                    livroDelete.deletar();
                    break;
            }
        }
    }
    // MEMBROS
    else if (menuSelecionado == 2) {
        while (true) {
            console.log("+---------------------------------------+");
            console.log("| 1. Adicionar novo membro              |");
            console.log("| 2. Listar membros                     |");
            console.log("| 3. Atualizar um membro                |");
            console.log("| 4. Remover membro                     |");
            console.log("| 0. Sair                               |");
            console.log("+---------------------------------------+");
            var opcao = +key("- ");
            if (opcao == 0) {
                break;
            }
            switch (opcao) {
                case 1:
                    var nome = key("Nome: ");
                    var endereco = key("Endereço: ");
                    var CPF = key("CPF: ");
                    var telefone = key("Telefone: ");
                    var membro = new Membro_1.Membro(nome, endereco, CPF, telefone);
                    membro.adicionar();
                    break;
                case 2:
                    var membroList = new Membro_1.Membro("", "", "", "");
                    membroList.listar();
                    break;
                case 3:
                    var membroUpdate = new Membro_1.Membro("", "", "", "");
                    membroUpdate.atualizar();
                    break;
                case 4:
                    var membroDelete = new Membro_1.Membro("", "", "", "");
                    membroDelete.deletar();
                    break;
            }
        }
    }
    // EMPRESTIMOS
    else if (menuSelecionado == 3) {
        while (true) {
            console.log("+---------------------------------------+");
            console.log("| 1. Adicionar novo empréstimo          |");
            console.log("| 2. Fazer uma devolução                |");
            console.log("| 3. Listar empréstimos não devolvidos  |");
            console.log("| 0. Sair                               |");
            console.log("+---------------------------------------+");
            var opcao = +key("- ");
            if (opcao == 0) {
                break;
            }
            switch (opcao) {
                case 1:
                    var cpfMembro = key("CPF do Membro: ");
                    var ISBN_livro = key("ISBN do Livro: ");
                    var dataEmprestimo = key("Data do Empréstimo: ");
                    var dataDevolucao = key("Data de Devolução: ");
                    var membro = new Membro_1.Membro("Nome do Membro", "Endereço do Membro", cpfMembro, "Telefone do Membro");
                    var livro = new Livro_1.Livro("Título do Livro", "Autor do Livro", ISBN_livro, 2023);
                    var emprestimo = new Emprestimo_1.Emprestimo(membro, livro, dataEmprestimo, dataDevolucao);
                    emprestimo.adicionar();
                    break;
                case 2:
                    var emprestimoDevolucao = new Emprestimo_1.Emprestimo(new Membro_1.Membro("", "", "", ""), new Livro_1.Livro("", "", "", 0), "", "");
                    emprestimoDevolucao.devolver();
                    break;
                case 3:
                    var emprestimoList = new Emprestimo_1.Emprestimo(new Membro_1.Membro("", "", "", ""), new Livro_1.Livro("", "", "", 0), "", "");
                    emprestimoList.listar();
                    break;
            }
        }
    }
    // SAIR
    else if (menuSelecionado == 0) {
        break;
    }
    else {
        console.log("Selecione uma das opções pelos números.");
    }
}

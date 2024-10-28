"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
var fs_1 = require("fs");
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
var Emprestimo = /** @class */ (function () {
    function Emprestimo(membro, livro, dataEmprestimo, dataDevolucao) {
        this._membro = membro;
        this._livro = livro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
    }
    Emprestimo.carregarDados = function (filepath) {
        if (fs_1.default.existsSync(filepath)) {
            var data = fs_1.default.readFileSync(filepath, "utf-8");
            return JSON.parse(data);
        }
        else {
            return [];
        }
    };
    Emprestimo.prototype.adicionar = function () {
        var _this = this;
        var membros = Emprestimo.carregarDados("./data/membros.json");
        var livros = Emprestimo.carregarDados("./data/livros.json");
        var membroExiste = membros.some(function (membro) { return membro.cpf == _this._membro.cpf; });
        var livroExiste = livros.some(function (livro) { return livro.ISBN == _this._livro.ISBN; });
        if (!membroExiste) {
            console.log("Membro não encontrado!");
            return;
        }
        if (!livroExiste) {
            console.log("Livro não encontrado!");
            return;
        }
        var emprestimoData = {
            cpfMembro: this._membro.cpf,
            ISBN_livro: this._livro.ISBN,
            dataEmprestimo: this._dataEmprestimo,
            dataDevolucao: this._dataDevolucao,
        };
        var emprestimos = Emprestimo.carregarDados("./data/emprestimos.json");
        emprestimos.push(emprestimoData);
        fs_1.default.writeFileSync("./data/emprestimos.json", JSON.stringify(emprestimos, null, 2));
        console.log("Empréstimo adicionado com sucesso!");
    };
    Emprestimo.prototype.listar = function () {
        if (fs_1.default.existsSync("./data/emprestimos.json")) {
            var data = fs_1.default.readFileSync("./data/emprestimos.json", "utf-8");
            var emprestimos = JSON.parse(data);
            console.table(emprestimos);
        }
        else {
            console.log("Arquivo de empréstimos não encontrado!");
        }
    };
    Emprestimo.prototype.devolver = function () {
        var CPF = prompt("Digite o CPF do membro que deseja devolver o livro: ");
        var ISBN = prompt("Digite o ISBN do livro que deseja devolver: ");
        if (fs_1.default.existsSync("./data/emprestimos.json")) {
            var data = fs_1.default.readFileSync("./data/emprestimos.json", "utf-8");
            var emprestimos = JSON.parse(data);
            var emprestimo = emprestimos.find(function (e) { return e.cpfMembro === CPF && e.ISBN_livro === ISBN; });
            if (emprestimo) {
                var index = emprestimos.indexOf(emprestimo);
                emprestimos.splice(index, 1);
                fs_1.default.writeFileSync("./data/emprestimos.json", JSON.stringify(emprestimos, null, 2));
                console.log("Livro devolvido com sucesso!");
            }
            else {
                console.log("Empréstimo não encontrado!");
            }
        }
        else {
            console.log("Arquivo de empréstimos não encontrado!");
        }
    };
    return Emprestimo;
}());
exports.Emprestimo = Emprestimo;

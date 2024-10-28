"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
var fs_1 = require("fs");
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
var Livro = /** @class */ (function () {
    function Livro(titulo, autor, ISBN, ano) {
        this._autor = "";
        this._ISBN = "0000000000000"; //'000-0-00-000000-0'
        this._ano = 0;
        this._titulo = titulo;
        this._autor = autor;
        this._ISBN = ISBN;
        this._ano = ano;
    }
    Object.defineProperty(Livro.prototype, "ISBN", {
        get: function () {
            return this._ISBN;
        },
        enumerable: false,
        configurable: true
    });
    Livro.prototype.validarDados = function (titulo, autor, ISBN, ano) {
        if (!titulo || !autor) {
            console.log("Título e Autor são obrigatórios!");
            return false;
        }
        if (!/^\d{13}$/.test(ISBN)) {
            console.log("ISBN inválido! O ISBN deve conter 13 dígitos.");
            return false;
        }
        if (isNaN(ano) || ano < 0 || ano > new Date().getFullYear()) {
            console.log("Ano inválido! Deve ser um número positivo e não pode ser maior que o ano atual.");
            return false;
        }
        return true;
    };
    Livro.prototype.adicionar = function () {
        if (!this.validarDados(this._titulo, this._autor, this._ISBN, this._ano)) {
            return;
        }
        var livroData = {
            titulo: this._titulo,
            autor: this._autor,
            ISBN: this._ISBN,
            ano: this._ano,
        };
        var livros = [];
        if (fs_1.default.existsSync("./data/livros.json")) {
            var data = fs_1.default.readFileSync("./data/livros.json", "utf-8");
            livros = JSON.parse(data);
        }
        livros.push(livroData);
        fs_1.default.writeFileSync("./data/livros.json", JSON.stringify(livros, null, 2));
    };
    Livro.prototype.atualizar = function () {
        var ISBN = prompt("Digite o ISBN do livro que deseja atualizar: ");
        if (fs_1.default.existsSync("./data/livros.json")) {
            var data = fs_1.default.readFileSync("./data/livros.json", "utf-8");
            var livros = JSON.parse(data);
            var livro = livros.find(function (livro) { return livro.ISBN === ISBN; });
            if (livro) {
                var titulo = prompt("Título: ");
                var autor = prompt("Autor: ");
                var novoISBN = prompt("ISBN: ");
                var ano = parseInt(prompt("Ano: "));
                if (!this.validarDados(titulo, autor, novoISBN, ano)) {
                    return;
                }
                livro.titulo = titulo;
                livro.autor = autor;
                livro.ISBN = novoISBN;
                livro.ano = ano;
                fs_1.default.writeFileSync("./data/livros.json", JSON.stringify(livros, null, 2));
            }
            else {
                console.log("Livro não encontrado!");
            }
        }
    };
    Livro.prototype.listar = function () {
        if (fs_1.default.existsSync("./data/livros.json")) {
            var data = fs_1.default.readFileSync("./data/livros.json", "utf-8");
            var livros = JSON.parse(data);
            console.table(livros);
        }
        else {
            console.log("Arquivo não encontrado!");
        }
    };
    Livro.prototype.deletar = function () {
        if (fs_1.default.existsSync("./data/livros.json")) {
            var ISBN_1 = prompt("Digite o ISBN do livro que deseja deletar: ");
            var data = fs_1.default.readFileSync("./data/livros.json", "utf-8");
            var livros = JSON.parse(data);
            var livro = livros.find(function (livro) { return livro.ISBN === ISBN_1; });
            if (livro) {
                var index = livros.indexOf(livro);
                livros.splice(index, 1);
                fs_1.default.writeFileSync("./data/livros.json", JSON.stringify(livros, null, 2));
            }
            else {
                console.log("Livro não encontrado!");
            }
        }
    };
    return Livro;
}());
exports.Livro = Livro;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membro = void 0;
var fs = require("fs");
var Prompt = require("prompt-sync")();
var prompt = Prompt();
var Membro = /** @class */ (function () {
    function Membro(nome, endereco, cpf, telefone) {
        this._nome = nome;
        this._endereco = endereco;
        this._cpf = cpf;
        this._telefone = telefone;
    }
    Object.defineProperty(Membro.prototype, "cpf", {
        get: function () {
            return this._cpf;
        },
        enumerable: false,
        configurable: true
    });
    // Método para ler o arquivo JSON, caso exista
    Membro.prototype.readFile = function () {
        if (fs.existsSync("./data/membros.json")) {
            var data = fs.readFileSync("./data/membros.json", "utf-8");
            return JSON.parse(data);
        }
        return [];
    };
    // Método para salvar o array de membros no arquivo JSON
    Membro.prototype.saveFile = function (membros) {
        fs.writeFileSync("./data/membros.json", JSON.stringify(membros, null, 2));
    };
    // Método para encontrar um membro pelo CPF
    Membro.prototype.encontrarMembroPorCpf = function (cpf) {
        var membros = this.readFile();
        return membros.find(function (membro) { return membro.cpf === cpf; });
    };
    Membro.prototype.adicionar = function () {
        var membroData = {
            nome: this._nome,
            endereco: this._endereco,
            cpf: this._cpf,
            telefone: this._telefone,
        };
        var membros = this.readFile(); // Reutiliza o método readFile
        membros.push(membroData);
        this.saveFile(membros); // Reutiliza o método saveFile
        console.log("Membro adicionado com sucesso!");
    };
    Membro.prototype.atualizar = function () {
        var cpf = prompt("Digite o CPF do membro que deseja atualizar: ");
        var membros = this.readFile();
        var membro = this.encontrarMembroPorCpf(cpf);
        if (membro) {
            membro.nome = prompt("Nome: ");
            membro.endereco = prompt("Endereço: ");
            membro.cpf = prompt("CPF: ");
            membro.telefone = prompt("Telefone: ");
            this.saveFile(membros);
            console.log("Membro atualizado com sucesso!");
        }
        else {
            console.log("Membro não encontrado!");
        }
    };
    Membro.prototype.listar = function () {
        var membros = this.readFile();
        if (membros.length > 0) {
            console.table(membros);
        }
        else {
            console.log("Nenhum membro encontrado!");
        }
    };
    Membro.prototype.deletar = function () {
        var cpf = prompt("Digite o CPF do membro que deseja deletar: ");
        var membros = this.readFile();
        var membro = this.encontrarMembroPorCpf(cpf);
        if (membro) {
            var index = membros.indexOf(membro);
            membros.splice(index, 1); // Remove o membro da lista
            this.saveFile(membros);
            console.log("Membro deletado com sucesso!");
        }
        else {
            console.log("Membro não encontrado!");
        }
    };
    return Membro;
}());
exports.Membro = Membro;

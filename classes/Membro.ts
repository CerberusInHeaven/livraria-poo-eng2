import * as fs from "fs";
const Prompt = require("prompt-sync")();

const prompt = Prompt();

export class Membro {
  private _nome: string;
  private _endereco: string;
  private _cpf: string;
  private _telefone: string;

  constructor(nome: string, endereco: string, cpf: string, telefone: string) {
    this._nome = nome;
    this._endereco = endereco;
    this._cpf = cpf;
    this._telefone = telefone;
  }

  get cpf(): string {
    return this._cpf;
  }

  // Método para ler o arquivo JSON, caso exista
  private readFile(): any[] {
    if (fs.existsSync("./data/membros.json")) {
      const data = fs.readFileSync("./data/membros.json", "utf-8");
      return JSON.parse(data);
    }
    return [];
  }

  // Método para salvar o array de membros no arquivo JSON
  private saveFile(membros: any[]): void {
    fs.writeFileSync("./data/membros.json", JSON.stringify(membros, null, 2));
  }

  // Método para encontrar um membro pelo CPF
  private encontrarMembroPorCpf(cpf: string): any {
    const membros = this.readFile();
    return membros.find((membro: any) => membro.cpf === cpf);
  }

  public adicionar(): void {
    const membroData = {
      nome: this._nome,
      endereco: this._endereco,
      cpf: this._cpf,
      telefone: this._telefone,
    };

    const membros = this.readFile(); // Reutiliza o método readFile
    membros.push(membroData);
    this.saveFile(membros); // Reutiliza o método saveFile

    console.log("Membro adicionado com sucesso!");
  }

  public atualizar(): void {
    const cpf = prompt("Digite o CPF do membro que deseja atualizar: ");
    const membros = this.readFile();
    const membro = this.encontrarMembroPorCpf(cpf);

    if (membro) {
      membro.nome = prompt("Nome: ");
      membro.endereco = prompt("Endereço: ");
      membro.cpf = prompt("CPF: ");
      membro.telefone = prompt("Telefone: ");

      this.saveFile(membros);
      console.log("Membro atualizado com sucesso!");
    } else {
      console.log("Membro não encontrado!");
    }
  }

  public listar(): void {
    const membros = this.readFile();
    if (membros.length > 0) {
      console.table(membros);
    } else {
      console.log("Nenhum membro encontrado!");
    }
  }

  public deletar(): void {
    const cpf = prompt("Digite o CPF do membro que deseja deletar: ");
    const membros = this.readFile();
    const membro = this.encontrarMembroPorCpf(cpf);

    if (membro) {
      const index = membros.indexOf(membro);
      membros.splice(index, 1); // Remove o membro da lista

      this.saveFile(membros);
      console.log("Membro deletado com sucesso!");
    } else {
      console.log("Membro não encontrado!");
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../../shared/interfaces/pessoas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API = 'http://localhost:3000/pessoas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  criar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  deletar(pessoaId: number): Observable<void> { 
    const url = `${this.API}/${pessoaId}`;
    return this.http.delete<void>(url);
  }

  buscarPorId(pessoaId: number): Observable<Pessoa> {
    const url = `${this.API}/${pessoaId}`;
    return this.http.get<Pessoa>(url);
  }

  editar(pessoa: Pessoa): Observable<Pessoa> {
    const url = `${this.API}/${pessoa.id}`
    return this.http.put<Pessoa>(url, pessoa )
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa);
  }
}

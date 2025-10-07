import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../../shared/interfaces/pessoas';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private readonly API = 'http://localhost:3000/pessoas';
  private _pessoas$ = new BehaviorSubject<Pessoa[]>([]);

  pessoas$ = this._pessoas$.asObservable();
  count$ = this.pessoas$.pipe(map((arr) => arr.length));

  constructor(private http: HttpClient) {}

  listar(): Observable<Pessoa[]> {
    const req$ = this.http.get<Pessoa[]>(this.API);
    req$.subscribe((lista) => this._pessoas$.next(lista));
    return req$;
  }

  criar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  deletar(pessoaId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${pessoaId}`);
  }

  buscarPorId(pessoaId: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.API}/${pessoaId}`);
  }

  editar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa);
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa);
  }
}

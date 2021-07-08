import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Datum, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "AHBVHaLB83Jgk3ozTYATHI5UU2GQn1Cs";
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Datum[] = [];

  get historial() {
    return [...this._historial];
  }


  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem("historial")!);
    // }
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

  }
  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (query.trim().length === 0) {
      return;
    } if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        // console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      })




    // fetch('https://api.giphy.com/v1/gifs/search?api_key=AHBVHaLB83Jgk3ozTYATHI5UU2GQn1Cs&q=albacete')
    //   .then(resp => {
    //     resp.json().then(data => console.log(data))
    //   })

  }
}



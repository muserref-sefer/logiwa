import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

export interface Player{
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  height: string;
  weight: string;
  team: {
    name: string
  };
  draft_year: string;
  draft_number: number;
  jersey_number: string;
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private baseURL = `https://api.balldontlie.io/v1/players`
  private token = `d3d43432-3b6e-428f-b2aa-d758c1507de7`

  constructor(private http: HttpClient) { }

  getPlayers(query: string): Observable<{ data: any, meta: any }> {
    let header = new HttpHeaders().set(
      "Authorization",
      this.token
    );
    return this.http.get<{ data: any, meta: any }>(`${this.baseURL}${query}`, {headers:header})
  }

  searchPlayerByHeight(filterValue: string, players: Player[]): Player[] {
    return players.filter((player: Player) => {
      const height = player.height?.toLowerCase();
      return height?.includes(filterValue);
    });
  }

  searchPlayerByCountry(filterValue: string, players: Player[]): Player[] {
    return players.filter(player => {
      const country = player.country?.toLowerCase();
      return country?.includes(filterValue);
    });
  }

  searchPlayerByWeight(filterValue: string, players: Player[]): Player[] {
    return players.filter(player => {
      const weight = player.weight?.toLowerCase();
      return weight?.includes(filterValue);
    });
  }

  comparePlayers(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === 'string' && typeof b === 'string') {
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return isAsc ? a - b : b - a;
    }

    throw new Error('Types of a and b should be either both strings or both numbers.');
  }

  sortData(sort: Sort, players: Player[]): Player[] {
    return players.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'full_name':
          return this.comparePlayers(a.first_name, b.first_name, isAsc);
        case 'country':
          return this.comparePlayers(a.country, b.country, isAsc);
        case 'team':
          return this.comparePlayers(a.team.name, b.team.name, isAsc);
        case 'height':
          return this.comparePlayers(a.height, b.height, isAsc);
        case 'weight':
          return this.comparePlayers(+a.weight, +b.weight, isAsc);
        case 'draft_number':
          return this.comparePlayers(+a.draft_number, +b.draft_number, isAsc);
        case 'draft_year':
          return this.comparePlayers(+a.draft_year, +b.draft_year, isAsc);
        case 'jersey_number':
          return this.comparePlayers(+a.jersey_number, +b.jersey_number, isAsc);
        default:
          return 0;
      }
    });
  }

  searchPlayer(filterValue: string, players: Player[]): Player[] {
    return players.filter(player => {
      const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
      const team = player.team.name.toLowerCase();
      const country = player.country.toLowerCase();

      return fullName.includes(filterValue) || team.includes(filterValue) || country.includes(filterValue);
    });
  }
}
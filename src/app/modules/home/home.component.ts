import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Player, PlayerService } from '../../services/player/player.service';
import { AlertComponent } from '../alert/alert.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  players: Array<Player> = [];
  filteredPlayers: Player[] = [];
  filter: string = '';
  totalRecords: number = 0;
  pageSize: number = 25;
  pageIndex: number = 0;
  searching: boolean = false;
  loading: boolean = true;

  displayedColumns: string[] = [
    'full_name',
    'country',
    'team',
    'height',
    'weight',
    'draft_number',
    'draft_year',
    'jersey_number',
    'action',
  ];

  @ViewChild('table') table!: MatTable<Player>;

  constructor(
    private playerService: PlayerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPagedData();
  }

  getPagedData(): void {
    const query = `?cursor=${this.pageIndex * this.pageSize}&per_page=${this.pageSize}`;

    this.searching = true;
    this.loading = true;

    this.playerService.getPlayers(query).subscribe({
      next: (response: {
        data: Player[];
        meta: { next_cursor: number; per_page: number };
      }) => {
        this.totalRecords = 1000;
        this.players = response.data || [];
        this.filteredPlayers = this.players;
        this.loading = false;
      },
      error: () => {
        this.searching = false;
        this.loading = false;
      },
    });
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPagedData();
  }

  searchPlayer(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPlayers = this.playerService.searchPlayer(
      this.filter,
      this.players
    );
  }

  searchPlayerByHeight(event: Event): void {
    this.filter = (event.target as HTMLInputElement)?.value?.toLowerCase();
    this.filteredPlayers = this.playerService.searchPlayerByHeight(
      this.filter,
      this.players
    );
  }

  searchPlayerByCountry(event: Event): void {
    this.filter = (event.target as HTMLInputElement)?.value?.toLowerCase();
    this.filteredPlayers = this.playerService.searchPlayerByCountry(
      this.filter,
      this.players
    );
  }

  searchPlayerByWeight(event: Event): void {
    this.filter = (event.target as HTMLInputElement)?.value?.toLowerCase();
    this.filteredPlayers = this.playerService.searchPlayerByWeight(
      this.filter,
      this.players
    );
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.filteredPlayers = this.players;
      return;
    }

    this.players = this.playerService.sortData(sort, this.players);
  }

  openDialog(type: string, player?: Player): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        player: player
          ? { ...player }
          : { id: this.players.length, team: { name: '' } },
        type,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (type === 'create') {
          this.players.unshift(data.player);
          this.snackBar.openFromComponent(AlertComponent, {
            duration: 5000,
            data: 'Player Created',
          });
        } else {
          this.players = this.players.map(p =>
            p.id === data.player.id ? { ...data.player } : p
          );
          this.snackBar.openFromComponent(AlertComponent, {
            duration: 5000,
            data: 'Player Edited',
          });
        }
        this.table.renderRows();
      }
    });
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id, message: 'Are you sure you want to delete?' },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.players = this.players.filter(player => player.id !== data.id);
        this.table.renderRows();
        this.snackBar.openFromComponent(AlertComponent, {
          duration: 5000,
          data: 'Player Deleted',
        });
      }
    });
  }
}

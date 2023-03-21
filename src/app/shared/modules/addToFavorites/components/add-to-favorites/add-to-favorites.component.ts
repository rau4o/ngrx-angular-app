import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {

  @Input('isFavorites') isFavoritesProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number
  @Input('articleSlug') articleSlugProps: string;

  public favoritesCounts: number;
  public isFavorited: boolean;

  constructor() { }

  ngOnInit(): void {
    this.favoritesCounts = this.favoritesCountProps;
    this.isFavorited = this.isFavoritesProps;
  }

  public handleLike(): void {
    this.isFavorited ? this.favoritesCounts -= 1 : this.favoritesCounts += 1;
    this.isFavorited = !this.isFavorited;
  }
}

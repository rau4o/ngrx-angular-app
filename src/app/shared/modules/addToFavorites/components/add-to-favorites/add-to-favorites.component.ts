import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../../types/appState.interface";
import {addToFavoritesAction} from "../../store/actions/addToFavorites.action";

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

  constructor(private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    this.favoritesCounts = this.favoritesCountProps;
    this.isFavorited = this.isFavoritesProps;
  }

  public handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProps
      })
    )
    this.isFavorited ? this.favoritesCounts -= 1 : this.favoritesCounts += 1;
    this.isFavorited = !this.isFavorited;
  }
}

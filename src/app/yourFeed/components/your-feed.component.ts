import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss']
})
export class YourFeedComponent implements OnInit {

  public apiUrl: string = '/articles/feed';

  constructor() { }

  ngOnInit(): void {
  }

}

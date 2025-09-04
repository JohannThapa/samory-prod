import { Component, OnInit } from '@angular/core';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { Nft } from '../../models/nft';
import { RegionActivityComponent } from 'src/app/shared/components/cards/region-activity/region-activity.component';
import { StatsCardComponent } from 'src/app/shared/components/cards/stats-card/stats-card.component';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  imports: [NftHeaderComponent, NftAuctionsTableComponent, StatsCardComponent, RegionActivityComponent],
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;
  mockActivities = [
    { date: '2025-08-07', action: 'Diagnostic submitted', by: 'Org 123', type: 'Diagnostic' },
    { date: '2025-08-07', action: 'New organization registered', by: 'Admin', type: 'Registration' },
    { date: '2025-08-07', action: 'Misuse reported', by: 'Org 214', type: 'Misuse' },
    { date: '2025-08-07', action: 'Diagnostic submitted', by: 'Org 123', type: 'Diagnostic' },
  ];

  mockRegions = [
    { name: 'Conakry', percentage: 70 },
    { name: 'Kindia', percentage: 22 },
    { name: 'Labé', percentage: 27 },
    { name: 'Others', percentage: 9 },
  ];
  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {}
}

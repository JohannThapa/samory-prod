import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuoteCardComponent } from 'src/app/shared/components/cards/quote-card/quote-card.component';

@Component({
  selector: 'app-quote-lists',
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-lists.component.html',
  styleUrl: './quote-lists.component.css',
})
export class QuoteListsComponent {
  quotes = [
    {
      message: `Lorem ipsum dolor sit amet consectetur. Vestibulum nisi parturient purus mattis sed. Dictum elementum risus amet sed a ante vulputate. Purus et pharetra lectus arcu. Aenean neque sit imperdiet urna nulla ut amet in aliquet. Proin vitae eu elementum blandit integer fusce ac.`,
      authorName: 'Ashley Cooper',
      authorTitle: 'Director, NGO in Conakry',
      authorAvatar: 'assets/avatars/ashley.png',
    },
    {
      message: `Lorem ipsum dolor sit amet consectetur. Quam consequat hendrerit sed convallis. Libero in non mauris lorem feugiat aenean sit felis. Eget pulvinar viverra odio fermentum. Euismod quisque diam bibendum aliquet sem. Tempor integer in nunc tempor risus integer id gravida etiam.`,
      authorName: 'Dean Mayert',
      authorTitle: 'Director, NGO in Conakry',
      authorAvatar: 'assets/avatars/user.png',
    },
    {
      message: `Lorem ipsum dolor sit amet consectetur. Orci gravida quis mattis sed condimentum non in mauris fringilla.`,
      authorName: 'Alexander Volkman',
      authorTitle: 'Senior Usability Planner',
      authorAvatar: 'assets/avatars/user.png',
    },
    {
      message: `Lorem ipsum dolor sit amet consectetur. Enim bibendum sem ornare sollicitudin volutpat dignissim scelerisque in. Congue maecenas leo sit pretium scelerisque cursus in scelerisque. Elit non sit diam in leo lacus. Dui nullam id elementum nibh commodo scelerisque risus. Quis scelerisque nec orci sociis nisl vel id amet. Porta urna sapien sed ipsum leo. Tristique suspendisse aenean rutrum facilisis felis lorem. Ornare morbi pellentesque sed auctor quam.`,
      authorName: 'Marion Bernhard',
      authorTitle: 'Future Applications Engineer',
      authorAvatar: 'https://placehold.co/100x100/D3C6E8/ffffff',
    },
    {
      message: `Lorem ipsum dolor sit amet consectetur. Ornare in id volutpat faucibus morbi nascetur sed facilisi amet. Felis velit mi tempus laoreet at urna suspendisse sollicitudin vel. Id posuere turpis feugiat ut eget aenean lectus imperdiet. Velit a posuere malesuada dictum magna. Tincidunt pharetra senectus consectetur sagittis.`,
      authorName: 'Juanita Hayes',
      authorTitle: 'Chief Communications Facilitator',
      authorAvatar: 'assets/avatars/user.png',
    },
    {
      message: `Lorem ipsum dolor sit amet consectetur. Diam amet sit mauris lectus. Ultrices leo urna lacus hendrerit quis venenatis sed velit blandit. Commodo eget arcu placerat quam eros lacus quisque. Dictumst cursus nisi velit eget in. Aliquet placerat pharetra non maecenas. Ullamcorper ut erat gravida aliquet viverra donec fusce feugiat proin.`,
      authorName: 'Sabrina Sporer',
      authorTitle: 'Investor Operations Planner',
      authorAvatar: 'assets/avatars/sabrina.png',
    },
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { environment } from 'src/environments/environment.development';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    PdfViewerModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  assetsUrl = environment.assetsUrl;

  src = 'assets/data/decouvrir.pdf';

}

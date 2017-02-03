import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-text',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.css']
})
export class InfoTextComponent {
  @Input() label: string="hasld";
  @Input() content: string="hasld";
}

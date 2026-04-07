import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferralsHomeComponent } from '@app/features/referrals/views/referrals-home/referrals-home.component';

@Component({
  selector: 'app-referrals',
  imports: [CommonModule],
  templateUrl: './referrals.component.html',
  styleUrl: './referrals.component.css'
})
export class ReferralsComponent {

  currentComponent: any;

  private componentsMap: { [key: string]: any } = {
    home: ReferralsHomeComponent
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
    });
  }

}

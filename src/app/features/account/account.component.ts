import { Component } from '@angular/core';
import { AccountOverviewComponent } from './views/account-overview/account-overview.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})

export class AccountComponent {

  currentComponent: any;

  private componentsMap: { [key: string]: any } = {
    home: AccountOverviewComponent
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
    });
  }

}

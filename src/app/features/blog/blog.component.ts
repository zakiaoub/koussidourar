import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogOverviewComponent } from './views/blog-overview/blog-overview.component';
import { BlogDetailsComponent } from './views/blog-details/blog-details.component';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent {
  constructor(private route: ActivatedRoute) { }

  currentComponent: any;
  isHomeComponent = false;

  private componentsMap: { [key: string]: any } = {
    home: BlogOverviewComponent,
    details: BlogDetailsComponent,
  };

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
      this.isHomeComponent = componentName === 'home';
    });
  }
}

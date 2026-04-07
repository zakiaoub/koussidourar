import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { CompressImagePipe } from '@app/shared/pipes/compress-image';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-img',
  imports: [CommonModule, Skeleton],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css',
  providers: [CompressImagePipe],
})

export class ImgComponent {

  @Input() class: string
  @Input() src: string
  @Input() size: number = 1024
  @Input() quality: number = 0.6
  @Input() minHeight: number = null
  @Input() maxHeight: number = null

  isLoaded = signal<boolean>(false)
  compressedSrc = signal<string | null>(null)

  constructor(private compressImagePipe: CompressImagePipe) { }

  ngOnInit() {
    this.compressImagePipe.transform(this.src, this.size, this.quality)
      .subscribe(url => {
        this.compressedSrc.set(url)
      })
  }

  OnLoadedImg() {
    this.isLoaded.set(true)
  }
}

import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  @Output() filesDropped =  new EventEmitter<FileList>();
  @Output() filesHovered =  new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
    onDrop($event: any) {
      $event.preventDefault();

      const transfer = $event.dataTransfer;
      this.filesDropped.emit(transfer.files);
      this.filesHovered.emit(false);
    }

    @HostListener('dragover', ['$event'])
     onDragOver($event: any) {
       event.preventDefault();

       this.filesHovered.emit(true);
     }

   @HostListener('dragleave', ['$event'])
    onDragLeave($event: any) {
      this.filesHovered.emit(false);
    }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Upload } from '../Models/upload';
import { UploadFilesService } from './../../Services/upload-files.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  @Output() outputFilesList = new EventEmitter<Upload[]>();
  public currentUpload: Upload;
  public dropzoneActive = false;
  public filesList: Upload[] = [];
  constructor(private uploadFileService: UploadFilesService) { }

  ngOnInit() {}

  public dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  public handleDrop(fileList: FileList) {
    const fileIndex = _.range(fileList.length);
    _.each(fileIndex,
      (index: any) => {
      this.currentUpload = new Upload(fileList[index]);
      this.uploadFileService.pushUpload(this.currentUpload);
      this.filesList.push(this.currentUpload);
    });
    this.oFilesList(this.filesList);
  }

  public oFilesList( filesList: Upload[]) {
    this.outputFilesList.emit(filesList);
  }
}

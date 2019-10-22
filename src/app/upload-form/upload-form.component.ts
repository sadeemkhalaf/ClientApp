import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Upload } from '../Models/upload';
import { UploadFilesService } from './../../Services/upload-files.service';
import * as _ from 'lodash';

export interface FireFiles {
  name: string;
  url: Promise<any>;
  path: string;
}

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  @Output() outputFiles = new EventEmitter<Upload[]>();
  @Input() candidateId: string;

  public currentUpload: Upload;
  public dropzoneActive = false;
  public filesList: Upload[] = [];
  public uploadedFiles: FireFiles[] = [];

  constructor(private uploadFileService: UploadFilesService) { }

  ngOnInit() {
      this.uploadFileService.getFilesWithId(this.candidateId).list().then((files) => {
        files.items.forEach((file) => {
          const temp = { name: file.name, path: file.fullPath, url: file.getDownloadURL() } as FireFiles;
          this.uploadedFiles.push(temp);
        });
      });
  }

  public dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  public handleDrop(fileList: FileList) {
    const fileIndex = _.range(fileList.length);
    _.each(fileIndex,
      (index: any) => {
        this.currentUpload = new Upload(fileList[index]);
        this.uploadFileService.pushUpload(this.currentUpload, this.candidateId);
        this.filesList.push(this.currentUpload);
      });
    this.oFilesList(this.filesList);
    this.uploadFileService.getFilesWithId(this.candidateId);
  }

  public oFilesList(files: Upload[]) {
    this.outputFiles.emit(files);
  }

  async deleteFile(event: any, file: Upload) {
    await this.uploadFileService.deleteFile(file.name, this.candidateId).then(() => {
      this.filesList = this.filesList.filter((f) => f.name !== file.name);
    }
    );
  }

  async deleteFileByUrl(filePath: string) {
    await this.uploadFileService.deleteFileByUrl(filePath).then(() =>
    this.uploadedFiles = this.uploadedFiles.filter(f => f.path !== filePath));
  }
}

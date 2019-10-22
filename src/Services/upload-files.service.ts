import { Injectable } from '@angular/core';
import { Upload } from 'src/app/Models/upload';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  public pushUpload(upload: Upload, id: string) {
    const storageReference = firebase.storage().ref();
    const uploadTask = storageReference.child(`uploads/${id}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      async () => {
        upload.url = await uploadTask.snapshot.ref.getDownloadURL();
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
      );
  }

  public async deleteFile(file: string, id: string) {
    await firebase.storage().ref().child(`uploads/${id}/${file}`).delete();
  }

  public async deleteFileByUrl(file: string) {
    await firebase.storage().ref().child(file).delete();
  }

  public getFilesWithId(id: string) {
    return firebase.storage().ref().child(`uploads/${id}`);
  }

  async deleteBucket(id: string) {
    await this.fireDatabase.object(`uploads/${id}`).remove();
  }

  private saveFileData(upload: Upload) {
    this.fireDatabase.list(`uploads`).push(upload);
  }
}

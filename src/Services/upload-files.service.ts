import { Injectable } from '@angular/core';
import { Upload } from 'src/app/Models/upload';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  public pushUpload(upload: Upload) {
    const storageReference = firebase.storage().ref();
    const uploadTask = storageReference.child(`uploads/${upload.file.name}`).put(upload.file);

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

  public async deleteFile(file: Upload) {
    const ref = firebase.storage().ref();
    await ref.child(`uploads/${file.name}`).delete();
  }

  private saveFileData(upload: Upload) {
    this.fireDatabase.list(`uploads`).push(upload);
  }

}

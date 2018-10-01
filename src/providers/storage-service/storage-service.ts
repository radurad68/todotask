import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

import { Project } from '../../interfaces/project';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  pathProjects: string = 'ToDo';
  fileProjects: string = 'projects.json';


  constructor(public http: HttpClient, public file: File) {
    console.log('Hello StorageServiceProvider Provider');
    this.preparePath(this.pathProjects);
  }

  private deleteFile(path: string, file: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.file.checkFile(this.file.dataDirectory, file)
        .then(_ => {
          this.file.removeFile(this.file.dataDirectory, file)
            .then(_ => {
              return resolve(true);
            })
            .catch(_ => {
              return resolve(false);
            })
        })
        .catch(_ => {
          // file doesn't exists
          return resolve(true);
        })
    })
  }

  private preparePath(path: string) {
    this.file.checkDir(this.file.dataDirectory, path)
      .then(_ => {
        console.log('Directory ' + path + ' exists.');
      })
      .catch(_ => {
        this.file.createDir(this.file.dataDirectory, path, false)
          .then(_ => {
            console.log('Directory ' + path + ' created.');
          })
          .catch(err => {
            console.log('Unable to create directory ' + path + ', error: ' + err);
            console.log(err);
          })
      })
  }

  // use same file
  public saveData(data: any): Promise<boolean> {
    // override file
    this.preparePath(this.pathProjects);
    return new Promise((resolve) => {
    this.deleteFile(this.pathProjects, this.fileProjects)
      .then(success => {
        if (success)
        {
          // create json 
          let jsonData = JSON.stringify(data);
          // write to file
          this.file.writeFile(this.file.dataDirectory, this.fileProjects, jsonData)
            .then(_ => {
              console.log('Data saved.');
              return resolve(true);
            })
            .catch(err => {
              console.log('Data not saved, error: ' + err);
              console.log(err);
            })
        }
        else
        {
          console.log('File not deleted.');
        }
      })
      .catch(_ => {
        return resolve(false);
      })
    })
  }

  public loadData(): Promise<Array<Project>> {
    return new Promise((resolve) => {
      this.file.readAsText(this.file.dataDirectory, this.fileProjects)
        .then(text => {
          console.log(text);
          let listProjects: Array<Project> = JSON.parse(text);
          console.log('Projects: ' + listProjects);
          return resolve(listProjects);
        })
        .catch(err => {
          console.log('Data not read, error: ' + err);
        })
    });
  }

}

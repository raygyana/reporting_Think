import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
import { BaseService } from '../../base/base.service';

import { ProjectUtils } from '../../../pages/shared';


export interface FileDetails {
      fileName: string;
      fileType: string
}

export interface IMimeType {
      name: string;
      type: string;
}

export interface MyBodyI {
      key: string;
      value: string;
}












export class DownloadFileService extends BaseService {

      static MimeTypes: Array<IMimeType> = [{
            name: 'pdf',
            type: 'text/plain;charset=utf-8'
      }, {
            name: 'xls',
            type: 'application/vnd.ms-excel'
      }, {
            name: 'xlsx',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }]




      getServiceURL(): string {
            return 'not in use';
      }

      downFilebyPost(serviceURL: string, myBody: Array<MyBodyI> = [], obj: FileDetails): any {

            let body = this.setParamValue('', 'clientID', ProjectUtils.getClientCode());

            if (Array.isArray(myBody)) {
                  myBody.forEach((item) => {
                        body += this.setParamValue(body, item.key, item.value);
                  })
            }
            this.getDataWithURL(serviceURL, body, 'text')
                  .subscribe((data) => {
                        this.downloadFile(obj, data)
                  })
      }


      downloadFile(obj: FileDetails, data: any) {

            const contentType = DownloadFileService.MimeTypes.find((item) => {
                  return item['name'] === obj.fileType
            });

            if (contentType) {
                  //   const byteCharacters = atob(data);
                  const byteNumbers = new Array(data.length);
                  for (let i = 0; i < data.length; i++) {
                        byteNumbers[i] = data.charCodeAt(i);
                  }


                  const byteArray = new Uint8Array(byteNumbers);
                  const file = new Blob([byteArray], { type: contentType.type });
                  // FileSaver.saveAs(file, obj.fileName);
            } else {
                  console.log('The content type does not exist in list ', obj.fileType)
            }

      }

}

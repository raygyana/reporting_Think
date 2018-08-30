import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ProjectUtils } from '../../pages/shared/project-utils';



@Injectable()
export class AutoCompleteService extends BaseService {

      getServiceURL(): string {
            return 'not in use';
      }

      getAutoCompleteData(serviceURL: string, searchStr?: string): any {
            let body = '';
            body += this.setParamValue(body, 'search', '');
            return this.getDataWithURL(serviceURL, body);
      }
}


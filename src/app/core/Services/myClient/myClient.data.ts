import { MitLoginComponent } from '../../../pages/login';
import { PhpLoginComponent } from '../../../pages/login';
import { UcpLoginComponent } from '../../../pages/login';

export interface MYCLIENTSi {
      url: Array<string>;
      clientID: string;
      firstPage: string;
      project: 'think' | 'insight' | 'both';
      LicenseDenial: 'required' | 'null';
      component: any;

}


export const MYCLIENTS: Array<MYCLIENTSi> = [
      {
            url: ['mit'],
            clientID: 'mit',
            firstPage: 'dashboard',
            project: 'think',
            component: 'MitLoginComponent',
            LicenseDenial: 'null'
      }, {
            url: ['php', 'demo'],
            clientID: 'php',
            firstPage: 'dashboard',
            project: 'think',
            component: 'PhpLoginComponent',
            LicenseDenial: 'null'
      }, {
            url: ['ucp'],
            clientID: 'ucp',
            firstPage: 'dashboard',
            project: 'think',
            component: 'UcpLoginComponent',
            LicenseDenial: 'null'
      }
];



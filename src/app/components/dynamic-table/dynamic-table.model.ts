

export interface TopHeader {
      spanSize: number;
      display: string;
}

export interface MainHeader {
      display: string;
      propertyName: string;
}

export interface SubCatg {
      rowSpan: number;
      propertyName: string;
}


export const topHeaderClass = [
      {
            size: 1,
            class: 'colSpan1'
      }, {
            size: 2,
            class: 'colSpan2'
      }, {
            size: 3,
            class: 'colSpan3'
      }, {
            size: 4,
            class: 'colSpan4'
      }
];


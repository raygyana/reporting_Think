import { Injectable } from '@angular/core';


@Injectable()
export class IDGeneratorService {

      IDS = {}

      normalIDCounts = 0;


      constructor() {
      }

      initIDOfType(name: string) {
            this.IDS[name] = new Set<string>();
            this.IDS[name + 'count'] = 0;
      }

      generateNewIDOf(name: string): string {
            ++this.IDS[name + 'count'];
            this.IDS[name].add(name + this.IDS[name + 'count']);
            return name + (this.IDS[name + 'count']);
      }

      removeIDOf(name: string, id) {
            this.IDS[name].delete(id);
      }

      generateNormalIDs(name) {
            return name + (++this.normalIDCounts)
      }

}

import { Injectable } from '@angular/core';
import * as Parse from 'parse';
@Injectable({
  providedIn: 'root'
})
export class TagsRepository {

  constructor() { }

  async getTags() : Promise<any[]> {
    return await new Parse.Query(Parse.Object.extend('Tag'))
    .include('product')
    .find();
  }
}

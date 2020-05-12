import * as Parse from 'parse';

export abstract class Repository<T> {
  async delete(objectId: string, className: string) {
    await new Parse.Query(Parse.Object.extend(className))
      .get(objectId)
      .then((toBeDeleted: Parse.Object) => {
        toBeDeleted.destroy({});
      }, (err) => {
        throw new Error(err);
      });
  }
}

export class CityModel {
  constructor(object, properties) {
    this.object = object;
    this.properties = properties;
    window.cityDoc = this.document = object.model.domain.document;
  }

  get title() {
    return this.find("cityName").name;
  }

  find(type, parent) {
    for (const ob of this.document.children) {
      if (ob.type === type) {
        return ob;
      }
    }
    function findIn(parent) {
      if (parent.type === type) {
        return parent;
      }
      for (const child of parent.children || []) {
        const found = findIn(child);
        if (found) {
          return found;
        }
      }
      return null;
    }
    return findIn(parent || this.document);
  }

  findAll(type, parent) {
    const results = [];
    function findIn(parent) {
      if (parent.type === type) {
        results.push(parent);
      }
      for (const child of parent.children || []) {
        findIn(child);
      }
    }
    findIn(parent || this.document);
    return results;
  }

  findName(type, name, parent) {
    if (!parent) {
      parent = this.document;
    }
    for (const child of parent.children || []) {
      if (child.type === type && child.name === name) {
        return child;
      }
    }
    for (const child of parent.children || []) {
      const found = this.findName(type, name, child);
      if (found) {
        return found;
      }
    }
    return null;
  }

  getImage(parent, type) {
    const imageObject = this.find(type, parent);
    if (imageObject && imageObject.imageUrl) {
      return imageObject.imageUrl;
    }
    return null;
  }
}

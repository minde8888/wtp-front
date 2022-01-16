class EmptyObject {
   
   isEmpty = (value) => {
      return Boolean(value && typeof value ===
         'object' && Object.keys(value).length !== 0);
   }

   emptyValues = (obj) => {
      return Object.values(obj).every(x => (x === null || x === ''));
   }
}

export default new EmptyObject();
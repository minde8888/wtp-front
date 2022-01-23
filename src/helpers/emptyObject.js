class EmptyObject {
   
   isEmpty = (value) => {
      return Boolean(value && typeof value ===
         'object' && Object.keys(value).length !== 0);
   }

   emptyValues = (obj) => {
      return Object.values(obj).every(x => (x === null || x === ''));
   }

   removeEmptyObjectValues  = (obj) =>{
      
        Object.keys(obj).forEach((key) => {
         if (obj[key] === "") {
           delete obj[key];
         }
       });  
       return obj;
   }
}

export default new EmptyObject();
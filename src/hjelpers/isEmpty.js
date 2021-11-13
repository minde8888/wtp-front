export function isEmpty(value) {
   console.log(value);
   return Boolean(value && typeof value === 'object' && Object.keys(value).length !== 0);
}
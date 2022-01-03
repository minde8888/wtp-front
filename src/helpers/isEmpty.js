export function isEmpty(value) {
   return Boolean(value && typeof value === 'object' && Object.keys(value).length !== 0);
}
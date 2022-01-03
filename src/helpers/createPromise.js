export async function createPromise(data) {
    return new Promise((resolve, reject) => {
      resolve(data);
      data =  error =>  reject(error);
    })
}
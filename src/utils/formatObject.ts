
/**
 * 
 * @param obj {'user.name':'Jhon'}
 * @returns {user:{name:'Jhon'}}
 */
export const formartObject = <T>(obj: object): T => {
    const newObj = {};

    Object.keys(obj).forEach((key) => {
        const keys = key.split(".");
        let current = newObj;
        keys.forEach((k, i) => {
            if (i === keys.length - 1) {
                //@ts-ignore
                current[k] = obj[key];
            } else {
                //@ts-ignore
                current[k] = current[k] || {};
                //@ts-ignore
                current = current[k];
            }
        });
    });
    //@ts-ignored
    return newObj as T;
};

export const formDataToJSON = <T>(form: FormData): T => {
    const keys = new Set((form.keys()))
    let obj = {};
    keys.forEach(key => {
        //@ts-ignore
        obj[key] = form.get(key);
    });
    return formartObject(obj);
}

/**
 * 
 * @param path 'user.name.firstName'
 * @param data {
 *              user:{
 *                     name:{
 *                          fistName:'Pepe'
 *                      }
 *                    }
 *              }
 * @returns 'Pepe'
 */
export function stringPathObject<T>(path: string, data: object) {
    const parsePath = path.replaceAll('[', '.').replaceAll(']', '.').split('.');
    let obj = { ...data };
    parsePath.forEach(e => {
        //@ts-ignore;
        obj = obj[e] === undefined ? {} : obj[e];
    })
    return obj as T;
}
/**
 * 
 * @param path 'user.name.firstName'
 * @param newValue Juan
 * @param data {
 *              user:{
 *                     name:{
 *                          fistName:'Pepe'
 *                      }
 *                    }
 *              }
 * @returns {
 *      user:{
 *             name:{
 *                  fistName:'Juan'
 *              }
 *            }
 *      }
 */

export const stringPathNewObject = <T>({ path, oldObject, newValue }: { path: string; oldObject: object; newValue: any; }): T => {
    const newObject = { ...oldObject };
    const pathArray = path.split('.');
    let currentObject = newObject;
    for (let i = 0; i < pathArray.length - 1; i++) {
        //@ts-ignore
        currentObject = currentObject[pathArray[i]];
    }
    //@ts-ignore
    currentObject[pathArray[pathArray.length - 1]] = newValue;

    return newObject as T;
}
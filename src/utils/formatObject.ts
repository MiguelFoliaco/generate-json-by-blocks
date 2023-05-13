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
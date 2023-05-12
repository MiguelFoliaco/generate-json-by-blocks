export type ConfigBlock = {
    typeValue?: 'text' | 'number' | 'phone' | 'email' | 'json' | 'title' | 'url';
    name: string;
    customValue?: Object;
    id?: string;
}
export interface IBlockDefinition {
    name: string;
    typeValue: string;
    customValue?: object;
    id?: string;
}
export const generateBlockDefinition = (config: ConfigBlock): IBlockDefinition => {

    if (config.customValue !== undefined) {
        return {
            name: config.name,
            typeValue: 'object',
            customValue: config.customValue,
            id: config?.id
        }
    }
    return {
        name: config.name,
        typeValue: config.typeValue || 'text',
        id: config?.id
    }
}
export const blockList: IBlockDefinition[] = [
    generateBlockDefinition({ name: 'Text' }),
    generateBlockDefinition({ name: 'Title' }),
    generateBlockDefinition({ name: 'Phone' }),
    generateBlockDefinition({ name: 'Imagen', typeValue: 'url' }),
    generateBlockDefinition({ name: 'Link', typeValue: 'text' }),

]

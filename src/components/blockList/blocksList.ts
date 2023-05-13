import { blue } from '@mui/material/colors';
import { ITags } from 'types-render-json/src/tags'
export type ConfigBlock = {
    tag: ITags;
    typeValue?: 'text' | 'number' | 'phone' | 'email' | 'json' | 'title' | 'url' | 'object';
    name: string;
    customValue?: Object;
    id?: string;
    colorTag?: string;
}
export interface IBlockDefinition {
    tag: ITags;
    name: string;
    typeValue: 'text' | 'number' | 'phone' | 'email' | 'json' | 'title' | 'url' | 'object';
    customValue?: object;
    id?: string;
    colorTag?: string;
}
export const generateBlockDefinition = (config: ConfigBlock): IBlockDefinition => {

    if (config.customValue !== undefined) {
        return {
            tag: config.tag,
            name: config.name,
            typeValue: 'object',
            customValue: config.customValue,
            id: config?.id,
            colorTag: blue[400]
        }
    }
    return {
        tag: config.tag,
        name: config.name,
        typeValue: config.typeValue || 'text',
        id: config?.id,
        colorTag: blue[400]
    }
}
export const blockList: IBlockDefinition[] = [
    generateBlockDefinition({ name: 'Text', tag: 'p' }),
    generateBlockDefinition({ name: 'Title 1', tag: 'h1' }),
    generateBlockDefinition({ name: 'Title 2', tag: 'h2' }),
    generateBlockDefinition({ name: 'Imagen', tag: 'img', typeValue: 'url' }),
    generateBlockDefinition({ name: 'Link', tag: 'link', typeValue: 'text' }),

]

import { useCallback } from "react";
import { useGlobal } from "../hooks";
import { IBlueprints } from "../components/Structures/structure";
import { formartObject, stringPathObject } from "./formatObject";
import { local } from "./localStore";


/**
 * @params key 'nameTag#nameElement:idBluePrint'
 * @example const searchBlock=useSearchBlock();
 *          searchBlock('titulo1#h1:header');
 * @returns path -> ruta de donde esta ubicado el blueprint en el objeto `selectedStructure`
 *          bluePrint -> El objeto IBluePrint
 */
export const useSearchBlock = () => {
    const { values: { selectedStructure } } = useGlobal()

    return useCallback((id: string) => {
        const key = id.split(':');
        let path = (local.getItem(`path-${selectedStructure.name}:${key[1]}`) || '').replaceAll('[', '.').replaceAll(']', '.').replaceAll('..', '.');
        if (path[path.length - 1] === '.') {
            path = path + '#';
            path = path.replace('.#', '');
        }
        const bluePrint: IBlueprints = {
            id: '',
            x: [0, 0],
            y: [0, 0],
        }

        // selectedStructure.blueprints.forEach((e, i) => {
        //     //console.log(e.id, key[1])}
        //     console.log()
        //     if (e.id === key[1]) {
        //         bluePrint.children = e.children;
        //         bluePrint.id = e.id;
        //         bluePrint.x = e.x;
        //         bluePrint.y = e.y;
        //         // if (path !== '') {
        //         //     path += `.${i}`;
        //         //     return
        //         // }
        //         // path += `${i}`
        //         return;
        //     };
        // })

        const data = stringPathObject<IBlueprints>(path, selectedStructure);

        return {
            bluePrint: data,
            path
        }
    }, [selectedStructure])
}
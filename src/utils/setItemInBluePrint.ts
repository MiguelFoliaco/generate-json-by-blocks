import { IElementAttributes } from "types-render-json"
import { useGlobal } from "../hooks";

export const useManageElement = () => {
    const { values: { selectedStructure } } = useGlobal();
    const setElement = (
        id: string,
        targetSelected: IElementAttributes & { colorTag?: string }
            | (IElementAttributes & { colorTag?: string })[]
    ) => {
        const el = getFnElement(id, selectedStructure.name);
        if (el !== null && !(targetSelected instanceof Array)) {
            el.push(targetSelected);
            localStorage.setItem(`${selectedStructure.name}:node-item-id:${id}`, JSON.stringify(el));
            return;
        }

        // const newEl = el.concat(targetSelected)
        // console.log("isArray", newEl)
        // console.log("targetSelected", targetSelected)
        // console.log("el", el)
        localStorage.setItem(`${selectedStructure.name}:node-item-id:${id}`, JSON.stringify(targetSelected))
    }
    const getElement = (id: string) => {
        try {
            const el = localStorage.getItem(`${selectedStructure.name}:node-item-id:${id}`);
            if (el === null) return [];
            return (JSON.parse(el) as (IElementAttributes & { colorTag?: string })[]);
        }
        catch (err) {
            console.log(err);
            return ([]);
        }
    }
    return {
        setElement,
        getElement,
    }
}
export const setFnElement = (id: string, targetSelected: IElementAttributes & { colorTag?: string } | (IElementAttributes & { colorTag?: string })[]) => {
    localStorage.setItem(`node-item-id:${id}`, JSON.stringify([targetSelected]))
}
export const getFnElement = (id: string, structureName: string) => {
    try {

        const el = localStorage.getItem(`${structureName}:node-item-id:${id}`);
        return el === null ? [] : JSON.parse(el) as (IElementAttributes & { colorTag?: string })[];
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

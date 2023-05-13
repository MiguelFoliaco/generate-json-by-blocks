import { useCallback, useState } from "react"
import { IElementAttributes } from "types-render-json"
import { useGlobal } from "../hooks";

export const useManageElement = () => {
    const { values: { selectedStructure } } = useGlobal();
    const setElement = (id: string, targetSelected: IElementAttributes & { colorTag?: string }) => {
        const el = getFnElement(id);
        if (el !== null) {
            el.push(targetSelected);
            localStorage.setItem(`${selectedStructure.name}:node-item-id:${id}`, JSON.stringify(el));
            return;
        }
        localStorage.setItem(`node-item-id:${id}`, JSON.stringify([targetSelected]))
    }
    const getElement = (id: string) => {
        try {
            console.log(id)
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
export const setFnElement = (id: string, targetSelected: IElementAttributes & { colorTag?: string }) => {
    localStorage.setItem(`node-item-id:${id}`, JSON.stringify([targetSelected]))
}
export const getFnElement = (id: string) => {
    try {

        const el = localStorage.getItem(`node-item-id:${id}`);
        return el === null ? [] : JSON.parse(el) as (IElementAttributes & { colorTag?: string })[];
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

import { useCallback } from "react"
import { ITags } from "types-render-json/src/tags";
import { useGlobal } from "../../../hooks";
import { IElementAttributesBlock } from "types-render-json";
type props = {
    name: string;
    colorTag: string;
}

export const useUpdateTagSelector = () => {
    const { actions: { setTargetSelected, setMinizeModalForm } } = useGlobal()
    return useCallback((prop: props & IElementAttributesBlock) => {
        if (typeof prop === 'string') return;
        switch (prop.target) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                setTargetSelected({
                    target: prop.target,
                    text: prop.text,
                    name: prop.name,
                    colorTag: prop.colorTag
                })
                break;
            case 'p':
                setTargetSelected({
                    target: prop.target,
                    text: prop.text,
                    name: prop.name,
                    colorTag: prop.colorTag
                });
                break;

            case 'link':
                setTargetSelected({
                    target: prop.target,
                    text: prop.text,
                    href: prop.href,
                    name: prop.name,
                    variant: prop.variant,
                    color: prop.color,
                    colorTag: prop.colorTag
                });
                break;
        }
        setMinizeModalForm(true);
        return;
    }, [setTargetSelected])
}
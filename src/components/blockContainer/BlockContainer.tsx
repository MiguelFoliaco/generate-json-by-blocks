import { DragEvent, useEffect } from 'react';
import { Box, Checkbox, FormControl } from "@mui/material"
import { useGlobal } from "../../hooks"
import { useState } from "react";
import { ID, local, useSearchBlock } from "../../utils";
import { IBlueprints } from "../Structures/structure";
import { Tool } from '../Tool/Tool';
import { getFnElement, useManageElement } from '../../utils/setItemInBluePrint';
import { stringPathNewObject } from '../../utils/formatObject';

const dataTransfer = new DataTransfer();

export const BlockContainer = () => {

    const { values: { selectedStructure, blockSelected, targetSelected }, actions: { setTargetSelected, setBlockSelected, } } = useGlobal();
    const { getElement, setElement } = useManageElement();
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(true);
    const [named, setNamed] = useState(false);
    const searchBlock = useSearchBlock()

    const draggingOver = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }
    const onDrop = (evt: DragEvent<HTMLDivElement>, newBluePrint: string) => {
        const itemID = dataTransfer.getData('blockId');
        const nameTag = itemID.replaceAll(':', '#').split('#');
        const { bluePrint, path } = searchBlock(itemID);
        console.log("container", bluePrint)
        let tags = getElement(`${bluePrint.id}`);
        const indexTag = tags.findIndex(e => {
            if (typeof e !== 'string') {
                if (e.name === nameTag[0] && e.target === nameTag[1]) {
                    return true;
                }
                return false;
            }
            return false;
        })
        if (indexTag === -1) {
            console.log(path)
            console.log('Error en drop', indexTag)
            console.log('Error en drop', bluePrint.id)
            console.log('Error en drop', tags)
            evt.stopPropagation();
            return evt.preventDefault();
        }

        const copyTagDel = tags[indexTag];
        //@ts-ignore
        tags[indexTag] = [];
        const newTagDeleted = tags.flat(99999);
        console.log(tags)
        setElement(`${bluePrint.id}`, newTagDeleted)
        setElement(`${newBluePrint}`, copyTagDel);
        setCount(count + 1);
        // const newBluePrint = stringPathNewObject<any>({
        //     newValue: [],
        //     path: path,
        //     oldObject: selectedStructure.blueprints
        // });
        // console.log("old Element", selectedStructure);
        // console.log("New Element", Object.values(newBluePrint).flat(999999999));
    }

    const startDrag = (nameComponent: string, idBluePrint: string, evet: DragEvent<HTMLSpanElement>) => {
        dataTransfer.setData("blockId", `${nameComponent}:${idBluePrint}`)
    }
    useEffect(() => {
        if (count !== 0) {
            setTargetSelected(undefined);
            setBlockSelected(undefined);
        }
    }, [count]);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', width: '200px', top: 10, margin: 'auto', left: 0, right: 0, backgroundColor: '#111111', padding: 0.5, borderRadius: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>

                    Border:
                    <FormControl>
                        <Checkbox aria-label="border" checked={checked} onChange={e => {
                            setChecked(e.target.checked)
                        }}
                        />
                    </FormControl>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
                    Show Name:
                    <FormControl>
                        <Checkbox aria-label="named" checked={named} onChange={e => {
                            setNamed(e.target.checked)
                        }}
                        />
                    </FormControl>
                </div>
            </Box>
            <Tool />
            <div className='block-container'>
                {
                    selectedStructure.blueprints.map((blueprints, index) => {
                        const element = getElement(blueprints.id)
                        local.setItem(`path-${selectedStructure.name}:${blueprints.id}`, `blueprints[${index}]`)
                        return (
                            <div
                                onClick={() => {
                                    if (targetSelected === undefined) {
                                        alert('Debe seleccionar un elemento');
                                        setCount(count + 1)
                                        return
                                    }
                                    setCount(count + 1);
                                    setElement(blueprints.id, targetSelected)
                                }}
                                onDragOver={draggingOver}
                                onDrop={(event) => onDrop(event, blueprints.id)}
                                className={`${checked ? "item-grid" : undefined} ${blueprints?.children !== undefined && 'children-container'} ${blockSelected !== undefined && 'latencia'} `} key={ID(12)} style={{
                                    gridColumnStart: (blueprints.x[0] + 1),
                                    gridColumnEnd: (blueprints.x[1] + 1),
                                    gridRowStart: (blueprints.y[0] + 1),
                                    gridRowEnd: (blueprints.y[1] + 1),
                                    position: 'relative'
                                }}>
                                {
                                    named && <span className='named-blueprint'>{blueprints.id}</span>
                                }
                                {
                                    element.map(el => (
                                        el !== undefined && (
                                            <span
                                                className='value-blueprint-children'
                                                style={{ backgroundColor: (typeof el !== 'string') ? el?.colorTag : undefined }}
                                                key={ID(15)}
                                                onDrag={(evet) => startDrag(`${(typeof el !== 'string') ? `${el.name}#${el.target}` || '' : el}`, blueprints.id, evet)}
                                                draggable
                                            >
                                                {(typeof el !== 'string') && `${el.name} -  ${el.target}`}
                                            </span>
                                        )
                                    ))
                                }
                                {
                                    blueprints?.children !== undefined ?
                                        <GenerateContainerChildren blueprint={blueprints.children} checked={checked} named={named} onDrop={onDrop} startDrag={startDrag} pathParent={blueprints.id} />
                                        //generateContainerChildren(blueprints.children, checked, onDrop, named)
                                        : null
                                }
                            </div>
                        )
                    }
                    )
                }
            </div >
        </>
    )
}

type props = {
    blueprint: IBlueprints[];
    checked: boolean;
    onDrop: (evt: DragEvent<HTMLDivElement>, newBlueprintId: string) => void;
    startDrag: (nameComponent: string, idBluePrint: string, evet: DragEvent<HTMLSpanElement>) => void;
    named: boolean;
    pathParent: string;
}

const GenerateContainerChildren = ({ blueprint, checked, named, onDrop, startDrag, pathParent }: props) => {
    const { values: { blockSelected, targetSelected, selectedStructure }, actions: { setTargetSelected, setBlockSelected } } = useGlobal();
    const [count, setCount] = useState(0);
    const { getElement, setElement } = useManageElement();
    const path = (childNamed: string) => `${pathParent}>${childNamed}`
    useEffect(() => {
        if (count !== 0) {
            setTargetSelected(undefined);
            setBlockSelected(undefined);
        }
    }, [count]);
    return <>
        {blueprint.map((print, index) => {
            const element = getElement(print.id);
            local.setItem(`path-${selectedStructure.name}:${print.id}`, `${local.getItem(`path-${selectedStructure.name}:${pathParent}`)}.children[${index}]`)
            return (
                <div
                    onClick={(e) => {
                        if (targetSelected === undefined) {
                            alert('Debe seleccionar un elemento');
                            e.stopPropagation();
                            return
                        }
                        setElement(print.id, targetSelected)
                        setCount(count + 1)
                        e.stopPropagation();
                    }}
                    className={`${checked ? "item-grid" : undefined} ${blockSelected !== undefined && 'latencia'}`} key={ID(12)}
                    onDrop={(event) => onDrop(event, print.id)}
                    style={{
                        gridColumnStart: (print.x[0] + 1),
                        gridColumnEnd: (print.x[1] + 1),
                        gridRowStart: (print.y[0] + 1),
                        gridRowEnd: (print.y[1] + 1),
                        position: 'relative',
                    }}>
                    {named && <span className='named-blueprint'>{print.id}</span>}
                    {
                        element.map(el => (
                            <span
                                key={ID(10)}
                                className=' value-blueprint-children'
                                draggable
                                onDrag={(event) => startDrag(`${(typeof el !== 'string') ? `${el.name}#${el.target}` || '' : el}`, print.id, event)}
                                style={{ backgroundColor: (typeof el !== 'string') ? el?.colorTag : undefined }}
                            >
                                {(typeof el !== 'string') && `${el.name} -  ${el.target}`}
                            </span>
                        ))
                    }
                    {
                        print?.children !== undefined ? <GenerateContainerChildren blueprint={print.children} checked={checked} named={named} onDrop={onDrop} startDrag={startDrag} pathParent={print.id} /> : null
                    }
                </div >
            )
        })}
    </>
}
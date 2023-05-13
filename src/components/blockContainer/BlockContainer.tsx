import { DragEvent, useEffect } from 'react';
import { Box, Checkbox, FormControl } from "@mui/material"
import { useGlobal } from "../../hooks"
import { useState } from "react";
import { ID } from "../../utils";
import { IBlueprints } from "../Structures/structure";
import { Tool } from '../Tool/Tool';
import { useManageElement } from '../../utils/setItemInBluePrint';

const dataTransfer = new DataTransfer();

export const BlockContainer = () => {

    const { values: { selectedStructure, blockSelected, targetSelected }, actions: { setTargetSelected, setBlockSelected } } = useGlobal();
    const { getElement, setElement } = useManageElement();
    const [id, setId] = useState('');
    const [checked, setChecked] = useState(true);
    const [named, setNamed] = useState(false);

    const draggingOver = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }
    const onDrop = (evt: DragEvent<HTMLDivElement>) => {
        const itemID = dataTransfer.getData('blockId');
        console.log(itemID)
    }

    const startDrag = (nameComponent: string, idBluePrint: string) => {
        dataTransfer.setData("blockId", `${nameComponent}:${idBluePrint}`);
    }
    useEffect(() => {
        if (id !== '') {
            setTargetSelected(undefined);
            setBlockSelected(undefined);
        }
    }, [id]);

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
                    selectedStructure.blueprints.map(blueprints => {
                        const element = getElement(blueprints.id)
                        return (
                            <div
                                onClick={() => {
                                    if (targetSelected === undefined) {
                                        alert('Debe seleccionar un elemento');
                                        setId(blueprints.id)
                                        return
                                    }
                                    setId(blueprints.id);
                                    setElement(blueprints.id, targetSelected)
                                }}
                                onDragOver={draggingOver}
                                onDrop={onDrop}
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
                                            <span className='value-blueprint-children' style={{ backgroundColor: (typeof el !== 'string') ? el?.colorTag : undefined }} key={ID(15)}
                                                onDrag={() => startDrag(`${(typeof el !== 'string') ? el.name || '' : el}`, blueprints.id)}
                                                draggable
                                            >
                                                {(typeof el !== 'string') && `${el.name} -  ${el.target}`}
                                            </span>
                                        )
                                    ))
                                }
                                {
                                    blueprints?.children !== undefined ?
                                        <GenerateContainerChildren blueprint={blueprints.children} checked={checked} named={named} onDrop={onDrop} />
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
    blueprint: IBlueprints[], checked: boolean, onDrop: (evt: DragEvent<HTMLDivElement>) => void, named: boolean
}

const GenerateContainerChildren = ({ blueprint, checked, named, onDrop }: props) => {
    const { values: { blockSelected, targetSelected, selectedStructure }, actions: { setTargetSelected, setBlockSelected } } = useGlobal();
    const [id, setId] = useState('');
    const { getElement, setElement } = useManageElement();
    useEffect(() => {
        if (id !== '') {
            setTargetSelected(undefined);
            setBlockSelected(undefined);
        }
    }, [id]);
    return <>
        {blueprint.map(print => {
            const element = getElement(print.id);
            return (
                <div
                    onClick={(e) => {
                        if (targetSelected === undefined) {
                            alert('Debe seleccionar un elemento');
                            e.stopPropagation();
                            return
                        }
                        setElement(print.id, targetSelected)
                        setId(print.id)
                        e.stopPropagation();
                    }}
                    className={`${checked ? "item-grid" : undefined} ${blockSelected !== undefined && 'latencia'}`} key={ID(12)}
                    onDrop={onDrop}
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
                            <span key={ID(10)} className=' value-blueprint-children' style={{ backgroundColor: (typeof el !== 'string') ? el?.colorTag : undefined }}>
                                {(typeof el !== 'string') && `${el.name} -  ${el.target}`}
                            </span>
                        ))
                    }
                    {
                        print?.children !== undefined ? <GenerateContainerChildren blueprint={print.children} checked={checked} named={named} onDrop={onDrop} /> : null
                    }
                </div >
            )
        })}
    </>
}
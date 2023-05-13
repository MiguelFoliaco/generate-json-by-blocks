import { DragEvent } from 'react';
import { Box, Checkbox, FormControl } from "@mui/material"
import { useGlobal } from "../../hooks"
import { useState } from "react";
import { ID } from "../../utils";
import { IBlueprints } from "../Structures/structure";
import { IBlockDefinition } from '../blockList/blocksList';

export const BlockContainer = () => {

    const { values: { selectedStructure, } } = useGlobal();
    const [checked, setChecked] = useState(true);
    const [named, setNamed] = useState(false);

    const draggingOver = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }
    const onDrop = (evt: DragEvent<HTMLDivElement>) => {
        const itemID = evt.dataTransfer.getData('blockName');
        console.log(evt.dataTransfer.items)
        console.log(itemID)
    }

    const startDrag = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('blockName', "Hola");
    }

    return (
        <>
            <div onDrag={startDrag} draggable>
                j
            </div>
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
            <div className='block-container'>
                {
                    selectedStructure.blueprints.map(blueprints => (
                        <div
                            onDragOver={draggingOver}
                            onDrop={onDrop}
                            className={`${checked ? "item-grid" : undefined} ${blueprints?.children !== undefined && 'children-container'} `} key={ID(12)} style={{
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
                                blueprints?.children !== undefined ?
                                    generateContainerChildren(blueprints.children, checked, onDrop, named)
                                    : null
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const generateContainerChildren = (blueprint: IBlueprints[], checked: boolean, onDrop: (evt: DragEvent<HTMLDivElement>) => void, named: boolean) => {
    return <>
        {blueprint.map(print => (
            <div className={checked ? "item-grid" : undefined} key={ID(12)}
                onDrop={onDrop}
                style={{
                    gridColumnStart: (print.x[0] + 1),
                    gridColumnEnd: (print.x[1] + 1),
                    gridRowStart: (print.y[0] + 1),
                    gridRowEnd: (print.y[1] + 1),
                    position: 'relative'
                }}>
                {named && <span className='named-blueprint'>{print.id}</span>}
                {
                    print?.children !== undefined ? generateContainerChildren(blueprint, checked, onDrop, named) : null
                }
            </div >
        ))}
    </>
}
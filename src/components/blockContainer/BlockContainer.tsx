import { Box, Checkbox, FormControl } from "@mui/material"
import { useGlobal } from "../../hooks"
import { useState } from "react";
import { ID } from "../../utils";

export const BlockContainer = () => {

    const { values: { selectedStructure, } } = useGlobal();
    const [checked, setChecked] = useState(true);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', width: '100px', top: 10, margin: 'auto', left: 0, right: 0, backgroundColor: '#111111', padding: 0.5, borderRadius: 1 }}>
                Border:
                <FormControl>
                    <Checkbox aria-label="border" checked={checked} onChange={e => {
                        setChecked(e.target.checked)
                    }}
                    />
                </FormControl>
            </Box>
            <div className='block-container'>
                {
                    selectedStructure.blueprints.map(blueprints => (
                        <div className={`${checked ? "item-grid" : undefined} ${blueprints?.children !== undefined && 'children-container'} `} key={ID(12)} style={{
                            gridColumnStart: (blueprints.x[0] + 1),
                            gridColumnEnd: (blueprints.x[1] + 1),
                            gridRowStart: (blueprints.y[0] + 1),
                            gridRowEnd: (blueprints.y[1] + 1)
                        }}>
                            {blueprints?.children !== undefined &&
                                blueprints?.children.map(chil => (
                                    <div className={checked ? "item-grid" : undefined} key={ID(12)} style={{
                                        gridColumnStart: (chil.x[0] + 1),
                                        gridColumnEnd: (chil.x[1] + 1),
                                        gridRowStart: (chil.y[0] + 1),
                                        gridRowEnd: (chil.y[1] + 1)
                                    }}>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}
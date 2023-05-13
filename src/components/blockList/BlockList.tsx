import { List, ListItem, ListItemButton } from "@mui/material"
import { CancelRounded } from '@mui/icons-material'
import { useGlobal } from "../../hooks"
import { ID } from "../../utils";
import { DragEvent } from "react";
import { IBlockDefinition } from "./blocksList";

export const BlocksList = () => {
    const { values: { blockList, blockSelected }, actions: { setBlockSelected } } = useGlobal();

    return (
        <div className='block-list'>
            <List>
                <ListItem>
                    <ListItemButton
                        onClick={() => setBlockSelected(undefined)}
                    >
                        Deseleccionar <CancelRounded sx={{ ml: 1 }} color='error' />
                    </ListItemButton>
                </ListItem>
                {
                    blockList.map(block => (
                        <ListItem key={block.id || ID(24)}>
                            <ListItemButton
                                onClick={() => setBlockSelected(block)}
                                selected={block.name === blockSelected?.name}
                            >{block.name}
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}
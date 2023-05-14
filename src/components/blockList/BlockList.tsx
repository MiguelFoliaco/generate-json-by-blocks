import { List, ListItem, ListItemButton } from "@mui/material"
import { CancelRounded } from '@mui/icons-material'
import { useGlobal } from "../../hooks"
import { ID } from "../../utils";

export const BlocksList = () => {
    const { values: { blockList, blockSelected }, actions: { setBlockSelected, setMinizeModalForm } } = useGlobal();

    return (
        <div className='block-list'>
            <List>
                <ListItem>
                    <ListItemButton
                        onClick={() => { setBlockSelected(undefined) }}
                    >
                        Deseleccionar <CancelRounded sx={{ ml: 1 }} color='error' />
                    </ListItemButton>
                </ListItem>
                {
                    blockList.map(block => (
                        <ListItem key={block.id || ID(24)}>
                            <ListItemButton
                                onClick={() => { setBlockSelected(block);; setMinizeModalForm(false) }}
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
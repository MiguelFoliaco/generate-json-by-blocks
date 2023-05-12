import { List, ListItem, ListItemButton } from "@mui/material"
import { ID } from "../../utils"
import { useGlobal } from "../../hooks";

export const Structures = () => {
    const { values: { structures, selectedStructure }, actions: { setSelectStructure } } = useGlobal();
    return (
        <div className="block-select-form ">
            <List>
                {
                    structures.map(structure => (
                        <ListItem key={ID(24)}  >
                            <ListItemButton
                                onClick={() => setSelectStructure(structure)}
                                selected={selectedStructure.name === structure?.name}
                            >{structure.name}
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

import { List, ListItem, ListItemButton } from "@mui/material"
import { ID } from "../../utils"
import { useGlobal } from "../../hooks";
import { IStructure } from "./structure";

export const Structures = () => {
    const { values: { structures, selectedStructure }, actions: { setSelectStructure, setTargetSelected, setBlockSelected } } = useGlobal();
    const changeStructure = (structure: IStructure) => {
        const check = confirm('¿Esta seguro que quiere cambiar?\nGuarde los cambios antes de pasar a otra estructura')
        if (check) {
            localStorage.clear();
            setTargetSelected(undefined);
            setBlockSelected(undefined);
            setSelectStructure(structure)
            return;
        }
    }
    return (
        <div className="block-select-form ">
            <List>
                {
                    structures.map(structure => (
                        <ListItem key={ID(24)}  >
                            <ListItemButton
                                onClick={() => changeStructure(structure)}
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

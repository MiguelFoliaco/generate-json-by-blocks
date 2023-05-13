import { FormControl, TextField } from "@mui/material";
import { IBlockDefinition } from "../blockList/blocksList"

type props = {
    blockSelected: IBlockDefinition;
}
/**
 * @description Generar inpus de un formulario desde un objeto tipo IBlockDefinition
 * @param blockSelected type IBlockDefinition
 * @returns JSX.Element
 */
export const GenerateForm = ({ blockSelected }: props) => {

    return <>
        <FormControl fullWidth sx={{ width: '90%', my: 1 }}>
            <TextField
                focused
                color='secondary'
                size="small"
                name="tag"
                label="Tipo de componente"
                value={blockSelected.tag}
                onChange={() => null}
            //className="input-custom"
            />
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', my: 1 }}>
            <TextField
                size="small"
                name="name"
                label="Nombre del componente"
            //className="input-custom"
            />
        </FormControl>
        {
            (blockSelected.typeValue === 'text' || blockSelected.typeValue === 'title') &&
            <>
                <FormControl fullWidth sx={{ width: '90%', mt: 1 }}>
                    <TextField
                        name="value"
                        label="Value"
                        size="small"
                        // className="input-custom"
                        multiline={blockSelected.typeValue === 'title' ? true : false}
                    />
                </FormControl>
            </>
        }
        <FormControl fullWidth sx={{ width: '90%', my: 1 }}>
            <TextField
                size="small"
                name="colorTag"
                type="color"
                label="Nombre del componente"
                defaultValue={blockSelected.colorTag}
            //className="input-custom"
            />
        </FormControl>
    </>
}
import { FormHelperText, TextField, Select as S, Grid, FormLabel, MenuItem } from "@mui/material";
import styled from "styled-components";
import { IBlockDefinition } from "../blockList/blocksList"
import { InputGenerated } from "types-render-json";
import { ID } from "../../utils";
import { blue } from "@mui/material/colors";

type props = {
    blockSelected: IBlockDefinition;
    xs?: number;
}
/**
 * @description Generar inpus de un formulario desde un objeto tipo IBlockDefinition
 * @param blockSelected type IBlockDefinition
 * @returns JSX.Element
 */
export const GenerateForm = ({ blockSelected, xs = 12 }: props) => {
    const schema = generatedSchema(blockSelected)
    return (
        <>
            {schema.map((e) => (
                <Grid item key={ID(11)} xs={xs}>
                    <div style={{ padding: 5, flexDirection: "column", display: "flex" }}>
                        {e.typeValue === "json" ? (
                            <Input
                                color="secondary"
                                type={"text"}
                                name={e.name}
                                defaultValue={e.value}
                                disabled={e.disabled}
                                multiline={true}
                                maxRows={7}
                            />
                        ) : (
                            <>
                                {e.placeHolder && <FormLabel>{e.placeHolder}</FormLabel>}
                                {e.options !== undefined ? (
                                    <Select
                                        color="secondary"
                                        defaultValue={e.value}
                                        name={e.name}
                                        disabled={e.disabled}
                                    >
                                        {e.options.map((opt) => (
                                            <MenuItem value={opt.value} key={ID(11)} >
                                                {opt.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <>
                                        <Input
                                            color="secondary"
                                            type={e.typeValue}
                                            name={e.name}
                                            defaultValue={e.value}
                                            disabled={e.disabled}
                                            multiline={e?.multiline?.active}
                                            rows={e?.multiline?.line}
                                        />
                                    </>
                                )}
                                {e.textHelp && <FormHelperText>{e.textHelp}</FormHelperText>}
                            </>
                        )}
                    </div>
                </Grid>
            ))}
        </>
    );
}

const generatedSchema = (blockSelected: IBlockDefinition): InputGenerated[] => {
    const basic: InputGenerated[] = [{
        name: "target",
        value: blockSelected.tag,
        disabled: true,
        typeValue: 'text',
        placeHolder: 'Tipo'
    },
    {
        name: 'colorTag',
        value: blue[400],
        typeValue: 'color',
        placeHolder: 'Tag Color',
    },
    {
        name: 'name',
        value: '',
        typeValue: 'text',
        placeHolder: 'Nombre del componente',
    },]

    switch (blockSelected.tag) {
        case 'p':
            return [
                ...basic,
                {
                    name: 'text',
                    value: '',
                    typeValue: 'text',
                    placeHolder: 'Texto',
                    multiline: {
                        active: true,
                        line: 5,
                    }
                },
            ];
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return [
                ...basic,
                {
                    name: 'text',
                    value: '',
                    typeValue: 'text',
                    placeHolder: 'Texto',
                },
            ];
        case 'link':
            return [
                ...basic,
                {
                    name: 'href',
                    value: '',
                    typeValue: 'text',
                    placeHolder: 'Ruta',
                    textHelp: 'Example: https://example.com, /home, #home, etc...'
                },
                {
                    name: 'text',
                    value: '',
                    multiline: {
                        active: true,
                        line: 2
                    },
                    typeValue: 'text',
                    placeHolder: 'Texto',
                },
            ]
        default:
            return []
    }

}




export const Input = styled(TextField)`
  input {
    padding: 5px;
  }
`;

export const Select = styled(S)`
  * select {
    padding: 5px;
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
    padding: 5px;
  }
`;
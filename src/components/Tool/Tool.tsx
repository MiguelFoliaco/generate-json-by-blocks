import { Button, FormControl, Grid, IconButton, Paper } from "@mui/material"
import { useGlobal } from "../../hooks"
import { GenerateForm } from "./GenerateForm";
import { OpenInFull, CloseFullscreen } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { formDataToJSON } from "../../utils";
import { ITags } from "types-render-json/src/tags";

export const Tool = () => {
    const { values: { blockSelected, targetSelected }, actions: { setTargetSelected } } = useGlobal();
    const [minimize, setMinimize] = useState(false)

    const noSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newElement = formDataToJSON<{ name: string; value: string, tag: ITags, colorTag: string }>(formData);
        if (newElement.tag === 'h1') {
            setTargetSelected({
                target: newElement.tag,
                text: newElement.value,
                name: newElement.name,
                colorTag: newElement.colorTag
            })
            setMinimize(true);
        }
    }

    return (
        <>
            {
                blockSelected !== undefined ?
                    <div className={`tool-box ${minimize && 'minimize'}`}>
                        <Paper sx={{ height: '100%', width: '100%', p: 0.5, alignItems: 'center', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: minimize ? 'primary.light' : undefined, borderBottomLeftRadius: minimize ? 0 : undefined, borderBottomRightRadius: minimize ? 0 : undefined }}>
                            <Grid container>
                                <Grid item container xs={12} alignItems='center' display={'flex'}>
                                    <Grid item xs={4}>
                                        <span className="title-span" style={{ textAlign: 'left', width: '90%' }}>{blockSelected.name}</span>
                                    </Grid>
                                    <Grid item xs={8} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                        {
                                            minimize ?
                                                <OpenInFull sx={{ ':hover': { color: 'primary.main', cursor: 'pointer' } }} onClick={() => setMinimize(false)} />
                                                :
                                                <CloseFullscreen sx={{ ':hover': { color: 'warning.main', cursor: 'pointer' } }} onClick={() => setMinimize(true)} />
                                        }
                                    </Grid>
                                </Grid>
                                {
                                    !minimize &&
                                    <Grid item xs={12}>
                                        <form onSubmit={noSubmit}>
                                            <GenerateForm blockSelected={blockSelected} />
                                            <FormControl fullWidth sx={{ my: 2, px: 2 }}>
                                                <Button variant='contained' type="submit" >Guardar</Button>
                                            </FormControl>
                                        </form>
                                    </Grid>
                                }
                            </Grid>
                        </Paper>
                    </div >
                    :
                    null
            }
        </>
    )
}

import { Button, FormControl, Grid, IconButton, Paper } from "@mui/material"
import { useGlobal } from "../../hooks"
import { GenerateForm } from "./GenerateForm";
import { OpenInFull, CloseFullscreen } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { formDataToJSON } from "../../utils";
import { ITags } from "types-render-json/src/tags";
import { useUpdateTagSelector } from "./Tags/UpdateTagSelector";
import { IElementAttributes, IElementAttributesBlock } from "types-render-json";

export const Tool = () => {
    const { values: { blockSelected, minizeModalForm, targetSelected }, actions: { setMinizeModalForm } } = useGlobal();
    const updateTagSelector = useUpdateTagSelector()

    const noSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newElement = formDataToJSON<{ name: string; colorTag: string; } & IElementAttributesBlock>(formData);
        console.log(targetSelected)
        //@ts-ignore
        updateTagSelector({ ...newElement, target: blockSelected.tag })
    }

    return (
        <>
            {
                blockSelected !== undefined ?
                    <div className={`tool-box ${minizeModalForm && 'minimize'}`}>
                        <Paper sx={{ width: '100%', p: 0.5, alignItems: 'center', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: minizeModalForm ? 'primary.light' : undefined, borderBottomLeftRadius: minizeModalForm ? 0 : undefined, borderBottomRightRadius: minizeModalForm ? 0 : undefined }}>
                            <Grid container>
                                <Grid item container xs={12} alignItems='center' display={'flex'} sx={{ position: 'sticky', top: 0,zIndex:201, backgroundColor: '#1e1e1e', height: '30px' }}>
                                    <Grid item xs={4} onClick={() => setMinizeModalForm(!minizeModalForm)} sx={{ cursor: 'pointer' }}>
                                        <span className="title-span" style={{ textAlign: 'left', width: '90%' }}>{blockSelected.name}</span>
                                    </Grid>
                                    <Grid onClick={() => setMinizeModalForm(!minizeModalForm)} sx={{ cursor: 'pointer' }} item xs={8} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                        {
                                            minizeModalForm ?
                                                <OpenInFull sx={{ ':hover': { color: 'primary.main', cursor: 'pointer' } }} onClick={() => setMinizeModalForm(false)} />
                                                :
                                                <CloseFullscreen sx={{ ':hover': { color: 'warning.main', cursor: 'pointer' } }} onClick={() => setMinizeModalForm(true)} />
                                        }
                                    </Grid>
                                </Grid>
                                {
                                    !minizeModalForm &&
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

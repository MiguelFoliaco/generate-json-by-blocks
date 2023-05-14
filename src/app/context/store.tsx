import { Dispatch, SetStateAction, useState } from "react";
import { IRootJSONEntry, IElementAttributes } from 'types-render-json/src'
import { ITheme, theme as T } from "../theme";
import { IBlockDefinition, blockList as blocks } from "../../components/blockList/blocksList";
import { structures as Structure, IStructure } from "../../components/Structures/structure";
import { jsonFake } from "../../data/entry";

export const useAppStore = (): IAppContext => {
  //* JSON
  const [theme, setTheme] = useState<ITheme>(T);
  const [blockList, setBlockList] = useState(blocks);
  const [blockSelected, setBlockSelected] = useState<IBlockDefinition | undefined>();
  const [structures, setStructures] = useState(Structure);
  const [selectedStructure, setSelectStructure] = useState(Structure[0])
  const [json, setJson] = useState(jsonFake);
  const [targetSelected, setTargetSelected] = useState<undefined | IElementAttributes>();
  const [minizeModalForm, setMinizeModalForm] = useState(false);

  return {
    values: {
      minizeModalForm,
      theme,
      blockList,
      blockSelected,
      selectedStructure,
      structures,
      json,
      targetSelected
    },
    actions: {
      setMinizeModalForm,
      setTheme,
      setBlockList,
      setBlockSelected,
      setStructures,
      setSelectStructure,
      setJson,
      setTargetSelected
    },
  };
};

export interface IAppContext {
  values: {
    minizeModalForm: boolean;
    theme: ITheme;
    blockList: IBlockDefinition[];
    blockSelected: IBlockDefinition | undefined;
    structures: IStructure[];
    selectedStructure: IStructure;
    json: IRootJSONEntry;
    targetSelected: IElementAttributes & { colorTag?: string } | undefined;
  };
  actions: {
    setMinizeModalForm: Dispatch<SetStateAction<boolean>>;
    setTheme: Dispatch<SetStateAction<ITheme>>;
    setBlockList: Dispatch<SetStateAction<IBlockDefinition[]>>;
    setBlockSelected: Dispatch<SetStateAction<IBlockDefinition | undefined>>;
    setStructures: Dispatch<SetStateAction<IStructure[]>>;
    setSelectStructure: Dispatch<SetStateAction<IStructure>>;
    setJson: Dispatch<SetStateAction<IRootJSONEntry>>;
    setTargetSelected: Dispatch<SetStateAction<IElementAttributes & { colorTag?: string } | undefined>>;
  };
}

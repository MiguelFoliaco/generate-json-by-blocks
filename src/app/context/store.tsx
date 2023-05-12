import React, { Dispatch, SetStateAction, useState } from "react";
import { ITheme, theme as T } from "../theme";
import { IBlockDefinition, blockList as blocks } from "../../components/blockList/blocksList";
import { structures as Structure, IStructure } from "../../components/Structures/structure";

export const useAppStore = (): IAppContext => {
  //* JSON
  const [theme, setTheme] = useState<ITheme>(T);
  const [blockList, setBlockList] = useState(blocks);
  const [blockSelected, setBlockSelected] = useState<IBlockDefinition | undefined>();
  const [structures, setStructures] = useState(Structure);
  const [selectedStructure, setSelectStructure] = useState(Structure[0])
  return {
    values: {
      theme,
      blockList,
      blockSelected,
      selectedStructure,
      structures
    },
    actions: {
      setTheme,
      setBlockList,
      setBlockSelected,
      setStructures,
      setSelectStructure
    },
  };
};

export interface IAppContext {
  values: {
    theme: ITheme;
    blockList: IBlockDefinition[];
    blockSelected: IBlockDefinition | undefined;
    structures: IStructure[];
    selectedStructure: IStructure;
  };
  actions: {
    setTheme: Dispatch<SetStateAction<ITheme>>;
    setBlockList: Dispatch<SetStateAction<IBlockDefinition[]>>;
    setBlockSelected: Dispatch<SetStateAction<IBlockDefinition | undefined>>;
    setStructures: Dispatch<SetStateAction<IStructure[]>>;
    setSelectStructure: Dispatch<SetStateAction<IStructure>>;
  };
}

import { Structures } from "../../components/Structures/Structures";
import { BlockContainer } from "../../components/blockContainer/BlockContainer";
import { BlocksList } from "../../components/blockList/BlockList";

export const Index = () => {

  return (
    <div>
      <h1>App de Bloques</h1>
      <div className="container">
        <BlocksList />
        <BlockContainer />
        <Structures/>
      </div>
    </div>
  );
};

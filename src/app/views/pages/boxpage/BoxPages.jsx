import Content from "../../../components/dropdrapbox/Content"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function BoxPages() {
  return (
    <div >
      <h1 className='big-title'>React Drag & Drop Playground</h1>
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </div>
  );
}

export default BoxPages;

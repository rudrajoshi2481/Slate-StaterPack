import React, { useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

function EditorMain03() {
  const [value, setValue] = React.useState(initialValue);
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );

  const Element = ({attributes,children,element}) => {
      return <p {...attributes}>{children}</p>
  }

  const Leaf = ({attributes,children,leaf}) => {

    if(leaf.bold){
        children = <strong>{children}</strong>
    }
    if(leaf.italic){
        children = <i style={{color:'tomato'}}>{children}</i>
    }

    return <span {...attributes}>{children}</span>
  }


  const renderElement = React.useCallback(props => <Element {...props}/>,[])
  const renderLeaf = React.useCallback(props => <Leaf {...props}/>,[])

  const isMarkActive = (editor,format) => {
      const mark = Editor.marks(editor);

    //   console.log(mark);
      return mark ? mark[format] === true : false;
  }

  const toggleMark = (editor,format) => {
      console.log(Editor);
      const isActive = isMarkActive(editor,format)

      if(isActive){
          Editor.removeMark(editor,format);
      }else{
          Editor.addMark(editor,format,true);
      }
  }

  return (
    <div>
        {JSON.stringify(value)}
      <Slate value={value} editor={editor} onChange={(e) => setValue(e)}>

<div>
    <button onMouseDown={e => {e.preventDefault();toggleMark(editor,'bold')}}>Bold</button>
    <button onMouseDown={e => {e.preventDefault();toggleMark(editor,'italic')}}>Bold</button>
</div>

        <Editable
            renderLeaf={renderLeaf}
            renderElement={renderElement}
        />
      </Slate>
    </div>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];


export default EditorMain03;

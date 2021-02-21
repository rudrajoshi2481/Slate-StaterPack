import React from "react";
import { createEditor, Editor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";

function EditorMain() {
  const [value, setValue] = React.useState([
    {
      children: [
        { text: "This is editable plain text, just like a <textarea>!" },
      ],
    },
  ]);

  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );


  const isMarkActive = (editor,format) => {
        const marks = Editor.marks(editor);

        // console.log(marks.bold,format);

        return marks ? marks.bold === true : false

}
  
  const toggleMark = (editor,format) =>{
        const isActive = isMarkActive (editor,format);
        console.log(isActive);

        if(isActive){
            Editor.removeMark(editor,format)
        }else{
            Editor.addMark(editor,format,true)
        }

    }

    const renderLeaf = React.useCallback(props => <Leaf {...props}/>,[])

    const Leaf = ({attributes,children,leaf}) => {
        if(leaf.bold){
            children = <strong>{children}</strong>
        }

        return <p {...attributes}>{children}</p>
    }

  return (
    <div style={{ backgroundColor: "wheat" }}>
        {JSON.stringify(value)}
        <hr />
      <Slate
        editor={editor}
        value={value}
        onChange={(e) => {
          setValue(e);
        //   console.log(e, editor);
        }}
      >
        <Editable  onKeyDown={e => {
            if(e.ctrlKey && (e.key === 's')){
                console.log("WORKED");
                e.preventDefault()
            }
        
            if(e.ctrlKey && (e.key === 'b')){
                e.preventDefault();

                toggleMark(editor,'bold');
                console.log(value);
            }

        }}
        
        renderLeaf={renderLeaf}
        
        />
      </Slate>
    </div>
  );

  


}




export default EditorMain;

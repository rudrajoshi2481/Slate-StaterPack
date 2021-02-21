import React, { useState } from "react";
import { createEditor, Editor,Element as SlateElement, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

function EditorMain04() {
  const [value, setValue] = React.useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );

  const isBlockActive = (editor,format) => {
    const [match] = Editor.nodes(editor,{
        match:n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    })

    console.log(!!match);
    return !!match;
  }

 const toggleBlock = (editor,format) => {
    console.log(format);

    const isActive = isBlockActive(editor,format)

  
    Transforms.setNodes (
        editor,
        {type:isActive ? 'paragraph' : format},
        {match: n => Editor.isBlock(editor,n)}
    )
  
 }


const BlockButton = ({type,value}) => {
    return (
        <button onClick={e => {
            e.preventDefault();
            toggleBlock(editor,value)
        }}>
            {type}
        </button>
    )
}

const Element = ({attributes,element,children}) => {
    switch(element.type){
        case 'h1':
            return <h1 style={{fontSize:'52px',textJustify:''}} {...attributes}>{children}</h1>
        case 'h2':
            return <h2 {...attributes}>{children}</h2>
        case 'span':
            return <span style={{backgroundColor:'whitesmoke'}} {...attributes}>{children}</span>
        case "name":
            return <input style={{fontSize:'52px',textJustify:''}} {...attributes}>{children}</input>
        default :
            return <p {...attributes}>{children}</p>
    }
}

const renderElement = React.useCallback(props => <Element {...props}/>,[])

const MarkButton = ({type,value}) => {
    return(
        <button onClick={e => {
            e.preventDefault()
            const mark = Editor.marks(editor,type)

            console.log(mark);

            if(mark ? mark[type] === true : false){
                Editor.removeMark(editor,type)
            }else{
                
                Editor.addMark(editor,type,true)
            }
        }}>
            {value}
        </button>
    )
}

const LeafElement = ({attributes,children,leaf}) => {
    if(leaf.highlight){
        children = <span style={{borderBottom:"5px solid tomato",fontSize:'32px',backgroundColor:'whitesmoke'}}>{children}</span>
    }

    return <span style={{fontSize:'32px'}} {...attributes}>{children}</span>

}

const renderLeaf = React.useCallback(props => <LeafElement {...props}></LeafElement>)

  return (
    <div>
        {JSON.stringify(value)}
        <br />
        <BlockButton type={"H1"} value="h1"/>
        <BlockButton type={"H2"} value="h2"/>
        <BlockButton type={"input"} value="name"/>
        <BlockButton type={"mark"} value="span"/>
        <MarkButton type={"highlight"} value="highlight"></MarkButton>
        <hr />
      <Slate value={value} editor={editor} onChange={(e) => setValue(e)}>
        <Editable 
            renderElement={renderElement}
            renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );


   
}


export default EditorMain04;

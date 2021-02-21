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



  const withImages = editor => {
    const {insertData,isVoid} =  editor


    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const {files} = data

        console.log(files);

        if(files && files.length > 0){
            for(const file of files){
                const reader = new FileReader()

                // console.log(file);
                reader.readAsDataURL(file);
                // console.log(reader.result);



                reader.addEventListener('load' , () => {
                    // console.log(reader.result,"SOMETHING");

                    
                })


                reader.onprogress = (data) => {
                    var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                    console.log(progress,"PROGRESS");
                }



            }
        }

    }

    return editor
  }



  const editor = React.useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );



  

  return (
    <div style={{ backgroundColor: "wheat" }}>
        {JSON.stringify(value)}
        <hr />
      <Slate
        editor={editor}
        value={value}
        onChange={(e) => {
          setValue(e);
        //   console.log(editor,"ONCHANGE LOG");
        }}
      >
        <Editable />
      </Slate>
    </div>
  );

  


}




export default EditorMain;

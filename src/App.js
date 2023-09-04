import { useState } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "./App.css";

function App() {
  const [editorMaxView, setEditorMaxView] = useState(false);
  const [previewMaxView, setPreviewMaxView] = useState(false);
  const [text, setText] = useState(`# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`);

  marked.setOptions({
    breaks: true,
    highlight: function (e) {
      return Prism.highlight(e, Prism.languages.javascript, "javascript");
    },
  });

  const editorHandler = (event) => {
    event.target.className =
      event.target.className === "fa fa-compress"
        ? "fa fa-arrows-alt"
        : "fa fa-compress";
    setEditorMaxView((prev) => !prev);
  };

  const previewHandler = (event) => {
    event.target.className =
      event.target.className === "fa fa-compress"
        ? "fa fa-arrows-alt"
        : "fa fa-compress";
    setPreviewMaxView((prev) => !prev);
  };

  return (
    <div className="App">
      {!previewMaxView && (
        <div className={editorMaxView ? "editorWrap maximized" : "editorWrap"}>
          <div className="toolbar">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            Editor
            <i className="fa fa-arrows-alt" onClick={editorHandler}></i>
          </div>
          <textarea
            id="editor"
            type="text"
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          ></textarea>
        </div>
      )}

      {!editorMaxView && (
        <div
          className={previewMaxView ? "previewWrap maximized" : "previewWrap"}
        >
          <div className="toolbar">
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            Previewer
            <i className="fa fa-arrows-alt" onClick={previewHandler}></i>
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked(text),
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default App;

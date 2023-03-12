import { useState, useEffect, useRef } from 'react';

function App() {
  const [curl, setCurl] = useState('')
  const [textForReplace, setTextForReplace] = useState('')
  const [replaceChoice, setReplaceChoice] = useState(1)
  const [textReplaceTo, setTextReplaceTo] = useState('http://127.0.0.1:8000')
  const [newCurl, setNewCurl] = useState('')
  const [port, setPort] = useState(8000)
  const [host, setHost] = useState('http://127.0.0.1')
  const textAreaRef = useRef(null);
  const curlRef = useRef(null);

  // useEffect((e) => {
  //   replaceAndCopy()
  //  },[textForReplace, textReplaceTo, replaceChoice])

  const cuzSetPort = (e) => {
    const newPort = e.target.value
    setPort(newPort)
    // 为什么这样不行，数据会慢一步，useEffect可以。
    // console.log(111123232, newPort, port);
    // geneReplacedCurl(curl)
  }

  const geneReplacedCurl = (oldCurl) => {
    setCurl(oldCurl)

    // const oldCurl = e.target.value
    if (!oldCurl) {
      return
    }

    const matchedUrl = oldCurl.match('https?://.*')[0]
    const url = new URL(matchedUrl)

    setTextForReplace(url.origin)
    // setTextReplaceTo(`${host}:${port}`)
    // const newCurl = oldCurl.replace(textForReplace, textReplaceTo)
    // const newCurl = oldCurl.replace(url.origin, `${host}:${port}`)
    // setNewCurl(newCurl)
    // copyToClipboard(newCurl)
  }

  const handleTextForReplaceChange = (e) => {
    setTextForReplace(e.target.value)
    // geneReplacedCurl()
  }

  const handleTextReplaceToChange = (e) => {
    console.log(232323);
    setTextReplaceTo(e.target.value)
    // geneReplacedCurl()
  }

  const replaceAndCopy = (e) => {
    console.log(22222, curl)
    let newOne
    if (replaceChoice === 1) {
      newOne = curl.replace(textForReplace, textReplaceTo)
    } else {
      newOne = curl.replaceAll(textForReplace, textReplaceTo)
    }
    // const newCurl = oldCurl.replace(url.origin, `${host}:${port}`)
    setNewCurl(newOne)
    copyToClipboard(newOne)
  }

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }

  const onClear = (e) => {
    console.log(2323232, e, curlRef);
    setCurl('')
    // curlRef.current.focus()
  }


  return (
    <div className="App">
      <header className="App-header">
        <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center"
        }}
        >
        <textarea 
        ref={curlRef}
        placeholder="Paste raw text here." 
        rows="40"
        cols="55"
        autoFocus
        value={curl}
        // onChange={(v) => geneNewCode(v.target.value)}></textarea>
        onChange={(e) => geneReplacedCurl(e.target.value)}
        ></textarea>
        
        <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
        >
      
        {/* <br /> */}

        Text for Replace:
        <input 
        value={textForReplace}
        onChange={(e) => setTextForReplace(e.target.value)}
        style={{padding: 10}}
        >
        </input>

        Replace to:
        <input 
        value={textReplaceTo}
        onChange={(e) => setTextReplaceTo(e.target.value)}
        style={{padding: 10}}
        >
        </input>

        <div>
        <label for="replaceChoice">replace one</label>
        <input type="radio" id="replaceChoice" checked={replaceChoice === 1} name="replaceChoice" value="replace one" onChange={() => setReplaceChoice(1)} />

        <label for="replaceChoice">replace all</label>
        <input type="radio" id="replaceChoice" checked={replaceChoice === 2} name="replaceChoice" value="replace all" onChange={() => setReplaceChoice(2)} />
        </div>

        <br />
      

        {/* <input type="radio" value="replace all " /> */}

        <button 
        onClick={onClear}
        style={{
          padding: 20
        }}
        >Clear Left</button>
        
        <button
          onClick={replaceAndCopy}
          style={{
          padding: 20
        }}
         >Gene & Copy
        </button> 
        {/* Result will be auto copied! */}



        {/* Map to host:

        <input 
        value={host}
        onChange={(e) => setHost(e.target.value)}
        >
        </input>
         With port：
         
         <button
         onClick={() => setPort(prev => prev - 1)}
         >-</button>
         <input
         placeholder="请输入本地端口" 
         value={port}
         onChange={cuzSetPort}
         >
         </input>
         <button
          onClick={() => setPort(prev => prev + 1)}
         >+</button> */}


        </div>

        {/* <span>8000</span>
        <span>8001</span>
        <span>8002</span>
        <span>8003</span>
        <span>8000</span> */}

        <textarea 
        value={newCurl}
        rows="40"
        cols="55"
        ></textarea>
        </div>

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>

      <form>
        <textarea
          hidden
          ref={textAreaRef}
          value={newCurl}
        />
      </form>

    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';

function App() {
  const [curl, setCurl] = useState('')
  const [newCurl, setNewCurl] = useState('')
  const [port, setPort] = useState(8000)
  const [host, setHost] = useState('http://127.0.0.1')
  const textAreaRef = useRef(null);
  const curlRef = useRef(null);

  useEffect((e) => {
    geneReplacedCurl(curl)
   },[host, port])

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

    const newCurl = oldCurl.replace(url.origin, `${host}:${port}`)
    setNewCurl(newCurl)
    copyToClipboard(newCurl)
  }

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
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
    curlRef.current.focus()
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
        placeholder="请粘贴Curl" 
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
        <button 
        onClick={onClear}
        style={{
          padding: 20
        }}
        >Clear</button>
        <br />
        Map to host:

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
         >+</button>


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

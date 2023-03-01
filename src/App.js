import { useState, useEffect, useRef } from 'react';

function App() {
  const [curl, setCurl] = useState('')
  const [newCurl, setNewCurl] = useState('')
  const [port, setPort] = useState(8000)
  const textAreaRef = useRef(null);

  useEffect((e) => {
    geneReplacedCurl(curl)
   },[port])

  const cuzSetPort = (e) => {
    const newPort = e.target.value
    setPort(newPort)
    // 为什么这样不行，数据会慢一步，useEffect可以。
    // console.log(111123232, newPort, port);
    // geneReplacedCurl(curl)
  }

  const geneReplacedCurl = (oldCurl) => {
    setCurl(oldCurl)

    console.log(8888, oldCurl);
    // const oldCurl = e.target.value
    if (!oldCurl) {
      return
    }
    const matchedUrl = oldCurl.match('https?://.*')[0]
    const url = new URL(matchedUrl)
    console.log(8888, port);

    const newCurl = oldCurl.replace(url.origin, `http://127.0.0.1:${port}`)
    console.log('newCurl', newCurl)
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
  

  return (
    <div className="App">
      <header className="App-header">
        Curl<textarea 
        placeholder="请粘贴CUrl" 
        rows="10"
        cols="50"
        // value={code}
        // onChange={(v) => geneNewCode(v.target.value)}></textarea>
        onChange={(e) => geneReplacedCurl(e.target.value)}></textarea>
        Local Port：<input
         placeholder="请输入本地端口" 
         value={port}
         onChange={cuzSetPort}
         ></input>
        Result：<textarea 
        value={newCurl}
        rows="10"
        cols="50"
        ></textarea>

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>

      <form>
        <textarea
          // hidden
          ref={textAreaRef}
          value={newCurl}
        />
      </form>

    </div>
  );
}

export default App;

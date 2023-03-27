import { useState, useRef } from 'react';

function App() {
  const [curl, setCurl] = useState('')
  const [textForReplace, setTextForReplace] = useState('')
  const [replaceChoice, setReplaceChoice] = useState(1)
  const [textReplaceTo, setTextReplaceTo] = useState('http://127.0.0.1:8000')
  const [newCurl, setNewCurl] = useState('')
  const [hostMap, setHostMap] = useState(localStorage.getItem('hostMap'))
  const textAreaRef = useRef(null);
  const curlRef = useRef(null);

  const calcReplaceTo = (host) => {
    const hostMap = JSON.parse(localStorage.getItem('hostMap') || '{}')
    return hostMap[host] || 'http://127.0.0.1:8000'
  }

  const geneReplacedCurl = (oldCurl) => {
    setCurl(oldCurl)
    if (!oldCurl) {
      return
    }

    const matchedUrl = oldCurl.match('https?://.*')[0]
    const url = new URL(matchedUrl)
    setTextForReplace(url.origin)

    const replaceTo = calcReplaceTo(url.origin)
    setTextReplaceTo(replaceTo)
  }


  const replaceAndCopy = (e) => {
    let newOne
    if (replaceChoice === 1) {
      newOne = curl.replace(textForReplace, textReplaceTo)
    } else {
      newOne = curl.replaceAll(textForReplace, textReplaceTo)
    }
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
  }

  const handleHostMapChange = (e) => {
    const hostMap = new Object()
    const mapList = e.target.value.split(' ')
    setHostMap(e.target.value)
    // for (let index = 0; index < mapList.length; index++) {
    //   const element = mapList[index];
    //   const [mapFromHost, mapToHost] = element.split('=>')
    //   hostMap[mapFromHost] = mapToHost

    // }
    localStorage.setItem('hostMap', e.target.value)
    const newReplaceTo = calcReplaceTo(textForReplace)
    setTextReplaceTo(newReplaceTo)
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

        {/* <div>
        <input></input>
        <span>=></span>
        <input></input>
        </div> */}
        <span>Souce Host => Target Host</span>
        <textarea
          onChange={handleHostMapChange}
          rows="21"
          cols="30"
          value={hostMap}
        >
          {/* https://v8back.icgoo.net=>http://127.0.0.1:8000
          https://v9back.icgoo.net=>http://127.0.0.1:9000 */}
        </textarea>

        </div>

        <textarea 
        value={newCurl}
        rows="40"
        cols="55"
        ></textarea>
        </div>

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

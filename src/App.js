import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App () {
  const [url, setUrl] = useState('')
  const [newUrl, setNewUrl] = useState()
  const [isError, setIsError] = useState(false)
  const urlPattern = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/

  useEffect(() => {
    if (!urlPattern.test(url)) { setIsError(true) } else {
      setIsError(false)
    }
  }, [url])

  const sendData = async () => {
    // Check if the text contains a URL link

    const res = await axios.post('http://localhost:8080/v1/newTinyUrl?originalUrl=' + url)
    const x = 'http://localhost:3000/' + res.data.tinyUrl
    setNewUrl(x)
  }

  return (
    <div className="App">
      {isError ? 'error' : 'Ok'}
      <header className="App-header">
        <input type="text" placeholder="input any url" value={url}
         onChange={(e) => {
           setUrl(e.target.value)
         }
        }/>
        <button onClick={() => sendData()}>Send</button>
        {
          newUrl && <a href={newUrl} id="response_link" style={{ color: '#ffffff' }}>{newUrl}</a>
        }
      </header>
    </div>
  )
}

export default App

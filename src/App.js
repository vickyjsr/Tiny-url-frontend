import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App () {
  const [url, setUrl] = useState('')
  const [newUrl, setNewUrl] = useState()
  const [isError, setIsError] = useState(false)
  const urlPattern = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])|(?:[a-zA-Z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF.-]+(?:\.[a-zA-Z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF.-]+)*))(?::\d{2,5})?(?:[/|?](?:\S*))?$/

  useEffect(() => {
    if (url && !urlPattern.test(url)) { setIsError(true) } else {
      setIsError(false)
    }
  }, [url])

  const sendData = async () => {
    // Check if the text contains a URL link

    const res = await axios.post('https://tiny-url-backend-production.up.railway.app/v1/newTinyUrl?originalUrl=' + url)
    const x = 'https://tiny-url-frontend-production.up.railway.app/' + res.data.tinyUrl
    setNewUrl(x)
  }

  return (
    <div className="App">
      {isError ? 'error' : url ? 'ok' : ''}
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

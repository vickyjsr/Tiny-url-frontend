import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function OpenPage () {
  const { id } = useParams()

  const getData = () => {
    if (id == null) {
      return
    }

    const apiUrl = `http://localhost:8080/v1/getUrl?tinyUrl=${id}`

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const contentLength = response.headers.get('content-length')
        if (contentLength === '0') {
          throw new Error('Empty response body')
        }
        return response.json()
      })
      .then(data => {
        if (data && data.originalUrl) {
          console.log('Response from backend:', data)
          window.location.href = data.originalUrl // Redirect the user to the original URL
        } else {
          throw new Error('Empty response body')
        }
      })
      .catch(error => {
        console.error('Fetch error:', error)
        // Handle any error scenarios here, e.g., show an error message to the user
      })
  }

  useEffect(() => {
    getData()
  }, []) // Make sure to pass an empty dependency array to run the effect only once

  return <div></div>
}

export default OpenPage

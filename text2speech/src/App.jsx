import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [keyword, setkeyword] = useState('');
  const [productinfo, setproductinfo] = useState(null);
  const [error, seterror] = useState('');

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[0];
    synth.speak(utterance);
  };

  const fetchproduct = async (e) => {
    e.preventDefault();

    if (keyword) {
      const response = await fetch("http://localhost:5000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          setproductinfo(data);
        }
        else {
          setproductinfo(null);
          seterror(`No shopping ads found for ${keyword}`);
          console.log(error);
        }

      }
    }
  }

  return (
    <div className='phoneshop'>
      <h1>Product Search</h1>
      <form onSubmit={fetchproduct}>
        <label>Write the product name
          <input
            type="text"
            placeholder='iPhone'
            onChange={(e) => { setkeyword(e.target.value) }}
          />
          <button type="submit">Search</button>
        </label>
      </form>
      {productinfo && <div className='phonedetails'>
        {productinfo.image_url ? <img
          src={productinfo.image_url}
          alt={productinfo.product_name}
        /> : ""}
        <div>
          {productinfo.product_name ? <p>
            The price of {productinfo.product_name} is rupees{" "}
            {productinfo.price}
          </p> :
            <p>No shopping ads found for {keyword}</p>
          }

          <button className='speaker' onClick={() => speakText(productinfo.product_name && productinfo.price ? ` The price of ${productinfo.product_name} is rupees{" "}
            ${productinfo.price}` : `No shopping ads found for ${keyword}`)}>
            🔊
          </button>
        </div>

      </div>
      }

    </div>
  )
}

export default App;









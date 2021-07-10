import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './components/Coin';
import Footer from './components/Footer';


function App() {
  const [coins, setcoins] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then((res) => {
        setcoins(res.data)
        console.log(res.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  function handlechange(e) {
    setsearch(e.target.value)

  }
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <div className='header'>
        <h2 className='brand'>KuberCoins</h2>


        <form>
          <input className='inputfield' type='text' placeholder='search a coin' onChange={handlechange} />
        </form>
      </div>
      <div className="coinsContainer">
      {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}

        </div>

        <Footer/>






    </>
  );
}

export default App;

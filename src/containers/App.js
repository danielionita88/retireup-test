import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import Board from '../components/Board';
import 'rc-slider/assets/index.css';
import './App.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const App = () => {
  const [returns, setReturns] = useState([]);
  const [range, setRange] = useState([0, 0]);
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get('https://www.slickcharts.com/sp500/returns/history.json');
        setReturns(response.data.reverse())
        setMin(response.data[0].year)
        setMax(response.data[response.data.length-1].year)
        setRange([response.data[0].year, response.data[response.data.length-1].year])
      } catch (e) {
        console.log(e);
      }
    })()
  }, []);

  const filterReturns = (returns) => {
    if (range[0] === 0 && range[1] === 0) {
      return returns
    } else {
      return returns.filter(r => r.year >= range[0] && r.year <= range[1])
    }
  };

  return <div style={{ textAlign: 'center' }}>
    <div className='slider'>
      <h3>Select years</h3>
      <Range
        min={min}
        max={max}
        value={range}
        onChange={e => setRange(e)}
      />
      <p>{`${range[0]} - ${range[1]}`}</p>
    </div>
    <Board returns={filterReturns(returns)} />
  </div>
}

export default App;

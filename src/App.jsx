import { useRef } from 'react';
import moon from './assets/moon.png';
import land from './assets/land.png';
import toca from './assets/toca.png';
import alice from './assets/alice3.gif';
import Cartas from './Cartas';

import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  const ref = useRef();

  return (
    <div className='container'>
      <Parallax pages={30} ref={ref}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${moon})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer
          offset={2}
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(${land})`,
            backgroundSize: 'cover',
          }}
        ></ParallaxLayer>

        <ParallaxLayer
          offset={4}
          speed={1}
          factor={10}
          style={{
            backgroundImage: `url(${toca})`,
            backgroundSize: 'cover',
          }}
        ></ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 0.9, end: 7.5 }}
          style={{ textAlign: 'center' }}
        >
          <img src={alice} style={{ width: "1000px" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.2}
          speed={0.05}
          onClick={() => ref.current.scrollTo(3)}
        >
          <h2>Welcome to my website</h2>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={2}
          onClick={() => ref.current.scrollTo(0)}
        >
          <h2>Hi Mom!</h2>
        </ParallaxLayer>
        {/* <ParallaxLayer offset={4} speed={1}>
          <Cartas />
        </ParallaxLayer> */}
      </Parallax>
    </div>
  );
}

export default App;
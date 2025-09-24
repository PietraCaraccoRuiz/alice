import { useRef } from "react";
import { useSpring, animated, easings } from "@react-spring/web";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import moon from "./assets/fundohome.png";
import land from "./assets/land.png";
import toca from "./assets/toca.png";
import flor from "./assets/flor.png";

import alice from "./assets/alice3.gif";
import espelho from "./assets/espelho.png";

function App() {
  const ref = useRef();

  

  // animação da Alice: move para a direita quando estiver entre offsets 2 e 4
  const aliceAnimation = useSpring({
    from: { x: 0 },       // posição inicial
    to: { x: 300 },       // move 300px para a direita
    config: { duration: 2000 },
    reset: true,
    loop: false,
  });

  // animação flutuação do espelho
  const mirrorAnimation = useSpring({
    from: { y: -20 },
    to: { y: 20 },
    loop: { reverse: true },
    config: { duration: 2000, easing: easings.easeInOutSine },
  });

  // componente estrela piscando
  const Sparkle = ({ x, y, size, delay, duration, color, strong }) => {
    const styles = useSpring({
      from: { opacity: strong ? 0.7 : 0.2, transform: "scale(0.5)" },
      to: { opacity: 1, transform: "scale(1.3)" },
      loop: { reverse: true },
      config: { duration },
      delay,
    });

    return (
      <animated.div
        style={{
          ...styles,
          position: "absolute",
          top: y,
          left: x,
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          boxShadow: strong
            ? `0 0 ${size} ${parseInt(size) / 2}px ${color}`
            : `0 0 ${parseInt(size) / 2}px ${color}`,
        }}
      />
    );
  };

  // gera array de brilhos
  const generateStars = (amount, strong = false) =>
    Array.from({ length: amount }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * (strong ? 6 : 4) + 2}px`,
      delay: Math.random() * 2000,
      duration: Math.random() * 800 + 200,
      color: ["white", "#aee", "#ccf", "#eef", "#ffd"][Math.floor(Math.random() * 5)],
      strong,
    }));

  // 3 camadas de estrelas pra profundidade
  const starsLayer1 = generateStars(60, true);   // fortes, entrada da toca
  const starsLayer2 = generateStars(80, false);  // média intensidade
  const starsLayer3 = generateStars(100, false); // fracas, mais espalhadas

  return (
    <div className="container">
      <Parallax pages={25} ref={ref}>
        {/* Lua */}
        <ParallaxLayer offset={0} speed={1} factor={1.2} style={{ backgroundImage: `url(${moon})`, backgroundSize: "cover" }} />

        {/* Flores */}
        <ParallaxLayer offset={0.6} speed={1.5} factor={0.7} style={{ backgroundImage: `url(${flor})`, backgroundSize: "cover" }} />

        {/* Fundo da Toca */}
        <ParallaxLayer offset={1} speed={2} factor={10.5} style={{ backgroundImage: `url(${toca})`, backgroundSize: "cover" }} />

        {/* Estrelas - camada 1 (fortes) */}
        <ParallaxLayer offset={4} factor={1} speed={0.2}>
          {starsLayer1.map((s, i) => <Sparkle key={`s1-${i}`} {...s} />)}
        </ParallaxLayer>

        {/* Estrelas - camada 2 (média intensidade) */}
        <ParallaxLayer offset={4.5} factor={3} speed={0.4}>
          {starsLayer2.map((s, i) => <Sparkle key={`s2-${i}`} {...s} />)}
        </ParallaxLayer>

        {/* Estrelas - camada 3 (fracas, fundo) */}
        <ParallaxLayer offset={5} factor={8} speed={0.6}>
          {starsLayer3.map((s, i) => <Sparkle key={`s3-${i}`} {...s} />)}
        </ParallaxLayer>

        {/* Alice */}
        <ParallaxLayer sticky={{ start: 0.9, end: 10.5 }} style={{ textAlign: "center" }}>
          <animated.img src={alice} style={{ width: "1000px", ...aliceAnimation }} />
        </ParallaxLayer>

        {/* Espelho flutuando */}
        <ParallaxLayer sticky={{ start: 5.5, end: 5.8 }}>
          <animated.img src={espelho} style={{ width: "600px", position: "absolute", left: "-140px", ...mirrorAnimation }} />
        </ParallaxLayer>

        {/* Textos */}
        <ParallaxLayer offset={0.2} speed={0.05}><h2>Welcome to my Alice World</h2></ParallaxLayer>
        <ParallaxLayer offset={3} speed={2}><h2>Hi Mom!</h2></ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;

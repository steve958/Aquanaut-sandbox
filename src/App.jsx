import "./App.css";
import { GiPerson, GiSupersonicBullet } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
function App() {
  const viewportRef = useRef(null);
  const playerRef = useRef(null);
  const testRef = useRef(null);

  const [move, setMove] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    const RTPosition = handlePosition();
    switch (event.key) {
      case "ArrowLeft":
        setPosition(RTPosition);
        break;
      case "ArrowRight":
        setPosition(RTPosition);
        break;
      case "ArrowUp":
        setPosition(RTPosition);
        break;
      case "ArrowDown":
        setPosition(RTPosition);
        break;
      default:
        break;
    }
  };

  function handlePosition() {
    const viewport = viewportRef?.current.getBoundingClientRect();
    const player = playerRef?.current.getBoundingClientRect();

    const position = {
      x: player.left - viewport.left,
      y: player.top - viewport.top,
    };
    return position;
  }
  function handleCollision() {
    if (position) {
      html2canvas(document.body).then((canvas) => {
        let ctx = canvas.getContext("2d");
        let p = ctx.getImageData(position.x, position.y, 1, 1).data;

        console.log(`rgba(${p[0]},${p[1]},${p[2]},${p[3]})`);

        testRef.current.style.backgroundColor = `rgba(${p[0]},${p[1]},${p[2]},${p[3]})`;

        if (p[2] <= p[0] || p[2] <= p[1]) {
          console.log('Collision detected!')
          return true;
        }
      });
    }
  }

  useEffect(() => {
    console.log(position);
    handleCollision();
  }, [position]);

  return (
    <div className="App">
      <div
        className="viewport"
        style={{
          position: "reative",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onKeyDownCapture={(e) => handleKeyDown(e)}
        ref={viewportRef}
      >
        <img
          src="../src/assets/test.png"
          alt=""
          className="background"
          id="back"
          width={3000}
        />
        <span className="player" ref={playerRef}>
          {move ? (
            <GiSupersonicBullet size={80} color="gold" />
          ) : (
            <GiPerson size={80} color="gold" />
          )}
        </span>
      </div>
      <div id="color-test" ref={testRef}></div>
    </div>
  );
}

export default App;

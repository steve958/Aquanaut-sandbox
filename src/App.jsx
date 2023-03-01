import "./App.css";
import { GiPerson, GiSupersonicBullet } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

function App() {
  //Adding references
  const viewportRef = useRef(null);
  const playerRef = useRef(null);
  const testRef = useRef(null);

  //Adding states
  const [move, setMove] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //Properly handling with event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //Function that handle movement
  const handleKeyDown = (event) => {
    setMove(true);
    let RTPosition = handlePosition();
    switch (event.key) {
      case "ArrowLeft":
        RTPosition = handlePosition();
        break;
      case "ArrowRight":
        RTPosition = handlePosition();
        break;
      case "ArrowUp":
        RTPosition = handlePosition();
        break;
      case "ArrowDown":
        RTPosition = handlePosition();
        break;
      default:
        break;
    }
    setPosition(RTPosition);
  };

  //Function that handle icon
  const handleKeyUp = () => {
    setMove(false);
  };

  //Tracking current position
  function handlePosition() {
    const viewport = viewportRef?.current.getBoundingClientRect();
    const player = playerRef?.current.getBoundingClientRect();

    const position = {
      x: player.left - viewport.left,
      y: player.top - viewport.top,
    };

    handleCollision(position);

    return position;
  }

  //Checking collision, getting back color
  function handleCollision(pos) {
    if (pos) {
      html2canvas(document.body).then((canvas) => {
        let ctx = canvas.getContext("2d");
        let p = ctx.getImageData(pos.x, pos.y, 1, 1).data;

        console.log(`rgba(${p[0]},${p[1]},${p[2]},${p[3]})`);

        testRef.current.style.backgroundColor = `rgba(${p[0]},${p[1]},${p[2]},${p[3]})`;

        if (p[2] <= p[0] || p[2] <= p[1]) {
          console.log("Collision detected!");
          return true;
        }
        return false;
      });
    }
    return false;
  }

  //Logging position
  useEffect(() => {
    console.log(position);
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

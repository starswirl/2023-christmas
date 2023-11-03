import { FC, useState } from "react";
import { Circle, Image } from "react-konva";
import { Layer, Rect, Stage } from "react-konva";
import { MyImage } from "../../utils/image";
import { useWindowSize } from "../../utils/useWindowSize";
import useInterval from "../../utils/useInterval";

export const ChristmasGame: FC = () => {
  const TEST_IMAGE = "/images/tree/christmastree_nude.png";
  const [x, setX] = useState(40);
  const [y, setY] = useState(40);
  const size = 10;

  const [width, height] = useWindowSize();
  const onClick = () => {
    setX(x + 10);
  };
  useInterval(() => {
    console.log(Math.cos(x));
    setX(x + 0.01);
    setY(y + 1);
  }, 10);
  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <Stage width={width} height={height}>
          <Layer>
            <Image image={MyImage(TEST_IMAGE)} x={0} y={0} />

            <Circle
              x={1000 + Math.cos(x) * 100}
              y={y}
              radius={size}
              fill="#fff"
              opacity={1}
            />
          </Layer>
        </Stage>
        <button onClick={onClick}>Click me</button>
      </div>
    </>
  );
};

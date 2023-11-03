import { FC, useEffect, useMemo, useState } from "react";
import { Circle, Image, Star } from "react-konva";
import { Layer, Rect, Stage } from "react-konva";
import { MyImage } from "../../utils/image";
import { useWindowSize } from "../../utils/useWindowSize";
import useInterval from "../../utils/useInterval";

export const ChristmasGame: FC = () => {
  const TEST_IMAGE = "/images/tree/christmastree_nude.png";
  const [x, setX] = useState(40);
  const [y, setY] = useState(0);
  const [snowEnable, setSnowEnable] = useState(false);
  const size = 10;

  const [width, height] = useWindowSize();

  const INIT_X = 50;
  const INIT_Y = -height;

  const X_SNOW_DIFF = 200;
  const xSnowBallQuantity = parseInt(`${width / X_SNOW_DIFF}`);
  const Y_SNOW_DIFF = 200;
  const ySnowBallQuantity = parseInt(`${height / Y_SNOW_DIFF}`);

  const snowMoveLogic = () => {
    if (!snowEnable) return;
    setX(x + 0.01);
    setY(y + 1);
  };
  useInterval(snowMoveLogic, 10);
  const onClick = () => {
    setX(40);
    setY(40);
    setSnowEnable(true);
  };

  const snowList = useMemo(() => {
    const newList = [...Array(ySnowBallQuantity)].flatMap((_e, i) =>
      [...Array(xSnowBallQuantity)].map((_e, j) => {
        const xShift = i % 2 === 1 ? 0 : X_SNOW_DIFF / 2;
        const xRundom = parseInt(`${Math.random() * 50}`);
        const yRundom = parseInt(`${Math.random() * 50}`);
        return {
          isStar: Math.floor(Math.random() * 1231) === 1224,
          x: INIT_X + X_SNOW_DIFF * j + xRundom + xShift,
          y: INIT_Y + Y_SNOW_DIFF * i + yRundom,
          radius: size,
        };
      })
    );
    return newList;
  }, [width, height]);

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <Stage width={width} height={height}>
          <Layer>
            <Image image={MyImage(TEST_IMAGE)} x={0} y={0} />
            {!!width &&
              !!height &&
              snowList.map((e) => {
                return (
                  <>
                    {e.isStar ? (
                      <Star
                        x={e.x + Math.cos(x) * 100}
                        y={e.y + y}
                        numPoints={5}
                        innerRadius={e.radius}
                        outerRadius={e.radius + 10}
                        fill="#ff0"
                        opacity={1}
                      />
                    ) : (
                      <Circle
                        x={e.x + Math.cos(x) * 100}
                        y={e.y + y}
                        radius={e.radius}
                        fill="#fff"
                        opacity={1}
                      />
                    )}
                  </>
                );
              })}
          </Layer>
        </Stage>
        <button onClick={onClick}>Click me</button>
      </div>
    </>
  );
};

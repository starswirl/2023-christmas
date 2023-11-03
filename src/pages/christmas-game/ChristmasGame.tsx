import { FC, useMemo, useState } from "react";
import { Circle, Image as KonvaImage, Layer, Stage, Star } from "react-konva";
import { MyImage } from "../../utils/image";
import useInterval from "../../utils/useInterval";
import { useWindowSize } from "../../utils/useWindowSize";
import { Button, styled } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

export const ChristmasGame: FC = () => {
  const TEST_IMAGE = "/images/tree/christmastree_nude.png";
  const [filePath, setFilePath] = useState(TEST_IMAGE);
  const [x, setX] = useState(40);
  const [y, setY] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [snowEnable, setSnowEnable] = useState(false);
  const size = 10;

  const [width, height] = useWindowSize();

  const INIT_PIC_WIDTH = 466;

  const INIT_X = 50;
  const INIT_Y = -height;

  const X_SNOW_DIFF = 200;
  const xSnowBallQuantity = parseInt(`${width / X_SNOW_DIFF}`);
  const Y_SNOW_DIFF = 200;
  const ySnowBallQuantity = parseInt(`${height / Y_SNOW_DIFF}`);

  const onChange = (e: any) => {
    setFilePath(URL.createObjectURL(e.target.files[0]));
    const img = new Image();
    img.onload = () => {
      const ratio = height / img.height;
      setImageDimensions({ width: img.width * ratio, height: img.height });
    };
    img.src = URL.createObjectURL(e.target.files[0]);
  };

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
          isStar: Math.floor(Math.random() * 1231) === 1225,
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
      <div>
        <div style={{ backgroundColor: "#5e7168" }}>
          <Stage width={width} height={height - 100}>
            <Layer>
              <KonvaImage
                width={imageDimensions?.width}
                height={height}
                image={MyImage(filePath)}
                x={
                  (width -
                    (!!imageDimensions
                      ? imageDimensions.width
                      : INIT_PIC_WIDTH)) /
                  2
                }
                y={0}
              />
              {!!width &&
                !!height &&
                snowList.map((e, i) => {
                  return (
                    <>
                      {e.isStar ? (
                        <Star
                          key={`star-${i}`}
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
                          key={`circle-${i}`}
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
        </div>
      </div>
      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#a17f57",
        }}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<InsertPhotoIcon />}
        >
          Upload file
          <input
            type="file"
            accept="image/*"
            style={{
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              height: 1,
              overflow: "hidden",
              position: "absolute",
              bottom: 0,
              left: 0,
              whiteSpace: "nowrap",
              width: 1,
            }}
            onChange={onChange}
          />
        </Button>
        <Button
          variant="contained"
          onClick={onClick}
          style={{ marginLeft: "30px" }}
        >
          Let it snow
        </Button>
      </div>
    </>
  );
};

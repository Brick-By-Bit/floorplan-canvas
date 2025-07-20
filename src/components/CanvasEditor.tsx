import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Line, type StageProps } from "react-konva";
import useImage from "use-image";
import type { Tool } from "../App";

interface ShapeBase {
  id: string;
  isDragging: boolean;
  type: Tool;
}

interface RectShape extends ShapeBase {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LineShape extends ShapeBase {
  type: "line";
  points: number[];
}

type Shape = RectShape | LineShape;

interface Props {
  tool: Tool;
  imageUrl: string | null;
  clearTrigger: boolean;
  onClearHandled: () => void;
}

const CanvasEditor: React.FC<Props> = ({
  tool,
  imageUrl,
  clearTrigger,
  onClearHandled,
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [drawingLine, setDrawingLine] = useState<number[]>([]);
  const [tempRect, setTempRect] = useState<Partial<RectShape> | null>(null);
  const [image] = useImage(imageUrl || "");
  const stageRef = useRef(null);

  const handleMouseDown: StageProps['onMouseDown'] = (e) => {
    const pos = e.target?.getStage()?.getPointerPosition();

    if (!pos) return;

    if (tool === "rect") {
      setTempRect({
        id: Date.now().toString(),
        type: "rect",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        isDragging: false,
      });
    } else if (tool === "line") {
      setDrawingLine([pos.x, pos.y]);
    }
  };

  const handleMouseMove: StageProps['onMouseMove'] = (e) => {
    const pos = e.target?.getStage()?.getPointerPosition();

    if (!pos) return;

    if (tool === "rect" && tempRect) {
      const newRect = {
        ...tempRect,
        width: pos.x - tempRect.x!,
        height: pos.y - tempRect.y!,
      };
      setTempRect(newRect);
    } else if (tool === "line" && drawingLine.length > 0) {
      setDrawingLine([...drawingLine.slice(0, 2), pos.x, pos.y]);
    }
  };

  const handleMouseUp: StageProps['onMouseUp'] = () => {
    if (tool === "rect" && tempRect) {
      setShapes([...shapes, tempRect as RectShape]);
      setTempRect(null);
    } else if (tool === "line" && drawingLine.length > 0) {
      setShapes([
        ...shapes,
        {
          id: Date.now().toString(),
          type: "line",
          points: drawingLine,
          isDragging: false,
        },
      ]);
      setDrawingLine([]);
    }
  };

  const updateDrag = (id: string, pos: { x: number; y: number }) => {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === id && shape.type === "rect"
          ? { ...shape, x: pos.x, y: pos.y }
          : shape
      )
    );
  };

  if (clearTrigger) {
    setShapes([]);
    setDrawingLine([]);
    setTempRect(null);
    onClearHandled();
  }

  return (
    <Stage
      width={1000}
      height={700}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: "1px solid gray" }}
    >
      <Layer>
        {image && <KonvaImage image={image} width={1000} height={700} />}

        {shapes.map((shape) =>
          shape.type === "rect" ? (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              stroke="red"
              draggable
              onDragEnd={(e) =>
                updateDrag(shape.id, {
                  x: e.target.x(),
                  y: e.target.y(),
                })
              }
            />
          ) : (
            <Line
              key={shape.id}
              points={shape.points}
              stroke="blue"
              strokeWidth={2}
              lineCap="round"
              lineJoin="round"
            />
          )
        )}

        {tempRect && (
          <Rect
            x={tempRect.x}
            y={tempRect.y}
            width={tempRect.width}
            height={tempRect.height}
            stroke="gray"
            dash={[4, 4]}
          />
        )}

        {drawingLine.length > 0 && (
          <Line
            points={drawingLine}
            stroke="gray"
            strokeWidth={2}
            dash={[4, 4]}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default CanvasEditor;

import React from "react";
import { Rect } from "react-konva";

interface RectShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isTemp?: boolean;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
  dash?: number[];
  draggable?: boolean;
  onDragEnd?: (id: string, pos: { x: number; y: number }) => void;
  onClick?: (id: string) => void;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
  className?: string;
}

const RectShape: React.FC<RectShapeProps> = ({
  id,
  x,
  y,
  width,
  height,
  isTemp = false,
  stroke = "red",
  strokeWidth = 1,
  fill = "transparent",
  opacity = 1,
  dash,
  draggable = true,
  onDragEnd,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  const handleDragEnd = (e: {
    target: { x: () => number; y: () => number };
  }) => {
    if (onDragEnd) {
      onDragEnd(id, {
        x: e.target.x(),
        y: e.target.y(),
      });
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave(id);
    }
  };

  return (
    <Rect
      className={className}
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
      dash={dash}
      draggable={draggable && !isTemp}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default RectShape;

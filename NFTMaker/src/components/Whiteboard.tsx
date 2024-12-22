import React, { useState, useEffect } from "react";
import styles from "../styles/Whiteboard.module.css";

const GRID_SIZE = 32;

interface WhiteboardProps {
  onGridStringChange: (gridString: string) => void;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ onGridStringChange }) => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false); 
  const [gridString, setGridString] = useState<string>("0".repeat(GRID_SIZE * GRID_SIZE)); 


  useEffect(() => {
    const flatGrid = grid.flat().map((cell) => (cell ? "1" : "0")).join("");
    setGridString(flatGrid);
  }, [grid]);

  useEffect(() => {
    onGridStringChange(gridString);
  }, [gridString, onGridStringChange]);


  const toggleCell = (row: number, col: number) => {
    setGrid((prev) =>
      prev.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? !c : c))
      )
    );
  };

  // Handle mouse enter event while dragging
  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      setGrid((prev) =>
        prev.map((r, rIdx) =>
          r.map((c, cIdx) => (rIdx === row && cIdx === col ? true : c))
        )
      );
    }
  };

  return (
    <div>
      <div
        className={styles.whiteboard}
        onMouseDown={() => setIsMouseDown(true)} 
        onMouseUp={() => setIsMouseDown(false)} 
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`${styles.cell} ${cell ? styles.black : ""}`}
                onMouseDown={() => toggleCell(rowIdx, colIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whiteboard;

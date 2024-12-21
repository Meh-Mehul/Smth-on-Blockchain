import React, { useState } from "react";
import styles from "../styles/Whiteboard.module.css";

const GRID_SIZE = 32;

const Whiteboard: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false))
  );
  
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false); // To track mouse state
  const [gridString, setGridString] = useState<string>("0".repeat(GRID_SIZE * GRID_SIZE)); // Hook for the string representation

  // Update the string representation of the grid
  const updateGridString = (updatedGrid: boolean[][]) => {
    const flatGrid = updatedGrid.flat().map((cell) => (cell ? "1" : "0")).join("");
    setGridString(flatGrid);
    console.log(gridString);
  };

  // Toggle the cell color
  const toggleCell = (row: number, col: number) => {
    setGrid((prev) => {
      const updatedGrid = prev.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? !c : c))
      );
      updateGridString(updatedGrid); // Update the grid string
      return updatedGrid;
    });
  };

  // Handle mouse enter event while dragging
  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      setGrid((prev) => {
        const updatedGrid = prev.map((r, rIdx) =>
          r.map((c, cIdx) => (rIdx === row && cIdx === col ? true : c))
        );
        updateGridString(updatedGrid); // Update the grid string
        return updatedGrid;
      });
    }
  };

  return (
    <div>
      <div
        className={styles.whiteboard}
        onMouseDown={() => setIsMouseDown(true)} // Mouse button pressed
        onMouseUp={() => setIsMouseDown(false)} // Mouse button released
        onMouseLeave={() => setIsMouseDown(false)} // Mouse leaves the board
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`${styles.cell} ${cell ? styles.black : ""}`}
                onMouseDown={() => toggleCell(rowIdx, colIdx)} // Initial click
                onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)} // Drag over cells
              />
            ))}
          </div>
        ))}
      </div>
      {/* <div className={styles.gridStringDisplay}>
        <h3>Grid String:</h3>
        <p>{gridString}</p>
      </div> */}
    </div>
  );
};

export default Whiteboard;

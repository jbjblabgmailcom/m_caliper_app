'use client'

import { useRef, useState, useEffect } from "react";

export default function ActiveCanvas() {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const initY = 50; // Example initial value
  const [activeArrow, setActiveArrow] = useState(null); // Track which arrow end is being dragged
  const [arrows, setArrows] = useState([]);

  const initialData = ["label1", "label2", "label3"].reduce(
    (acc, label, index) => {
      const balon = index + 1;
      acc[label] = {
        balon,
        text:
          balon === 1
            ? "19.21 -0.05"
            : balon === 2
            ? "18 +/-0.1"
            : balon === 3 && "49 +/-0.1",
        x: 50,
        y: initY + 30 * balon, // Dynamic y value based on balon
        color: "black",
        bgColor: "white",
      };
      return acc;
    },
    {}
  );

  const [data, setData] = useState(initialData);

  const addArrow = (type) => {
    setArrows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type,
        startX: 200,
        startY: 200,
        endX: 300,
        endY: 200,
      },
    ]);
  };

  const changeLabelColor = (param, colorparam) => {
    setData((prev) => ({
      ...prev,
      [param]: { ...prev[param], bgColor: colorparam },
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "./leftbg.png";

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      Object.values(data).forEach(({ balon, text, x, y, color, bgColor }) => {
        const textWidth = ctx.measureText(`Bal ${balon}: ${text}`).width + 10;
        const textHeight = 18;

        ctx.fillStyle = bgColor;
        ctx.fillRect(x - 7, y - 18, textWidth + 5, textHeight + 5);

        ctx.fillStyle = color;
        ctx.font = "18px Arial";
        ctx.fillText(`Bal ${balon}: ${text}`, x, y);
      });

      arrows.forEach(({ startX, startY, endX, endY, type }) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        drawArrowHead(ctx, startX, startY, endX, endY);
        if (type === "double") drawArrowHead(ctx, endX, endY, startX, startY);
      });
    };
  }, [data, arrows]);

  const drawArrowHead = (ctx, x1, y1, x2, y2) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 30; // Adjust arrowhead size

    ctx.fillStyle = "red"; // Match the arrow color
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - size * Math.cos(angle - Math.PI / 6),
      y2 - size * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - size * Math.cos(angle + Math.PI / 6),
      y2 - size * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill(); // Fill the triangle instead of stroking lines
  };

  const getArrowEndAtPosition = (x, y) => {
    for (const arrow of arrows) {
      const distStart = Math.hypot(x - arrow.startX, y - arrow.startY);
      const distEnd = Math.hypot(x - arrow.endX, y - arrow.endY);

      if (distStart < 10) return { id: arrow.id, point: "start" };
      if (distEnd < 10) return { id: arrow.id, point: "end" };
    }
    return null;
  };

  const getLabelAtPosition = (x, y) => {
    for (const key in data) {
      const label = data[key];
      const textWidth = 20; // Approximate width
      const textHeight = 18; // Font height

      if (
        x >= label.x - 5 &&
        x <= label.x + textWidth &&
        y >= label.y - textHeight &&
        y <= label.y
      ) {
        return key;
      }
    }
    return null;
  };

  // Handle mouse down (start dragging)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const labelKey = getLabelAtPosition(x, y);
    if (labelKey) {
      setDragging(labelKey);
    }
    const arrowPoint = getArrowEndAtPosition(x, y);
    if (arrowPoint) {
      setActiveArrow(arrowPoint);
    }
  };

  // Handle mouse move (update label position)
  const handleMouseMove = (e) => {
    if (!dragging && !activeArrow) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move label if dragging
    if (dragging) {
      setData((prev) => ({
        ...prev,
        [dragging]: { ...prev[dragging], x, y },
      }));
    }

    // Move arrow end if activeArrow is valid
    if (activeArrow) {
      setArrows((prev) =>
        prev.map((arrow) =>
          arrow.id === activeArrow.id
            ? activeArrow.point === "start"
              ? { ...arrow, startX: x, startY: y }
              : { ...arrow, endX: x, endY: y }
            : arrow
        )
      );
    }
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setDragging(null);
    setActiveArrow(null);
  };

  console.log(data);

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button onClick={() => addArrow("single")}>Single Arrow</button>
          <button onClick={() => addArrow("double")}>Double Arrow</button>
        </div>
        <canvas
          ref={canvasRef}
          width={600}
          height={338}
          className="border"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div>
        <button
          onClick={() => {
            changeLabelColor("label1", "#72f542");
          }}
        >
          BAL 1
        </button>
        <button
          onClick={() => {
            changeLabelColor("label2", "#72f542");
          }}
        >
          BAL 2
        </button>
        <button
          onClick={() => {
            changeLabelColor("label3", "#f55d42");
          }}
        >
          BAL 3
        </button>
      </div>
    </>
  );
}

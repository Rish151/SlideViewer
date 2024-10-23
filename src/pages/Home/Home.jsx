import React, { useState } from 'react'; 
import './Home.css';
import img from "../../assets/wsi.png";
import { LuZoomOut, LuZoomIn } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

const Home = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    if (zoomLevel < 5) setZoomLevel(zoomLevel + 0.5);
  };

  const zoomOut = () => {
    if (zoomLevel > 1) setZoomLevel(zoomLevel - 0.5);
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY
      });
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="screen-frame">
      <div className="date-time">Mon Oct 07 2024 16:39:07</div>
      <div className="date-line"></div>

      <div className="container">
        <button className="back-arrow">
          <FaArrowLeft />
        </button>

        {/* LEFT PANEL */}
        <div className="left-panel">
          <h3>RBC</h3>
          <table>
            <thead>
              <tr><th>Type</th><th>Count</th><th>Percentage</th></tr>
            </thead>
            <tbody>
              <tr><td>Angled Cells</td><td>222</td><td>67%</td></tr>
              <tr><td>Borderline Ovalocytes</td><td>50</td><td>20%</td></tr>
              <tr><td>Burr Cells</td><td>87</td><td>34%</td></tr>
              <tr><td>Fragmented Cells</td><td>2</td><td>0.12%</td></tr>
              <tr><td>Ovalocytes</td><td></td><td></td></tr>
              <tr><td>Rounded RBC</td><td></td><td></td></tr>
              <tr><td>Teardrops</td><td></td><td></td></tr>
            </tbody>
          </table>

          <h3>WBC</h3>
          <table>
            <thead>
              <tr><th>Type</th><th>Count</th><th>Percentage</th></tr>
            </thead>
            <tbody>
              <tr><td>Basophil</td><td>222</td><td>67%</td></tr>
              <tr><td>Eosinophil</td><td>50</td><td>20%</td></tr>
              <tr><td>Lymphocyte</td><td>87</td><td>34%</td></tr>
              <tr><td>Monocyte</td><td>2</td><td>0.12%</td></tr>
            </tbody>
          </table>

          <h3>Platelets</h3>
          <table>
            <tbody>
              <tr><td>Count</td><td>222</td></tr>
              <tr><td>Percentage</td><td>222</td></tr>
            </tbody>
          </table>
        </div>

        {/* CENTER PANEL*/}
        <div className="center-panel">
          <h3>WSI Zoomed In View</h3>
          <div
            className="zoom-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={img}
              alt="Zoomed-In WSI"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`
              }}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="zoomed-out-view">
            <img src={img} alt="Zoomed-out WSI" />
            <p>Zoomed-Out View</p>
            <p>(Hub)</p>
            <p>Patient ID: R140 </p>
            <p>Blood: O+</p>
          </div>
          <br />
          <h4>Zoom Controls</h4>
          <button className="icon" onClick={zoomIn}><LuZoomIn /></button>
          <button className="icon" onClick={zoomOut}><LuZoomOut /></button>
          <br/>
          <button className="report-button">Report</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

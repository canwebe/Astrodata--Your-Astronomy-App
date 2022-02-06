import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { roverCameraData } from "../Mars/roverData";
import "./roverInfo.css";
const api_key = process.env.REACT_APP_API;

const RoverInfo = ({ location, match }) => {
  const { rover } = match.params;
  const { cameras, max_sol } = location.state;
  const [data, setData] = useState([]);
  const [camera, setCamera] = useState("");
  const [sol, setSol] = useState(parseInt(max_sol));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const solRef = useRef();

  const fetchPhotos = () => {
    setIsLoading(true);
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}${
        camera && `&camera=${camera}`
      }&api_key=${api_key}`
    )
      .then((json) => json.json())
      .then((res) => {
        setData(res.photos);
        setIsLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSol(solRef.current.value);
  };

  useEffect(() => {
    fetchPhotos();
  }, [camera, sol, page]);

  return (
    <>
      <div className="mars">
        <div className="homeDiv marsDiv">
          <div>
            <h1 className="roverDataHeadline">{rover.toUpperCase()}</h1>
            <p style={{ color: "white" }}>Max Sol {max_sol}</p>
            <select
              onChange={(e) => setCamera(e.target.value)}
              value={camera}
              className="cameraOptions"
            >
              <option value="">All</option>
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.name.toLowerCase()}>
                  {camera.full_name}
                </option>
              ))}
            </select>
            <form onSubmit={handleSearch} className="searchDiv">
              <input
                required
                ref={solRef}
                type="text"
                placeholder="Enter Sol for Search"
              />
              <button>Search</button>
            </form>
          </div>
        </div>
        <div className="solControl">
          <button
            disabled={sol === 0}
            onClick={() => setSol((prevSol) => prevSol - 1)}
          >
            prev
          </button>
          <h1>Sol : {sol}</h1>
          <button
            disabled={sol === max_sol}
            onClick={() => setSol((prevSol) => prevSol + 1)}
          >
            next
          </button>
        </div>

        <div className="roverWrapper">
          {isLoading ? (
            <h2>Loadiing Please Wait..</h2>
          ) : data.length === 0 ? (
            <h2>No Photos Found</h2>
          ) : (
            data.map((photo) => (
              <div key={photo.id} className="marsPhotoCard">
                <img src={photo.img_src} alt="mars rover" />
                <div className="info">
                  <p>{photo.earth_date}</p>
                  <h2>{photo.camera.full_name}</h2>
                </div>
              </div>
            ))
          )}
        </div>
        {data.length === 25 && (
          <div className="nextPage">
            <button onClick={() => setPage((prev) => prev + 1)}>
              Next Page
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RoverInfo;

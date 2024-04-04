import React, { useState, useEffect } from "react";
import PoseNet from "./posenet/";
import { useParams } from "react-router-dom";
import { poseSimilarity } from "./posenet_utils";
import POSE_MAP from "./data/moves.json";
import "./Room.css";
import Imagesdata from './data/YogaAsanaPose.js';

const SIMILARITY_THRESHOLD_EXCELLENT = 0.25;
const SIMILARITY_THRESHOLD_GOOD = 0.55;
const SIMILARITY_THRESHOLD_OKAY = 0.8;

function Room() {
  const [ready, setReady] = useState(false);
  const params = useParams()

  const img = Imagesdata[params.id - 1].img;
  const poses = ['chairpose.jpg', 'dance.png', 'eagle.png', 'garland.png', 'gate.png', 'half-moon.png', 'parivrtta-trikonasana.png', 'tadasana.png', 'vrksasana.png'];

  const [imageName, setImageName] = useState(poses[params.id - 1])
  const [imagePose, setImagePose] = useState(POSE_MAP[imageName]);

  const [similarity, setSimilarity] = useState();
  const [count, setCount] = useState(0);

  const handlePose = (pose) => {
    if (!imagePose || !pose) {
      return;
    }

    // handle scoring of video pose
    const s = poseSimilarity(imagePose, pose);
    setSimilarity(s);
    if (!ready && s < SIMILARITY_THRESHOLD_EXCELLENT) {
      setReady(true);
    }

    if (s <= SIMILARITY_THRESHOLD_GOOD || s <= SIMILARITY_THRESHOLD_EXCELLENT) {
      incrementCount();
    }
  };

  const incrementCount = () => {
    if(count == 10) {
      return;
    }else if(count <=9){
      setCount(c => c +1);
    }
  }

  const DisplayScore = () => {
    let score = Math.round((1 - similarity) * 100);
    let str = null;
    let color = null;
    if (similarity <= SIMILARITY_THRESHOLD_EXCELLENT) {
      str = "Excellent!!";
      color = "#27ae60";
    } else if (similarity <= SIMILARITY_THRESHOLD_GOOD) {
      str = "Good!";
      color = "#7bed9f";
    } else if (similarity <= SIMILARITY_THRESHOLD_OKAY) {
      str = "Okay";
      color = "orange";
    } else {
      str = "Connection yet to be established ";
      color = "red";
    }
    return (
      <h1 style={{ color: color }}>
        {str} {score}
      </h1>
    );
  };

  return (
    <div className="room flex justify-center items-center flex-col">
      <div className="header mb-5 mt-2 text-2xl capitalize flex  text-gray-900">
        <div className="uppercase text-bold text-6xl text-green-600 gap-2">
          Target {count} | 10
        </div>
        <div className="uppercase text-bold text-6xl text-yellow-500">
          Try To Follow ...
        </div>
      </div>
      <div className="main-container">
        <img
          className="reference-img"
          alt="Yoga pose to copy."
          src={img}
        />

        <div className="local-participant">
          <div className="video-wrapper">
            <PoseNet
              className="posenet"
              frameRate={25}
              modelConfig={{
                architecture: 'ResNet50',
                quantBytes: 4,
                outputStride: 32,
                inputResolution: 250,
              }}
              inferenceConfig={{
                decodingMethod: "single-person",
                maxDetections: 1,
              }}
              onEstimate={(pose) => handlePose(pose)}
              drawSkeleton={!ready}
            />

            <DisplayScore />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Room;

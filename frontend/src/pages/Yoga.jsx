import React, { useEffect } from "react";
import YogaPoseCard from "../components/yogaPageItems/YogaPoseCard.jsx";
import YogaAsanaPose from "./Room/data/YogaAsanaPose.js";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

function Yoga() {
  const { isSignedIn, isLoaded, user } = useUser();
  return (
    <>
      <SignedIn>
        <div className="flex flex-col justify-center items-center">
          {isSignedIn ? (
            <h1 className="text-4xl font-bold text-center mb-10">Yoga Poses(click the picture)</h1>
          ) : null}
          <div className="flex flex-col justify-center items-center flex-wrap ">
            {YogaAsanaPose.map((asana, index) => {
              return (
                <YogaPoseCard
                  key={asana.id}
                  img={asana.img}
                  id={asana.id}
                  title={asana.title}
                  instructions={asana.des}
                />
              );
            })}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className='flex p-10 text-7xl justify-center items-center'>
          Please Sigin To view This Page!
        </div>
      </SignedOut>
    </>
  );
}

export default Yoga;
import React from 'react'
import MeditationVideoCard from '../components/meditationPageItems/MeditationVideoCard.jsx'
import { useRecoilValueLoadable } from 'recoil';
import { sleepVideoAtom } from '../store/atoms.js';
import { SignedIn , SignedOut } from '@clerk/clerk-react';
function Sleep() {
  const videoLoadable = useRecoilValueLoadable(sleepVideoAtom);

  switch(videoLoadable.state){

    case 'hasValue' : {
      return (<>
        <SignedIn>
        <div className='flex gap-5 flex-wrap justify-center items-center pt-5'>
            {videoLoadable.contents.map((video,index)=>{ return <MeditationVideoCard source={video.url} length={video.length} name={video.name} thumbnail={video.thumbnail}/>})}
        </div>
        </SignedIn>
        <SignedOut>
        <div className='flex p-10 text-7xl justify-center items-center'>
          Please Sigin To view This Page!
        </div>
      </SignedOut>
        </>)}

    case 'Loading' : {return (<div> Loading ...</div>)}

    case 'hasError' : {return (<div> 
      <SignedOut>
        <div className='flex p-10 text-7xl justify-center items-center'>
          Please Sigin To view This Page!
        </div>
      </SignedOut>
      </div>)}
  }
  
}


export default Sleep

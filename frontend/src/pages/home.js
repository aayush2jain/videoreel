import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoPlayCircleOutline } from "react-icons/io5";
import { useEffect } from 'react';
const Home = () => {
  const [downloaded, setdownloaded] = useState("Download Audio")
  const [title, setTitle] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [duration, setDuration] = useState('');
  const [views, setViews] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const params = useParams();
  const [error, setError] = useState('');

  const videoUrl = `https://www.youtube.com/watch?${params.id}`;

  // Open video in a new tab
  const play = () => {
    window.open(videoUrl, '_blank');
  };
  const google = () => {
  const videoUrl = window.location.href;
  console.log('videourl',videoUrl);
  // Open the Google auth route, passing the video URL as a query parameter
  window.open(`http://localhost:4000/auth/google?videoUrl=${encodeURIComponent(videoUrl)}`, "_self");
  };
  // Download video
  const download = async () => {
    
    setDownloading(true);
    try {
      const response = await fetch(`http://localhost:4000/download?url=${encodeURIComponent(videoUrl)}`);
      if (response.ok) {
        setDownloading(false);
        setdownloaded('Downloaded');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to download video.'); // Error message
      setDownloading(false);
    }
  };
  // const onSucess = (res)=>{
  //   console.log("login hogya bhai",res.profileObject);
  // }

  // const onFailure = (res)=>{
  //   console.log("nahi hua bhai")
  // }
  // const googleLogin = useGoogleLogin({
  //   onSuccess: onSucess,
  //   onError: onFailure,
  // });
  // Handle downloading and fetching video details
  const details = async () => {
    
    console.log('Video URL:', videoUrl);

    if (!videoUrl) {
      alert('Please enter a valid YouTube URL');
      
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/detail?url=${encodeURIComponent(videoUrl)}`);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }
      const data = await response.json();
      console.log("data", data.videodetails);
      setTitle(data.videodetails.title);
      setSubtitle(data.videodetails.description);
      setCategory(data.videodetails.category);
      setViews(data.videodetails.viewCount);
      setDuration(data.videodetails.lengthSeconds);
      setThumbnail(data.videodetails.thumbnails[4].url);
    } catch (error) {
      console.error('Error fetching the video:', error);
    } 
  };
  useEffect(() => {
    // google();
    details();
  }, [downloading]);
  return (
    <>
      <div className='bg-slate-800 pt-[7vh] text-gray-200 h-auto md:pb-[10vh]'>
        <div className='flex md:flex-row flex-col px-[5vw] gap-[5vw]'>
          <div>
            <div className='relative'>
              <img src={thumbnail} className='h-[70vh] md:w-[50vw] w-[90vw] rounded-lg' alt="thumbnail" />
              <IoPlayCircleOutline onClick={play} className='hover:cursor-pointer absolute text-5xl font-bold top-[30vh] left-[40vw] md:left-[20vw]' />
            </div>
            <h1 className='mt-[2vh]'><span className='font-bold'>Title: </span>{title}</h1>
            <div className='flex pt-[2vh] gap-[30vw]'>
              <h1><span className="font-bold">Views: </span>{views}</h1>
              <h1><span className='font-bold'>Category: </span>{category}</h1>
            </div>
            <div className='text-center md:ml-[18vw] ml-[26vw] flex ' onClick={download}>
              <div className='hover:cursor-pointer hover:text-blue-500 md:w-[12vw] w-[30vw] px-2 py-2 h-auto rounded-xl font-bold bg-black'>
               {downloaded}
              </div>
              {downloading && (
                <div className="md:w-[2vw] w-[4vw] mt-2 h-[4vw] md:h-[2vw] border-2 border-dashed rounded-full animate-spin border-blue-500"></div>
              )}
            </div>
            {error && <div className="error-message">{error}</div>}
            
          <div className="hover:cursor-pointer mt-[2vh] hover:text-blue-500 ml-[35vw] md:ml-[21vw] md:w-[6vw] w-[12vw] px-2 py-2 h-auto rounded-xl font-bold bg-black" onClick={google}>
            LogIn
          </div>

          </div>
          <div>
            <h1 className='font-bold'>Subtitle:</h1>
            <p className='md:h-[80vh] h-[30vh] mb-[5vh] md:mb-[0vh] md:w-[40vw] mx-auto w-[80vw] overflow-y-scroll  scrollbar-custom'>{subtitle}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

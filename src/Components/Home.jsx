import React, { useState } from 'react'

const Home = () => {
    const [userFile,setuserFile] = useState(null);
    const [finalurl,setfinalurl] = useState(null);
    const [isUploaded,setisUploaded] = useState(false);

    const handelFile=(e)=>{
        let Img = e.target.files[0]
        setuserFile(Img);
        
    }


    const handelBtn= async()=>{
    
    setisUploaded(true)
    const formData = new FormData();
    formData.append("image_file", userFile);
    formData.append("size", "auto");

    const api_key = "YM7FKtfuRxn4m4sAWG814946";
    await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": api_key,
      },
      body: formData,
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        setfinalurl(url);
        setisUploaded(false);
      })
      .catch();
    setisUploaded(false);
  }

    

  return (
        <main className='main_box'>
                <div className="box">
                <div>
                <input type="file" onChange={handelFile} name="file" id="file" />
                </div>

                <div>
                <button onClick={handelBtn}>Upload File</button>
                </div>
                </div>

                {isUploaded && <span className='text'>Plese Wait....</span>}

                
                {finalurl && 
                <div className="output">

                <div className='img'>
                <img src={finalurl} alt="final Pic" />
                </div>

                <a href={finalurl} download="no-back.png">
                <button className="btn btn_download">Download</button>
                </a>
                
                </div>
                }
            
                

        </main>
    )
}

export default Home
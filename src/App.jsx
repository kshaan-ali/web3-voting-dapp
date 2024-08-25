import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Listcoin from './assets/page/Listcoin'
import { Election } from './assets/page/election'

function App() {
  // const [count, setCount] = useState(0)
  // const [warningMessage, setWarningMessage] = useState('');
  // const imgUploadInput = (e) => {
  //   const file = e.target.files[0];
  //   const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

  //   if (file) {
  //     if (validImageTypes.includes(file.type)) {
  //       setWarningMessage('');
  //       var reader = new FileReader();
  //       reader.onload = function (evt) {
  //         setLogoImg(evt.target.result);
           
  //         console.log(evt.target.result); 
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       setWarningMessage('Warning: The selected file is not an image. Please upload a .jpg, .png, or .svg file.');
  //     }
  //   }
  // };

  return (
    // <div>ihsqid
    //   {/* <Listcoin></Listcoin> */}
    
    
    //   <div className="listCoinDiv">
    //       {/* {!submitClicked?( */}
    //           <div className="listCoinDivWrap">
             
    //           <div className="uploadImgDivWrap">
    //               <div className="openFolderImg">
    //                   <span className='titleInput'>Logo Upload*<br/>(.jpg .png .svg)</span>
    //                   <label htmlFor='uploadFileInput'>
    //                       <input type="file" id='uploadFileInput' className="uploadFile" onChange={imgUploadInput} accept=".jpg,.jpeg,.png,.svg"/>
                         
    //                   </label>
    //                   {<p>{warningMessage}</p>}
    //               </div>
                 
    //           </div>
              
              
    //           </div> 
    //       {/* ):(<Tiers info={listingInfo}/>)}  */}
          
    //   </div> </div>

    <div>
     <Election></Election>
    </div>
  )
}

export default App

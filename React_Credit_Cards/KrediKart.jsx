import React, { useState } from "react";
import "../style/KrediKart.css";
import Chip from "../img/visachip.png"
import YeniLogo from "../img/visalogoyeni.png"


  
function KrediKart() {
    const [kart, setKart] = useState({
        isim:"",
        kartNumara: "•••• •••• •••• ••••",
        ay: "••",
        yil: "••",
        cvv: ""
    })

    const handleChangeForm = (e) =>{
        setKart({
            ...kart, [e.target.name]: e.target.value
        })
    }
   const handleEnterMouse = () =>{
    document.querySelector(".front").style.transform = "perspective(1000px) rotateY(-180deg)"
    document.querySelector(".back").style.transform = "perspective(1000px) rotateY(0deg)"
   }

   const handleMouseLeave = ()=>{
    document.querySelector(".front").style.transform = "perspective(1000px) rotateY(0deg)"
    document.querySelector(".back").style.transform = "perspective(1000px) rotateY(180deg)"
   }

  return (
    
    <div className="container" >
        <div className="card-container">
            <div className="front">
                <div className="image">
                    <img src={Chip}/>
                    <img src={YeniLogo}/>
                </div>
                <div className="card-number-box">
                    {kart.kartNumara}
                </div>
                <div className="flexbox">
                    <div className="box">
                    <span>Kart Sahibi</span>
                    <div className="card-holder-name">{kart.isim}</div>
                    </div>
                    <div className="box">
                        <span>Tarih</span>
                        <div className="expiration">
                            <span className="exp-month">{kart.ay} / </span>
                            <span className="exp-year">{kart.yil}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="back">
                <div className="stripe"></div>
                <div className="box">
                    <span>CVV  </span>
                    <div className="cvv-box">{kart.cvv}</div>
                    <img src={YeniLogo}/>
                </div>
            </div>
            </div>
            <form action="">
                <div className="inputBox">
                    <span>KART NUMARASI</span>
                    <input maxLength={16} className="card-number-input" name="kartNumara" onChange={handleChangeForm} />
                </div>
                <div className="inputBox">
                    <span>KART SAHİBİ</span>
                    <input className="card-holder-input" name="isim" onChange={handleChangeForm} />
                </div>
                <div className="flexbox">
                    <div className="inputBox">
                        <span>AY</span>
                        <input maxLength={2} name="ay" onChange={handleChangeForm}/>
                    </div>
                    <div className="inputBox">
                        <span>YIL</span>
                        <input maxLength={4} name="yil" onChange={handleChangeForm}/>
                    </div>
                </div>
                <div className="inputBox">
                    <span>CVV</span>
                    <input maxLength={3} name="cvv" className="cvv-input" onMouseEnter={handleEnterMouse} onMouseLeave={handleMouseLeave} onChange={handleChangeForm}/>
                </div>
                <input type="submit" value="Gönder" className="submit-btn" />
            </form>
        
    </div>
  );
}

export default KrediKart;

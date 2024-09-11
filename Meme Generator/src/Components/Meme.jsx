import React from "react";
import memesData from "../memesData"
export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imgSrc: ""
    })
    const [allMemeImg, setAllMemeImage] = React.useState([])
    function getMemeImage(event) {
        // const memmesArr = allMemeImg.data.memes
        event.preventDefault()
        let num = Math.floor(Math.random() * allMemeImg.length)
        let url = allMemeImg[num].url
        setMeme(prevMeme => {
            return {...prevMeme,
            imgSrc: url
            }
        })
    }
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImage(data.data.memes))
    },[])
    const [formData, setFormData] = React.useState({
        topText: "",
        bottomText: ""
    })
    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevData => {
            return{
                ...prevData,
                [name]: value
            }
        })
    }
    return (
        <div className="meme">
            <form className = "form" onSubmit={getMemeImage}>
                <div className="input--box">
                    <input type = "text" className="form--input" placeholder="Top Text" name = "topText" onChange={handleChange} value={formData.topText}></input>
                    <input type = "text" className="form--input" placeholder="Bottom Text" name = "bottomText" onChange={handleChange} value={formData.bottomText}></input>
                </div>
                <button className="form--button" onClick = {getMemeImage}>Get a new Meme Image!</button>
            </form>
            <div className="meme--container">
                <img src = {meme.imgSrc} className="memeImg"></img>
                <h2 className="meme--text top">{formData.topText}</h2>
                <h2 className="meme--text bottom">{formData.bottomText}</h2>
            </div>
        </div>
    )
}
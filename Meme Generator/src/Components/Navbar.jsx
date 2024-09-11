import React from "react";
import face from "../assets/troll-face.png"

export default function Navbar() {
    return (
        <div className="header">
            <img src = {face} className="logo"></img>
            <h2 className="title">Meme Generator</h2>
            <h3></h3>
        </div>
    )
}
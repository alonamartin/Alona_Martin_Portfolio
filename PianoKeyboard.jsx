import React, { useState, useEffect } from "react";
import { Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const notes = {
  C:261.63,
  D:293.66,
  E:329.63,
  F:349.23,
  G:392,
  A:440,
  B:493.88,
  C2:523.25,
  "C#":277,
  "D#":311,
  "F#":369,
  "G#":415,
  "A#":466
};

function play(note){

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = notes[note];
  osc.type="sine";

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();

  gain.gain.setValueAtTime(0.35,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+1);

  osc.stop(audioCtx.currentTime+1);
}

export default function KeyboardEasterEgg(){

  const [stage,setStage]=useState("hidden");
  const [active,setActive]=useState(null);

  const white=[
    {note:"C",key:"c"},
    {note:"D",key:"d"},
    {note:"E",key:"e"},
    {note:"F",key:"f"},
    {note:"G",key:"g"},
    {note:"A",key:"a"},
    {note:"B",key:"b"},
    {note:"C2",key:"i"}
  ];

  const black=[
    {note:"C#",key:"C",left:60},
    {note:"D#",key:"D",left:120},
    {note:"F#",key:"F",left:240},
    {note:"G#",key:"G",left:300},
    {note:"A#",key:"A",left:360}
  ];

  const trigger=(note)=>{

    play(note);
    setActive(note);

    setTimeout(()=>{
      setActive(null);
    },150);

  };

  const openEgg=()=>{

    setStage("text");

    setTimeout(()=>{
      setStage("keyboard");
    },900);

  };

  useEffect(()=>{

    const handle=(e)=>{

      white.forEach(k=>{
        if(e.key===k.key) trigger(k.note)
      });

      black.forEach(k=>{
        if(e.key===k.key) trigger(k.note)
      });

    };

    window.addEventListener("keydown",handle);
    return ()=>window.removeEventListener("keydown",handle);

  },[]);

  return(

    <div style={{textAlign:"center",marginTop:"40px"}}>

      {/* MUSIC ICON */}

      <motion.div
        whileHover={{scale:1.2}}
        whileTap={{scale:[1,1.35,1],rotate:[0,-15,15,0]}}
        style={{cursor:"pointer"}}
        onClick={openEgg}
      >
        <Music size={46} color="#a7b4ff"/>
      </motion.div>

      <div style={{
        fontSize:"13px",
        color:"#9fb0ff",
        marginBottom:"15px",
        fontFamily:"Poppins, sans-serif"
      }}>
        Click for a rhythmic surprise
      </div>

      <AnimatePresence>

      {stage==="text" &&(

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          style={{
            fontSize:"18px",
            fontWeight:"600",
            color:"#e6ebff",
            marginTop:"40px",
            marginBottom:"40px",
            textAlign:"center",
            fontFamily:"Poppins, sans-serif",
            letterSpacing:"0.5px"
          }}
        >

          USE YOUR KEYBOARD

          <div style={{
            fontSize:"13px",
            opacity:0.7,
            marginTop:"5px"
          }}>
            (Capitals play the black keys)
          </div>

        </motion.div>

      )}

      {stage==="keyboard" &&(

        <motion.div
          initial={{opacity:0,scale:0.85}}
          animate={{opacity:1,scale:1}}
          style={{
            position:"relative",
            display:"inline-block",
            marginTop:"10px"
          }}
        >

          {/* WHITE KEYS */}

          <div style={{display:"flex"}}>

            {white.map(k=>(

              <motion.div
                key={k.note}
                onClick={()=>trigger(k.note)}
                whileTap={{y:6}}
                style={{
                  width:"60px",
                  height:"200px",
                  background:active===k.note?"#e3e8ff":"white",
                  border:"1px solid #aaa",
                  borderRadius:"0 0 6px 6px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"flex-end",
                  paddingBottom:"10px",
                  fontSize:"15px",
                  fontWeight:"600",
                  color:"black",
                  fontFamily:"Poppins, sans-serif"
                }}
              >
                {k.key}
              </motion.div>

            ))}

          </div>

          {/* BLACK KEYS */}

          {black.map(k=>(

            <motion.div
              key={k.note}
              onClick={()=>trigger(k.note)}
              whileTap={{y:5}}
              style={{
                position:"absolute",
                left:k.left,
                top:0,
                width:"40px",
                height:"120px",
                background:active===k.note?"#444":"black",
                color:"white",
                borderRadius:"0 0 5px 5px",
                display:"flex",
                alignItems:"flex-end",
                justifyContent:"center",
                paddingBottom:"8px",
                fontSize:"11px",
                fontFamily:"Poppins, sans-serif"
              }}
            >
              {k.key}
            </motion.div>

          ))}

        </motion.div>

      )}

      </AnimatePresence>

    </div>

  );
}
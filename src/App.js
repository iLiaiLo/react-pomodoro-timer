import React from "react";

function App() {

  const [num,setNum]=React.useState(1500);
  const [sec,setSec]=React.useState(num%60);
  const [mins,setMins]=React.useState(Math.floor(num/60))
  const [begin,setBegin]=React.useState(false);
  const [Break,setBreak]=React.useState(false);
  const [pomo,setPomo]=React.useState(2);
  const [Pvalue,setPvalue]=React.useState(1);
  const [Display,setDisplay]=React.useState(false);

 React.useEffect(()=>{
  const countdown=()=>{
    if(sec>0 && begin===true){
    setSec(sec-1)
    }
    else if(mins>0 && begin===true){
        setSec(59);
        setMins(mins-1)
    }
  }
  const c=setInterval(countdown,1000)

  return ()=>clearInterval(c)
 },
 [sec,mins,begin])

 React.useEffect(()=>{
  const audio=new Audio("alarm.mp3");
  if(mins===0 && sec===0){
  audio.play();
  }
 },[mins,sec])

 function start(){
  setBegin(true);
  setBreak(true)
  setNum(1500);
  setMins(Math.floor(1500/60));
  setSec(1500%60);
  setPvalue(p=>p+1);
 }

function takeBreak(){
  setBreak(false);
  setNum(300);
  setMins(Math.floor(300/60));
  setSec(300%60);
}

function Reset(){
  setNum(1500);
  setSec(1500%60)
  setMins(Math.floor(1500/60));
  setBegin(false);
  setBreak(false);
  setPomo(2);
  setPvalue(1);
}

function startBreakRender(){
  if((!begin && !Break) || (mins === 0 && sec === 0 && !Break)){
    return(<button className="Btn" onClick={start}>start</button>)
  }
  else if(mins===0 && sec===0  && Break && parseInt(pomo)+1!==Pvalue){
    return(<button className="Btn"  onClick={takeBreak}>take break</button>)
  }
  else if(parseInt(pomo)+1===Pvalue && mins===0 && sec===0 && Break){
    return(<button className="Btn"  onClick={Reset}>reset</button>)
  }
}

function setpomo(e){
  setPomo(e.target.value)
  console.log(e.target.value);
}
 
function greet(){
  if(parseInt(pomo)+1===Pvalue && mins===0 && sec===0){
    return <h1 class="greet">Success! You reached your goal!</h1>
  }
  return null;
}

function pomoDisplay(){
  let elements=[]
  let backgroundCol="aliceblue";

  for(let i=0;i<pomo;i++){
    if((i===Pvalue-2)){
       backgroundCol="rgb(32,230,58)";
    } 
    else{
      backgroundCol="aliceblue";
    }
    elements.push(<p key={i} style={{width:"20px",height:"20px", borderRadius:"50%",background:backgroundCol,boxShadow:"0 0 15px 0 rgb(181, 13, 122)"}}></p>)
  }
  return elements
}

  return (
    <div className="container">

   <div className="time">

    <div style={{position:"absolute",left:"35px"}}>{mins.toString().padStart(2,"0")}</div>
    <div style={{position:"absolute"}} >
      :
    </div>
    <div style={{position:"absolute",right:"35px"}}>{sec.toString().padStart(2,"0")}</div>
    
    </div>
   <div className="setPomo">
   {startBreakRender()}
   <button className="setBtnpomo" onClick={()=>setDisplay(prew=>!prew)}>Set pomodoros</button>
   {Display && <div className="Pomo">
   2<input className="inputPomo" type="range" min="2" step="1" value={pomo} max="8" id="pomo" onChange={e=>setpomo(e)} />8
   </div>}
   </div>
   <div style={{position:"relative",top:"50px",display:"flex",alignItems:"center",gap:"20px"}}>
    {pomoDisplay()}
   </div>
   {greet()}

  </div>   

  );
}

export default App;

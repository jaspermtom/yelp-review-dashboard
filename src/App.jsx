import { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

const NAT={meta:{label:"United States",total_reviews:5120000,total_elite_reviews:1360000,total_regular_reviews:3760000,business_count:45200},star_counts:{"5":{elite:497000,regular:1783000,total:2280000,elite_pct:21.8},"4":{elite:496000,regular:718000,total:1214000,elite_pct:40.9},"3":{elite:185000,regular:345000,total:530000,elite_pct:34.9},"2":{elite:98000,regular:418000,total:516000,elite_pct:19.0},"1":{elite:84000,regular:496000,total:580000,elite_pct:14.5}},star_pcts:{"5":44,"4":24,"3":10,"2":10,"1":12},trajectories:{"5":{elite:{"1":{avg:4.72},"5":{avg:4.58},"10":{avg:4.51},"25":{avg:4.45},"50":{avg:4.38},"100":{avg:4.31}},regular:{"1":{avg:4.80},"5":{avg:4.62},"10":{avg:4.55},"25":{avg:4.48},"50":{avg:4.42},"100":{avg:4.35}},all:{"1":{avg:4.76},"5":{avg:4.60},"10":{avg:4.53},"25":{avg:4.46},"50":{avg:4.40},"100":{avg:4.33}}},"4":{elite:{"1":{avg:4.35},"5":{avg:4.15},"10":{avg:4.08},"25":{avg:3.98},"50":{avg:3.90},"100":{avg:3.82}},regular:{"1":{avg:4.42},"5":{avg:4.20},"10":{avg:4.12},"25":{avg:4.02},"50":{avg:3.95},"100":{avg:3.88}},all:{"1":{avg:4.38},"5":{avg:4.18},"10":{avg:4.10},"25":{avg:4.00},"50":{avg:3.92},"100":{avg:3.85}}},"3":{elite:{"1":{avg:3.85},"5":{avg:3.62},"10":{avg:3.55},"25":{avg:3.48},"50":{avg:3.42},"100":{avg:3.38}},regular:{"1":{avg:3.92},"5":{avg:3.70},"10":{avg:3.60},"25":{avg:3.52},"50":{avg:3.46},"100":{avg:3.40}},all:{"1":{avg:3.88},"5":{avg:3.66},"10":{avg:3.58},"25":{avg:3.50},"50":{avg:3.44},"100":{avg:3.39}}},"2":{elite:{"1":{avg:3.40},"5":{avg:3.20},"10":{avg:3.12},"25":{avg:3.05},"50":{avg:2.98},"100":{avg:2.92}},regular:{"1":{avg:3.52},"5":{avg:3.28},"10":{avg:3.18},"25":{avg:3.10},"50":{avg:3.04},"100":{avg:2.98}},all:{"1":{avg:3.46},"5":{avg:3.24},"10":{avg:3.15},"25":{avg:3.08},"50":{avg:3.01},"100":{avg:2.95}}},"1":{elite:{"1":{avg:2.80},"5":{avg:2.55},"10":{avg:2.48},"25":{avg:2.42},"50":{avg:2.38},"100":{avg:2.35}},regular:{"1":{avg:2.95},"5":{avg:2.68},"10":{avg:2.58},"25":{avg:2.50},"50":{avg:2.44},"100":{avg:2.40}},all:{"1":{avg:2.88},"5":{avg:2.62},"10":{avg:2.53},"25":{avg:2.46},"50":{avg:2.41},"100":{avg:2.38}}}},words:{all:{all:[{word:"delicious",count:280000},{word:"friendly",count:220000},{word:"amazing",count:195000},{word:"fresh",count:180000},{word:"slow",count:120000},{word:"tasty",count:115000},{word:"rude",count:95000},{word:"cozy",count:88000},{word:"overpriced",count:82000},{word:"generous",count:78000},{word:"bland",count:72000},{word:"perfect",count:68000},{word:"authentic",count:65000},{word:"crispy",count:60000},{word:"terrible",count:55000},{word:"vibrant",count:50000},{word:"mediocre",count:48000},{word:"attentive",count:45000}]},"1":{elite:[{word:"terrible",count:24000},{word:"rude",count:18000},{word:"cold",count:15000},{word:"waited",count:14000},{word:"disgusting",count:12000},{word:"worst",count:11000},{word:"bland",count:9500},{word:"stale",count:8200},{word:"overpriced",count:7800},{word:"dirty",count:7200},{word:"slow",count:6800},{word:"horrible",count:5200},{word:"burnt",count:4800},{word:"tasteless",count:4200},{word:"raw",count:3800}],regular:[{word:"horrible",count:52000},{word:"worst",count:45000},{word:"rude",count:38000},{word:"cold",count:32000},{word:"terrible",count:28000},{word:"waited",count:25000},{word:"disgusting",count:22000},{word:"nasty",count:18000},{word:"overpriced",count:16000},{word:"bland",count:14000},{word:"slow",count:12000},{word:"stale",count:10000},{word:"dirty",count:9000},{word:"burnt",count:7500},{word:"awful",count:7000}],all:[{word:"horrible",count:76000},{word:"terrible",count:52000},{word:"rude",count:56000},{word:"worst",count:56000},{word:"cold",count:47000},{word:"waited",count:39000},{word:"disgusting",count:34000},{word:"bland",count:23500},{word:"overpriced",count:23800},{word:"nasty",count:18000},{word:"slow",count:18800},{word:"stale",count:18200},{word:"dirty",count:16200},{word:"burnt",count:12300},{word:"tasteless",count:4200}]},"2":{elite:[{word:"mediocre",count:16000},{word:"disappointed",count:14000},{word:"average",count:12000},{word:"overpriced",count:10000},{word:"bland",count:9000},{word:"slow",count:8500},{word:"okay",count:7800},{word:"soggy",count:6200},{word:"underwhelming",count:5800},{word:"dry",count:5500},{word:"small",count:5200},{word:"noisy",count:4800},{word:"waited",count:4500},{word:"lukewarm",count:4000},{word:"forgettable",count:3500}],regular:[{word:"okay",count:35000},{word:"mediocre",count:28000},{word:"average",count:25000},{word:"disappointed",count:22000},{word:"bland",count:18000},{word:"overpriced",count:16000},{word:"slow",count:14000},{word:"dry",count:12000},{word:"small",count:11000},{word:"soggy",count:9000},{word:"cold",count:8500},{word:"noisy",count:7500},{word:"underwhelming",count:7000},{word:"waited",count:6500},{word:"greasy",count:6000}],all:[{word:"okay",count:42800},{word:"mediocre",count:44000},{word:"average",count:37000},{word:"disappointed",count:36000},{word:"bland",count:27000},{word:"overpriced",count:26000},{word:"slow",count:22500},{word:"dry",count:17500},{word:"soggy",count:15200},{word:"small",count:16200},{word:"noisy",count:12300},{word:"underwhelming",count:12800},{word:"waited",count:11000},{word:"cold",count:8500},{word:"greasy",count:6000}]},"3":{elite:[{word:"decent",count:22000},{word:"average",count:18000},{word:"okay",count:16000},{word:"solid",count:14000},{word:"fine",count:12000},{word:"reasonable",count:10000},{word:"crowded",count:8500},{word:"portions",count:7800},{word:"slow",count:7200},{word:"pricey",count:6800},{word:"noisy",count:6200},{word:"cozy",count:5800},{word:"flavorful",count:5200},{word:"attentive",count:4800},{word:"inconsistent",count:4500}],regular:[{word:"okay",count:42000},{word:"decent",count:38000},{word:"average",count:32000},{word:"fine",count:28000},{word:"solid",count:24000},{word:"reasonable",count:20000},{word:"crowded",count:16000},{word:"portions",count:14000},{word:"slow",count:12000},{word:"pricey",count:11000},{word:"noisy",count:10000},{word:"cozy",count:8500},{word:"flavorful",count:7500},{word:"friendly",count:7000},{word:"inconsistent",count:6500}],all:[{word:"okay",count:58000},{word:"decent",count:60000},{word:"average",count:50000},{word:"fine",count:40000},{word:"solid",count:38000},{word:"reasonable",count:30000},{word:"crowded",count:24500},{word:"portions",count:21800},{word:"slow",count:19200},{word:"pricey",count:17800},{word:"noisy",count:16200},{word:"cozy",count:14300},{word:"flavorful",count:12700},{word:"attentive",count:4800},{word:"inconsistent",count:11000}]},"4":{elite:[{word:"delicious",count:52000},{word:"friendly",count:42000},{word:"fresh",count:38000},{word:"cozy",count:32000},{word:"flavorful",count:28000},{word:"attentive",count:24000},{word:"generous",count:20000},{word:"crispy",count:18000},{word:"vibrant",count:15000},{word:"savory",count:14000},{word:"authentic",count:12000},{word:"bustling",count:10000},{word:"tender",count:9500},{word:"satisfying",count:9000},{word:"charming",count:8200}],regular:[{word:"delicious",count:105000},{word:"friendly",count:85000},{word:"fresh",count:72000},{word:"tasty",count:65000},{word:"cozy",count:55000},{word:"generous",count:42000},{word:"crispy",count:38000},{word:"flavorful",count:35000},{word:"affordable",count:32000},{word:"attentive",count:28000},{word:"savory",count:24000},{word:"authentic",count:22000},{word:"tender",count:18000},{word:"vibrant",count:16000},{word:"charming",count:14000}],all:[{word:"delicious",count:157000},{word:"friendly",count:127000},{word:"fresh",count:110000},{word:"tasty",count:65000},{word:"cozy",count:87000},{word:"generous",count:62000},{word:"crispy",count:56000},{word:"flavorful",count:63000},{word:"attentive",count:52000},{word:"savory",count:38000},{word:"authentic",count:34000},{word:"vibrant",count:31000},{word:"affordable",count:32000},{word:"tender",count:27500},{word:"charming",count:22200}]},"5":{elite:[{word:"amazing",count:68000},{word:"delicious",count:62000},{word:"outstanding",count:48000},{word:"friendly",count:45000},{word:"fresh",count:38000},{word:"incredible",count:35000},{word:"perfect",count:32000},{word:"authentic",count:28000},{word:"generous",count:24000},{word:"flavorful",count:22000},{word:"cozy",count:20000},{word:"crispy",count:18000},{word:"tender",count:16000},{word:"impeccable",count:14000},{word:"exquisite",count:12000}],regular:[{word:"amazing",count:142000},{word:"delicious",count:128000},{word:"friendly",count:95000},{word:"fresh",count:82000},{word:"tasty",count:75000},{word:"perfect",count:68000},{word:"incredible",count:55000},{word:"generous",count:45000},{word:"affordable",count:42000},{word:"cozy",count:38000},{word:"authentic",count:35000},{word:"crispy",count:30000},{word:"outstanding",count:28000},{word:"tender",count:24000},{word:"vibrant",count:22000}],all:[{word:"amazing",count:210000},{word:"delicious",count:190000},{word:"friendly",count:140000},{word:"fresh",count:120000},{word:"perfect",count:100000},{word:"tasty",count:75000},{word:"incredible",count:90000},{word:"generous",count:69000},{word:"cozy",count:58000},{word:"authentic",count:63000},{word:"affordable",count:42000},{word:"crispy",count:48000},{word:"outstanding",count:76000},{word:"tender",count:40000},{word:"vibrant",count:22000}]}}};
const NASH_T={"5":{elite:{"1":{avg:4.65},"5":{avg:4.50},"10":{avg:4.42},"25":{avg:4.35},"50":{avg:4.28},"100":{avg:4.20}},regular:{"1":{avg:4.75},"5":{avg:4.55},"10":{avg:4.48},"25":{avg:4.40},"50":{avg:4.34},"100":{avg:4.28}},all:{"1":{avg:4.70},"5":{avg:4.52},"10":{avg:4.45},"25":{avg:4.38},"50":{avg:4.31},"100":{avg:4.24}}},"4":{elite:{"1":{avg:4.28},"5":{avg:4.08},"10":{avg:3.98},"25":{avg:3.88},"50":{avg:3.80},"100":{avg:3.72}},regular:{"1":{avg:4.35},"5":{avg:4.12},"10":{avg:4.04},"25":{avg:3.94},"50":{avg:3.86},"100":{avg:3.78}},all:{"1":{avg:4.32},"5":{avg:4.10},"10":{avg:4.01},"25":{avg:3.91},"50":{avg:3.83},"100":{avg:3.75}}},"3":{elite:{"1":{avg:3.78},"5":{avg:3.55},"10":{avg:3.46},"25":{avg:3.38},"50":{avg:3.32},"100":{avg:3.28}},regular:{"1":{avg:3.85},"5":{avg:3.62},"10":{avg:3.52},"25":{avg:3.44},"50":{avg:3.38},"100":{avg:3.32}},all:{"1":{avg:3.82},"5":{avg:3.58},"10":{avg:3.49},"25":{avg:3.41},"50":{avg:3.35},"100":{avg:3.30}}},"2":{elite:{"1":{avg:3.32},"5":{avg:3.10},"10":{avg:3.02},"25":{avg:2.95},"50":{avg:2.88},"100":{avg:2.82}},regular:{"1":{avg:3.45},"5":{avg:3.20},"10":{avg:3.10},"25":{avg:3.02},"50":{avg:2.95},"100":{avg:2.88}},all:{"1":{avg:3.38},"5":{avg:3.15},"10":{avg:3.06},"25":{avg:2.98},"50":{avg:2.92},"100":{avg:2.85}}},"1":{elite:{"1":{avg:2.70},"5":{avg:2.45},"10":{avg:2.38},"25":{avg:2.32},"50":{avg:2.28},"100":{avg:2.25}},regular:{"1":{avg:2.85},"5":{avg:2.58},"10":{avg:2.48},"25":{avg:2.40},"50":{avg:2.35},"100":{avg:2.30}},all:{"1":{avg:2.78},"5":{avg:2.52},"10":{avg:2.43},"25":{avg:2.36},"50":{avg:2.32},"100":{avg:2.28}}}};
const NASH={...NAT,meta:{label:"Nashville",total_reviews:185000,total_elite_reviews:48000,total_regular_reviews:137000,business_count:2200},star_counts:{"5":{elite:17600,regular:76700,total:94300,elite_pct:18.7},"4":{elite:19500,regular:24900,total:44400,elite_pct:43.9},"3":{elite:9100,regular:13100,total:22200,elite_pct:41.0},"2":{elite:2400,regular:8700,total:11100,elite_pct:21.6},"1":{elite:1040,regular:11960,total:13000,elite_pct:8.0}},star_pcts:{"5":51,"4":24,"3":12,"2":6,"1":7},trajectories:NASH_T};
const CIDX={national:{label:"United States",review_count:5120000,business_count:45200},states:{AZ:[{key:"phoenix_az",city:"Phoenix",state:"AZ",business_count:4200,review_count:320000}],CA:[{key:"los_angeles_ca",city:"Los Angeles",state:"CA",business_count:8500,review_count:620000},{key:"san_francisco_ca",city:"San Francisco",state:"CA",business_count:4200,review_count:380000}],FL:[{key:"miami_fl",city:"Miami",state:"FL",business_count:3800,review_count:285000}],IL:[{key:"chicago_il",city:"Chicago",state:"IL",business_count:6200,review_count:480000}],NV:[{key:"las_vegas_nv",city:"Las Vegas",state:"NV",business_count:5100,review_count:420000}],NY:[{key:"new_york_ny",city:"New York",state:"NY",business_count:9200,review_count:720000}],PA:[{key:"philadelphia_pa",city:"Philadelphia",state:"PA",business_count:3400,review_count:265000}],TN:[{key:"nashville_tn",city:"Nashville",state:"TN",business_count:2200,review_count:185000}],TX:[{key:"austin_tx",city:"Austin",state:"TX",business_count:3200,review_count:255000}]}};

const C1="#C41200",C2="#0E7490",FF="'IBM Plex Sans',sans-serif",FH="'Fraunces',serif";
const SC1={"5":"#C41200","4":"#D93D2B","3":"#E86858","2":"#B85450","1":"#8B4845"},SC2={"5":"#0E7490","4":"#1594B0","3":"#2BB4CC","2":"#1B8A9E","1":"#1A6B7A"};
const ML=[1,5,10,25,50,100],YRS=["All Time","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011"],SD=[5,4,3,2,1],MBP=55,MAX_DAILY=100;
const fmt=n=>{if(n>=1e6)return(n/1e6).toFixed(2)+"M";if(n>=1e3)return(n/1e3).toFixed(n>=1e4?0:1)+"K";return n.toLocaleString()};
const gfl=(hs,ht)=>{if(!hs)return"All users · 1–5★";return`${ht==="elite"?"Elite":ht==="regular"?"Regular":"All users"} · ${hs}★`};
const gCL=k=>{if(k==="national")return"United States";return Object.values(CIDX.states).flat().find(c=>c.key===k)?.city||k};
const RobotIcon=({size=14})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><circle cx="8.5" cy="16" r="1.5" fill="currentColor" stroke="none"/><circle cx="15.5" cy="16" r="1.5" fill="currentColor" stroke="none"/></svg>;

const FEEDBACK_URL="https://forms.gle/T4U7MhJSYHy8Aqwp7";
function InfoModal({open,onClose}){if(!open)return null;return(<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(2px)",padding:16}}><div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,maxWidth:560,width:"100%",maxHeight:"85vh",overflow:"auto",padding:"28px 32px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",fontFamily:FF}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><h2 style={{margin:0,fontSize:24,fontWeight:800,fontFamily:FH,color:"#111"}}>About This Dashboard</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:22,color:"#666",cursor:"pointer"}}>✕</button></div><div style={{marginBottom:24}}><h3 style={{fontSize:16,fontWeight:700,color:C1,margin:"0 0 8px"}}>What is a Yelp Elite user?</h3><p style={{fontSize:13,lineHeight:1.7,color:"#333",margin:0}}><a href="https://www.yelp.com/elite/other" target="_blank" rel="noopener noreferrer" style={{color:C1,fontWeight:600,textDecoration:"none"}}>Yelp Elite</a> is an annual designation awarded to active community members who write high-quality, detailed reviews. Elite users are selected based on review quality, quantity, voting and compliment history, and community engagement.</p></div><div style={{marginBottom:24}}><h3 style={{fontSize:16,fontWeight:700,color:C1,margin:"0 0 8px"}}>Data Source</h3><p style={{fontSize:13,lineHeight:1.7,color:"#333",margin:0}}>This dashboard uses the <a href="https://business.yelp.com/data/resources/open-dataset/" target="_blank" rel="noopener noreferrer" style={{color:C1,fontWeight:600,textDecoration:"none"}}>Yelp Open Dataset</a>, a subset of Yelp data that is intended for educational use. Only food and restaurant businesses with 20+ reviews are included. Reviews from 2011–2022 are included.</p></div><div style={{marginBottom:24}}><h3 style={{fontSize:16,fontWeight:700,color:C1,margin:"0 0 8px"}}>Terms & Conditions</h3><p style={{fontSize:13,lineHeight:1.7,color:"#333",margin:0}}>Use is governed by the <a href="https://docs.google.com/document/d/1UsdiaLglLrXpjnxXiUdN2uFI7bYFH9wEIP7JYvAITcw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{color:C1,fontWeight:600,textDecoration:"none"}}>Yelp Dataset License Agreement</a> This link is a copy of the terms of services that was downloaded on March 5th, 2026.</p></div><div style={{marginBottom:24}}><h3 style={{fontSize:16,fontWeight:700,color:C1,margin:"0 0 8px"}}>Have Feedback?</h3><p style={{fontSize:13,lineHeight:1.7,color:"#333",margin:0}}>Please submit any feedback <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" style={{color:C1,fontWeight:600,textDecoration:"none"}}>here</a>. Thanks!</p></div><div style={{borderTop:"1px solid #eee",paddingTop:14,fontSize:13,color:"#666"}}>Independent analysis by <a href="https://www.jaspermtom.com/" target="_blank" rel="noopener noreferrer" style={{color:C1,fontWeight:600,textDecoration:"none"}}>Jasper Tom</a>, not affiliated with Yelp Inc.</div></div></div>)}
function Btn({children,onClick,style={},disabled=false}){const[h,setH]=useState(false);return(<button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={disabled?undefined:onClick} disabled={disabled} style={{transition:"all 0.15s",transform:h&&!disabled?"translateY(-1px)":"none",boxShadow:h&&!disabled?"0 2px 6px rgba(0,0,0,0.06)":"none",opacity:disabled?0.5:1,cursor:disabled?"not-allowed":"pointer",...style}}>{children}</button>)}
function CityDropdown({cityIndex,selected,onSelect,accent=C1,autoOpen=false,disabledKey=null,alignRight=false,fullWidthMobile=false}){
  const[open,setOpen]=useState(autoOpen);
  const[search,setSearch]=useState("");
  const[ddAlign,setDdAlign]=useState(alignRight?"right":"left");
  const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  useEffect(()=>{
    if(open&&ref.current){
      const rect=ref.current.getBoundingClientRect();
      const vw=window.innerWidth;
      if(vw>=600){const spaceRight=vw-rect.left;setDdAlign(spaceRight<350||alignRight?"right":"left");}
      else{setDdAlign("left");}
    }
  },[open,alignRight]);
  const name=selected?gCL(selected):"Select City";
  const filter=q=>{if(!q)return cityIndex?.states||{};const l=q.toLowerCase(),f={};Object.entries(cityIndex?.states||{}).forEach(([s,list])=>{const m=list.filter(c=>c.city.toLowerCase().includes(l)||s.toLowerCase().includes(l));if(m.length)f[s]=m});return f};
  const isDis=k=>k===disabledKey;
  const ddPos=ddAlign==="right"?{right:0}:{left:0};
  const btnStyle={background:"#fff",border:`2px solid ${accent}`,borderRadius:8,padding:"7px 16px",color:selected?accent:"#777777",fontSize:16,fontFamily:FH,fontWeight:700,display:"flex",alignItems:"center",gap:10,whiteSpace:"nowrap",width:fullWidthMobile?"100%":undefined,boxSizing:"border-box"};
  return(<div ref={ref} style={{position:"relative",display:fullWidthMobile?"block":"inline-block"}}>
    <Btn onClick={()=>setOpen(!open)} style={btnStyle}>{name}<span style={{fontSize:13,marginLeft:"auto"}}>▾</span></Btn>
    {open&&<div className="yd-dd-panel" style={{position:"absolute",top:"100%",...ddPos,marginTop:4,background:"#fff",border:"1px solid #ddd",borderRadius:10,width:fullWidthMobile?"100%":280,maxWidth:"calc(100vw - 48px)",maxHeight:300,overflow:"hidden",zIndex:9999,boxShadow:"0 8px 32px rgba(0,0,0,0.12)"}}>
      <div style={{padding:8}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cities..." autoFocus style={{width:"100%",background:"#f5f5f5",border:"1px solid #ddd",borderRadius:6,padding:"7px 10px",color:"#333",fontSize:14,fontFamily:FF,outline:"none",boxSizing:"border-box"}}/></div>
      <div style={{overflowY:"auto",maxHeight:228}}>
        <div className="yd-dd-national" onClick={()=>{if(!isDis("national")){onSelect("national");setOpen(false);setSearch("")}}} style={{padding:"9px 14px",cursor:isDis("national")?"default":"pointer",color:isDis("national")?"#ccc":selected==="national"?accent:"#333",fontSize:14,fontFamily:FF,fontWeight:700,borderBottom:"1px solid #f0f0f0",opacity:isDis("national")?0.4:1,transition:"background 0.1s"}}>🇺🇸 United States <span style={{color:"#999",fontSize:11}}>– {fmt(cityIndex.national.review_count)} reviews · {fmt(cityIndex.national.business_count)} restaurants</span></div>
        {Object.entries(filter(search)).map(([st,cities])=><div key={st}><div style={{padding:"5px 14px",fontSize:10,color:"#555",fontWeight:700,letterSpacing:1.5,background:"#f9f9f9",fontFamily:FF}}>{st}</div>{cities.map(c=>{const dis=isDis(c.key);return(<div key={c.key} className={dis?"":"yd-dd-item"} onClick={()=>{if(!dis){onSelect(c.key);setOpen(false);setSearch("")}}} style={{padding:"7px 14px 7px 26px",cursor:dis?"default":"pointer",fontSize:14,fontFamily:FF,color:dis?"#ccc":selected===c.key?accent:"#333",fontWeight:selected===c.key?700:400,opacity:dis?0.4:1,transition:"background 0.1s"}}>{c.city} <span style={{color:dis?"#ddd":"#999",fontSize:11}}>– {fmt(c.review_count)} reviews · {fmt(c.business_count)} restaurants</span></div>)})}</div>)}
      </div>
    </div>}
  </div>)}
function YearSelector({value,onChange}){const[open,setOpen]=useState(false);const ref=useRef(null);const btnRef=useRef(null);const[btnW,setBtnW]=useState(100);useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);useEffect(()=>{if(btnRef.current)setBtnW(btnRef.current.offsetWidth)},[value]);return(<div ref={ref} style={{position:"relative",display:"inline-block"}}><div ref={btnRef}><Btn onClick={()=>setOpen(!open)} style={{padding:"7px 14px",fontSize:14,fontWeight:500,borderRadius:8,border:"2px solid #888",background:value!=="All Time"?"#f0f0f0":"#fff",color:"#555",fontFamily:FF,display:"flex",alignItems:"center",gap:6}}>{value}<span style={{fontSize:10,color:"#555"}}>▾</span></Btn></div>{open&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:"#fff",border:"1px solid #ddd",borderRadius:8,width:Math.max(btnW,90),maxHeight:280,overflow:"auto",zIndex:9999,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>{YRS.map(y=><div key={y} onClick={()=>{onChange(y);setOpen(false)}} style={{padding:"7px 14px",cursor:"pointer",fontSize:14,fontFamily:FF,color:value===y?C1:"#333",fontWeight:value===y?600:400,background:value===y?"#fef2f2":"transparent"}}>{y}</div>)}</div>}</div>)}

// Responsive DotBar: tiles use flex:1 to fill available width
const DotBar=({pct,elitePct,color,activeType,onType})=>{const total=20,filled=Math.max(0,Math.round((pct/MBP)*total));const showElite=elitePct>=10;let eD=showElite?Math.round(filled*(elitePct/100)):0,rD=filled-eD,empty=total-filled;const gap=3;const renderRegion=(type,count,bg)=>{if(count<=0)return null;return(<div onPointerEnter={()=>onType(type)} style={{display:"flex",gap,cursor:"pointer",flex:count}}>{Array.from({length:count},(_,i)=>(<div key={i} style={{flex:1,height:26,borderRadius:2.5,background:bg,boxShadow:activeType===type?`0 0 0 .75px ${color}60`:"none",transition:"box-shadow 0.1s"}}/>))}</div>)};return(<div style={{display:"flex",gap,alignItems:"center",cursor:"pointer",width:"100%"}} onPointerEnter={()=>onType("all")}>{renderRegion("elite",eD,color)}{renderRegion("regular",rD,`${color}30`)}{renderRegion("all",empty,"#e5e5e5")}</div>)};

function DetailRow({sc,color,label}){return(<div style={{marginBottom:2}}><div style={{display:"flex",alignItems:"baseline",gap:6}}><span style={{color,fontWeight:700,fontSize:14}}>{label}</span><span style={{fontSize:14,color:"#555"}}>{fmt(sc.total)} total</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:"#555",fontFamily:FF,maxWidth:320}}><span><strong style={{color}}>{fmt(sc.elite)}</strong> elite ({sc.elite_pct.toFixed(1)}%)</span><span><strong>{fmt(sc.regular)}</strong> regular ({(100-sc.elite_pct).toFixed(1)}%)</span></div></div>)}

function ReviewComposition({data,data2,label1,label2,hs,setHs,ht,setHt}){const isC=!!data2;const gp=(d,s)=>{if(d.star_pcts)return d.star_pcts[s];const t=Object.values(d.star_counts).reduce((a,b)=>a+b.total,0);return Math.round((d.star_counts[s].total/t)*100)};const ge=(d,s)=>d.star_counts[s].elite_pct;const isNat=label1==="United States"||label2==="United States";const bylineTotal=isC?(isNat?fmt(Math.max(data.meta.total_reviews,data2?.meta?.total_reviews||0)):fmt(data.meta.total_reviews+(data2?.meta?.total_reviews||0))):fmt(data.meta.total_reviews);return(<div><h3 style={{fontSize:12,letterSpacing:2,color:C1,fontWeight:700,margin:"0 0 2px",fontFamily:FF}}>REVIEW COMPOSITION</h3><p style={{color:"#555",fontSize:14,margin:"0 0 14px"}}>{bylineTotal} reviews broken down by rating</p><div style={{display:"grid",gridTemplateColumns:"40px 1fr auto",gap:"0 8px",marginBottom:4}}><div/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#555",fontFamily:"'DM Mono',monospace"}}><span>0%</span><span>25%</span><span>50%</span></div><div style={{minWidth:48}}/></div>{SD.map(star=>{const dim=hs!==null&&hs!==star;const act=hs===star;const sc1=data.star_counts[star],sc2=data2?.star_counts[star];return(<div key={star} onPointerEnter={()=>setHs(star)} onPointerLeave={()=>{setHs(null);setHt(null)}} style={{padding:"10px 0",borderBottom:star>1?"1px solid #eee":"none",opacity:dim?0.2:1,transition:"opacity 0.2s",cursor:"pointer"}}><div style={{display:"grid",gridTemplateColumns:"40px 1fr auto",gap:"0 8px",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:3}}><span style={{fontSize:15,fontWeight:700,color:"#444",fontFamily:FH}}>{star}</span><svg width="14" height="14" viewBox="0 0 20 20"><path d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.14l-4.94 2.53.94-5.5-4-3.9 5.53-.76z" fill="#999"/></svg></div><div style={{display:"flex",flexDirection:"column",gap:isC?4:0,minWidth:0}}><DotBar pct={gp(data,star)} elitePct={ge(data,star)} color={C1} activeType={act?ht:null} onType={setHt}/>{isC&&<DotBar pct={gp(data2,star)} elitePct={ge(data2,star)} color={C2} activeType={act?ht:null} onType={setHt}/>}</div><div style={{textAlign:"right",minWidth:48,flexShrink:0}}>{!isC&&<span style={{fontSize:20,fontWeight:800,color:"#1a1a1a",fontFamily:FH}}>{gp(data,star)}%</span>}{isC&&<><div style={{fontSize:17,fontWeight:800,color:C1,fontFamily:FH,lineHeight:1.3}}>{gp(data,star)}%</div><div style={{fontSize:17,fontWeight:800,color:C2,fontFamily:FH,lineHeight:1.3}}>{gp(data2,star)}%</div></>}</div></div>{act&&<div style={{marginTop:6,paddingLeft:48}}><DetailRow sc={sc1} color={C1} label={label1}/>{isC&&sc2&&<div style={{marginTop:6}}><DetailRow sc={sc2} color={C2} label={label2}/></div>}</div>}</div>)})}<div className="yd-key" style={{display:"flex",flexDirection:"column",gap:6,marginTop:14,fontSize:14,color:"#555",fontFamily:FF}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontWeight:600,color:C1,minWidth:0}}>{label1}</span>
        <span style={{display:"flex",alignItems:"center",gap:4,marginLeft:"auto"}}><span style={{width:12,height:14,borderRadius:2,background:C1,display:"inline-block"}}/>Elite</span>
        <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:12,height:14,borderRadius:2,background:`${C1}30`,display:"inline-block"}}/>Regular</span>
      </div>
      {isC&&<div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontWeight:600,color:C2,minWidth:0}}>{label2}</span>
        <span style={{display:"flex",alignItems:"center",gap:4,marginLeft:"auto"}}><span style={{width:12,height:14,borderRadius:2,background:C2,display:"inline-block"}}/>Elite</span>
        <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:12,height:14,borderRadius:2,background:`${C2}30`,display:"inline-block"}}/>Regular</span>
      </div>}
    </div></div>)}

function TrajectoryChart({data,data2,hs,ht,label1,label2,bc1,bc2}){const svgRef=useRef(null),containerRef=useRef(null),[dims,setDims]=useState({w:480,h:300});useEffect(()=>{const ro=new ResizeObserver(entries=>{for(const e of entries)setDims({w:Math.max(240,e.contentRect.width),h:300})});if(containerRef.current)ro.observe(containerRef.current);return()=>ro.disconnect()},[]);useEffect(()=>{if(!svgRef.current||!data)return;const svg=d3.select(svgRef.current);svg.selectAll("*").remove();const m={top:14,right:60,bottom:48,left:72},{w,h}=dims,iw=w-m.left-m.right,ih=h-m.top-m.bottom;const g=svg.append("g").attr("transform",`translate(${m.left},${m.top})`);const ut=ht==="elite"?"elite":ht==="regular"?"regular":"all";const sp=iw/(ML.length-1),xp={};ML.forEach((ml,i)=>{xp[ml]=i*sp});const x=ml=>xp[ml]??0;const y=d3.scaleLinear().domain([0.5,5.0]).range([ih,0]);[0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0].forEach(v=>{g.append("line").attr("x1",0).attr("x2",iw).attr("y1",y(v)).attr("y2",y(v)).attr("stroke",v%1===0?"#e0e0e0":"#f0f0f0");g.append("text").attr("x",-8).attr("y",y(v)).attr("text-anchor","end").attr("dominant-baseline","middle").attr("fill","#555").attr("font-size","11px").attr("font-family","'DM Mono',monospace").text(v.toFixed(1))});
// Y-axis title (rotated)
svg.append("text").attr("transform",`rotate(-90)`).attr("x",-(m.top+ih/2)).attr("y",14).attr("text-anchor","middle").attr("fill","#555").attr("font-size","9px").attr("letter-spacing","1.2px").attr("font-family",FF).text("RESTAURANT RATING");
ML.forEach(ml=>{g.append("text").attr("x",x(ml)).attr("y",ih+16).attr("text-anchor","middle").attr("fill","#555").attr("font-size","11px").attr("font-family","'DM Mono',monospace").text(ml)});g.append("text").attr("x",iw/2).attr("y",ih+36).attr("text-anchor","middle").attr("fill","#555").attr("font-size","10px").attr("letter-spacing","1.5px").attr("font-family",FF).text("NUMBER OF REVIEWS");const line=d3.line().x(d=>x(d.m)).y(d=>y(d.avg)).curve(d3.curveMonotoneX);const labels={};const draw=(ds,cm)=>{SD.forEach(star=>{const s=String(star),traj=ds.trajectories[s]?.[ut];if(!traj)return;const pts=ML.filter(ml=>traj[ml]).map(ml=>({m:ml,avg:traj[ml].avg}));if(pts.length<2)return;const hi=hs===null||hs===star;const op=hi?0.9:0.1,sw=hi?2.5:1.5;g.append("path").datum(pts).attr("d",line).attr("fill","none").attr("stroke",cm[s]).attr("stroke-width",sw).attr("opacity",op);if(hi)pts.forEach(p=>g.append("circle").attr("cx",x(p.m)).attr("cy",y(p.avg)).attr("r",3).attr("fill",cm[s]).attr("opacity",op));const last=pts[pts.length-1];if(!labels[s])labels[s]=[];labels[s].push({y:y(last.avg),color:cm[s],op})})};draw(data,SC1);if(data2)draw(data2,SC2);Object.entries(labels).forEach(([s,arr])=>{if(arr.length===2){const midY=(arr[0].y+arr[1].y)/2;g.append("text").attr("x",x(100)+8).attr("y",midY-6).attr("dominant-baseline","auto").attr("fill",arr[0].color).attr("font-size","10px").attr("font-weight","700").attr("font-family",FF).attr("opacity",arr[0].op).text(`${s}★`);g.append("text").attr("x",x(100)+28).attr("y",midY-6).attr("dominant-baseline","auto").attr("fill",arr[1].color).attr("font-size","10px").attr("font-weight","700").attr("font-family",FF).attr("opacity",arr[1].op).text(`${s}★`)}else{g.append("text").attr("x",x(100)+8).attr("y",arr[0].y).attr("dominant-baseline","middle").attr("fill",arr[0].color).attr("font-size","11px").attr("font-weight","700").attr("font-family",FF).attr("opacity",arr[0].op).text(`${s}★`)}})},[data,data2,hs,ht,dims]);
return(<div ref={containerRef} style={{position:"relative",width:"100%"}}><svg ref={svgRef} width={dims.w} height={dims.h} style={{display:"block"}}/><div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8,fontSize:12,color:"#555",fontFamily:FF}}><span style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:18,height:3,borderRadius:2,background:C1,flexShrink:0,display:"inline-block"}}/><span>{label1}{bc1?<span style={{color:"#999",fontWeight:400}}> – {fmt(bc1)} restaurants</span>:null}</span></span>{data2&&label2&&<span style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:18,height:3,borderRadius:2,background:C2,flexShrink:0,display:"inline-block"}}/><span>{label2}{bc2?<span style={{color:"#999",fontWeight:400}}> – {fmt(bc2)} restaurants</span>:null}</span></span>}</div></div>)}

function WordCloud({data,hs,ht,accent=C1}){const star=hs?String(hs):"all",type=ht||"all";let words=[];if(star==="all"&&data?.words?.all?.all)words=data.words.all.all;else if(data?.words?.[star]?.[type])words=data.words[star][type];else if(data?.words?.[star]?.all)words=data.words[star].all;const mx=words.length>0?words[0].count:1;const gc=c=>{const r=c/mx;return r>0.6?accent:r>0.3?accent+"B0":"#666"};return(<div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:"2px 8px",padding:"6px 4px"}}>{words.slice(0,12).map(w=>{const sz=11+(w.count/mx)*18;return(<span key={w.word} title={`${w.word}: ${fmt(w.count)}`} style={{fontSize:sz,fontFamily:FF,fontWeight:sz>22?700:sz>15?600:400,color:gc(w.count),lineHeight:1.3,cursor:"default"}}>{w.word}</span>)})}</div>)}

// AI Insights: button + tooltip + results card (rendered in main layout, not as popover)
// States: idle → pending (3s delay, cancellable) → loading (API call) → done / cancelling (2s) → idle
function useAIInsights(data,data2,label1,label2){
  const[insights,setInsights]=useState(null);
  // 'idle' | 'pending' | 'loading' | 'cancelling'
  const[phase,setPhase]=useState('idle');
  const[usage,setUsage]=useState(0);
  const cancelRef=useRef(false);
  const timerRef=useRef(null);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("ai_usage");if(r){const d=JSON.parse(r.value);const today=new Date().toDateString();setUsage(d.date===today?d.count:0)}else setUsage(0)}catch{setUsage(0)}})()},[]);
  const save=async c=>{try{await window.storage.set("ai_usage",JSON.stringify({date:new Date().toDateString(),count:c}))}catch{}};
  const remaining=MAX_DAILY-usage;
  const generate=()=>{
    if(usage>=MAX_DAILY||phase!=='idle')return;
    try{if(window.posthog)window.posthog.capture('ai_insights_clicked');}catch{}
    cancelRef.current=false;
    setPhase('pending');
    timerRef.current=setTimeout(async()=>{
      if(cancelRef.current)return;
      setPhase('loading');
      const ctx=`Location: ${label1}. Stars: ${SD.map(s=>`${s}★=${data.star_pcts[s]}%`).join(", ")}. Elite%: ${SD.map(s=>`${s}★=${data.star_counts[s].elite_pct.toFixed(1)}%`).join(", ")}. Total: ${fmt(data.meta.total_reviews)}.${data2?` Compare: ${label2}. Stars: ${SD.map(s=>`${s}★=${data2.star_pcts[s]}%`).join(", ")}. Elite%: ${SD.map(s=>`${s}★=${data2.star_counts[s].elite_pct.toFixed(1)}%`).join(", ")}.`:""}`;
      try{const r=await fetch("https://yelp-ai-proxy.jaspermtom.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Analyze this Yelp data:\n${ctx}\nProvide exactly 3 interesting, specific, data-driven insights. Each 1-2 sentences. Format as JSON array: [{"title":"4-6 words","body":"insight text"}]. Return ONLY JSON.`}]})});const d=await r.json();if(cancelRef.current){setPhase('idle');return;}const text=d.content?.map(c=>c.text||"").join("")||"";const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());setInsights(parsed);const nc=usage+1;setUsage(nc);save(nc);try{if(window.posthog)window.posthog.capture('ai_insights_generated',{comparison_mode:!!data2});}catch{}
}catch{if(!cancelRef.current)setInsights([{title:"Generation failed",body:"Could not connect to the AI service. Please try again."}])}
      if(!cancelRef.current)setPhase('idle');
    },3000);
  };
  const cancel=()=>{
    if(phase==='pending'){clearTimeout(timerRef.current);cancelRef.current=true;setPhase('cancelling');setTimeout(()=>{setPhase('idle');setInsights(null)},2000)}
    else if(phase==='loading'){cancelRef.current=true;setPhase('cancelling');setTimeout(()=>{setPhase('idle');setInsights(null)},2000)}
    else{setInsights(null);setPhase('idle')}
  };
  const loading=phase==='pending'||phase==='loading';
  const cancelling=phase==='cancelling';
  return{insights,loading,cancelling,phase,remaining,generate,cancel,setInsights};
}

// ── Walkthrough ─────────────────────────────────────────────────────────────
// A/B: group A = auto-show tour on first visit; group B = tour available but not auto-shown
// Both groups always get the "Take a Tour" button
function initAB(){
  try{
    let g=localStorage.getItem('yd_ab');
    if(!g){g=Math.random()<0.5?'A':'B';localStorage.setItem('yd_ab',g);}
    return g;
  }catch{return'B';}
}
function isNewUser(){
  try{const v=localStorage.getItem('yd_visited');if(!v){localStorage.setItem('yd_visited','1');return true;}return false;}catch{return false;}
}

const TOUR_STEPS=[
  {
    target:'yd-tour-composition',
    title:'Review Composition',
    body:'Hover over any star row to explore the breakdown. You can see all reviews combined, or filter to just Elite or Regular users and watch the other charts update live.',
    demoHs:5,demoHt:'all',
  },
  {
    target:'yd-tour-about',
    title:'Not sure what Yelp Elite means?',
    body:'Select "About & Data License" at the top for a full explanation of how Elite reviewers are designated and more about the data behind the dashboard.',
    demoHs:null,demoHt:null,
  },
  {
    target:'yd-tour-trajectory',
    title:'Restaurant Rating Trajectory',
    body:"Each line tracks how a restaurant's rating evolves, averaged across every restaurant with a final rating in 2022 of 5★, 4★, etc.",
    demoHs:1,demoHt:null,
  },
];

function TourSpotlight({targetId,onNext,onSkip,onGoTo,step,total,demoHs,demoHt,setHs,setHt,stepBody,isMobile,isTablet}){
  const[rect,setRect]=useState(null);
  const[visible,setVisible]=useState(false);
  const[prevStep,setPrevStep]=useState(step);
  const PAD=10;

  // Fade out then in when step changes
  useEffect(()=>{
    if(step!==prevStep){
      setVisible(false);
      const t=setTimeout(()=>{setPrevStep(step);setVisible(true);},180);
      return()=>clearTimeout(t);
    }
  },[step]);

  useEffect(()=>{
    setHs(demoHs!==undefined?demoHs:null);
    setHt(demoHt!==undefined?demoHt:null);
    const el=document.getElementById(targetId);
    if(el&&(isMobile||isTablet)){el.scrollIntoView({behavior:'smooth',block:'nearest'});}
    const measure=()=>{
      const elem=document.getElementById(targetId);
      if(elem){const r=elem.getBoundingClientRect();setRect({top:r.top+window.scrollY,left:r.left+window.scrollX,width:r.width,height:r.height});}
    };
    const t=setTimeout(()=>{measure();setVisible(true);},130);
    window.addEventListener('resize',measure);
    window.addEventListener('scroll',measure,true);
    return()=>{clearTimeout(t);window.removeEventListener('resize',measure);window.removeEventListener('scroll',measure,true);};
  },[targetId,demoHs,demoHt,isMobile,isTablet]);

  if(!rect)return null;

  const vw=window.innerWidth;
  const vh=window.innerHeight;
  const scrollY=window.scrollY;
  const spotTop=rect.top-PAD;
  const spotLeft=rect.left-PAD;
  const spotW=rect.width+PAD*2;
  const spotH=rect.height+PAD*2;

  const tipW=Math.min(340,vw-32);
  const tipH=240;

  let tipTop=spotTop+spotH+14;
  if(tipTop-scrollY+tipH>vh-20){tipTop=spotTop-tipH-14;}
  let tipLeft=Math.min(spotLeft,vw-tipW-16);
  tipLeft=Math.max(8,tipLeft);

  return(
    <div style={{position:'absolute',inset:0,zIndex:9000,pointerEvents:'none'}}>
      {/* Overlay — fades in */}
      <div style={{
        position:'fixed',inset:0,zIndex:9001,
        background:'transparent',
        boxShadow:`0 0 0 9999px rgba(0,0,0,0.52)`,
        top:spotTop-scrollY,left:spotLeft,
        width:spotW,height:spotH,
        borderRadius:12,
        pointerEvents:'none',
        transition:'top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease',
      }}/>
      {/* Tooltip card — fades + slides in */}
      <div style={{
        position:'fixed',
        top:Math.max(8,Math.min(tipTop-scrollY,vh-tipH-8)),
        left:tipLeft,
        width:tipW,
        background:'#fff',
        borderRadius:14,
        padding:'18px 20px 16px',
        boxShadow:'0 12px 48px rgba(0,0,0,0.22)',
        zIndex:9002,
        fontFamily:FF,
        pointerEvents:'all',
        opacity:visible?1:0,
        transform:visible?'translateY(0)':'translateY(6px)',
        transition:'opacity 0.18s ease, transform 0.18s ease',
      }}>
        {/* Header row: dots + X */}
        <div style={{display:'flex',alignItems:'center',marginBottom:14}}>
          <div style={{display:'flex',gap:8,alignItems:'center',flex:1}}>
            {Array.from({length:total},(_,i)=>(
              <div key={i} onClick={()=>onGoTo(i)} style={{width:i===step?20:8,height:8,borderRadius:4,background:i===step?C1:'#ddd',transition:'all 0.25s',cursor:'pointer'}}/>
            ))}
          </div>
          <button onClick={onSkip} style={{background:'none',border:'none',color:'#999',fontSize:18,cursor:'pointer',padding:'0 0 0 8px',lineHeight:1,fontFamily:FF}}>✕</button>
        </div>
        <h3 style={{margin:'0 0 6px',fontSize:15,fontWeight:700,fontFamily:FF,color:'#111'}}>{TOUR_STEPS[step].title}</h3>
        <p style={{margin:'0 0 16px',fontSize:13,color:'#555',lineHeight:1.6,fontFamily:FF}}>{stepBody}</p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          <button onClick={onNext} style={{background:C1,color:'#fff',border:'none',borderRadius:8,padding:'7px 18px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:FF}}>{step===total-1?'Done':'Next →'}</button>
        </div>
      </div>
    </div>
  );
}

function useTour(setHs,setHt){
  const[tourStep,setTourStep]=useState(-1);
  const[active,setActive]=useState(false);
  const[exiting,setExiting]=useState(false);

  const start=(trigger='button')=>{
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(()=>{setTourStep(0);setActive(true);setExiting(false);},300);
    try{if(window.posthog)window.posthog.capture('tour_started',{trigger});}catch{}
  };
  const goTo=(i)=>{setTourStep(i);};
  const next=()=>{
    if(tourStep>=TOUR_STEPS.length-1){end();}
    else{setTourStep(t=>t+1);}
  };
  const end=()=>{
    setExiting(true);
    setTimeout(()=>{
      try{if(window.posthog)window.posthog.capture('tour_completed',{step_reached:tourStep});}catch{}
      setActive(false);setTourStep(-1);setExiting(false);
      setHs(null);setHt(null);
      try{localStorage.setItem('yd_visited','1');}catch{}
    },220);
  };

  return{tourStep,active,exiting,start,next,end,goTo};
}
// ── End Walkthrough ──────────────────────────────────────────────────────────

function ExportBtn({dashRef}){const[saving,setSaving]=useState(false);const h=async()=>{setSaving(true);try{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";s.onload=async()=>{const c=await window.html2canvas(dashRef.current,{backgroundColor:"#fff",scale:2,useCORS:true});const l=document.createElement("a");l.download="yelp-review-dashboard.png";l.href=c.toDataURL("image/png");l.click();setSaving(false)};document.head.appendChild(s)}catch{setSaving(false)}};return(<Btn onClick={h} style={{padding:"4px 14px",fontSize:13,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#444",fontFamily:FF,fontWeight:500,display:"flex",alignItems:"center",gap:6}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>{saving?"Saving...":"Save as PNG"}</Btn>)}

export default function App(){
  const[sel1,setSel1]=useState("national"),[sel2,setSel2]=useState(null);
  const[hs,setHs]=useState(null),[ht,setHt]=useState(null);
  const[yr,setYr]=useState("All Time"),[info,setInfo]=useState(false);
  const[showDD,setShowDD]=useState(false);
  const[loaded,setLoaded]=useState(false);
  const[showTip,setShowTip]=useState(false);
  const[mob,setMob]=useState(false);
  const[isTablet,setIsTablet]=useState(false);
  const dashRef=useRef(null);
  const aiBtnRef=useRef(null);
  const tour=useTour(setHs,setHt);

  useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);
  useEffect(()=>{const c=()=>{const w=window.innerWidth;setMob(w<600);setIsTablet(w>=600&&w<=800);};c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[]);

  // A/B + new user: auto-launch tour for group A new users after load
  useEffect(()=>{
    if(!loaded)return;
    const ab=initAB();
    const newUser=isNewUser();
    if(ab==='A'&&newUser){
      setTimeout(()=>tour.start('auto'),800);
    }
    // Track A/B group (GA4 custom event if available)
    try{if(window.posthog)window.posthog.capture('ab_group_assigned',{group:ab,auto_tour:ab==='A'&&newUser});}catch{}
  },[loaded]);

  const data=NAT;const isC=!!sel2;const d2=isC?NASH:null;
  const l1=gCL(sel1),l2=sel2?gCL(sel2):"";const fl=gfl(hs,ht);
  const ai=useAIInsights(data,d2,l1,l2);
  // Trajectory key label: location + year context
  const trajYear=yr==="All Time"?"2022":yr;
  const trajKey1=l1+" restaurants plotted by their cumulative rating in "+trajYear;
  const trajKey2=l2?l2+" restaurants plotted by their cumulative rating in "+trajYear:"";

  // Pre-compute tour step body (dynamic for step 3)
  const tourStepBody=(()=>{
    if(!tour.active||tour.tourStep<0)return"";
    const step=tour.tourStep;
    if(step===2){
      const firstAvg=data.trajectories&&data.trajectories["1"]&&data.trajectories["1"].all&&data.trajectories["1"].all["1"]?data.trajectories["1"].all["1"].avg:null;
      const avgStr=firstAvg!=null?firstAvg.toFixed(2)+"\u2605":"—";
      return"Each line tracks how a restaurant\u2019s rating evolved over time, averaged across every restaurant with a cumulative rating of 1\u20135\u2605 in 2022. For example, of all the restaurants in "+l1+" with a 1\u2605 rating, their first review averaged across every 1\u2605 restaurant was "+avgStr+".";
    }
    return TOUR_STEPS[step].body;
  })();

  return(<div ref={dashRef} style={{minHeight:"100vh",background:"#fff",fontFamily:FF,overflowX:"hidden",opacity:loaded?1:0,transition:"opacity 0.5s ease",position:"relative"}}>
    {/* Tour overlay */}
    {(tour.active||tour.exiting)&&tour.tourStep>=0&&(
      <div style={{opacity:tour.exiting?0:1,transition:'opacity 0.22s ease',pointerEvents:tour.exiting?'none':'auto'}}>
      <TourSpotlight
        targetId={['yd-tour-composition','yd-tour-about','yd-tour-trajectory'][tour.tourStep]}
        onNext={tour.next}
        onSkip={tour.end}
        onGoTo={tour.goTo}
        step={tour.tourStep}
        total={TOUR_STEPS.length}
        demoHs={TOUR_STEPS[tour.tourStep].demoHs}
        demoHt={TOUR_STEPS[tour.tourStep].demoHt}
        setHs={setHs}
        setHt={setHt}
        stepBody={tourStepBody}
        isMobile={mob}
        isTablet={isTablet}
      />
      </div>
    )}
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
    <style>{`
      @media(max-width:800px){.yd-grid{grid-template-columns:1fr !important}.yd-hero h1{font-size:24px !important}.yd-wc-split{flex-direction:column !important}.yd-wc-split>div:first-child{padding-right:0 !important;padding-bottom:12px !important}.yd-wc-split .yd-wc-div{height:0 !important;width:100% !important;border-top:1px solid #ddd}.yd-wc-split>div:last-child{padding-left:0 !important;padding-top:12px !important}.yd-ai-insights{flex-direction:column !important}}
      @media(max-width:600px){.yd-controls-spacer{display:none !important}.yd-ai-row{justify-content:flex-start !important}.yd-ai-tip{left:0 !important;right:auto !important}.yd-mob-full{width:100% !important;box-sizing:border-box !important}.yd-mob-full button{width:100% !important;box-sizing:border-box !important}.yd-dd-panel{left:0 !important;transform:none !important;width:100% !important;max-width:100% !important}}
      @media(min-width:601px){.yd-controls{flex-direction:row !important;align-items:center !important}.yd-controls-spacer{display:block !important;flex:1 !important}.yd-city-row{flex-shrink:0}.yd-ai-row{flex-shrink:0}.yd-dd-item:hover{background:#f5f5f5 !important}.yd-dd-national:hover{background:#f5f5f5 !important}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinReverse{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}.yd-card{animation:fadeUp 0.4s ease both}.yd-card:nth-child(1){animation-delay:0.1s}.yd-card:nth-child(2){animation-delay:0.2s}
    `}</style>
    <InfoModal open={info} onClose={()=>setInfo(false)}/>
    <div className="yd-hero" style={{padding:"24px 24px 0",maxWidth:1280,margin:"0 auto"}}>
      <h1 style={{fontSize:36,fontWeight:800,margin:0,fontFamily:FH,color:"#111",animation:loaded?"fadeUp 0.4s ease both":"none"}}>What's In A <span style={{color:C1}}>Yelp</span> Restaurant Review?</h1>
      <p style={{color:"#555",fontSize:15,marginTop:5,marginBottom:20,animation:loaded?"fadeUp 0.4s ease 0.05s both":"none"}}>{fmt(data.meta.total_reviews)} food & restaurant reviews in the United States from 2011–2022 · <a id="yd-tour-about" onClick={e=>{e.preventDefault();setInfo(true)}} href="#" style={{color:C1,textDecoration:"none",cursor:"pointer"}}>About & Data License</a></p>
      <div className="yd-controls" style={{display:"flex",flexDirection:"column",gap:8,marginTop:0,animation:loaded?"fadeUp 0.4s ease 0.1s both":"none",position:"relative",zIndex:100}}>
        {/* Desktop: single flex row that wraps at tablet widths. City buttons and AI/Tour align to bottom. */}
        <div style={{display:"flex",alignItems:"flex-end",gap:8,flexWrap:"wrap",width:"100%"}}>
          {/* City 1 */}
          <div className="yd-city-btn yd-mob-full" style={{flexShrink:0,minWidth:0}}>
            <CityDropdown cityIndex={CIDX} selected={sel1} onSelect={setSel1} accent={C1} disabledKey={sel2} fullWidthMobile={mob}/>
          </div>
          {/* Desktop city2 / Add City */}
          {!mob&&isC&&<><div className="yd-city-btn" style={{flexShrink:0,minWidth:0}}><CityDropdown cityIndex={CIDX} selected={sel2} onSelect={v=>{setSel2(v);setShowDD(false)}} accent={C2} disabledKey={sel1}/></div><Btn onClick={()=>{setSel2(null);setShowDD(false)}} style={{padding:"7px 10px",fontSize:16,fontFamily:FH,fontWeight:700,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#555",flexShrink:0}}>✕</Btn></>}
          {!mob&&!isC&&(showDD
            ?<div className="yd-city-btn" style={{flexShrink:0,minWidth:0}}><CityDropdown cityIndex={CIDX} selected={null} onSelect={v=>{setSel2(v);setShowDD(false)}} accent={C2} autoOpen={true} disabledKey={sel1}/></div>
            :<Btn onClick={()=>setShowDD(true)} style={{padding:"7px 16px",fontSize:16,fontFamily:FH,fontWeight:700,border:"2px solid #777777",borderRadius:8,background:"#fff",color:"#777777",whiteSpace:"nowrap",flexShrink:0}}>+ Add City to Compare</Btn>
          )}
          {/* Flex spacer — collapses when row wraps */}
          {!mob&&<div style={{flex:"1 1 0",minWidth:0}}/>}
          {/* AI + Dashboard Tour — bottom-aligned, wrap to new line if needed */}
          {!mob&&<div style={{display:"flex",alignItems:"flex-end",gap:8,flexShrink:0}}>
            <div style={{position:"relative"}} onMouseEnter={()=>setShowTip(true)} onMouseLeave={()=>setShowTip(false)} ref={aiBtnRef}>
              <Btn onClick={ai.generate} disabled={ai.remaining<=0||ai.loading||ai.cancelling} style={{padding:"4px 14px",fontSize:13,fontFamily:FF,fontWeight:500,border:"2px solid #888",borderRadius:8,background:"#fff",color:ai.remaining<=0?"#999":"#444",display:"flex",alignItems:"center",gap:6}}>
                <RobotIcon size={13}/>{ai.loading?"Generating...":"Generate AI Insights"}
              </Btn>
              {showTip&&<div className="yd-ai-tip" style={{position:"absolute",top:"100%",left:0,marginTop:5,background:"#fff",border:"1px solid #ddd",borderRadius:10,padding:"14px 18px",width:300,maxWidth:"calc(100vw - 48px)",zIndex:9999,boxShadow:"0 8px 24px rgba(0,0,0,0.14)",fontFamily:FF,fontSize:12,color:"#555",lineHeight:1.6}}>
                <p style={{margin:"0 0 8px"}}><strong style={{color:"#333"}}>Who</strong><br/>This data is sent to the Anthropic API, which uses Claude to provide analysis.</p>
                <p style={{margin:0}}><strong style={{color:"#333"}}>What</strong><br/>Claude generates 3 insights in text form and displays them below. To keep my costs manageable, the daily limit is {MAX_DAILY}.</p>
              </div>}
            </div>
            <Btn onClick={()=>tour.start()} style={{padding:"4px 14px",fontSize:13,fontFamily:FF,fontWeight:500,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#444",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Pole — only below the sign */}
                <line x1="10" y1="13" x2="10" y2="22"/>
                {/* Base */}
                <line x1="7" y1="22" x2="13" y2="22"/>
                {/* Single right-pointing sign */}
                <polyline points="2,5 2,12 16,12 20,8.5 16,5 2,5"/>
              </svg>
              Dashboard Tour
            </Btn>
          </div>}
        </div>
        {/* Mobile-only rows */}
        {mob&&isC&&<div style={{display:"flex",alignItems:"center",gap:8}}>
          <div className="yd-city-btn" style={{flex:1,minWidth:0}}><CityDropdown cityIndex={CIDX} selected={sel2} onSelect={v=>{setSel2(v);setShowDD(false)}} accent={C2} disabledKey={sel1} fullWidthMobile={true}/></div>
          <Btn onClick={()=>{setSel2(null);setShowDD(false)}} style={{padding:"7px 10px",fontSize:16,fontFamily:FH,fontWeight:700,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#555",flexShrink:0}}>✕</Btn>
        </div>}
        {mob&&!isC&&(showDD
          ?<div className="yd-mob-full"><CityDropdown cityIndex={CIDX} selected={null} onSelect={v=>{setSel2(v);setShowDD(false)}} accent={C2} autoOpen={true} disabledKey={sel1} fullWidthMobile={true}/></div>
          :<Btn onClick={()=>setShowDD(true)} style={{padding:"7px 16px",fontSize:16,fontFamily:FH,fontWeight:700,border:"2px solid #777777",borderRadius:8,background:"#fff",color:"#777777",width:"100%",textAlign:"left"}}>+ Add City to Compare</Btn>
        )}
        {mob&&<div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{position:"relative"}} onMouseEnter={()=>setShowTip(true)} onMouseLeave={()=>setShowTip(false)} ref={aiBtnRef}>
            <Btn onClick={ai.generate} disabled={ai.remaining<=0||ai.loading||ai.cancelling} style={{padding:"4px 14px",fontSize:13,fontFamily:FF,fontWeight:500,border:"2px solid #888",borderRadius:8,background:"#fff",color:ai.remaining<=0?"#999":"#444",display:"flex",alignItems:"center",gap:6}}>
              <RobotIcon size={13}/>{ai.loading?"Generating...":"Generate AI Insights"}
            </Btn>
            {showTip&&<div className="yd-ai-tip" style={{position:"absolute",top:"100%",left:0,marginTop:5,background:"#fff",border:"1px solid #ddd",borderRadius:10,padding:"14px 18px",width:280,maxWidth:"calc(100vw - 48px)",zIndex:9999,boxShadow:"0 12px 32px rgba(0,0,0,0.18)",fontFamily:FF,fontSize:12,color:"#555",lineHeight:1.6}}>
              <p style={{margin:"0 0 8px"}}><strong style={{color:"#333"}}>Who</strong><br/>This data is sent to the Anthropic API, which uses Claude to provide analysis.</p>
              <p style={{margin:0}}><strong style={{color:"#333"}}>What</strong><br/>Claude generates 3 insights in text form and displays them below. To keep my costs manageable, the daily limit is {MAX_DAILY}.</p>
            </div>}
          </div>
          <Btn onClick={()=>tour.start()} style={{padding:"4px 14px",fontSize:13,fontFamily:FF,fontWeight:500,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#444",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="13" x2="10" y2="22"/>
              <line x1="7" y1="22" x2="13" y2="22"/>
              <polyline points="2,5 2,12 16,12 20,8.5 16,5 2,5"/>
            </svg>
            Dashboard Tour
          </Btn>
        </div>}
      </div>
    </div>

    {/* AI Insights card — above the main grid */}
    {(ai.insights||ai.loading||ai.cancelling)&&<div style={{maxWidth:1280,margin:"0 auto",padding:"16px 24px 0"}}>
      <div style={{border:"1px solid #ddd",borderRadius:12,padding:"16px 20px",background:"#fafafa"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><RobotIcon size={16}/><span style={{fontSize:14,fontWeight:700,color:"#333"}}>AI Insights</span></div>
          <button onClick={ai.cancel} style={{background:"none",border:"none",color:"#999",cursor:"pointer",fontSize:16}}>✕</button>
        </div>
        {ai.cancelling?<div style={{textAlign:"center",padding:"16px 0",color:"#999",fontSize:14}}><div style={{display:"inline-block",width:20,height:20,border:"2px solid #ddd",borderTopColor:"#888",borderRadius:"50%",animation:"spinReverse 0.8s linear infinite"}}/><div style={{marginTop:8}}>Cancelling AI data analysis</div></div>:
        ai.loading?<div style={{textAlign:"center",padding:"16px 0",color:"#999",fontSize:14}}><div style={{display:"inline-block",width:20,height:20,border:"2px solid #ddd",borderTopColor:"#888",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><div style={{marginTop:8}}>Analyzing your data...</div></div>:
        <div className="yd-ai-insights" style={{display:"flex",gap:12}}>
          {ai.insights.map((ins,i)=><div key={i} style={{flex:1,padding:"12px 14px",background:"#fff",borderRadius:8,border:"1px solid #eee"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#333",marginBottom:4}}>#{i+1} {ins.title}</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>{ins.body}</div>
          </div>)}
        </div>}
      </div>
    </div>}

    <div className="yd-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:1280,margin:"0 auto",padding:"16px 24px 32px"}}>
      <div id="yd-tour-composition" className="yd-card" style={{border:"1px solid #e0e0e0",borderRadius:12,padding:"18px 20px",background:"#fafafa",overflow:"hidden",minWidth:0}}>
        <ReviewComposition data={data} data2={d2} label1={l1} label2={l2} hs={hs} setHs={setHs} ht={ht} setHt={setHt}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,minWidth:0}}>
        <div className="yd-card" style={{border:"1px solid #e0e0e0",borderRadius:12,padding:"18px 20px",background:"#fafafa"}}>
          <h3 style={{fontSize:12,letterSpacing:2,color:C1,fontWeight:700,margin:"0 0 2px",fontFamily:FF}}>COMMON REVIEW TERMS</h3>
          <p style={{color:"#555",fontSize:14,margin:"0 0 4px"}}>Frequency of words – <strong style={{color:"#333"}}>{fl}</strong></p>
          {isC?(<div className="yd-wc-split" style={{display:"flex",gap:0,minHeight:140}}><div style={{flex:1,paddingRight:12}}><div style={{fontSize:12,fontWeight:700,color:C1,marginBottom:6,fontFamily:FF}}>{l1}</div><WordCloud data={data} hs={hs} ht={ht} accent={C1}/></div><div className="yd-wc-div" style={{width:1,background:"#ddd",flexShrink:0}}/><div style={{flex:1,paddingLeft:12}}><div style={{fontSize:12,fontWeight:700,color:C2,marginBottom:6,fontFamily:FF}}>{l2}</div><WordCloud data={d2} hs={hs} ht={ht} accent={C2}/></div></div>):(<div><div style={{fontSize:12,fontWeight:700,color:C1,marginBottom:6,fontFamily:FF}}>{l1}</div><WordCloud data={data} hs={hs} ht={ht} accent={C1}/></div>)}
        </div>
        <div id="yd-tour-trajectory" className="yd-card" style={{border:"1px solid #e0e0e0",borderRadius:12,padding:"18px 20px",background:"#fafafa",flex:1,overflow:"hidden",minWidth:0}}>
          <h3 style={{fontSize:12,letterSpacing:2,color:C1,fontWeight:700,margin:"0 0 2px",fontFamily:FF}}>RESTAURANT RATING TRAJECTORY</h3>
          <p style={{color:"#555",fontSize:14,margin:"0 0 8px"}}>After the first review, how a restaurant's rating changed on average – <strong style={{color:"#333"}}>{fl}</strong></p>
          <TrajectoryChart data={data} data2={d2} hs={hs} ht={ht} label1={trajKey1} label2={trajKey2} bc1={data.meta.business_count} bc2={d2?.meta?.business_count}/>
        </div>
      </div>
    </div>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px 12px",display:"flex",justifyContent:"flex-end",gap:8,flexWrap:"wrap"}}>
      <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><Btn style={{padding:"4px 14px",fontSize:13,border:"2px solid #888",borderRadius:8,background:"#fff",color:"#444",fontFamily:FF,fontWeight:500,display:"flex",alignItems:"center",gap:6}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Submit Feedback</Btn></a>
      <ExportBtn dashRef={dashRef}/>
    </div>
    <footer style={{padding:"14px 24px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,color:"#555",fontSize:11,fontFamily:"'DM Mono',monospace"}}><span>Source: Yelp Open Dataset · Food & Restaurant businesses with 20+ reviews</span><button onClick={()=>setInfo(true)} style={{background:"none",border:"none",color:"#555",fontSize:11,cursor:"pointer",textDecoration:"underline",fontFamily:"'DM Mono',monospace"}}>About & data license</button></footer>
  </div>);
}

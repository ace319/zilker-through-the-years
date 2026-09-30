const stageMapData=[
  {name:'T-Mobile',file:'stage-t-mobile.jpg',x:32,y:36},
  {name:'Miller Lite',file:'stage-miller-lite.jpg',x:48,y:19},
  {name:"Tito's",file:'stage-titos.jpg',x:77,y:32},
  {name:'American Express',file:'stage-american-express.jpg',x:91,y:47},
  {name:'Snapchat',file:'stage-snapchat-placeholder.svg',x:61,y:56},
  {name:'BMI',file:'stage-bmi.jpg',x:43,y:58},
  {name:'Austin Kiddie Limits',file:'stage-austin-kiddie-limits.jpg',x:70,y:68},
  {name:'BeatBox',file:'stage-beatbox.jpg',x:43,y:81},
  {name:'Bonus Tracks',file:'stage-bonus-tracks.jpg',x:59,y:67}
];
const hotspotLayer=document.querySelector('.map-hotspots');
const mapPreview=document.querySelector('.map-preview');
function showStage(stage,button){
  if(!mapPreview)return;
  mapPreview.querySelector('img').src=`images/acl/${stage.file}`;
  mapPreview.querySelector('img').alt=`${stage.name} stage at ACL Festival`;
  mapPreview.querySelector('figcaption').textContent=stage.name;
  hotspotLayer?.querySelectorAll('.map-hotspot').forEach(item=>item.classList.toggle('active',item===button));
}
stageMapData.forEach(stage=>{
  const button=document.createElement('button');
  button.className='map-hotspot';
  button.type='button';
  button.style.left=`${stage.x}%`;
  button.style.top=`${stage.y}%`;
  button.setAttribute('aria-label',`Show ${stage.name} stage photo`);
  button.addEventListener('mouseenter',()=>showStage(stage,button));
  button.addEventListener('focus',()=>showStage(stage,button));
  button.addEventListener('click',()=>showStage(stage,button));
  hotspotLayer?.append(button);
});

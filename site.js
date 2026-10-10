const menu=document.querySelector('#menu');
const nav=document.querySelector('nav');
const legacyPages={history:'history.html',posters:'posters.html',schedule:'schedule.html',nights:'nights.html',map:'map.html',photos:'photos.html',stages:'stages.html'};
const oldSection=location.hash.slice(1);
if((location.pathname.endsWith('/')||location.pathname.endsWith('/index.html'))&&legacyPages[oldSection])location.replace(legacyPages[oldSection]);
const scheduleW2=document.querySelector('#schedule-w2');
if(scheduleW2){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
  const festivalDate=`${parts.year}-${parts.month}-${parts.day}`;
  const activeDay=festivalDate>='2026-10-11'?'schedule-sun':festivalDate>='2026-10-10'?'schedule-sat':'schedule-fri';
  scheduleW2.checked=true;
  document.querySelector(`#${activeDay}`).checked=true;
}
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});

const stagePhotos={
  'T-Mobile':'stage-t-mobile.jpg',"Tito's":'stage-titos.jpg','Miller Lite':'stage-miller-lite.jpg',
  'BMI':'stage-bmi.jpg','Austin Kiddie Limits':'stage-austin-kiddie-limits.jpg',
  'BeatBox':'stage-beatbox.jpg','Bonus Tracks':'stage-bonus-tracks.jpg'
};
document.querySelectorAll('.stage-grid article').forEach(card=>{
  const name=card.querySelector('h3')?.textContent;
  const file=stagePhotos[name];
  if(!file)return;
  const link=document.createElement('a');
  link.className='stage-photo has';link.href=`images/acl/${file}`;link.target='_blank';
  link.innerHTML=`<img src="images/acl/${file}" alt="${name} stage at ACL Festival" loading="lazy">`;
  card.querySelector('.stage-photo')?.replaceWith(link);
});

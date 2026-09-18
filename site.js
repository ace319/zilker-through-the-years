const menu=document.querySelector('#menu');
const nav=document.querySelector('nav');
const legacyPages={history:'history.html',posters:'posters.html',schedule:'schedule.html',nights:'nights.html',map:'map.html',photos:'photos.html',stages:'stages.html'};
const oldSection=location.hash.slice(1);
if((location.pathname.endsWith('/')||location.pathname.endsWith('/index.html'))&&legacyPages[oldSection])location.replace(legacyPages[oldSection]);
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});

const stagePhotos={
  'T-Mobile':'stage-t-mobile.jpg',"Tito's":'stage-titos.jpg','Miller Lite':'stage-miller-lite.jpg',
  'Lady Bird':'stage-lady-bird.jpg','BMI':'stage-bmi.jpg','Austin Kiddie Limits':'stage-austin-kiddie-limits.jpg',
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

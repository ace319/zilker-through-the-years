const menu=document.querySelector('#menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});const stagePhotos={'T-Mobile':'stage-t-mobile.jpg',"Tito's":'stage-titos.jpg','Miller Lite':'stage-miller-lite.jpg','Lady Bird':'stage-lady-bird.jpg','BMI':'stage-bmi.jpg','Austin Kiddie Limits':'stage-austin-kiddie-limits.jpg','BeatBox':'stage-beatbox.jpg','Bonus Tracks':'stage-bonus-tracks.jpg'};document.querySelectorAll('.stage-grid article').forEach(card=>{const name=card.querySelector('h3')?.textContent,file=stagePhotos[name];if(!file)return;const old=card.querySelector('.stage-photo'),link=document.createElement('a');link.className='stage-photo has';link.href=`images/acl/${file}`;link.target='_blank';link.innerHTML=`<img src="images/acl/${file}" alt="${name} stage at ACL Festival" loading="lazy">`;old?.replaceWith(link)});
const notes={
2002:["Ryan Adams, Emmylou Harris, Wilco, Los Lobos, Patty Griffin","Nickel Creek, Robert Randolph & the Family Band, G. Love & Special Sauce, Asleep at the Wheel"],
2003:["R.E.M., Ben Harper, Sheryl Crow, Dwight Yoakam, Ryan Adams, Rosanne Cash","Kings of Leon, Bright Eyes, Drive-By Truckers, The Polyphonic Spree, Café Tacvba"],
2004:["Sheryl Crow, The Pixies, Trey Anastasio, Ben Harper, Elvis Costello, Modest Mouse","The Killers, Franz Ferdinand, My Morning Jacket, Calexico, Broken Social Scene"],
2005:["Coldplay, Oasis, The Black Crowes, The Allman Brothers Band, Widespread Panic, Wilco","Arcade Fire, The Black Keys, The Decemberists, Death Cab for Cutie, Bloc Party"],
2006:["Tom Petty & the Heartbreakers, Van Morrison, Willie Nelson, Massive Attack, The Flaming Lips","Kings of Leon, Gnarls Barkley, Cat Power, Iron & Wine, The Black Angels"],
2007:["Bob Dylan, Björk, The Killers, Muse, Arcade Fire, Wilco","Arctic Monkeys, LCD Soundsystem, The National, Regina Spektor"],
2008:["Foo Fighters, Robert Plant & Alison Krauss, Beck, David Byrne, Erykah Badu","The Black Keys, Vampire Weekend, Fleet Foxes, MGMT, Tegan and Sara"],
2009:["Pearl Jam, Dave Matthews Band, Kings of Leon, John Legend","Phoenix, Bon Iver, The Avett Brothers, Dr. Dog"],
2010:["The Eagles, Muse, Phish, The Strokes, M.I.A., The Flaming Lips","The xx, deadmau5, Vampire Weekend, Edward Sharpe & the Magnetic Zeros"],
2011:["Coldplay, Stevie Wonder, Kanye West, Arcade Fire, My Morning Jacket","Skrillex, Brandi Carlile, Gary Clark Jr., Fitz and the Tantrums"],
2012:["Red Hot Chili Peppers, Neil Young & Crazy Horse, The Black Keys, Jack White, Avicii","Childish Gambino, Alabama Shakes, The Lumineers, Michael Kiwanuka"],
2013:["Depeche Mode, The Cure, Muse, Kings of Leon, Lionel Richie, Phoenix","Kendrick Lamar, Tame Impala, Kacey Musgraves, HAIM, Grimes"],
2014:["Eminem, Pearl Jam, Outkast, Skrillex, Beck, Calvin Harris, Lana Del Rey","Sam Smith, Hozier, St. Vincent, Phantogram, CHVRCHES"],
2015:["Foo Fighters, Drake, Florence + the Machine, The Weeknd, Disclosure","Chance the Rapper, Halsey, Leon Bridges, Glass Animals"],
2016:["Radiohead, Mumford & Sons, Kendrick Lamar, LCD Soundsystem, Willie Nelson","Anderson .Paak, Lizzo, Flume, Maren Morris, Lucy Dacus"],
2017:["Jay-Z, Red Hot Chili Peppers, Chance the Rapper, The Killers, Gorillaz","Dua Lipa, MUNA, Portugal. The Man, Vance Joy, Royal Blood"],
2018:["Paul McCartney, Metallica, Childish Gambino, Arctic Monkeys, Travis Scott","Billie Eilish, Greta Van Fleet, Janelle Monáe, Khalid"],
2019:["Guns N’ Roses, Tame Impala, The Cure, Billie Eilish, Cardi B","Lizzo, Rosalía, Kacey Musgraves, Maggie Rogers"],
2021:["George Strait, Billie Eilish, Stevie Nicks, Miley Cyrus, RÜFÜS DU SOL","Megan Thee Stallion, Phoebe Bridgers, Finneas, girl in red"],
2022:["Red Hot Chili Peppers, P!nk, The Chicks, SZA, Kacey Musgraves","Japanese Breakfast, Wet Leg, Omar Apollo, Noah Cyrus"],
2023:["Kendrick Lamar, Foo Fighters, Mumford & Sons, ODESZA, Shania Twain, Niall Horan","Noah Kahan, The 1975, Maggie Rogers, Labrinth"],
2024:["Dua Lipa, Tyler, the Creator, Chris Stapleton, blink-182, Sturgill Simpson","Chappell Roan, Teddy Swims, Benson Boone, Reneé Rapp, Carin León"],
2025:["Hozier, Sabrina Carpenter, The Strokes, Doechii, The Killers, John Summit","Olivia Dean, ROLE MODEL, Mk.gee, Lola Young, Rilo Kiley"],
2026:["Charli xcx, Skrillex, Kings of Leon, Turnstile, RÜFÜS DU SOL, Lorde, Bleachers","Geese, Lola Young, CMAT, Audrey Hobert, Blood Orange, Sienna Spiro"]};
const years = Array.from({ length: 25 }, (_, i) => 2002 + i);
const track = document.querySelector('#posterTrack');
const caption = document.querySelector('#posterCaption');
const details = document.querySelector('#lineupDetails');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let selected = years.length - 1;
let position = selected;
let destination = selected;
let frame = 0;
let lastFrame = 0;
let drag = null;
let suppressClick = false;
let wheelTimer = 0;
let wheelStart = null;

function asset(year) {
  if (year === 2020) return null;
  const extension = year === 2007 ? 'gif' : year === 2024 ? 'png' : year === 2026 ? 'webp' : 'jpg';
  return `images/acl/acl-${year}-lineup.${extension}`;
}

track.setAttribute('role', 'region');
track.setAttribute('aria-roledescription', 'carousel');
track.setAttribute('aria-label', 'ACL lineup posters. Swipe or use the arrow keys to browse years.');
track.tabIndex = 0;
caption.setAttribute('aria-live', 'polite');
caption.setAttribute('aria-atomic', 'true');

const cards = years.map((year, index) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'poster-card';
  card.dataset.index = index;
  card.setAttribute('aria-label', year === 2020 ? 'Show 2020 cancellation details' : `Show ${year} lineup; activate again to open the full poster`);
  card.title = year === 2020 ? '2020 festival cancellation' : `${year}: center this poster, then open it full size`;
  card.innerHTML = year === 2020
    ? '<span class="cancel">2020<br><small>Canceled</small></span>'
    : `<img src="${asset(year)}" alt="ACL Festival ${year} lineup poster" loading="${index >= years.length - 4 ? 'eager' : 'lazy'}" decoding="async" draggable="false">`;
  track.append(card);
  return card;
});

const openHint = document.createElement('p');
openHint.className = 'poster-open-hint';
openHint.textContent = 'Swipe or drag to browse · Click the centered poster to enlarge';
caption.after(openHint);
const dots = document.createElement('div');
dots.className = 'poster-dots';
dots.setAttribute('role', 'group');
dots.setAttribute('aria-label', 'Choose a festival year');
const yearButtons = years.map((year, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = year;
  button.setAttribute('aria-label', `Show ${year}`);
  button.addEventListener('click', () => select(index));
  dots.append(button);
  return button;
});
openHint.after(dots);

const fan = [
  { x: 0, y: 0, rotation: 0, scale: 1 },
  { x: 200, y: 12, rotation: 6, scale: .93 },
  { x: 365, y: 30, rotation: 12, scale: .84 },
  { x: 510, y: 55, rotation: 18, scale: .76 },
  { x: 650, y: 80, rotation: 24, scale: .68 }
];
function clamp(value) { return Math.max(0, Math.min(years.length - 1, value)); }
function multiplier() { return innerWidth < 560 ? .48 : innerWidth < 900 ? .68 : 1; }
function stepWidth() { return 200 * multiplier(); }

// Interpolate the fan continuously so each poster follows the gesture itself.
function render() {
  const nearest = Math.round(position);
  const size = multiplier();
  cards.forEach((card, index) => {
    const distance = index - position;
    const absolute = Math.abs(distance);
    const visible = absolute < 4;
    card.classList.toggle('visible', visible);
    card.classList.toggle('selected', index === nearest);
    card.setAttribute('aria-hidden', String(!visible));
    card.setAttribute('aria-pressed', String(index === nearest));
    card.tabIndex = visible ? 0 : -1;
    if (!visible) return;
    const lower = Math.min(3, Math.floor(absolute));
    const progress = absolute - lower;
    const blend = key => fan[lower][key] + (fan[lower + 1][key] - fan[lower][key]) * progress;
    card.style.setProperty('--x', `${Math.sign(distance) * blend('x') * size}px`);
    card.style.setProperty('--y', `${blend('y')}px`);
    card.style.setProperty('--r', `${Math.sign(distance) * blend('rotation')}deg`);
    card.style.setProperty('--s', blend('scale'));
    card.style.setProperty('--opacity', Math.min(1, 4 - absolute));
    card.style.zIndex = String(100 - Math.round(absolute * 20));
  });
}

function updateDetails() {
  selected = Math.round(destination);
  const year = years[selected];
  const artists = notes[year];
  previous.disabled = selected === 0;
  next.disabled = selected === years.length - 1;
  yearButtons.forEach((button, index) => {
    button.classList.toggle('active', index === selected);
    button.setAttribute('aria-pressed', String(index === selected));
  });
  caption.textContent = year === 2020 ? '2020 · Festival canceled' : `${year} lineup`;
  if (year === 2020) {
    details.innerHTML = '<h3>2020</h3><div><small>No festival</small><p>ACL Festival was canceled during the COVID-19 pandemic. There was no lineup or gathering in Zilker Park.</p></div>';
    return;
  }
  const risingLabel = year === 2026 ? 'Rising names in 2026' : 'Breakout names in hindsight';
  details.innerHTML = `<h3>${year}</h3><div><small>Major acts</small><p>${artists?.[0] || 'Lineup details coming soon.'}</p></div><div><small>${risingLabel}</small><p>${artists?.[1] || 'More artist notes coming soon.'}</p></div>${year === 2013 ? '<div class="milestone">Historic first: 2013 was the first ACL Festival held across two weekends. Heavy rain canceled the second Sunday.</div>' : ''}`;
}

function animate(time) {
  const elapsed = lastFrame ? Math.min(40, time - lastFrame) : 16;
  lastFrame = time;
  position += (destination - position) * (1 - Math.exp(-elapsed / 80));
  if (Math.abs(destination - position) < .001) position = destination;
  render();
  if (position !== destination) {
    frame = requestAnimationFrame(animate);
  } else {
    frame = 0;
    lastFrame = 0;
  }
}

function moveTo(value) {
  destination = clamp(value);
  if (reducedMotion.matches || drag?.started) {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    position = destination;
    render();
  } else if (!frame) {
    frame = requestAnimationFrame(animate);
  }
}

function clearWheel() {
  clearTimeout(wheelTimer);
  wheelTimer = 0;
  wheelStart = null;
}

function select(index) {
  clearWheel();
  moveTo(Math.round(clamp(index)));
  updateDetails();
}

previous.addEventListener('click', () => select(Math.round(destination) - 1));
next.addEventListener('click', () => select(Math.round(destination) + 1));

track.addEventListener('wheel', event => {
  if (event.ctrlKey || drag) return;
  const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  const pixels = raw * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientHeight : 1);
  if (!pixels) return;
  // At the ends, let normal page scrolling continue rather than trapping it.
  if ((destination <= 0 && pixels < 0) || (destination >= years.length - 1 && pixels > 0)) return;
  event.preventDefault();
  if (wheelStart === null) wheelStart = Math.round(destination);
  moveTo(destination + pixels / 240);
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    let nearest = Math.round(destination);
    const travel = destination - wheelStart;
    if (nearest === wheelStart && Math.abs(travel) > .12) nearest += Math.sign(travel);
    select(nearest);
  }, 140);
}, { passive: false });

track.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  suppressClick = false;
  clearWheel();
  cancelAnimationFrame(frame);
  frame = 0;
  lastFrame = 0;
  destination = position;
  drag = {
    id: event.pointerId, x: event.clientX, y: event.clientY,
    origin: position, lastX: event.clientX, time: event.timeStamp,
    velocity: 0, started: false
  };
});

track.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  const dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  if (!drag.started) {
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      drag = null;
      select(Math.round(position));
      return;
    }
    if (Math.abs(dx) <= 8) return;
    drag.started = true;
    track.classList.add('dragging');
    track.setPointerCapture(event.pointerId);
  }
  event.preventDefault();
  const elapsed = Math.max(1, event.timeStamp - drag.time);
  drag.velocity = .55 * (event.clientX - drag.lastX) / elapsed + .45 * drag.velocity;
  drag.lastX = event.clientX;
  drag.time = event.timeStamp;
  moveTo(drag.origin - dx / stepWidth());
});

function endDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const gesture = drag;
  drag = null;
  track.classList.remove('dragging');
  if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  if (!gesture.started) {
    select(Math.round(position));
    return;
  }
  suppressClick = true;
  const velocity = event.type === 'pointerup' && event.timeStamp - gesture.time < 90 ? gesture.velocity : 0;
  const momentum = reducedMotion.matches ? 0 : Math.max(-1.25, Math.min(1.25, -velocity * 110 / stepWidth()));
  select(Math.round(position + momentum));
}
track.addEventListener('pointerup', endDrag);
track.addEventListener('pointercancel', endDrag);
track.addEventListener('lostpointercapture', endDrag);
track.addEventListener('pointerleave', event => {
  if (drag && !drag.started) endDrag(event);
});
track.addEventListener('dragstart', event => event.preventDefault());

track.addEventListener('click', event => {
  if (suppressClick && event.detail !== 0) {
    suppressClick = false;
    return;
  }
  const card = event.target.closest('.poster-card');
  if (!card || !track.contains(card)) return;
  const index = Number(card.dataset.index);
  if (index === selected && Math.abs(position - index) < .02 && asset(years[index])) {
    window.open(asset(years[index]), '_blank', 'noopener');
  } else {
    select(index);
  }
});

function handleKeys(event) {
  const offsets = { ArrowLeft: -1, ArrowRight: 1 };
  if (event.key in offsets) {
    event.preventDefault();
    select(Math.round(destination) + offsets[event.key]);
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    select(event.key === 'Home' ? 0 : years.length - 1);
  } else {
    return;
  }
  track.focus({ preventScroll: true });
}
track.closest('.controls').addEventListener('keydown', handleKeys);
dots.addEventListener('keydown', handleKeys);
window.addEventListener('resize', render);
render();
updateDetails();

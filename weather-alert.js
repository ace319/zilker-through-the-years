const watchEnds=new Date('2026-10-02T19:00:00-05:00');
const weekendEnds=new Date('2026-10-05T00:00:00-05:00');
const now=new Date();

if(now<weekendEnds){
  const alert=document.createElement('aside');
  alert.className='weather-alert';
  alert.setAttribute('aria-label','Austin weather alert');
  if(now<watchEnds){
    alert.innerHTML='<strong>Flood Watch</strong><span>Austin through Friday, Oct. 2 at 7 PM. Heavy rain and flash flooding are possible before and during opening day.</span><a href="https://forecast.weather.gov/MapClick.php?lat=30.267&lon=-97.743" target="_blank" rel="noreferrer">Check NWS ↗</a>';
  }else{
    alert.innerHTML='<strong>Weather update</strong><span>Conditions may remain wet this weekend. Check the current Austin forecast before traveling to Zilker.</span><a href="https://forecast.weather.gov/MapClick.php?lat=30.267&lon=-97.743" target="_blank" rel="noreferrer">Check NWS ↗</a>';
  }
  document.body.prepend(alert);
  document.body.classList.add('has-weather-alert');
  const sizeAlert=()=>document.documentElement.style.setProperty('--weather-alert-height',`${alert.offsetHeight}px`);
  sizeAlert();
  if ('ResizeObserver' in window) {
    new ResizeObserver(sizeAlert).observe(alert);
  } else {
    window.addEventListener('resize', sizeAlert);
  }
}

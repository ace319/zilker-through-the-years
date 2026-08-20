const schedules={
  1:[
    {day:'Friday',date:'October 2',file:'acl-2026-schedule-w1-friday.webp'},
    {day:'Saturday',date:'October 3',file:'acl-2026-schedule-w1-saturday.png'},
    {day:'Sunday',date:'October 4',file:'acl-2026-schedule-w1-sunday.webp'}
  ],
  2:[
    {day:'Friday',date:'October 9',file:'acl-2026-schedule-w2-friday.webp'},
    {day:'Saturday',date:'October 10',file:'acl-2026-schedule-w2-saturday.png'},
    {day:'Sunday',date:'October 11',file:'acl-2026-schedule-w2-sunday.webp'}
  ]
};
const weekendTabs=document.querySelectorAll('.weekend-tabs button');
const dayTabs=document.querySelector('.day-tabs');
const scheduleImage=document.querySelector('#scheduleImage');
const scheduleLink=document.querySelector('#scheduleLink');
const scheduleCaption=document.querySelector('#scheduleCaption');
const scheduleStatus=document.querySelector('#scheduleStatus');
let activeWeekend=1;

function showSchedule(dayIndex){
  const item=schedules[activeWeekend][dayIndex];
  const label=`Weekend ${activeWeekend===1?'One':'Two'} · ${item.day}, ${item.date}`;
  const path=`images/acl/${item.file}`;
  scheduleImage.src=path;
  scheduleImage.alt=`ACL Festival 2026 ${label} schedule`;
  scheduleLink.href=path;
  scheduleCaption.textContent=`${label} · Click to enlarge`;
  scheduleStatus.textContent=label;
  dayTabs.querySelectorAll('button').forEach((button,index)=>{
    const active=index===dayIndex;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',active);
  });
}

function showWeekend(weekend){
  activeWeekend=weekend;
  weekendTabs.forEach(button=>{
    const active=Number(button.dataset.weekend)===weekend;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',active);
  });
  dayTabs.replaceChildren(...schedules[weekend].map((item,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.textContent=item.day;
    button.setAttribute('aria-pressed',index===0);
    button.addEventListener('click',()=>showSchedule(index));
    return button;
  }));
  showSchedule(0);
}

weekendTabs.forEach(button=>button.addEventListener('click',()=>showWeekend(Number(button.dataset.weekend))));
if(dayTabs&&scheduleImage)showWeekend(1);

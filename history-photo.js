const historyLead=document.querySelector('.history-lead');
if(historyLead){
  const photo=document.createElement('figure');
  photo.className='history-photo';
  photo.innerHTML='<a href="images/acl/acl-entrance-2005.jpg" target="_blank"><img src="images/acl/acl-entrance-2005.jpg" alt="Festivalgoers at the ACL Festival entrance in 2005"></a><figcaption>Early ACL · The festival entrance in 2005</figcaption>';
  historyLead.append(photo);
}

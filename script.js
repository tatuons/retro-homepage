// シンプルな訪問者カウンターとゲストブック (localStorage)
document.addEventListener('DOMContentLoaded',function(){
  // カウンター
  let count = parseInt(localStorage.getItem('retro_counter')||'0',10);
  count += 1;
  localStorage.setItem('retro_counter',String(count));
  document.getElementById('counter').textContent = count;

  // ゲストブック表示
  const entriesEl = document.getElementById('entries');
  function render(){
    const entries = JSON.parse(localStorage.getItem('retro_gb')||'[]');
    entriesEl.innerHTML = '';
    entries.slice().reverse().forEach(e=>{
      const div = document.createElement('div');
      div.className = 'entry';
      const time = new Date(e.t).toLocaleString();
      div.innerHTML = `<strong>${escapeHtml(e.name)}</strong> <small>(${time})</small><p>${escapeHtml(e.msg)}</p>`;
      entriesEl.appendChild(div);
    });
  }
  function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  render();

  // フォーム
  const form = document.getElementById('gb-form');
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    const name = document.getElementById('name').value.trim()||'名無し';
    const msg = document.getElementById('message').value.trim();
    if(!msg) return;
    const entries = JSON.parse(localStorage.getItem('retro_gb')||'[]');
    entries.push({name:name,msg:msg,t:Date.now()});
    localStorage.setItem('retro_gb',JSON.stringify(entries));
    form.reset();
    render();
  });

  document.getElementById('clear').addEventListener('click',function(){
    if(confirm('ゲストブックを消しますか？')){
      localStorage.removeItem('retro_gb'); render();
    }
  });
});

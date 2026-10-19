const SHIP={UK:[3,5],EU:[5,8]};
const HEX={champagne:'#E8D8B8',emerald:'#1F5C4A',pewter:'#8A8D8F',ivory:'#EDE6DA',midnight:'#1B2236',black:'#1E1B1A',sapphire:'#1F3A7A',oxblood:'#6B1F2A','dusty rose':'#C9A0A0'};
const money=n=>'£'+n.toLocaleString('en-GB');
const fmt=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const today=()=>{const t=new Date();t.setHours(0,0,0,0);return t};
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const prop=s=>s.replace(/christmas/g,'Christmas').replace(/new year's eve/g,'New Year’s Eve');
const nice=s=>{s=prop(s);return s.charAt(0).toUpperCase()+s.slice(1)};
const desc=s=>prop(s.replace(/^A (?=[AEIOU])/,'An '));
const orderable=p=>p.made_to_order||p.in_stock;
const win=(p,r)=>{const[a,b]=SHIP[r];return[addDays(today(),p.lead_time_days+a),addDays(today(),p.lead_time_days+b)]};
const status=p=>!p.made_to_order&&p.in_stock?'In stock':p.made_to_order?`Made to order, ${p.lead_time_days} days`:'Not available to order';
const ICON={dress:'M23 6L21 28L12 74H48L39 28L37 6M21 28H39',jumpsuit:'M23 6L21 28L22 74H29L30 42L31 74H38L39 28L37 6M21 28H39',top:'M20 14L10 26L16 32L21 26V48H39V26L44 32L50 26L40 14Q30 22 20 14',skirt:'M21 12H39L50 70H10Z',outerwear:'M22 8L12 24L13 74H29L30 22L31 74H47L48 24L38 8Q30 16 22 8',scarf:'M20 10Q30 20 40 10L36 70L30 62L24 70Z',accessory:'M14 30H46V56H14ZM14 30Q30 18 46 30'};
const LIGHT=['champagne','ivory','pewter','dusty rose'];
const ph=p=>{const k=/scarf/.test(p.name)?'scarf':ICON[p.category]?p.category:'accessory',c=p.colours[0];return `<div class="ph" style="background:${HEX[c]||'#CFC6BA'}"><svg viewBox="0 0 60 80" aria-hidden="true" style="stroke:${LIGHT.includes(c)?'#1E1B1A':'#F6F1EA'}"><path d="${ICON[k]}"/></svg><span>${p.colours.join(' or ')}</span></div>`};
const card=(p,extra='')=>`<a class="card" href="product.html?id=${p.id}">${ph(p)}<h3>${p.name}</h3><p class="meta">${p.fabric}${p.fit?' · '+p.fit:''}</p><p class="price">${money(p.price_gbp)}</p><p class="status">${status(p)}</p>${extra}</a>`;
const toDate=v=>new Date(v+'T00:00:00');

(async()=>{
const P=await (await fetch('products.json')).json();
const page=document.body.dataset.page;
if(page==='home'){
  const occs=[...new Set(P.flatMap(p=>p.occasions))].sort();
  document.getElementById('chips').innerHTML=occs.map(o=>`<a href="#stylist" data-occ="${o}">${nice(o)}</a>`).join('');
  document.getElementById('occ').innerHTML=occs.map(o=>`<option value="${o}">${nice(o)}</option>`).join('');
  document.getElementById('ready').innerHTML=P.filter(p=>!p.made_to_order&&p.in_stock).map(p=>card(p)).join('');
  document.getElementById('date').min=today().toISOString().slice(0,10);
  document.getElementById('chips').addEventListener('click',e=>{if(e.target.dataset.occ)document.getElementById('occ').value=e.target.dataset.occ});
  document.getElementById('styler').addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target,occ=f.occ.value,reg=f.region.value,bud=+f.budget.value||0,out=document.getElementById('result');
    const say=t=>out.innerHTML=`<p class="note">${t}</p>`;
    const all=P.filter(p=>p.occasions.includes(occ));
    if(!all.length)return say(`I have no pieces listed for ${prop(occ)}.`);
    const av=all.filter(orderable);
    if(!av.length)return say(`Pieces for ${prop(occ)} are not available to order right now.`);
    let ok=av;
    if(bud){ok=ok.filter(p=>p.price_gbp<=bud);if(!ok.length)return say(`Nothing for ${prop(occ)} is under ${money(bud)}. The lowest price I have is ${money(Math.min(...av.map(p=>p.price_gbp)))}.`)}
    if(f.date.value){const d=toDate(f.date.value);const ok2=ok.filter(p=>win(p,reg)[1]<=d);
      if(!ok2.length){const soon=new Date(Math.min(...ok.map(p=>win(p,reg)[1])));return say(`None of the ${ok.length} matching pieces would reach you by ${fmt(d)} if you order today. The soonest latest-arrival date I can give is ${fmt(soon)}.`)}
      ok=ok2}
    ok=ok.sort((a,b)=>(b.in_stock-a.in_stock)||a.price_gbp-b.price_gbp).slice(0,4);
    out.innerHTML=`<p class="note">${ok.length} piece${ok.length>1?'s':''} for ${prop(occ)}. Dates are estimates from our making and delivery times, if you order today.</p><div class="grid" style="margin-top:16px">`+ok.map(p=>{const[a,b]=win(p,reg);return card(p,`<p class="status">Arrives ${fmt(a)} to ${fmt(b)} (${reg})</p>`)}).join('')+'</div>';
  });
}
if(page==='product'){
  const p=P.find(x=>x.id===new URLSearchParams(location.search).get('id'));
  const el=document.getElementById('product');
  if(!p){el.innerHTML='<p class="note">I could not find that piece. <a href="index.html">Back to the home page</a>.</p>';return}
  document.title=`${p.name}, ${p.fabric} · Velmora`;
  el.innerHTML=`${ph(p)}<div><h1>${p.name}</h1><p class="price">${money(p.price_gbp)}</p><p>${desc(p.description)}</p>
  <dl><dt>Fabric</dt><dd>${p.fabric}</dd>${p.fit?`<dt>Fit</dt><dd>${p.fit}</dd>`:''}<dt>Colours</dt><dd>${p.colours.join(', ')}</dd><dt>Sizes</dt><dd style="text-transform:none">${p.sizes.join(', ')}</dd><dt>For</dt><dd style="text-transform:none">${p.occasions.map(nice).join(', ')}</dd><dt>Made</dt><dd style="text-transform:none">${status(p)}</dd></dl>
  <button class="btn" id="bag" ${orderable(p)?'':'disabled'}>Add to bag</button><p id="bagmsg" class="note" hidden>This is a concept site. In the live store this goes to Shopify checkout.</p>
  <p>Returns within 14 days, unworn, with tags. Made-to-order pieces in a non-standard size cannot be returned.</p>
  <h2 style="margin-top:28px">Will it arrive in time?</h2>
  <form id="dform"><label>Date you need it by<input type="date" id="need" min="${today().toISOString().slice(0,10)}" required></label><label>Delivery to<select id="reg"><option>UK</option><option>EU</option></select></label><button class="btn">Check the date</button></form><div id="dcheck" aria-live="polite"></div></div>`;
  document.getElementById('bag').onclick=()=>document.getElementById('bagmsg').hidden=false;
  document.getElementById('dform').onsubmit=e=>{e.preventDefault();
    const out=document.getElementById('dcheck'),say=t=>out.innerHTML=`<p class="note">${t}</p>`;
    if(!orderable(p))return say('This piece is not available to order, so I cannot give a delivery date.');
    const r=document.getElementById('reg').value,d=toDate(document.getElementById('need').value),[a,b]=win(p,r),by=addDays(d,-(p.lead_time_days+SHIP[r][1]));
    let t=`Ordered today, it arrives between ${fmt(a)} and ${fmt(b)}. `;
    t+=b<=d?`That is before ${fmt(d)}.`:a<=d?`It may arrive by ${fmt(d)}, but I cannot promise it.`:`It will not arrive by ${fmt(d)}.`;
    if(by>=today())t+=` To be sure, order by ${fmt(by)}.`;
    say(t)};
  const ld={"@context":"https://schema.org","@type":"Product",name:`${p.name}, ${p.fabric}`,description:desc(p.description),sku:p.id,brand:{"@type":"Brand",name:"Velmora"},material:p.fabric,offers:{"@type":"Offer",priceCurrency:"GBP",price:p.price_gbp,availability:orderable(p)?"https://schema.org/InStock":"https://schema.org/OutOfStock"}};
  const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
}
})();

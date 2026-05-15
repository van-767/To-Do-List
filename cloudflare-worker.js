// MyGoals Push Notification Worker
// Deploy to Cloudflare Workers
// KV binding: SCHEDULES
// Secret: FCM_SA (paste entire Firebase service account JSON as a string)
// Cron: "* * * * *" (every minute)

const PROJECT_ID = 'todo-list-4ab52';
const FCM_URL = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const TYPE_LABELS = {
  deep:'🟠 Deep Work', health:'🟢 Sức khoẻ', admin:'🔵 Admin',
  rest:'🟣 Nghỉ ngơi', meal:'🔴 Ăn uống', learn:'💙 Học tập'
};

export default {
  async fetch(request, env) {
    const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
    if(request.method==='OPTIONS') return new Response(null,{headers:cors});
    const url = new URL(request.url);
    if(url.pathname==='/register' && request.method==='POST'){
      try {
        const data = await request.json();
        const {fcmToken,date,schedule,reasons,reasonsIntervalMin} = data;
        if(!fcmToken) return new Response('Missing token',{status:400,headers:cors});
        const existing = await env.SCHEDULES.get(fcmToken,'json') || {};
        await env.SCHEDULES.put(fcmToken, JSON.stringify({
          date, schedule:schedule||[], reasons:reasons||[],
          reasonsIntervalMin:reasonsIntervalMin||0,
          lastReasonNotif: existing.lastReasonNotif||0,
          updatedAt: Date.now()
        }), {expirationTtl: 86400*7});
        return new Response('OK',{headers:cors});
      } catch(e){ return new Response('Error: '+e.message,{status:500,headers:cors}); }
    }
    return new Response('MyGoals Worker OK',{headers:cors});
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(run(env));
  }
};

async function run(env) {
  let sa;
  try { sa = JSON.parse(env.FCM_SA); } catch(e){ console.error('Bad FCM_SA'); return; }
  const accessToken = await getAccessToken(sa);
  if(!accessToken){ console.error('No access token'); return; }

  const now = new Date();
  const hm = pad(now.getUTCHours())+':'+pad(now.getUTCMinutes());
  // Use UTC+7 for Vietnam time
  const vn = new Date(now.getTime() + 7*3600*1000);
  const vnHm = pad(vn.getUTCHours())+':'+pad(vn.getUTCMinutes());
  const vnDate = vn.toISOString().split('T')[0];

  const list = await env.SCHEDULES.list();
  for(const key of list.keys){
    try {
      const entry = await env.SCHEDULES.get(key.name,'json');
      if(!entry) continue;

      // Daily block notifications (using VN time)
      if(entry.date===vnDate && entry.schedule){
        for(const b of entry.schedule){
          if(b.time===vnHm){
            const title = TYPE_LABELS[b.type]||'⏰ MyGoals';
            await sendFCM(accessToken, key.name, title, b.label||'Đến giờ rồi!');
          }
        }
      }

      // Reasons reminder
      if(entry.reasonsIntervalMin>0 && entry.reasons&&entry.reasons.length){
        const intervalMs = entry.reasonsIntervalMin*60*1000;
        if(Date.now()-(entry.lastReasonNotif||0) >= intervalMs){
          const r = entry.reasons[Math.floor(Math.random()*entry.reasons.length)];
          await sendFCM(accessToken, key.name, '💪 Reasons', r);
          entry.lastReasonNotif = Date.now();
          await env.SCHEDULES.put(key.name, JSON.stringify(entry), {expirationTtl:86400*7});
        }
      }
    } catch(e){ console.error('Token error:', key.name, e.message); }
  }
}

async function getAccessToken(sa){
  try {
    const now = Math.floor(Date.now()/1000);
    const enc = s => btoa(JSON.stringify(s)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
    const hdr = enc({alg:'RS256',typ:'JWT'});
    const pld = enc({iss:sa.client_email,sub:sa.client_email,aud:TOKEN_URL,iat:now,exp:now+3600,scope:'https://www.googleapis.com/auth/firebase.messaging'});
    const msg = hdr+'.'+pld;
    const pem = sa.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g,'');
    const keyData = Uint8Array.from(atob(pem),c=>c.charCodeAt(0));
    const key = await crypto.subtle.importKey('pkcs8',keyData,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,new TextEncoder().encode(msg));
    const jwt = msg+'.'+btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
    const resp = await fetch(TOKEN_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion='+jwt});
    const data = await resp.json();
    return data.access_token||null;
  } catch(e){ console.error('getAccessToken error:',e); return null; }
}

async function sendFCM(token, fcmToken, title, body){
  const resp = await fetch(FCM_URL,{
    method:'POST',
    headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},
    body:JSON.stringify({message:{token:fcmToken,notification:{title,body},android:{notification:{sound:'default',channelId:'mygoals'}},data:{title,body}}})
  });
  const r = await resp.json();
  if(!resp.ok) console.error('FCM error:',JSON.stringify(r));
}

function pad(n){return String(n).padStart(2,'0');}

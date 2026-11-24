/* ==================================================================
   CONFIG — modifiez vos prix ici / عدّل الأسعار هنا
================================================================== */
const CONFIG = {
  price: 4900,          // prix actuel (DA)
  oldPrice: 6900,       // ancien prix (DA)
  currency: 'DA',
  // Compte à rebours OPTIONNEL : mettez une date ISO pour l'activer,
  // ex: '2026-12-31T23:59:00+01:00'. Laisser null = aucun faux timer.
  offerUntil: null
};

/* ==================================================================
   MOTEUR VISUEL — génère les visuels produit (montre SVG premium)
================================================================== */
const DIALS = {
  blue:{c0:'#dff1fa',c1:'#8fbcd4',glow:'#7cc7e8'},
  red:{c0:'#e05563',c1:'#8e1622',glow:'#e05563',lume:'#ffe9ea'},
  grey:{c0:'#e3e6ea',c1:'#a7abb3',glow:'#9aa1ab'}
};
const rad = a => a*Math.PI/180;

function watchParts(d, o={}){
  const {rotate=0, shadow=true, glow=true} = o;
  const cx=200, cy=330, R=118, lum=d.lume||'#eaf7ff', go=glow?'.13':'0';
  const defs = `<defs>
<linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2f4f7"/><stop offset=".38" stop-color="#c2c7cf"/><stop offset=".55" stop-color="#848b96"/><stop offset=".78" stop-color="#d7dbe1"/><stop offset="1" stop-color="#5d646f"/></linearGradient>
<linearGradient id="steelV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ecf1"/><stop offset=".45" stop-color="#b3b9c2"/><stop offset=".58" stop-color="#878e99"/><stop offset="1" stop-color="#c9ced6"/></linearGradient>
<radialGradient id="dial" cx=".5" cy=".36" r=".8"><stop offset="0" stop-color="${d.c0}"/><stop offset=".7" stop-color="${d.c0}"/><stop offset="1" stop-color="${d.c1}"/></radialGradient>
<linearGradient id="baton" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#8b93a0"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${d.glow}" stop-opacity="${go}"/><stop offset=".75" stop-color="${d.glow}" stop-opacity="${go}"/><stop offset="1" stop-color="#7cc7e8" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".5"><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
<clipPath id="dialclip"><circle cx="${cx}" cy="${cy}" r="${R-27}"/></clipPath>
<filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter></defs>`;

  const bracelet=(y0,y1,wc,we)=>{let out='';for(let i=0;i<6;i++){const t0=i/6,t1=(i+1)/6,ya=y0+(y1-y0)*t0,yb=y0+(y1-y0)*t1-3,w=wc+(we-wc)*(t0+t1)/2;
    const x0=cx-w/2,x1=cx+w/2,xm0=cx-w*.17,xm1=cx+w*.17;
    out+=`<rect x="${x0}" y="${ya}" width="${xm0-x0-2}" height="${yb-ya}" rx="4.5" fill="url(#steelV)" stroke="#4a5058" stroke-width=".8"/>`;
    out+=`<rect x="${xm0+2}" y="${ya}" width="${xm1-xm0-4}" height="${yb-ya}" rx="4.5" fill="url(#steelV)" stroke="#f5f7fa" stroke-width=".7"/>`;
    out+=`<rect x="${xm1+2}" y="${ya}" width="${x1-xm1-2}" height="${yb-ya}" rx="4.5" fill="url(#steelV)" stroke="#4a5058" stroke-width=".8"/>`;
    out+=`<line x1="${x0+3}" y1="${ya+3}" x2="${x1-3}" y2="${ya+3}" stroke="#fff" stroke-width=".8" opacity=".35"/>`;}
    return out;};

  const hand=(ad,len,wb,wt,lume)=>{const a=rad(ad),tx=cx+len*Math.sin(a),ty=cy-len*Math.cos(a),px=-Math.cos(a),py=-Math.sin(a);
    let s=`<polygon points="${cx+px*wb},${cy+py*wb} ${cx-px*wb},${cy-py*wb} ${tx-px*wt},${ty-py*wt} ${tx},${ty} ${tx+px*wt},${ty+py*wt}" fill="url(#baton)" stroke="#22272f" stroke-width=".6"/>`;
    if(lume){const lx=cx+len*.6*Math.sin(a),ly=cy-len*.6*Math.cos(a);
      s+=`<line x1="${cx}" y1="${cy}" x2="${lx}" y2="${ly}" stroke="${lum}" stroke-width="${wb*1.15}" stroke-linecap="round" opacity=".85"/>`;}
    return s;};

  let p='';
  if(shadow) p+=`<ellipse cx="${cx}" cy="${cy+R+196}" rx="100" ry="14" fill="#000" opacity=".5" filter="url(#soft)"/>`;
  if(glow) p+=`<ellipse cx="${cx}" cy="${cy}" rx="${R+62}" ry="${R+62}" fill="url(#glow)"/>`;
  p+=bracelet(20,cy-R+6,116,90)+bracelet(cy+R-6,620,116,86);
  for(const s of[-1,1]) p+=`<path d="M ${cx-46} ${cy+s*(R-16)} Q ${cx} ${cy+s*(R+22)} ${cx+46} ${cy+s*(R-16)} L ${cx+38} ${cy+s*(R-30)} Q ${cx} ${cy+s*(R+2)} ${cx-38} ${cy+s*(R-30)} Z" fill="url(#steel)" stroke="#454b55" stroke-width="1.2"/>`;
  p+=`<rect x="${cx+R-8}" y="${cy-10}" width="18" height="20" rx="4" fill="url(#steelV)" stroke="#454b55"/>`;
  for(const dy of[-6,-2,2,6]) p+=`<line x1="${cx+R+2}" y1="${cy+dy}" x2="${cx+R+9}" y2="${cy+dy}" stroke="#4a5058" stroke-width="1.3"/>`;
  p+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#steel)" stroke="#3e444e" stroke-width="2"/>`;
  p+=`<circle cx="${cx}" cy="${cy}" r="${R-11}" fill="url(#steelV)" stroke="#f5f7fa" stroke-width="1"/>`;
  for(let b=0;b<360;b+=10){const a=rad(b);
    p+=`<line x1="${cx+(R-12)*Math.sin(a)}" y1="${cy-(R-12)*Math.cos(a)}" x2="${cx+(R-2)*Math.sin(a)}" y2="${cy-(R-2)*Math.cos(a)}" stroke="#fff" stroke-width=".7" opacity=".18"/>`;}
  p+=`<circle cx="${cx}" cy="${cy}" r="${R-25}" fill="url(#dial)" stroke="#262b33" stroke-width="4"/>`;
  let sun='';for(let b=0;b<360;b+=5){const a=rad(b);
    sun+=`<line x1="${cx+30*Math.sin(a)}" y1="${cy-30*Math.cos(a)}" x2="${cx+(R-28)*Math.sin(a)}" y2="${cy-(R-28)*Math.cos(a)}" stroke="#fff" stroke-width="5" opacity=".045"/>`;}
  p+=`<g clip-path="url(#dialclip)">${sun}<circle cx="${cx}" cy="${cy}" r="${R-27}" fill="url(#vig)"/></g>`;
  for(let m=0;m<60;m++){const a=rad(m*6),big=m%5===0,r1=R-31,r2=big?R-39:R-35;
    p+=`<line x1="${cx+r1*Math.sin(a)}" y1="${cy-r1*Math.cos(a)}" x2="${cx+r2*Math.sin(a)}" y2="${cy-r2*Math.cos(a)}" stroke="#fff" stroke-width="${big?2.2:1}" opacity=".8"/>`;}
  for(let h=0;h<12;h++){if(h===3)continue;
    p+=`<rect x="-5.5" y="-${R-38}" width="11" height="27" rx="2.5" fill="url(#baton)" stroke="#39404a" stroke-width=".8" transform="translate(${cx},${cy}) rotate(${h*30})"/>`;}
  const rd=R-57;
  p+=`<rect x="${cx+rd-13}" y="${cy-11}" width="26" height="22" rx="3" fill="#f6f8fb" stroke="#39404a" stroke-width="1.5"/>`;
  p+=`<text x="${cx+rd}" y="${cy+5}" font-family="Arial" font-size="13" font-weight="700" fill="#1c212a" text-anchor="middle">14</text>`;
  p+=`<text x="${cx}" y="${cy-44}" font-family="Georgia,serif" font-size="17" letter-spacing="4" fill="#20262f" text-anchor="middle" font-weight="700">AZUR</text>`;
  p+=`<text x="${cx}" y="${cy-28}" font-family="Arial" font-size="6.5" letter-spacing="3" fill="#20262f" text-anchor="middle" opacity=".85">PREMIUM</text>`;
  p+=hand(305,R-60,6,2.4,true)+hand(62,R-36,4.5,1.8,true);
  const sa=rad(155);
  p+=`<line x1="${cx-18*Math.sin(sa)}" y1="${cy+18*Math.cos(sa)}" x2="${cx+(R-30)*Math.sin(sa)}" y2="${cy-(R-30)*Math.cos(sa)}" stroke="#d4d8de" stroke-width="1.6"/>`;
  p+=`<circle cx="${cx}" cy="${cy}" r="7" fill="url(#steelV)" stroke="#39404a"/><circle cx="${cx}" cy="${cy}" r="2.6" fill="${d.c1}"/>`;
  p+=`<g clip-path="url(#dialclip)"><ellipse cx="${cx-38}" cy="${cy-52}" rx="${R-20}" ry="46" fill="#fff" opacity=".13" transform="rotate(-24 ${cx} ${cy})"/></g>`;
  if(rotate) p=`<g transform="rotate(${rotate} ${cx} ${cy})">${p}</g>`;
  return {defs, body:p};
}
const wrap=(inner,vb,w,h)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">${inner}</svg>`;

function studioZoom(d,x,y,w,h){
  const {defs,body}=watchParts(d,{glow:false,shadow:false});
  return wrap(defs+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#10141d"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#glow)"/>`+body,`${x} ${y} ${w} ${h}`,600,600);
}
function sceneImg(d){
  const {defs,body}=watchParts(d,{rotate:-22,shadow:false,glow:false});
  return wrap(`<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171d27"/><stop offset=".62" stop-color="#0d1119"/><stop offset="1" stop-color="#080b10"/></linearGradient>
<radialGradient id="spot" cx=".5" cy=".34" r=".55"><stop offset="0" stop-color="#7cc7e8" stop-opacity=".16"/><stop offset="1" stop-color="#7cc7e8" stop-opacity="0"/></radialGradient>
<linearGradient id="surf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#232a36"/><stop offset="1" stop-color="#0a0d13"/></linearGradient>
<linearGradient id="refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="s2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter></defs>`+defs+`
<rect width="640" height="480" fill="url(#bg)"/><rect width="640" height="480" fill="url(#spot)"/>
<rect x="0" y="316.8" width="640" height="163.2" fill="url(#surf)"/><line x1="0" y1="316.8" x2="640" y2="316.8" stroke="#3a4352"/>
<g transform="translate(150,62) scale(0.62)">${body}</g>
<ellipse cx="320" cy="339" rx="120" ry="14" fill="#000" opacity=".5" filter="url(#s2)"/>
<g transform="translate(150,62) scale(0.62) translate(0,828.4) scale(1,-1)" opacity=".13">${body}</g>
<ellipse cx="320" cy="347" rx="140" ry="20" fill="url(#refl)" opacity=".2"/>`,'0 0 640 480',640,480);
}
function wristImg(d){
  const {defs,body}=watchParts(d,{rotate:90,shadow:false,glow:false});
  return wrap(`<defs><linearGradient id="bgw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161c26"/><stop offset=".7" stop-color="#0a0d13"/><stop offset="1" stop-color="#07090e"/></linearGradient>
<linearGradient id="skin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b0825f"/><stop offset=".5" stop-color="#cf9d78"/><stop offset="1" stop-color="#96694a"/></linearGradient>
<linearGradient id="cuff" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#323d57"/><stop offset="1" stop-color="#181e2a"/></linearGradient>
<linearGradient id="surf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2530"/><stop offset="1" stop-color="#080a0f"/></linearGradient>
<filter id="s3" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter></defs>`+defs+`
<rect width="600" height="420" fill="url(#bgw)"/><rect x="0" y="300" width="600" height="120" fill="url(#surf2)"/>
<line x1="0" y1="300" x2="600" y2="300" stroke="#333c4b"/>
<rect x="-20" y="140" width="660" height="152" rx="20" fill="url(#skin)"/>
<ellipse cx="250" cy="168" rx="220" ry="18" fill="#fff" opacity=".07"/>
<ellipse cx="380" cy="300" rx="210" ry="14" fill="#000" opacity=".5" filter="url(#s3)"/>
<g transform="translate(204,106) scale(0.55)">${body}</g>
<path d="M -20 128 L 240 128 L 200 304 L -20 304 Z" fill="url(#cuff)"/>
<path d="M 240 128 L 240 304 L 200 304 Z" fill="#435071" opacity=".55"/>
<path d="M -20 128 L 40 128 L 40 304 L -20 304 Z" fill="#fff" opacity=".03"/>
<circle cx="226" cy="216" r="4.5" fill="#d6dae1"/><circle cx="226" cy="216" r="2" fill="#7a818d"/>`,'0 0 600 420',600,420);
}
const dataURI = svg => 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
function buildImages(color){
  return {
    hero: `images/${color}-hero.webp`,
    angle: `images/${color}-angle.webp`,
    dial: `images/${color}-dial.webp`,
    bracelet: `images/${color}-bracelet.webp`,
    wrist: `images/${color}-wrist.webp`,
    scene: `images/${color}-scene.webp`
  };
}
const IMAGES={blue:buildImages('blue'),red:buildImages('red'),grey:buildImages('grey')};

/* ==================================================================
   I18N — FR / AR
================================================================== */
const I18N={
fr:{
 nav_product:'La Montre',nav_benefits:'Atouts',nav_reviews:'Avis',nav_faq:'FAQ',nav_order:'Commander',nav_cta:'Commander',
 badge:'OFFRE SPÉCIALE',badge2:"-29% AUJOURD'HUI",
 h1a:'Élégance au poignet.',h1b:'Style incomparable.',
 hero_sub:"Une montre au design raffiné, bracelet métallique argenté et cadran délicat. L'accessoire parfait pour un look distingué — au quotidien comme lors des grandes occasions.",
 price_now:'4 900 DA',price_old:'6 900 DA',cta_main:'Commander maintenant',
 trust1:'Paiement à la livraison',trust2:'Livraison partout en Algérie',trust3:'Stock limité',
 strip1:'Paiement à la livraison',strip2:'Livraison vers les 58 wilayas',strip3:'Commande simple en 2 minutes',strip4:'Support client disponible',
 prod_eyebrow:'LA MONTRE',prod_title:"Un design qui parle d'élégance",
 prod_sub:'Boîtier et bracelet en métal argenté au finition soignée, cadran soleillé disponible en trois teintes. Une présence remarquable, en toute simplicité.',
 color_label:'Couleur du cadran :',
 sp1b:'Boîtier',sp1s:'Métal argenté, finition polie',sp2b:'Bracelet',sp2s:'Métal, maillons 3 pièces',
 sp3b:'Cadran',sp3s:'Bleu clair / Rouge / Gris',sp4b:'Affichage',sp4s:'Index appliqués + date',
 sp5b:'Livraison',sp5s:'Partout en Algérie',sp6b:'Paiement',sp6s:'À la livraison (COD)',
 ben_eyebrow:'ATOUTS',ben_title:'Pourquoi vous allez l’adorer',
 ben_sub:'Chaque détail de cette montre a été pensé pour offrir une allure premium et une présence remarquable.',
 b1t:'Design élégant et moderne',b1d:'Des lignes épurées et un cadran soleillé qui capte la lumière avec raffinement.',
 b2t:'Bracelet métallique',b2d:'Maillons solides au tombé confortable, brillance argentée durable.',
 b3t:'Cadran sophistiqué',b3d:'Index appliqués, chemin de minutes précis et fenêtre date à 3 heures.',
 b4t:'Confort au quotidien',b4d:'Légère et agréable à porter, du bureau aux sorties.',
 b5t:'Idéale pour les occasions spéciales',b5d:'Mariages, fêtes, réunions : elle sublimera toutes vos tenues.',
 b6t:'Style premium',b6d:"Une allure de montre de luxe à un prix accessible.",
 gal_eyebrow:'GALERIE',gal_title:'Chaque détail compte',
 g1:'Présentation premium',g2:'Cadran soleillé',g3:'Bracelet 3 maillons',g4:'Portée au poignet',g5:'Vue de trois quarts',
 why_eyebrow:'LA DIFFÉRENCE AZUR',why_title:'Pourquoi choisir AZUR ?',
 w1t:'Look premium',w1d:'Un design digne des grandes maisons horlogères.',w2t:'Prix accessible',w2d:"L'élégance haut de gamme sans le prix haut de gamme.",
 w3t:'Paiement à la livraison',w3d:'Zéro risque : vous payez à la réception.',w4t:'Livraison nationale',w4d:'Dans les 58 wilayas d’Algérie.',
 rev_eyebrow:'AVIS CLIENTS',rev_title:'Ce que disent nos clients',
 rev_quote:'« Un style premium qui attire les regards. »',
 r1:'Très belle montre, encore plus jolie qu’en photo. Le bracelet est solide et le cadran bleu est magnifique. Livraison rapide à Alger.',r1w:'Alger',
 r2:'Je l’ai offerte à mon frère, il ne la quitte plus. Finition très propre pour ce prix. Je recommande.',r2w:'Oran',
 r3:'Commande facile, paiement à la réception comme promis. La montre fait vraiment chic.',r3w:'Constantine',
 r4:'Qualité surprise pour le prix. Le cadran gris est très classe. Service client réactif.',r4w:'Sétif',
 r5:'Deuxième commande pour offrir. Emballage soigné, montre superbe. Très satisfait.',r5w:'Béjaïa',
 r6:'Très bon rapport qualité-prix. Elle donne un côté premium à toutes mes tenues.',r6w:'Tlemcen',
 ord_eyebrow:'COMMANDE',ord_title:'Commandez maintenant',
 ord_sub:'Remplissez le formulaire — notre équipe vous appellera pour confirmer. Aucun paiement en ligne requis.',
 sum_name:'Montre AZUR Premium',sum_color:'Couleur :',sum_price:'Prix unitaire',sum_ship:'Livraison',sum_ship_v:'À confirmer',
 sum_total:'Total',sum_cod:'Paiement en espèces à la réception de votre commande.',
 f_name:'Nom et prénom',f_name_ph:'Ex : Mohamed Benali',f_phone:'Numéro de téléphone',
 f_wilaya:'Wilaya',f_wilaya_ph:'— Sélectionnez —',f_commune:'Commune',f_commune_ph:'Ex : Bab Ezzouar',
 f_address:'Adresse complète',f_address_ph:'Rue, immeuble, point de repère…',
 f_color:'Couleur',f_qty:'Quantité',cta_main2:'Commander maintenant',
 cod1:'Paiement à la livraison',cod2:'Vous payez uniquement à la réception de votre commande.',
 ok_t:'Commande reçue !',ok_d:'Merci. Notre équipe vous appellera très vite pour confirmer votre commande.',
 ship_eyebrow:'LIVRAISON & CONFIANCE',ship_title:'Livraison disponible partout en Algérie 🇩🇿',
 sh1t:'Livraison nationale',sh1d:'Vers les 58 wilayas, à votre adresse ou au bureau.',
 sh2t:'Paiement à la livraison',sh2d:'Payez en espèces à la réception. Aucun paiement en ligne.',
 sh3t:'Commande facile',sh3d:'Un formulaire simple, une confirmation par téléphone.',
 sh4t:'Support client',sh4d:'Une équipe disponible pour répondre à vos questions.',
 faq_eyebrow:'FAQ',faq_title:'Questions fréquentes',
 q1:'Comment se passe le paiement ?',a1:'Le paiement se fait en espèces à la livraison (COD). Vous ne payez rien au moment de la commande — uniquement à la réception de votre montre.',
 q2:'Livrez-vous dans ma wilaya ?',a2:'Oui, nous livrons dans les 58 wilayas d’Algérie. Frais et délais vous sont confirmés par téléphone.',
 q3:'Puis-je changer de couleur après la commande ?',a3:'Oui. Lors de l’appel de confirmation, vous pouvez modifier la couleur (bleu clair, rouge ou gris) ou la quantité.',
 q4:'Comment suivre ma commande ?',a4:'Après confirmation, nous vous contactons pour organiser la livraison. Notre support reste disponible.',
 q5:'La montre convient-elle comme cadeau ?',a5:'Absolument. Son style premium et sa présentation soignée en font un cadeau idéal.',
 fin_title:'Prêt à sublimer votre style ?',
 fin_sub:'Offre spéciale : 6 900 DA 4 900 DA — profitez-en maintenant.',
 fin_note:'Paiement à la livraison · Livraison partout en Algérie',
 cta_main3:'Commander maintenant',cta_main4:'Commander maintenant',
 foot_about:'Boutique en ligne algérienne spécialisée dans les montres au style premium. Paiement à la livraison, partout en Algérie.',
 foot_rights:'Tous droits réservés.',
 alt_hero:'Montre homme premium AZUR, bracelet métallique argenté et cadran bleu clair',
 col_blue:'Bleu clair',col_red:'Rouge',col_grey:'Gris'
},
ar:{
 nav_product:'الساعة',nav_benefits:'المميزات',nav_reviews:'الآراء',nav_faq:'الأسئلة',nav_order:'اطلب الآن',nav_cta:'اطلب الآن',
 badge:'عرض خاص',badge2:'خصم 29% اليوم',
 h1a:'أناقة على معصمك.',h1b:'أسلوب لا يُضاهى.',
 hero_sub:'ساعة بتصميم راقٍ، سوار معدني فضي وقرص أنيق. الإكسسوار المثالي لمظهر مميز — في اليوميات وفي المناسبات الكبرى.',
 price_now:'4 900 دج',price_old:'6 900 دج',cta_main:'اطلب الآن',
 trust1:'الدفع عند الاستلام',trust2:'التوصيل لجميع ولايات الجزائر',trust3:'الكمية محدودة',
 strip1:'الدفع عند الاستلام',strip2:'التوصيل إلى 58 ولاية',strip3:'طلب سهل في دقيقتين',strip4:'خدمة عملاء متاحة',
 prod_eyebrow:'الساعة',prod_title:'تصميم يتحدث عن الأناقة',
 prod_sub:'علبة وسوار من معدن فضي بتشطيب متقن، وقرص متدرج متوفر بثلاث درجات. حضور لافت بكل بساطة.',
 color_label:'لون القرص:',
 sp1b:'العلبة',sp1s:'معدن فضي، تشطيب مصقول',sp2b:'السوار',sp2s:'معدني، حلقات ثلاثية',
 sp3b:'القرص',sp3s:'أزرق فاتح / أحمر / رمادي',sp4b:'العرض',sp4s:'مؤشرات بارزة + التاريخ',
 sp5b:'التوصيل',sp5s:'لكل ولايات الجزائر',sp6b:'الدفع',sp6s:'عند الاستلام',
 ben_eyebrow:'المميزات',ben_title:'لماذا ستعشقها؟',
 ben_sub:'كل تفصيلة في هذه الساعة صُممت لتمنحك مظهراً فاخراً وحضوراً لافتاً.',
 b1t:'تصميم أنيق وعصري',b1d:'خطوط نقية وقرص متدرج يتلألأ مع الضوء.',
 b2t:'سوار معدني',b2d:'حلقات متينة مريحة، بلمعة فضية تدوم.',
 b3t:'قرص متقن',b3d:'مؤشرات بارزة ودقيقة مع نافذة التاريخ.',
 b4t:'راحة يومية',b4d:'خفيفة ومريحة، من المكتب إلى السهرات.',
 b5t:'مثالية للمناسبات الخاصة',b5d:'أعراس، حفلات، لقاءات مهمة: تُكمل كل إطلالة.',
 b6t:'طابع فاخر',b6d:'مظهر ساعات الرفاهية بسعر في المتناول.',
 gal_eyebrow:'المعرض',gal_title:'كل تفصيلة تحسب',
 g1:'عرض فاخر',g2:'قرص متدرج',g3:'سوار ثلاثي الحلقات',g4:'على المعصم',g5:'منظر جانبي',
 why_eyebrow:'فرق أزور',why_title:'لماذا تختار أزور؟',
 w1t:'مظهر فاخر',w1d:'تصميم يليق بأكبر دور الساعات.',w2t:'سعر مناسب',w2d:'الفخامة بلا سعر الفخامة.',
 w3t:'الدفع عند الاستلام',w3d:'بدون مخاطرة: تدفع عند الاستلام.',w4t:'توصيل وطني',w4d:'إلى 58 ولاية جزائرية.',
 rev_eyebrow:'آراء العملاء',rev_title:'ماذا يقول عملاؤنا',
 rev_quote:'« طابع فاخر يلفت الأنظار. »',
 r1:'ساعة جميلة جداً، أجمل من الصور. السوار متين والقرص الأزرق رائع. توصيل سريع إلى الجزائر العاصمة.',r1w:'الجزائر',
 r2:'أهديتها لأخي ولم تفارق معصمه. تشطيب نظيف جداً بهذا السعر. أنصح بها.',r2w:'وهران',
 r3:'طلب سهل والدفع عند الاستلام كما وعدوا. الساعة فعلاً راقية.',r3w:'قسنطينة',
 r4:'جودة مفاجئة بهذا السعر. القرص الرمادي أنيق جداً. خدمة العملاء سريعة.',r4w:'سطيف',
 r5:'الطلب الثاني للإهداء. تغليف أنيق وساعة رائعة. راضٍ تماماً.',r5w:'بجاية',
 r6:'قيمة ممتازة مقابل السعر. تضيف طابعاً فاخراً لكل إطلالاتي.',r6w:'تلمسان',
 ord_eyebrow:'الطلب',ord_title:'اطلب الآن',
 ord_sub:'املأ الاستمارة — سيتصل بك فريقنا للتأكيد. لا حاجة لأي دفع إلكتروني.',
 sum_name:'ساعة أزور بريميوم',sum_color:'اللون:',sum_price:'سعر الوحدة',sum_ship:'التوصيل',sum_ship_v:'يُؤكَّد لاحقاً',
 sum_total:'المجموع',sum_cod:'الدفع نقداً عند استلام طلبك.',
 f_name:'الاسم واللقب',f_name_ph:'مثال: محمد بن علي',f_phone:'رقم الهاتف',
 f_wilaya:'الولاية',f_wilaya_ph:'— اختر —',f_commune:'البلدية',f_commune_ph:'مثال: باب الزوار',
 f_address:'العنوان الكامل',f_address_ph:'الشارع، العمارة، علامة مميزة…',
 f_color:'اللون',f_qty:'الكمية',cta_main2:'اطلب الآن',
 cod1:'الدفع عند الاستلام',cod2:'تدفع فقط عند استلام طلبك.',
 ok_t:'تم استلام طلبك!',ok_d:'شكراً لك. سيتصل بك فريقنا قريباً جداً لتأكيد طلبك.',
 ship_eyebrow:'التوصيل والثقة',ship_title:'التوصيل متوفر في جميع أنحاء الجزائر 🇩🇿',
 sh1t:'توصيل وطني',sh1d:'إلى 58 ولاية، إلى عنوانك أو إلى المكتب.',
 sh2t:'الدفع عند الاستلام',sh2d:'ادفع نقداً عند الاستلام. لا دفع إلكتروني.',
 sh3t:'طلب سهل',sh3d:'استمارة بسيطة وتأكيد عبر الهاتف.',
 sh4t:'خدمة العملاء',sh4d:'فريق متاح للإجابة عن أسئلتك.',
 faq_eyebrow:'الأسئلة',faq_title:'الأسئلة الشائعة',
 q1:'كيف يتم الدفع؟',a1:'الدفع نقداً عند الاستلام. لا تدفع شيئاً عند الطلب — فقط عند استلام ساعتك.',
 q2:'هل توصلون إلى ولايتي؟',a2:'نعم، نوصل إلى 58 ولاية جزائرية. تُؤكَّد لك التكلفة والمدة عبر الهاتف.',
 q3:'هل يمكنني تغيير اللون بعد الطلب؟',a3:'نعم. أثناء مكالمة التأكيد يمكنك تغيير اللون (أزرق فاتح أو أحمر أو رمادي) أو الكمية.',
 q4:'كيف أتابع طلبي؟',a4:'بعد التأكيد نتصل بك لترتيب التوصيل. فريق الدعم متاح دائماً.',
 q5:'هل الساعة مناسبة كهدية؟',a5:'بالتأكيد. أسلوبها الراقي وتقديمها الأنيق يجعلانها هدية مثالية.',
 fin_title:'جاهز لتتألق بأسلوبك؟',
 fin_sub:'عرض خاص: 6 900 دج 4 900 دج — استفد منه الآن.',
 fin_note:'الدفع عند الاستلام · التوصيل لجميع أنحاء الجزائر',
 cta_main3:'اطلب الآن',cta_main4:'اطلب الآن',
 foot_about:'متجر إلكتروني جزائري متخصص في الساعات الراقية. الدفع عند الاستلام في جميع أنحاء الجزائر.',
 foot_rights:'جميع الحقوق محفوظة.',
 alt_hero:'ساعة رجالية فاخرة أزور، سوار معدني فضي وقرص أزرق فاتح',
 col_blue:'أزرق فاتح',col_red:'أحمر',col_grey:'رمادي'
}
};

/* Messages du formulaire / رسائل الاستمارة */
Object.assign(I18N.fr,{
  err_fields:'Veuillez corriger les champs en rouge.',
  err_phone:'Numéro de téléphone invalide (ex : 0555 12 34 56).',
  err_send:"Envoi impossible. Vérifiez votre connexion et réessayez.",
  sending:'Envoi en cours…'
});
Object.assign(I18N.ar,{
  err_fields:'يرجى تصحيح الحقول المظللة بالأحمر.',
  err_phone:'رقم الهاتف غير صحيح (مثال: 0555 12 34 56).',
  err_send:'تعذّر الإرسال. تحقق من اتصالك وأعد المحاولة.',
  sending:'جارٍ الإرسال…'
});

/* ==================================================================
   COMMANDES — où envoyer les commandes ? / أين تُرسل الطلبات؟
   Mettez ici l'URL de votre Google Apps Script / webhook (POST JSON).
   Si null : le site fonctionne en mode démo (rien n'est envoyé).
================================================================== */
const ORDER_ENDPOINT = null;

/* ==================================================================
   WILAYAS (58)
================================================================== */
const WILAYAS=[
['Adrar','أدرار'],['Chlef','الشلف'],['Laghouat','الأغواط'],['Oum El Bouaghi','أم البواقي'],['Batna','باتنة'],
['Béjaïa','بجاية'],['Biskra','بسكرة'],['Béchar','بشار'],['Blida','البليدة'],['Bouira','البويرة'],
['Tamanrasset','تمنراست'],['Tébessa','تبسة'],['Tlemcen','تلمسان'],['Tiaret','تيارت'],['Tizi Ouzou','تيزي وزو'],
['Alger','الجزائر'],['Djelfa','الجلفة'],['Jijel','جيجل'],['Sétif','سطيف'],['Saïda','سعيدة'],
['Skikda','سكيكدة'],['Sidi Bel Abbès','سيدي بلعباس'],['Annaba','عنابة'],['Guelma','قالمة'],['Constantine','قسنطينة'],
['Médéa','المدية'],['Mostaganem','مستغانم'],["M'Sila",'المسيلة'],['Mascara','معسكر'],['Ouargla','ورقلة'],
['Oran','وهران'],['El Bayadh','البيض'],['Illizi','إليزي'],['Bordj Bou Arréridj','برج بوعريريج'],['Boumerdès','بومرداس'],
['El Tarf','الطارف'],['Tindouf','تندوف'],['Tissemsilt','تيسمسيلت'],['El Oued','الوادي'],['Khenchela','خنشلة'],
['Souk Ahras','سوق أهراس'],['Tipaza','تيبازة'],['Mila','ميلة'],['Aïn Defla','عين الدفلى'],['Naâma','النعامة'],
['Aïn Témouchent','عين تموشنت'],['Ghardaïa','غرداية'],['Relizane','غليزان'],['Timimoun','تيميمون'],['Bordj Badji Mokhtar','برج باجي مختار'],
['Ouled Djellal','أولاد جلال'],['Béni Abbès','بني عباس'],['In Salah','عين صالح'],['In Guezzam','عين قزام'],['Touggourt','تقرت'],
['Djanet','جانت'],["El M'Ghair",'المغير'],['El Menia','المنيعة']
];

/* ==================================================================
   ÉTAT + OUTILS
================================================================== */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const state = {lang:'fr', color:'blue', shot:'hero', qty:1};
const t = k => { const v=I18N[state.lang] && I18N[state.lang][k]; return v!=null ? v : I18N.fr[k]; };
const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const cur = () => state.lang==='ar' ? 'دج' : CONFIG.currency;
const money = n => fmt(n)+' '+cur();

/* ==================================================================
   IMAGES — photos .webp, avec visuel SVG de secours si un fichier manque
================================================================== */
const FALLBACK = {
  hero:     d=>{const p=watchParts(d);return wrap(p.defs+p.body,'0 0 400 640',400,640);},
  angle:    d=>sceneImg(d),
  dial:     d=>studioZoom(d,82,212,236,236),
  bracelet: d=>studioZoom(d,110,440,180,180),
  wrist:    d=>wristImg(d),
  scene:    d=>sceneImg(d)
};
function setImg(img, key, color=state.color){
  if(!img) return;
  img.onerror = ()=>{
    img.onerror = null;
    try{ img.src = dataURI(FALLBACK[key](DIALS[color])); }catch(e){ console.warn('Image introuvable :', IMAGES[color][key]); }
  };
  img.src = IMAGES[color][key];
}

const THUMB_KEYS = ['hero','angle','dial','wrist'];

function buildThumbs(){
  const box=$('#thumbs'); if(!box) return;
  box.innerHTML='';
  THUMB_KEYS.forEach(k=>{
    const b=document.createElement('button');
    b.type='button'; b.dataset.shot=k; b.setAttribute('aria-label',k);
    if(k===state.shot) b.classList.add('on');
    const im=document.createElement('img'); im.alt=''; im.loading='lazy'; im.decoding='async';
    b.appendChild(im); box.appendChild(b);
  });
}

function applyImages(){
  setImg($('#hero-img'),'hero');
  setImg($('#gal-main'),state.shot);
  setImg($('#sum-img'),'hero');
  $$('[data-shot]').forEach(el=>{
    if(el.tagName==='IMG'){ el.loading='lazy'; el.decoding='async'; setImg(el,el.dataset.shot); }
  });
  $$('#thumbs button').forEach(b=>{
    setImg($('img',b), b.dataset.shot);
    b.classList.toggle('on', b.dataset.shot===state.shot);
  });
}

/* ==================================================================
   COULEUR
================================================================== */
function applyColor(c){
  state.color=c;
  $$('.swatch[data-color]').forEach(s=>s.classList.toggle('on', s.dataset.color===c));
  const name=t('col_'+c);
  ['#color-name','#sum-color','#form-color-name'].forEach(id=>{const el=$(id); if(el) el.textContent=name;});
  applyImages();
}

/* ==================================================================
   PRIX / QUANTITÉ
================================================================== */
function renderPrices(){
  $$('[data-i18n="price_now"],[data-i18n="price_now2"]').forEach(el=>el.textContent=money(CONFIG.price));
  $$('[data-i18n="price_old"],[data-i18n="price_old2"]').forEach(el=>el.textContent=money(CONFIG.oldPrice));
  const sb=$('.sticky .p b'), ss=$('.sticky .p s');
  if(sb) sb.textContent=money(CONFIG.price);
  if(ss) ss.textContent=money(CONFIG.oldPrice);
  const tot=$('#sum-total'); if(tot) tot.textContent=money(CONFIG.price*state.qty);
  const q=$('#qty'); if(q) q.textContent=state.qty;
}

/* ==================================================================
   LANGUE FR / AR
================================================================== */
function buildWilayas(){
  const sel=$('#f-wilaya'); if(!sel) return;
  const keep=sel.value;
  const first=sel.options[0];
  sel.innerHTML=''; sel.appendChild(first);
  WILAYAS.forEach((w,i)=>{
    const o=document.createElement('option');
    const n=String(i+1).padStart(2,'0');
    o.value=n; o.textContent=n+' - '+(state.lang==='ar'?w[1]:w[0]);
    sel.appendChild(o);
  });
  sel.value=keep;
}

function applyLang(l){
  state.lang=l;
  const root=document.documentElement;
  root.lang=l; root.dir = l==='ar' ? 'rtl' : 'ltr';

  $$('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n, v=t(k);
    if(v==null || k==='price_now2' || k==='price_old2') return;
    if(k==='fin_sub'){
      const m=String(v).match(/^([^\d]*)\d[\d\s]*\s*(?:DA|دج)\s+\d[\d\s]*\s*(?:DA|دج)([\s\S]*)$/);
      if(m){ el.innerHTML=m[1]+'<s>'+money(CONFIG.oldPrice)+'</s> <b style="color:var(--acc)">'+money(CONFIG.price)+'</b>'+m[2]; }
      else el.textContent=v;
      return;
    }
    el.textContent=v;
  });
  $$('[data-i18n-ph]').forEach(el=>{ const v=t(el.dataset.i18nPh); if(v!=null) el.placeholder=v; });

  const hi=$('#hero-img'); if(hi) hi.alt=t('alt_hero');
  $('#btn-fr')?.classList.toggle('on',l==='fr');
  $('#btn-ar')?.classList.toggle('on',l==='ar');

  buildWilayas();
  renderPrices();
  const name=t('col_'+state.color);
  ['#color-name','#sum-color','#form-color-name'].forEach(id=>{const el=$(id); if(el) el.textContent=name;});
  try{ localStorage.setItem('azur_lang',l); }catch(e){}
}

/* ==================================================================
   FORMULAIRE
================================================================== */
const form=$('#order-form');
function showMsg(text){
  let m=$('#form-msg');
  if(!m){
    m=document.createElement('p'); m.id='form-msg'; m.setAttribute('role','alert');
    m.style.cssText='color:#e0606d;font-size:.9rem;margin:12px 0 0';
    $('.form-foot',form).appendChild(m);
  }
  m.textContent=text||'';
}
function validate(){
  const g=id=>$(id).value.trim();
  const phone=g('#f-phone').replace(/[\s.\-()]/g,'');
  const phoneOk=/^(?:\+213|00213|0)[567]\d{8}$/.test(phone);
  const checks=[
    ['#f-name',  g('#f-name').length>=3],
    ['#f-phone', phoneOk],
    ['#f-wilaya',!!g('#f-wilaya')],
    ['#f-commune',g('#f-commune').length>=2],
    ['#f-address',g('#f-address').length>=6]
  ];
  let first=null;
  checks.forEach(([id,ok])=>{ $(id).classList.toggle('err',!ok); if(!ok&&!first) first=id; });
  return {ok:!first, first, phoneOk, phone};
}

if(form){
  form.addEventListener('input',e=>e.target.classList.remove('err'));
  form.addEventListener('change',e=>e.target.classList.remove('err'));
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    showMsg('');
    const v=validate();
    if(!v.ok){
      showMsg(v.first==='#f-phone' && !v.phoneOk && $('#f-phone').value.trim() ? t('err_phone') : t('err_fields'));
      $(v.first).focus();
      return;
    }
    const wi=parseInt($('#f-wilaya').value,10)-1;
    const payload={
      name:$('#f-name').value.trim(),
      phone:v.phone,
      wilaya:WILAYAS[wi] ? WILAYAS[wi][0] : '',
      commune:$('#f-commune').value.trim(),
      address:$('#f-address').value.trim(),
      color:state.color,
      qty:state.qty,
      unitPrice:CONFIG.price,
      total:CONFIG.price*state.qty,
      lang:state.lang,
      date:new Date().toISOString()
    };
    const btn=$('button[type=submit]',form), label=btn.textContent;
    btn.disabled=true; btn.textContent=t('sending');
    try{
      if(ORDER_ENDPOINT){
        const res=await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
        if(!res.ok) throw new Error('HTTP '+res.status);
      }else{
        console.warn('ORDER_ENDPOINT non configuré : commande NON envoyée (mode démo).',payload);
      }
      $('#form-fields').style.display='none';
      $('#form-ok').style.display='block';
      $('#form-ok').scrollIntoView({behavior:'smooth',block:'center'});
    }catch(err){
      console.error(err);
      showMsg(t('err_send'));
    }finally{
      btn.disabled=false; btn.textContent=label;
    }
  });
}

/* ==================================================================
   ÉVÉNEMENTS
================================================================== */
document.addEventListener('click',e=>{
  const sw=e.target.closest('.swatch[data-color]');
  if(sw){ applyColor(sw.dataset.color); return; }
  const th=e.target.closest('#thumbs button');
  if(th){ state.shot=th.dataset.shot; setImg($('#gal-main'),state.shot); $$('#thumbs button').forEach(b=>b.classList.toggle('on',b===th)); }
});
$('#q-minus')?.addEventListener('click',()=>{ state.qty=Math.max(1,state.qty-1); renderPrices(); });
$('#q-plus') ?.addEventListener('click',()=>{ state.qty=Math.min(10,state.qty+1); renderPrices(); });
$('#btn-fr')?.addEventListener('click',()=>applyLang('fr'));
$('#btn-ar')?.addEventListener('click',()=>applyLang('ar'));

/* En-tête, animations d'apparition, CTA mobile */
const hdr=$('#hdr');
const onScroll=()=>hdr&&hdr.classList.toggle('scrolled',window.scrollY>20);
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} }),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  $$('.rv').forEach(el=>io.observe(el));
  const ord=$('#commander');
  if(ord) new IntersectionObserver(es=>es.forEach(en=>document.body.classList.toggle('order-visible',en.isIntersecting)),{threshold:.1}).observe(ord);
}else{
  $$('.rv').forEach(el=>el.classList.add('in'));
}

/* ==================================================================
   DÉMARRAGE
================================================================== */
const yr=$('#yr'); if(yr) yr.textContent=new Date().getFullYear();
buildThumbs();
let startLang='fr'; try{ startLang=localStorage.getItem('azur_lang')==='ar'?'ar':'fr'; }catch(e){}
applyLang(startLang);
applyColor('blue');

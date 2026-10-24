const $p=()=>{};var Yu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Gp=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Qh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let _=(c&15)<<2|h>>6,R=h&63;u||(R=64,o||(_=64)),n.push(t[f],t[p],t[_],t[R])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Wh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Gp(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const p=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new Kp;const _=i<<2|c>>4;if(n.push(_),h!==64){const R=c<<4&240|h>>2;if(n.push(R),p!==64){const V=h<<6&192|p;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Kp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hp=function(r){const e=Wh(r);return Qh.encodeByteArray(e,!0)},Ei=function(r){return Hp(r).replace(/\./g,"")},Jh=function(r){try{return Qh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp=()=>Yh().__FIREBASE_DEFAULTS__,Qp=()=>{if(typeof process>"u"||typeof Yu>"u")return;const r=Yu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Jp=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Jh(r[1]);return e&&JSON.parse(e)},Hi=()=>{try{return $p()||Wp()||Qp()||Jp()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Xh=r=>{var e,t;return(t=(e=Hi())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},Yp=r=>{const e=Xh(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Zh=()=>{var r;return(r=Hi())==null?void 0:r.config},ed=r=>{var e;return(e=Hi())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function qa(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Ei(JSON.stringify(t)),Ei(JSON.stringify(o)),""].join(".")}const Hr={};function eg(){const r={prod:[],emulator:[]};for(const e of Object.keys(Hr))Hr[e]?r.emulator.push(e):r.prod.push(e);return r}function tg(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let Xu=!1;function td(r,e){if(typeof window>"u"||typeof document>"u"||!Sn(window.location.host)||Hr[r]===e||Hr[r]||Xu)return;Hr[r]=e;function t(_){return`__firebase__banner__${_}`}const n="__firebase__banner",i=eg().prod.length>0;function o(){const _=document.getElementById(n);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,R){_.setAttribute("width","24"),_.setAttribute("id",R),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Xu=!0,o()},_}function f(_,R){_.setAttribute("id",R),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=tg(n),R=t("text"),V=document.getElementById(R)||document.createElement("span"),x=t("learnmore"),O=document.getElementById(x)||document.createElement("a"),$=t("preprendIcon"),B=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const q=_.element;c(q),f(O,x);const ne=h();u(B,$),q.append(B,V,O,ne),document.body.appendChild(q)}i?(V.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,V.innerText="Preview backend running in this workspace."),V.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ng(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function nd(){var e;const r=(e=Hi())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function rg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function ig(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function og(){const r=ge();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function rd(){return!nd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function sd(){return!nd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function id(){try{return typeof indexedDB=="object"}catch{return!1}}function ag(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg="FirebaseError";class ht extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=cg,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ts.prototype.create)}}class Ts{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?ug(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new ht(s,c,n)}}function ug(r,e){return r.replace(lg,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const lg=/\{\$([^}]+)}/g;function hg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Mt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Zu(i)&&Zu(o)){if(!Mt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Zu(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function dg(r,e){const t=new fg(r,e);return t.subscribe.bind(t)}class fg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");mg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Go),s.error===void 0&&(s.error=Go),s.complete===void 0&&(s.complete=Go);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function mg(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Go(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(r){return r&&r._delegate?r._delegate:r}class mn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Xp;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_g(e))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Xt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xt){return this.instances.has(e)}getOptions(e=Xt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:gg(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Xt){return this.component?this.component.multipleInstances?e:Xt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gg(r){return r===Xt?void 0:r}function _g(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new pg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const Ig={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Eg=H.INFO,Tg={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},wg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Tg[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ja{constructor(e){this.name=e,this._logLevel=Eg,this._logHandler=wg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ig[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const vg=(r,e)=>e.some(t=>r instanceof t);let el,tl;function Ag(){return el||(el=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sg(){return tl||(tl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const od=new WeakMap,aa=new WeakMap,ad=new WeakMap,Ko=new WeakMap,za=new WeakMap;function bg(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Vt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&od.set(t,r)}).catch(()=>{}),za.set(e,r),e}function Rg(r){if(aa.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});aa.set(r,e)}let ca={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return aa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||ad.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Vt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Pg(r){ca=r(ca)}function Cg(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Ho(this),e,...t);return ad.set(n,e.sort?e.sort():[e]),Vt(n)}:Sg().includes(r)?function(...e){return r.apply(Ho(this),e),Vt(od.get(this))}:function(...e){return Vt(r.apply(Ho(this),e))}}function Vg(r){return typeof r=="function"?Cg(r):(r instanceof IDBTransaction&&Rg(r),vg(r,Ag())?new Proxy(r,ca):r)}function Vt(r){if(r instanceof IDBRequest)return bg(r);if(Ko.has(r))return Ko.get(r);const e=Vg(r);return e!==r&&(Ko.set(r,e),za.set(e,r)),e}const Ho=r=>za.get(r);function Dg(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=Vt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Vt(o.result),u.oldVersion,u.newVersion,Vt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const kg=["get","getKey","getAll","getAllKeys","count"],Ng=["put","add","delete","clear"],Wo=new Map;function nl(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Wo.get(e))return Wo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Ng.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||kg.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return Wo.set(e,i),i}Pg(r=>({...r,get:(e,t,n)=>nl(e,t)||r.get(e,t,n),has:(e,t)=>!!nl(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Og(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Og(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ua="@firebase/app",rl="0.14.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=new ja("@firebase/app"),Mg="@firebase/app-compat",Lg="@firebase/analytics-compat",Fg="@firebase/analytics",Ug="@firebase/app-check-compat",Bg="@firebase/app-check",qg="@firebase/auth",jg="@firebase/auth-compat",zg="@firebase/database",$g="@firebase/data-connect",Gg="@firebase/database-compat",Kg="@firebase/functions",Hg="@firebase/functions-compat",Wg="@firebase/installations",Qg="@firebase/installations-compat",Jg="@firebase/messaging",Yg="@firebase/messaging-compat",Xg="@firebase/performance",Zg="@firebase/performance-compat",e_="@firebase/remote-config",t_="@firebase/remote-config-compat",n_="@firebase/storage",r_="@firebase/storage-compat",s_="@firebase/firestore",i_="@firebase/ai",o_="@firebase/firestore-compat",a_="firebase",c_="12.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="[DEFAULT]",u_={[ua]:"fire-core",[Mg]:"fire-core-compat",[Fg]:"fire-analytics",[Lg]:"fire-analytics-compat",[Bg]:"fire-app-check",[Ug]:"fire-app-check-compat",[qg]:"fire-auth",[jg]:"fire-auth-compat",[zg]:"fire-rtdb",[$g]:"fire-data-connect",[Gg]:"fire-rtdb-compat",[Kg]:"fire-fn",[Hg]:"fire-fn-compat",[Wg]:"fire-iid",[Qg]:"fire-iid-compat",[Jg]:"fire-fcm",[Yg]:"fire-fcm-compat",[Xg]:"fire-perf",[Zg]:"fire-perf-compat",[e_]:"fire-rc",[t_]:"fire-rc-compat",[n_]:"fire-gcs",[r_]:"fire-gcs-compat",[s_]:"fire-fst",[o_]:"fire-fst-compat",[i_]:"fire-vertex","fire-js":"fire-js",[a_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new Map,l_=new Map,ha=new Map;function sl(r,e){try{r.container.addComponent(e)}catch(t){at.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Hn(r){const e=r.name;if(ha.has(e))return at.debug(`There were multiple attempts to register component ${e}.`),!1;ha.set(e,r);for(const t of Ti.values())sl(t,r);for(const t of l_.values())sl(t,r);return!0}function Wi(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function je(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dt=new Ts("app","Firebase",h_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=c_;function f_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:la,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Dt.create("bad-app-name",{appName:String(s)});if(t||(t=Zh()),!t)throw Dt.create("no-options");const i=Ti.get(s);if(i){if(Mt(t,i.options)&&Mt(n,i.config))return i;throw Dt.create("duplicate-app",{appName:s})}const o=new yg(s);for(const u of ha.values())o.addComponent(u);const c=new d_(t,n,o);return Ti.set(s,c),c}function cd(r=la){const e=Ti.get(r);if(!e&&r===la&&Zh())return f_();if(!e)throw Dt.create("no-app",{appName:r});return e}function kt(r,e,t){let n=u_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),at.warn(o.join(" "));return}Hn(new mn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_="firebase-heartbeat-database",p_=1,ss="firebase-heartbeat-store";let Qo=null;function ud(){return Qo||(Qo=Dg(m_,p_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ss)}catch(t){console.warn(t)}}}}).catch(r=>{throw Dt.create("idb-open",{originalErrorMessage:r.message})})),Qo}async function g_(r){try{const t=(await ud()).transaction(ss),n=await t.objectStore(ss).get(ld(r));return await t.done,n}catch(e){if(e instanceof ht)at.warn(e.message);else{const t=Dt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});at.warn(t.message)}}}async function il(r,e){try{const n=(await ud()).transaction(ss,"readwrite");await n.objectStore(ss).put(e,ld(r)),await n.done}catch(t){if(t instanceof ht)at.warn(t.message);else{const n=Dt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});at.warn(n.message)}}}function ld(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __=1024,y_=30;class I_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new T_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ol();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>y_){const o=w_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){at.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ol(),{heartbeatsToSend:n,unsentEntries:s}=E_(this._heartbeatsCache.heartbeats),i=Ei(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return at.warn(t),""}}}function ol(){return new Date().toISOString().substring(0,10)}function E_(r,e=__){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),al(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),al(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class T_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return id()?ag().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await g_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return il(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return il(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function al(r){return Ei(JSON.stringify({version:2,heartbeats:r})).length}function w_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v_(r){Hn(new mn("platform-logger",e=>new xg(e),"PRIVATE")),Hn(new mn("heartbeat",e=>new I_(e),"PRIVATE")),kt(ua,rl,r),kt(ua,rl,"esm2020"),kt("fire-js","")}v_("");var cl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nt,hd;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function I(){}I.prototype=g.prototype,E.F=g.prototype,E.prototype=new I,E.prototype.constructor=E,E.D=function(w,T,S){for(var y=Array(arguments.length-2),Ve=2;Ve<arguments.length;Ve++)y[Ve-2]=arguments[Ve];return g.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,g,I){I||(I=0);const w=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)w[T]=g.charCodeAt(I++)|g.charCodeAt(I++)<<8|g.charCodeAt(I++)<<16|g.charCodeAt(I++)<<24;else for(T=0;T<16;++T)w[T]=g[I++]|g[I++]<<8|g[I++]<<16|g[I++]<<24;g=E.g[0],I=E.g[1],T=E.g[2];let S=E.g[3],y;y=g+(S^I&(T^S))+w[0]+3614090360&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(T^g&(I^T))+w[1]+3905402710&4294967295,S=g+(y<<12&4294967295|y>>>20),y=T+(I^S&(g^I))+w[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(g^T&(S^g))+w[3]+3250441966&4294967295,I=T+(y<<22&4294967295|y>>>10),y=g+(S^I&(T^S))+w[4]+4118548399&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(T^g&(I^T))+w[5]+1200080426&4294967295,S=g+(y<<12&4294967295|y>>>20),y=T+(I^S&(g^I))+w[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(g^T&(S^g))+w[7]+4249261313&4294967295,I=T+(y<<22&4294967295|y>>>10),y=g+(S^I&(T^S))+w[8]+1770035416&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(T^g&(I^T))+w[9]+2336552879&4294967295,S=g+(y<<12&4294967295|y>>>20),y=T+(I^S&(g^I))+w[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(g^T&(S^g))+w[11]+2304563134&4294967295,I=T+(y<<22&4294967295|y>>>10),y=g+(S^I&(T^S))+w[12]+1804603682&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(T^g&(I^T))+w[13]+4254626195&4294967295,S=g+(y<<12&4294967295|y>>>20),y=T+(I^S&(g^I))+w[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(g^T&(S^g))+w[15]+1236535329&4294967295,I=T+(y<<22&4294967295|y>>>10),y=g+(T^S&(I^T))+w[1]+4129170786&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(g^I))+w[6]+3225465664&4294967295,S=g+(y<<9&4294967295|y>>>23),y=T+(g^I&(S^g))+w[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(T^S))+w[0]+3921069994&4294967295,I=T+(y<<20&4294967295|y>>>12),y=g+(T^S&(I^T))+w[5]+3593408605&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(g^I))+w[10]+38016083&4294967295,S=g+(y<<9&4294967295|y>>>23),y=T+(g^I&(S^g))+w[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(T^S))+w[4]+3889429448&4294967295,I=T+(y<<20&4294967295|y>>>12),y=g+(T^S&(I^T))+w[9]+568446438&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(g^I))+w[14]+3275163606&4294967295,S=g+(y<<9&4294967295|y>>>23),y=T+(g^I&(S^g))+w[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(T^S))+w[8]+1163531501&4294967295,I=T+(y<<20&4294967295|y>>>12),y=g+(T^S&(I^T))+w[13]+2850285829&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(g^I))+w[2]+4243563512&4294967295,S=g+(y<<9&4294967295|y>>>23),y=T+(g^I&(S^g))+w[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(T^S))+w[12]+2368359562&4294967295,I=T+(y<<20&4294967295|y>>>12),y=g+(I^T^S)+w[5]+4294588738&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^T)+w[8]+2272392833&4294967295,S=g+(y<<11&4294967295|y>>>21),y=T+(S^g^I)+w[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^g)+w[14]+4259657740&4294967295,I=T+(y<<23&4294967295|y>>>9),y=g+(I^T^S)+w[1]+2763975236&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^T)+w[4]+1272893353&4294967295,S=g+(y<<11&4294967295|y>>>21),y=T+(S^g^I)+w[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^g)+w[10]+3200236656&4294967295,I=T+(y<<23&4294967295|y>>>9),y=g+(I^T^S)+w[13]+681279174&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^T)+w[0]+3936430074&4294967295,S=g+(y<<11&4294967295|y>>>21),y=T+(S^g^I)+w[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^g)+w[6]+76029189&4294967295,I=T+(y<<23&4294967295|y>>>9),y=g+(I^T^S)+w[9]+3654602809&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^T)+w[12]+3873151461&4294967295,S=g+(y<<11&4294967295|y>>>21),y=T+(S^g^I)+w[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^g)+w[2]+3299628645&4294967295,I=T+(y<<23&4294967295|y>>>9),y=g+(T^(I|~S))+w[0]+4096336452&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~T))+w[7]+1126891415&4294967295,S=g+(y<<10&4294967295|y>>>22),y=T+(g^(S|~I))+w[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~g))+w[5]+4237533241&4294967295,I=T+(y<<21&4294967295|y>>>11),y=g+(T^(I|~S))+w[12]+1700485571&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~T))+w[3]+2399980690&4294967295,S=g+(y<<10&4294967295|y>>>22),y=T+(g^(S|~I))+w[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~g))+w[1]+2240044497&4294967295,I=T+(y<<21&4294967295|y>>>11),y=g+(T^(I|~S))+w[8]+1873313359&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~T))+w[15]+4264355552&4294967295,S=g+(y<<10&4294967295|y>>>22),y=T+(g^(S|~I))+w[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~g))+w[13]+1309151649&4294967295,I=T+(y<<21&4294967295|y>>>11),y=g+(T^(I|~S))+w[4]+4149444226&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~T))+w[11]+3174756917&4294967295,S=g+(y<<10&4294967295|y>>>22),y=T+(g^(S|~I))+w[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~g))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+S&4294967295}n.prototype.v=function(E,g){g===void 0&&(g=E.length);const I=g-this.blockSize,w=this.C;let T=this.h,S=0;for(;S<g;){if(T==0)for(;S<=I;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<g;)if(w[T++]=E.charCodeAt(S++),T==this.blockSize){s(this,w),T=0;break}}else for(;S<g;)if(w[T++]=E[S++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=g},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var I=E.length-8;I<E.length;++I)E[I]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,I=0;I<4;++I)for(let w=0;w<32;w+=8)E[g++]=this.g[I]>>>w&255;return E};function i(E,g){var I=c;return Object.prototype.hasOwnProperty.call(I,E)?I[E]:I[E]=g(E)}function o(E,g){this.h=g;const I=[];let w=!0;for(let T=E.length-1;T>=0;T--){const S=E[T]|0;w&&S==g||(I[T]=S,w=!1)}this.g=I}var c={};function u(E){return-128<=E&&E<128?i(E,function(g){return new o([g|0],g<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return O(h(-E));const g=[];let I=1;for(let w=0;E>=I;w++)g[w]=E/I|0,I*=4294967296;return new o(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return O(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(g,8));let w=p;for(let S=0;S<E.length;S+=8){var T=Math.min(8,E.length-S);const y=parseInt(E.substring(S,S+T),g);T<8?(T=h(Math.pow(g,T)),w=w.j(T).add(h(y))):(w=w.j(I),w=w.add(h(y)))}return w}var p=u(0),_=u(1),R=u(16777216);r=o.prototype,r.m=function(){if(x(this))return-O(this).m();let E=0,g=1;for(let I=0;I<this.g.length;I++){const w=this.i(I);E+=(w>=0?w:4294967296+w)*g,g*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(x(this))return"-"+O(this).toString(E);const g=h(Math.pow(E,6));var I=this;let w="";for(;;){const T=ne(I,g).g;I=$(I,T.j(g));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(E);if(I=T,V(I))return S+w;for(;S.length<6;)S="0"+S;w=S+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=$(this,E),x(E)?-1:V(E)?0:1};function O(E){const g=E.g.length,I=[];for(let w=0;w<g;w++)I[w]=~E.g[w];return new o(I,~E.h).add(_)}r.abs=function(){return x(this)?O(this):this},r.add=function(E){const g=Math.max(this.g.length,E.g.length),I=[];let w=0;for(let T=0;T<=g;T++){let S=w+(this.i(T)&65535)+(E.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,S&=65535,y&=65535,I[T]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function $(E,g){return E.add(O(g))}r.j=function(E){if(V(this)||V(E))return p;if(x(this))return x(E)?O(this).j(O(E)):O(O(this).j(E));if(x(E))return O(this.j(O(E)));if(this.l(R)<0&&E.l(R)<0)return h(this.m()*E.m());const g=this.g.length+E.g.length,I=[];for(var w=0;w<2*g;w++)I[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const S=this.i(w)>>>16,y=this.i(w)&65535,Ve=E.i(T)>>>16,Gt=E.i(T)&65535;I[2*w+2*T]+=y*Gt,B(I,2*w+2*T),I[2*w+2*T+1]+=S*Gt,B(I,2*w+2*T+1),I[2*w+2*T+1]+=y*Ve,B(I,2*w+2*T+1),I[2*w+2*T+2]+=S*Ve,B(I,2*w+2*T+2)}for(E=0;E<g;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=g;E<2*g;E++)I[E]=0;return new o(I,0)};function B(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function q(E,g){this.g=E,this.h=g}function ne(E,g){if(V(g))throw Error("division by zero");if(V(E))return new q(p,p);if(x(E))return g=ne(O(E),g),new q(O(g.g),O(g.h));if(x(g))return g=ne(E,O(g)),new q(O(g.g),g.h);if(E.g.length>30){if(x(E)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var I=_,w=g;w.l(E)<=0;)I=J(I),w=J(w);var T=Y(I,1),S=Y(w,1);for(w=Y(w,2),I=Y(I,2);!V(w);){var y=S.add(w);y.l(E)<=0&&(T=T.add(I),S=y),w=Y(w,1),I=Y(I,1)}return g=$(E,T.j(g)),new q(T,g)}for(T=p;E.l(g)>=0;){for(I=Math.max(1,Math.floor(E.m()/g.m())),w=Math.ceil(Math.log(I)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),S=h(I),y=S.j(g);x(y)||y.l(E)>0;)I-=w,S=h(I),y=S.j(g);V(S)&&(S=_),T=T.add(S),E=$(E,y)}return new q(T,E)}r.B=function(E){return ne(this,E).h},r.and=function(E){const g=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<g;w++)I[w]=this.i(w)&E.i(w);return new o(I,this.h&E.h)},r.or=function(E){const g=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<g;w++)I[w]=this.i(w)|E.i(w);return new o(I,this.h|E.h)},r.xor=function(E){const g=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<g;w++)I[w]=this.i(w)^E.i(w);return new o(I,this.h^E.h)};function J(E){const g=E.g.length+1,I=[];for(let w=0;w<g;w++)I[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(I,E.h)}function Y(E,g){const I=g>>5;g%=32;const w=E.g.length-I,T=[];for(let S=0;S<w;S++)T[S]=g>0?E.i(S+I)>>>g|E.i(S+I+1)<<32-g:E.i(S+I);return new o(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,hd=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Nt=o}).apply(typeof cl<"u"?cl:typeof self<"u"?self:typeof window<"u"?window:{});var Js=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dd,jr,fd,si,da,md,pd,gd;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Js=="object"&&Js];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var A=a[m];if(!(A in d))break e;d=d[A]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,A,b){for(var k=Array(arguments.length-2),G=2;G<arguments.length;G++)k[G-2]=arguments[G];return l.prototype[A].apply(m,k)}}var _=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function R(a){const l=a.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function V(a,l){for(let m=1;m<arguments.length;m++){const A=arguments[m];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=a.length||0;const b=A.length||0;a.length=d+b;for(let k=0;k<b;k++)a[d+k]=A[k]}else a.push(A)}}class x{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function O(a){o.setTimeout(()=>{throw a},0)}function $(){var a=E;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class B{constructor(){this.h=this.g=null}add(l,d){const m=q.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var q=new x(()=>new ne,a=>a.reset());class ne{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let J,Y=!1,E=new B,g=()=>{const a=Promise.resolve(void 0);J=()=>{a.then(I)}};function I(){for(var a;a=$();){try{a.h.call(a.g)}catch(d){O(d)}var l=q;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Y=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Ve(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p(Ve,T),Ve.prototype.init=function(a,l){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Ve.Z.h.call(this)},Ve.prototype.h=function(){Ve.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Gt="closure_listenable_"+(Math.random()*1e6|0),dp=0;function fp(a,l,d,m,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=A,this.key=++dp,this.da=this.fa=!1}function Os(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ms(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function mp(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Jc(a){const l={};for(const d in a)l[d]=a[d];return l}const Yc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Xc(a,l){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)a[d]=m[d];for(let b=0;b<Yc.length;b++)d=Yc[b],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function Ls(a){this.src=a,this.g={},this.h=0}Ls.prototype.add=function(a,l,d,m,A){const b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);const k=wo(a,l,m,A);return k>-1?(l=a[k],d||(l.fa=!1)):(l=new fp(l,this.src,b,!!m,A),l.fa=d,a.push(l)),l};function To(a,l){const d=l.type;if(d in a.g){var m=a.g[d],A=Array.prototype.indexOf.call(m,l,void 0),b;(b=A>=0)&&Array.prototype.splice.call(m,A,1),b&&(Os(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function wo(a,l,d,m){for(let A=0;A<a.length;++A){const b=a[A];if(!b.da&&b.listener==l&&b.capture==!!d&&b.ha==m)return A}return-1}var vo="closure_lm_"+(Math.random()*1e6|0),Ao={};function Zc(a,l,d,m,A){if(Array.isArray(l)){for(let b=0;b<l.length;b++)Zc(a,l[b],d,m,A);return null}return d=nu(d),a&&a[Gt]?a.J(l,d,c(m)?!!m.capture:!1,A):pp(a,l,d,!1,m,A)}function pp(a,l,d,m,A,b){if(!l)throw Error("Invalid event type");const k=c(A)?!!A.capture:!!A;let G=bo(a);if(G||(a[vo]=G=new Ls(a)),d=G.add(l,d,m,k,b),d.proxy)return d;if(m=gp(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)S||(A=k),A===void 0&&(A=!1),a.addEventListener(l.toString(),m,A);else if(a.attachEvent)a.attachEvent(tu(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function gp(){function a(d){return l.call(a.src,a.listener,d)}const l=_p;return a}function eu(a,l,d,m,A){if(Array.isArray(l))for(var b=0;b<l.length;b++)eu(a,l[b],d,m,A);else m=c(m)?!!m.capture:!!m,d=nu(d),a&&a[Gt]?(a=a.i,b=String(l).toString(),b in a.g&&(l=a.g[b],d=wo(l,d,m,A),d>-1&&(Os(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[b],a.h--)))):a&&(a=bo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=wo(l,d,m,A)),(d=a>-1?l[a]:null)&&So(d))}function So(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Gt])To(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(tu(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=bo(l))?(To(d,a),d.h==0&&(d.src=null,l[vo]=null)):Os(a)}}}function tu(a){return a in Ao?Ao[a]:Ao[a]="on"+a}function _p(a,l){if(a.da)a=!0;else{l=new Ve(l,this);const d=a.listener,m=a.ha||a.src;a.fa&&So(a),a=d.call(m,l)}return a}function bo(a){return a=a[vo],a instanceof Ls?a:null}var Ro="__closure_events_fn_"+(Math.random()*1e9>>>0);function nu(a){return typeof a=="function"?a:(a[Ro]||(a[Ro]=function(l){return a.handleEvent(l)}),a[Ro])}function we(){w.call(this),this.i=new Ls(this),this.M=this,this.G=null}p(we,w),we.prototype[Gt]=!0,we.prototype.removeEventListener=function(a,l,d,m){eu(this,a,l,d,m)};function be(a,l){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var A=l;l=new T(m,a),Xc(l,A)}A=!0;let b,k;if(d)for(k=d.length-1;k>=0;k--)b=l.g=d[k],A=Fs(b,m,!0,l)&&A;if(b=l.g=a,A=Fs(b,m,!0,l)&&A,A=Fs(b,m,!1,l)&&A,d)for(k=0;k<d.length;k++)b=l.g=d[k],A=Fs(b,m,!1,l)&&A}we.prototype.N=function(){if(we.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let m=0;m<d.length;m++)Os(d[m]);delete a.g[l],a.h--}}this.G=null},we.prototype.J=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},we.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Fs(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let b=0;b<l.length;++b){const k=l[b];if(k&&!k.da&&k.capture==d){const G=k.listener,pe=k.ha||k.src;k.fa&&To(a.i,k),A=G.call(pe,m)!==!1&&A}}return A&&!m.defaultPrevented}function yp(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function ru(a){a.g=yp(()=>{a.g=null,a.i&&(a.i=!1,ru(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Ip extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ru(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Er(a){w.call(this),this.h=a,this.g={}}p(Er,w);var su=[];function iu(a){Ms(a.g,function(l,d){this.g.hasOwnProperty(d)&&So(l)},a),a.g={}}Er.prototype.N=function(){Er.Z.N.call(this),iu(this)},Er.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Po=o.JSON.stringify,Ep=o.JSON.parse,Tp=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function ou(){}function au(){}var Tr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Co(){T.call(this,"d")}p(Co,T);function Vo(){T.call(this,"c")}p(Vo,T);var Kt={},cu=null;function Us(){return cu=cu||new we}Kt.Ia="serverreachability";function uu(a){T.call(this,Kt.Ia,a)}p(uu,T);function wr(a){const l=Us();be(l,new uu(l))}Kt.STAT_EVENT="statevent";function lu(a,l){T.call(this,Kt.STAT_EVENT,a),this.stat=l}p(lu,T);function Re(a){const l=Us();be(l,new lu(l,a))}Kt.Ja="timingevent";function hu(a,l){T.call(this,Kt.Ja,a),this.size=l}p(hu,T);function vr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Ar(){this.g=!0}Ar.prototype.ua=function(){this.g=!1};function wp(a,l,d,m,A,b){a.info(function(){if(a.g)if(b){var k="",G=b.split("&");for(let re=0;re<G.length;re++){var pe=G[re].split("=");if(pe.length>1){const ye=pe[0];pe=pe[1];const We=ye.split("_");k=We.length>=2&&We[1]=="type"?k+(ye+"="+pe+"&"):k+(ye+"=redacted&")}}}else k=null;else k=b;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+d+`
`+k})}function vp(a,l,d,m,A,b,k){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+d+`
`+b+" "+k})}function Pn(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Sp(a,d)+(m?" "+m:"")})}function Ap(a,l){a.info(function(){return"TIMEOUT: "+l})}Ar.prototype.info=function(){};function Sp(a,l){if(!a.g)return l;if(!l)return null;try{const b=JSON.parse(l);if(b){for(a=0;a<b.length;a++)if(Array.isArray(b[a])){var d=b[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let k=1;k<m.length;k++)m[k]=""}}}}return Po(b)}catch{return l}}var Bs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},du={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},fu;function Do(){}p(Do,ou),Do.prototype.g=function(){return new XMLHttpRequest},fu=new Do;function Sr(a){return encodeURIComponent(String(a))}function bp(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function mt(a,l,d,m){this.j=a,this.i=l,this.l=d,this.S=m||1,this.V=new Er(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new mu}function mu(){this.i=null,this.g="",this.h=!1}var pu={},ko={};function No(a,l,d){a.M=1,a.A=js(He(l)),a.u=d,a.R=!0,gu(a,null)}function gu(a,l){a.F=Date.now(),qs(a),a.B=He(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Cu(d.i,"t",m),a.C=0,d=a.j.L,a.h=new mu,a.g=Hu(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Ip(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,m=a.ba;var A="readystatechange";Array.isArray(A)||(A&&(su[0]=A.toString()),A=su);for(let b=0;b<A.length;b++){const k=Zc(d,A[b],m||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=a.J?Jc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),wr(),wp(a.i,a.v,a.B,a.l,a.S,a.u)}mt.prototype.ba=function(a){a=a.target;const l=this.O;l&&_t(a)==3?l.j():this.Y(a)},mt.prototype.Y=function(a){try{if(a==this.g)e:{const G=_t(this.g),pe=this.g.ya(),re=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||Mu(this.g)))){this.K||G!=4||pe==7||(pe==8||re<=0?wr(3):wr(2)),xo(this);var l=this.g.ca();this.X=l;var d=Rp(this);if(this.o=l==200,vp(this.i,this.v,this.B,this.l,this.S,G,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var b=m;break t}}b=null}if(a=b)Pn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Oo(this,a);else{this.o=!1,this.m=3,Re(12),Ht(this),br(this);break e}}if(this.R){a=!0;let ye;for(;!this.K&&this.C<d.length;)if(ye=Pp(this,d),ye==ko){G==4&&(this.m=4,Re(14),a=!1),Pn(this.i,this.l,null,"[Incomplete Response]");break}else if(ye==pu){this.m=4,Re(15),Pn(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Pn(this.i,this.l,ye,null),Oo(this,ye);if(_u(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||d.length!=0||this.h.h||(this.m=1,Re(16),a=!1),this.o=this.o&&a,!a)Pn(this.i,this.l,d,"[Invalid Chunked Response]"),Ht(this),br(this);else if(d.length>0&&!this.W){this.W=!0;var k=this.j;k.g==this&&k.aa&&!k.P&&(k.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),zo(k),k.P=!0,Re(11))}}else Pn(this.i,this.l,d,null),Oo(this,d);G==4&&Ht(this),this.o&&!this.K&&(G==4?zu(this.j,this):(this.o=!1,qs(this)))}else jp(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Re(12)):(this.m=0,Re(13)),Ht(this),br(this)}}}catch{}finally{}};function Rp(a){if(!_u(a))return a.g.la();const l=Mu(a.g);if(l==="")return"";let d="";const m=l.length,A=_t(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Ht(a),br(a),"";a.h.i=new o.TextDecoder}for(let b=0;b<m;b++)a.h.h=!0,d+=a.h.i.decode(l[b],{stream:!(A&&b==m-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function _u(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Pp(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?ko:(d=Number(l.substring(d,m)),isNaN(d)?pu:(m+=1,m+d>l.length?ko:(l=l.slice(m,m+d),a.C=m+d,l)))}mt.prototype.cancel=function(){this.K=!0,Ht(this)};function qs(a){a.T=Date.now()+a.H,yu(a,a.H)}function yu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=vr(h(a.aa,a),l)}function xo(a){a.D&&(o.clearTimeout(a.D),a.D=null)}mt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Ap(this.i,this.B),this.M!=2&&(wr(),Re(17)),Ht(this),this.m=2,br(this)):yu(this,this.T-a)};function br(a){a.j.I==0||a.K||zu(a.j,a)}function Ht(a){xo(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,iu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Oo(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Mo(d.h,a))){if(!a.L&&Mo(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Hs(d),Gs(d);else break e;jo(d),Re(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=vr(h(d.Va,d),6e3));Tu(d.h)<=1&&d.ta&&(d.ta=void 0)}else Qt(d,11)}else if((a.L||d.g==a)&&Hs(d),!y(l))for(A=d.Ba.g.parse(l),l=0;l<A.length;l++){let re=A[l];const ye=re[0];if(!(ye<=d.K))if(d.K=ye,re=re[1],d.I==2)if(re[0]=="c"){d.M=re[1],d.ba=re[2];const We=re[3];We!=null&&(d.ka=We,d.j.info("VER="+d.ka));const Jt=re[4];Jt!=null&&(d.za=Jt,d.j.info("SVER="+d.za));const yt=re[5];yt!=null&&typeof yt=="number"&&yt>0&&(m=1.5*yt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const It=a.g;if(It){const Qs=It.g?It.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qs){var b=m.h;b.g||Qs.indexOf("spdy")==-1&&Qs.indexOf("quic")==-1&&Qs.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Lo(b,b.h),b.h=null))}if(m.G){const $o=It.g?It.g.getResponseHeader("X-HTTP-Session-Id"):null;$o&&(m.wa=$o,ie(m.J,m.G,$o))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var k=a;if(m.na=Ku(m,m.L?m.ba:null,m.W),k.L){wu(m.h,k);var G=k,pe=m.O;pe&&(G.H=pe),G.D&&(xo(G),qs(G)),m.g=k}else qu(m);d.i.length>0&&Ks(d)}else re[0]!="stop"&&re[0]!="close"||Qt(d,7);else d.I==3&&(re[0]=="stop"||re[0]=="close"?re[0]=="stop"?Qt(d,7):qo(d):re[0]!="noop"&&d.l&&d.l.qa(re),d.A=0)}}wr(4)}catch{}}var Cp=class{constructor(a,l){this.g=a,this.map=l}};function Iu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Eu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Tu(a){return a.h?1:a.g?a.g.size:0}function Mo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Lo(a,l){a.g?a.g.add(l):a.h=l}function wu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Iu.prototype.cancel=function(){if(this.i=vu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function vu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return R(a.i)}var Au=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vp(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let A,b=null;m>=0?(A=a[d].substring(0,m),b=a[d].substring(m+1)):A=a[d],l(A,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function pt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof pt?(this.l=a.l,Rr(this,a.j),this.o=a.o,this.g=a.g,Pr(this,a.u),this.h=a.h,Fo(this,Vu(a.i)),this.m=a.m):a&&(l=String(a).match(Au))?(this.l=!1,Rr(this,l[1]||"",!0),this.o=Cr(l[2]||""),this.g=Cr(l[3]||"",!0),Pr(this,l[4]),this.h=Cr(l[5]||"",!0),Fo(this,l[6]||"",!0),this.m=Cr(l[7]||"")):(this.l=!1,this.i=new Dr(null,this.l))}pt.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Vr(l,Su,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Vr(l,Su,!0),"@"),a.push(Sr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Vr(d,d.charAt(0)=="/"?Np:kp,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Vr(d,Op)),a.join("")},pt.prototype.resolve=function(a){const l=He(this);let d=!!a.j;d?Rr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var m=a.h;if(d)Pr(l,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=l.h.lastIndexOf("/");A!=-1&&(m=l.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const b=[];for(let k=0;k<A.length;){const G=A[k++];G=="."?m&&k==A.length&&b.push(""):G==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),m&&k==A.length&&b.push("")):(b.push(G),m=!0)}m=b.join("/")}else m=A}return d?l.h=m:d=a.i.toString()!=="",d?Fo(l,Vu(a.i)):d=!!a.m,d&&(l.m=a.m),l};function He(a){return new pt(a)}function Rr(a,l,d){a.j=d?Cr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Pr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Fo(a,l,d){l instanceof Dr?(a.i=l,Mp(a.i,a.l)):(d||(l=Vr(l,xp)),a.i=new Dr(l,a.l))}function ie(a,l,d){a.i.set(l,d)}function js(a){return ie(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Cr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Dp),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Dp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Su=/[#\/\?@]/g,kp=/[#\?:]/g,Np=/[#\?]/g,xp=/[#\?@]/g,Op=/#/g;function Dr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Wt(a){a.g||(a.g=new Map,a.h=0,a.i&&Vp(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Dr.prototype,r.add=function(a,l){Wt(this),this.i=null,a=Cn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function bu(a,l){Wt(a),l=Cn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Ru(a,l){return Wt(a),l=Cn(a,l),a.g.has(l)}r.forEach=function(a,l){Wt(this),this.g.forEach(function(d,m){d.forEach(function(A){a.call(l,A,m,this)},this)},this)};function Pu(a,l){Wt(a);let d=[];if(typeof l=="string")Ru(a,l)&&(d=d.concat(a.g.get(Cn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return Wt(this),this.i=null,a=Cn(this,a),Ru(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Pu(this,a),a.length>0?String(a[0]):l):l};function Cu(a,l,d){bu(a,l),d.length>0&&(a.i=null,a.g.set(Cn(a,l),R(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const A=Sr(d);d=Pu(this,d);for(let b=0;b<d.length;b++){let k=A;d[b]!==""&&(k+="="+Sr(d[b])),a.push(k)}}return this.i=a.join("&")};function Vu(a){const l=new Dr;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Cn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Mp(a,l){l&&!a.j&&(Wt(a),a.i=null,a.g.forEach(function(d,m){const A=m.toLowerCase();m!=A&&(bu(this,m),Cu(this,A,d))},a)),a.j=l}function Lp(a,l){const d=new Ar;if(o.Image){const m=new Image;m.onload=f(gt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(gt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(gt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(gt,d,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function Fp(a,l){const d=new Ar,m=new AbortController,A=setTimeout(()=>{m.abort(),gt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(b=>{clearTimeout(A),b.ok?gt(d,"TestPingServer: ok",!0,l):gt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),gt(d,"TestPingServer: error",!1,l)})}function gt(a,l,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Up(){this.g=new Tp}function Uo(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Uo,ou),Uo.prototype.g=function(){return new zs(this.i,this.h)};function zs(a,l){we.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(zs,we),r=zs.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Nr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,kr(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Nr(this)),this.g&&(this.readyState=3,Nr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Du(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Du(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?kr(this):Nr(this),this.readyState==3&&Du(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,kr(this))},r.Na=function(a){this.g&&(this.response=a,kr(this))},r.ga=function(){this.g&&kr(this)};function kr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Nr(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Nr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(zs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ku(a){let l="";return Ms(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Bo(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=ku(d),typeof a=="string"?d!=null&&Sr(d):ie(a,l,d))}function ce(a){we.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ce,we);var Bp=/^https?$/i,qp=["POST","PUT"];r=ce.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():fu.g(),this.g.onreadystatechange=_(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(b){Nu(this,b);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const b of m.keys())d.set(b,m.get(b));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),A=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(qp,l,void 0)>=0)||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,k]of d)this.g.setRequestHeader(b,k);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(b){Nu(this,b)}};function Nu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,xu(a),$s(a)}function xu(a){a.A||(a.A=!0,be(a,"complete"),be(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,be(this,"complete"),be(this,"abort"),$s(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$s(this,!0)),ce.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Ou(this):this.Xa())},r.Xa=function(){Ou(this)};function Ou(a){if(a.h&&typeof i<"u"){if(a.v&&_t(a)==4)setTimeout(a.Ca.bind(a),0);else if(be(a,"readystatechange"),_t(a)==4){a.h=!1;try{const b=a.ca();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=b===0){let k=String(a.D).match(Au)[1]||null;!k&&o.self&&o.self.location&&(k=o.self.location.protocol.slice(0,-1)),m=!Bp.test(k?k.toLowerCase():"")}d=m}if(d)be(a,"complete"),be(a,"success");else{a.o=6;try{var A=_t(a)>2?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.ca()+"]",xu(a)}}finally{$s(a)}}}}function $s(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||be(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function _t(a){return a.g?a.g.readyState:0}r.ca=function(){try{return _t(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Ep(l)}};function Mu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function jp(a){const l={};a=(a.g&&_t(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var d=bp(a[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=l[A]||[];l[A]=b,b.push(d)}mp(l,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function xr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Lu(a){this.za=0,this.i=[],this.j=new Ar,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=xr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=xr("baseRetryDelayMs",5e3,a),this.Za=xr("retryDelaySeedMs",1e4,a),this.Ta=xr("forwardChannelMaxRetries",2,a),this.va=xr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Iu(a&&a.concurrentRequestLimit),this.Ba=new Up,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Lu.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,m){Re(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Ku(this,null,this.W),Ks(this)};function qo(a){if(Fu(a),a.I==3){var l=a.V++,d=He(a.J);if(ie(d,"SID",a.M),ie(d,"RID",l),ie(d,"TYPE","terminate"),Or(a,d),l=new mt(a,a.j,l),l.M=2,l.A=js(He(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Hu(l.j,null),l.g.ea(l.A)),l.F=Date.now(),qs(l)}Gu(a)}function Gs(a){a.g&&(zo(a),a.g.cancel(),a.g=null)}function Fu(a){Gs(a),a.v&&(o.clearTimeout(a.v),a.v=null),Hs(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ks(a){if(!Eu(a.h)&&!a.m){a.m=!0;var l=a.Ea;J||g(),Y||(J(),Y=!0),E.add(l,a),a.D=0}}function zp(a,l){return Tu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=vr(h(a.Ea,a,l),$u(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const A=new mt(this,this.j,a);let b=this.o;if(this.U&&(b?(b=Jc(b),Xc(b,this.U)):b=this.U),this.u!==null||this.R||(A.J=b,b=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Bu(this,A,l),d=He(this.J),ie(d,"RID",a),ie(d,"CVER",22),this.G&&ie(d,"X-HTTP-Session-Id",this.G),Or(this,d),b&&(this.R?l="headers="+Sr(ku(b))+"&"+l:this.u&&Bo(d,this.u,b)),Lo(this.h,A),this.Ra&&ie(d,"TYPE","init"),this.S?(ie(d,"$req",l),ie(d,"SID","null"),A.U=!0,No(A,d,null)):No(A,d,l),this.I=2}}else this.I==3&&(a?Uu(this,a):this.i.length==0||Eu(this.h)||Uu(this))};function Uu(a,l){var d;l?d=l.l:d=a.V++;const m=He(a.J);ie(m,"SID",a.M),ie(m,"RID",d),ie(m,"AID",a.K),Or(a,m),a.u&&a.o&&Bo(m,a.u,a.o),d=new mt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Bu(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Lo(a.h,d),No(d,m,l)}function Or(a,l){a.H&&Ms(a.H,function(d,m){ie(l,m,d)}),a.l&&Ms({},function(d,m){ie(l,m,d)})}function Bu(a,l,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var A=a.i;let G=-1;for(;;){const pe=["count="+d];G==-1?d>0?(G=A[0].g,pe.push("ofs="+G)):G=0:pe.push("ofs="+G);let re=!0;for(let ye=0;ye<d;ye++){var b=A[ye].g;const We=A[ye].map;if(b-=G,b<0)G=Math.max(0,A[ye].g-100),re=!1;else try{b="req"+b+"_"||"";try{var k=We instanceof Map?We:Object.entries(We);for(const[Jt,yt]of k){let It=yt;c(yt)&&(It=Po(yt)),pe.push(b+Jt+"="+encodeURIComponent(It))}}catch(Jt){throw pe.push(b+"type="+encodeURIComponent("_badmap")),Jt}}catch{m&&m(We)}}if(re){k=pe.join("&");break e}}k=void 0}return a=a.i.splice(0,d),l.G=a,k}function qu(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;J||g(),Y||(J(),Y=!0),E.add(l,a),a.A=0}}function jo(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=vr(h(a.Da,a),$u(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,ju(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=vr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Re(10),Gs(this),ju(this))};function zo(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function ju(a){a.g=new mt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=He(a.na);ie(l,"RID","rpc"),ie(l,"SID",a.M),ie(l,"AID",a.K),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ie(l,"TO",a.ia),ie(l,"TYPE","xmlhttp"),Or(a,l),a.u&&a.o&&Bo(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=js(He(l)),d.u=null,d.R=!0,gu(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Gs(this),jo(this),Re(19))};function Hs(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function zu(a,l){var d=null;if(a.g==l){Hs(a),zo(a),a.g=null;var m=2}else if(Mo(a.h,l))d=l.G,wu(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var A=a.D;m=Us(),be(m,new hu(m,d)),Ks(a)}else qu(a);else if(A=l.m,A==3||A==0&&l.X>0||!(m==1&&zp(a,l)||m==2&&jo(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),A){case 1:Qt(a,5);break;case 4:Qt(a,10);break;case 3:Qt(a,6);break;default:Qt(a,2)}}}function $u(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function Qt(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),m=a.Ua;const A=!m;m=new pt(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Rr(m,"https"),js(m),A?Lp(m.toString(),d):Fp(m.toString(),d)}else Re(2);a.I=0,a.l&&a.l.pa(l),Gu(a),Fu(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function Gu(a){if(a.I=0,a.ja=[],a.l){const l=vu(a.h);(l.length!=0||a.i.length!=0)&&(V(a.ja,l),V(a.ja,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.oa()}}function Ku(a,l,d){var m=d instanceof pt?He(d):new pt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Pr(m,m.u);else{var A=o.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const b=new pt(null);m&&Rr(b,m),l&&(b.g=l),A&&Pr(b,A),d&&(b.h=d),m=b}return d=a.G,l=a.wa,d&&l&&ie(m,d,l),ie(m,"VER",a.ka),Or(a,m),m}function Hu(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ce(new Uo({ab:d})):new ce(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Wu(){}r=Wu.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Ws(){}Ws.prototype.g=function(a,l){return new xe(a,l)};function xe(a,l){we.call(this),this.g=new Lu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Vn(this)}p(xe,we),xe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},xe.prototype.close=function(){qo(this.g)},xe.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Po(a),a=d);l.i.push(new Cp(l.Ya++,a)),l.I==3&&Ks(l)},xe.prototype.N=function(){this.g.l=null,delete this.j,qo(this.g),delete this.g,xe.Z.N.call(this)};function Qu(a){Co.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(Qu,Co);function Ju(){Vo.call(this),this.status=1}p(Ju,Vo);function Vn(a){this.g=a}p(Vn,Wu),Vn.prototype.ra=function(){be(this.g,"a")},Vn.prototype.qa=function(a){be(this.g,new Qu(a))},Vn.prototype.pa=function(a){be(this.g,new Ju)},Vn.prototype.oa=function(){be(this.g,"b")},Ws.prototype.createWebChannel=Ws.prototype.g,xe.prototype.send=xe.prototype.o,xe.prototype.open=xe.prototype.m,xe.prototype.close=xe.prototype.close,gd=function(){return new Ws},pd=function(){return Us()},md=Kt,da={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Bs.NO_ERROR=0,Bs.TIMEOUT=8,Bs.HTTP_ERROR=6,si=Bs,du.COMPLETE="complete",fd=du,au.EventType=Tr,Tr.OPEN="a",Tr.CLOSE="b",Tr.ERROR="c",Tr.MESSAGE="d",we.prototype.listen=we.prototype.J,jr=au,ce.prototype.listenOnce=ce.prototype.K,ce.prototype.getLastError=ce.prototype.Ha,ce.prototype.getLastErrorCode=ce.prototype.ya,ce.prototype.getStatus=ce.prototype.ca,ce.prototype.getResponseJson=ce.prototype.La,ce.prototype.getResponseText=ce.prototype.la,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Fa,dd=ce}).apply(typeof Js<"u"?Js:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fr="12.9.0";function A_(r){fr=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=new ja("@firebase/firestore");function Ln(){return pn.logLevel}function C(r,...e){if(pn.logLevel<=H.DEBUG){const t=e.map($a);pn.debug(`Firestore (${fr}): ${r}`,...t)}}function le(r,...e){if(pn.logLevel<=H.ERROR){const t=e.map($a);pn.error(`Firestore (${fr}): ${r}`,...t)}}function gn(r,...e){if(pn.logLevel<=H.WARN){const t=e.map($a);pn.warn(`Firestore (${fr}): ${r}`,...t)}}function $a(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,_d(r,n,t)}function _d(r,e,t){let n=`FIRESTORE (${fr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw le(n),new Error(n)}function F(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||_d(e,s,n)}function L(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class S_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ee.UNAUTHENTICATED)))}shutdown(){}}class b_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class R_{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new Ze;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ze,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ze)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new yd(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new Ee(e)}}class P_{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class C_{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new P_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ee.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ul{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class V_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);const n=i=>{i.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ul(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ul(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=D_(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function fa(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Jo(s)===Jo(i)?z(s,i):Jo(s)?1:-1}return z(r.length,e.length)}const k_=55296,N_=57343;function Jo(r){const e=r.charCodeAt(0);return e>=k_&&e<=N_}function Wn(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function Id(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="__name__";class Qe{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&M(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Qe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qe?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Qe.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return z(e.length,t.length)}static compareSegments(e,t){const n=Qe.isNumericId(e),s=Qe.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Qe.extractNumericId(e).compare(Qe.extractNumericId(t)):fa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nt.fromString(e.substring(4,e.length-2))}}class X extends Qe{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const x_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends Qe{construct(e,t,n){return new ae(e,t,n)}static isValidIdentifier(e){return x_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ll}static keyField(){return new ae([ll])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.path=e}static fromPath(e){return new N(X.fromString(e))}static fromName(e){return new N(X.fromString(e).popFirst(5))}static empty(){return new N(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new N(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(r,e,t){if(!t)throw new D(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function O_(r,e,t,n){if(e===!0&&n===!0)throw new D(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function hl(r){if(!N.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function dl(r){if(N.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Td(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Qi(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function $e(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Qi(r);throw new D(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(r,e){const t={typeString:r};return e&&(t.value=e),t}function vs(r,e){if(!Td(r))throw new D(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new D(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=-62135596800,ml=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*ml);return new Z(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<fl)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ml}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(vs(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-fl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:me("string",Z._jsonSchemaVersion),seconds:me("number"),nanoseconds:me("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new Z(0,0))}static max(){return new U(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=-1;class wi{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function ma(r){return r.fields.find((e=>e.kind===2))}function Zt(r){return r.fields.filter((e=>e.kind!==2))}wi.UNKNOWN_ID=-1;class ii{constructor(e,t){this.fieldPath=e,this.kind=t}}class is{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new is(0,Fe.min())}}function wd(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=U.fromTimestamp(n===1e9?new Z(t+1,0):new Z(t,n));return new Fe(s,N.empty(),e)}function vd(r){return new Fe(r.readTime,r.key,Qn)}class Fe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Fe(U.min(),N.empty(),Qn)}static max(){return new Fe(U.max(),N.empty(),Qn)}}function Ka(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=N.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Sd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Ad)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):v.reject(t)}static resolve(e){return new v(((t,n)=>{t(e)}))}static reject(e){return new v(((t,n)=>{n(e)}))}static waitFor(e){return new v(((t,n)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next((s=>s?v.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new v(((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new v(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe="SimpleDb";class Ji{static open(e,t,n,s){try{return new Ji(t,e.transaction(s,n))}catch(i){throw new Wr(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ze,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Wr(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Ha(n.target.error);this.S.reject(new Wr(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(C(Oe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new L_(t)}}class xt{static delete(e){return C(Oe,"Removing database:",e),tn(Yh().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!id())return!1;if(xt.F())return!0;const e=ge(),t=xt.M(e),n=0<t&&t<10,s=bd(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,xt.M(ge())===12.2&&le("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(C(Oe,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new Wr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new D(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Wr(e,o))},s.onupgradeneeded=i=>{C(Oe,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{C(Oe,"Database upgrade to version "+this.version+" complete")}))}}))),this.K&&(this.db.onversionchange=t=>this.K(t)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Ji.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),v.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(C(Oe,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function bd(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class M_{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return tn(this.U.delete())}}class Wr extends D{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function jt(r){return r.name==="IndexedDbTransactionError"}class L_{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C(Oe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(C(Oe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),tn(n)}add(e){return C(Oe,"ADD",this.store.name,e,e),tn(this.store.add(e))}get(e){return tn(this.store.get(e)).next((t=>(t===void 0&&(t=null),C(Oe,"GET",this.store.name,e,t),t)))}delete(e){return C(Oe,"DELETE",this.store.name,e),tn(this.store.delete(e))}count(){return C(Oe,"COUNT",this.store.name),tn(this.store.count())}H(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(n),o=[];return this.J(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}X(e,t){C(Oe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.J(s,((i,o,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.J(s,t)}te(e){const t=this.cursor({});return new v(((n,s)=>{t.onerror=i=>{const o=Ha(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():n()})):n()}}))}J(e,t){const n=[];return new v(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new M_(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch((p=>(u.done(),v.reject(p))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>v.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function tn(r){return new v(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Ha(n.target.error);t(s)}}))}let pl=!1;function Ha(r){const e=xt.M(ge());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return pl||(pl=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Qr="IndexBackfiller";class F_{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){C(Qr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();C(Qr,`Documents written: ${t}`)}catch(t){jt(t)?C(Qr,"Ignoring IndexedDB error during index backfill: ",t):await qt(t)}await this.re(6e4)}))}}class U_{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return C(Qr,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,n.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(C(Qr,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=vd(i);Ka(o,n)>0&&(n=o)})),new Fe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ke.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=-1;function Yi(r){return r==null}function os(r){return r===0&&1/r==-1/0}function Rd(r){return typeof r=="number"&&Number.isInteger(r)&&!os(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="";function Se(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=gl(e)),e=B_(r.get(t),e);return gl(e)}function B_(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case vi:t+="";break;default:t+=i}}return t}function gl(r){return r+vi+""}function Ye(r){const e=r.length;if(F(e>=2,64408,{path:r}),e===2)return F(r.charAt(0)===vi&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(vi,i);switch((o<0||o>t)&&M(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:M(61167,{path:r})}i=o+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="remoteDocuments",As="owner",Dn="owner",as="mutationQueues",q_="userId",qe="mutations",_l="batchId",on="userMutationsIndex",yl=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(r,e){return[r,Se(e)]}function Pd(r,e,t){return[r,Se(e),t]}const j_={},Jn="documentMutations",Ai="remoteDocumentsV14",z_=["prefixPath","collectionGroup","readTime","documentId"],ai="documentKeyIndex",$_=["prefixPath","collectionGroup","documentId"],Cd="collectionGroupIndex",G_=["collectionGroup","readTime","prefixPath","documentId"],cs="remoteDocumentGlobal",pa="remoteDocumentGlobalKey",Yn="targets",Vd="queryTargetsIndex",K_=["canonicalId","targetId"],Xn="targetDocuments",H_=["targetId","path"],Wa="documentTargetsIndex",W_=["path","targetId"],Si="targetGlobalKey",un="targetGlobal",us="collectionParents",Q_=["collectionId","parent"],Zn="clientMetadata",J_="clientId",Xi="bundles",Y_="bundleId",Zi="namedQueries",X_="name",Qa="indexConfiguration",Z_="indexId",ga="collectionGroupIndex",ey="collectionGroup",Jr="indexState",ty=["indexId","uid"],Dd="sequenceNumberIndex",ny=["uid","sequenceNumber"],Yr="indexEntries",ry=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],kd="documentKeyIndex",sy=["indexId","uid","orderedDocumentKey"],eo="documentOverlays",iy=["userId","collectionPath","documentId"],_a="collectionPathOverlayIndex",oy=["userId","collectionPath","largestBatchId"],Nd="collectionGroupOverlayIndex",ay=["userId","collectionGroup","largestBatchId"],Ja="globals",cy="name",xd=[as,qe,Jn,en,Yn,As,un,Xn,Zn,cs,us,Xi,Zi],uy=[...xd,eo],Od=[as,qe,Jn,Ai,Yn,As,un,Xn,Zn,cs,us,Xi,Zi,eo],Md=Od,Ya=[...Md,Qa,Jr,Yr],ly=Ya,Ld=[...Ya,Ja],hy=Ld;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya extends Sd{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function _e(r,e){const t=L(r);return xt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function bn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function Fd(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||Te.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Te.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Te.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ys(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ys(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ys(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ys(this.root,e,this.comparator,!0)}}class Ys{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Te{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Te.RED,this.left=s??Te.EMPTY,this.right=i??Te.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Te(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Te.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Te.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}Te.EMPTY=null,Te.RED=!0,Te.BLACK=!1;Te.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Te(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new El(this.data.getIterator())}getIteratorFrom(e){return new El(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class El{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function kn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new Be([])}unionWith(e){let t=new te(ae.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Be(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ud("Invalid base64 string: "+i):i}})(e);return new de(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const dy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(r){if(F(!!r,39018),typeof r=="string"){let e=0;const t=dy.exec(r);if(F(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ut(r){return typeof r=="string"?de.fromBase64String(r):de.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd="server_timestamp",qd="__type__",jd="__previous_value__",zd="__local_write_time__";function Xa(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[qd])==null?void 0:n.stringValue)===Bd}function to(r){const e=r.mapValue.fields[jd];return Xa(e)?to(e):e}function ls(r){const e=ct(r.mapValue.fields[zd].timestampValue);return new Z(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,n,s,i,o,c,u,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const hs="(default)";class _n{constructor(e,t){this.projectId=e,this.database=t||hs}static empty(){return new _n("","")}get isDefaultDatabase(){return this.database===hs}isEqual(e){return e instanceof _n&&e.projectId===this.projectId&&e.database===this.database}}function my(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _n(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Za="__type__",$d="__max__",Ct={mapValue:{fields:{__type__:{stringValue:$d}}}},ec="__vector__",er="value",ci={nullValue:"NULL_VALUE"};function Lt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Xa(r)?4:Gd(r)?9007199254740991:no(r)?10:11:M(28295,{value:r})}function nt(r,e){if(r===e)return!0;const t=Lt(r);if(t!==Lt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ls(r).isEqual(ls(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ct(s.timestampValue),c=ct(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return ut(s.bytesValue).isEqual(ut(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=oe(s.doubleValue),c=oe(i.doubleValue);return o===c?os(o)===os(c):isNaN(o)&&isNaN(c)}return!1})(r,e);case 9:return Wn(r.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Il(o)!==Il(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!nt(o[u],c[u])))return!1;return!0})(r,e);default:return M(52216,{left:r})}}function ds(r,e){return(r.values||[]).find((t=>nt(t,e)))!==void 0}function Ft(r,e){if(r===e)return 0;const t=Lt(r),n=Lt(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=oe(i.integerValue||i.doubleValue),u=oe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return Tl(r.timestampValue,e.timestampValue);case 4:return Tl(ls(r),ls(e));case 5:return fa(r.stringValue,e.stringValue);case 6:return(function(i,o){const c=ut(i),u=ut(o);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=z(c[h],u[h]);if(f!==0)return f}return z(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=z(oe(i.latitude),oe(o.latitude));return c!==0?c:z(oe(i.longitude),oe(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return wl(r.arrayValue,e.arrayValue);case 10:return(function(i,o){var _,R,V,x;const c=i.fields||{},u=o.fields||{},h=(_=c[er])==null?void 0:_.arrayValue,f=(R=u[er])==null?void 0:R.arrayValue,p=z(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((x=f==null?void 0:f.values)==null?void 0:x.length)||0);return p!==0?p:wl(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Ct.mapValue&&o===Ct.mapValue)return 0;if(i===Ct.mapValue)return 1;if(o===Ct.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const _=fa(u[p],f[p]);if(_!==0)return _;const R=Ft(c[u[p]],h[f[p]]);if(R!==0)return R}return z(u.length,f.length)})(r.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function Tl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=ct(r),n=ct(e),s=z(t.seconds,n.seconds);return s!==0?s:z(t.nanos,n.nanos)}function wl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Ft(t[s],n[s]);if(i)return i}return z(t.length,n.length)}function tr(r){return Ia(r)}function Ia(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=ct(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return ut(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return N.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Ia(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Ia(t.fields[o])}`;return s+"}"})(r.mapValue):M(61005,{value:r})}function ui(r){switch(Lt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=to(r);return e?16+ui(e):16;case 5:return 2*r.stringValue.length;case 6:return ut(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+ui(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return bn(n.fields,((i,o)=>{s+=i.length+ui(o)})),s})(r.mapValue);default:throw M(13486,{value:r})}}function fs(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ea(r){return!!r&&"integerValue"in r}function ms(r){return!!r&&"arrayValue"in r}function vl(r){return!!r&&"nullValue"in r}function Al(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function li(r){return!!r&&"mapValue"in r}function no(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Za])==null?void 0:n.stringValue)===ec}function Xr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return bn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Xr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Xr(r.arrayValue.values[t]);return e}return{...r}}function Gd(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===$d}const Kd={mapValue:{fields:{[Za]:{stringValue:ec},[er]:{arrayValue:{}}}}};function py(r){return"nullValue"in r?ci:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?fs(_n.empty(),N.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?no(r)?Kd:{mapValue:{}}:M(35942,{value:r})}function gy(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?fs(_n.empty(),N.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Kd:"mapValue"in r?no(r)?{mapValue:{}}:Ct:M(61959,{value:r})}function Sl(r,e){const t=Ft(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function bl(r,e){const t=Ft(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.value=e}static empty(){return new De({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!li(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Xr(t)}setAll(e){let t=ae.emptyPath(),n={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=Xr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());li(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];li(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){bn(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new De(Xr(this.value))}}function Hd(r){const e=[];return bn(r.fields,((t,n)=>{const s=new ae([t]);if(li(n)){const i=Hd(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Be(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ue(e,0,U.min(),U.min(),U.min(),De.empty(),0)}static newFoundDocument(e,t,n,s){return new ue(e,1,t,U.min(),n,s,0)}static newNoDocument(e,t){return new ue(e,2,t,U.min(),U.min(),De.empty(),0)}static newUnknownDocument(e,t){return new ue(e,3,t,U.min(),U.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t){this.position=e,this.inclusive=t}}function Rl(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=N.comparator(N.fromName(o.referenceValue),t.key):n=Ft(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Pl(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!nt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e,t="asc"){this.field=e,this.dir=t}}function _y(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{}class W extends Wd{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new yy(e,t,n):t==="array-contains"?new Ty(e,n):t==="in"?new ef(e,n):t==="not-in"?new wy(e,n):t==="array-contains-any"?new vy(e,n):new W(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new Iy(e,n):new Ey(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ft(t,this.value)):t!==null&&Lt(this.value)===Lt(t)&&this.matchesComparison(Ft(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Wd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ee(e,t)}matches(e){return rr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function rr(r){return r.op==="and"}function Ta(r){return r.op==="or"}function tc(r){return Qd(r)&&rr(r)}function Qd(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function wa(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+tr(r.value);if(tc(r))return r.filters.map((e=>wa(e))).join(",");{const e=r.filters.map((t=>wa(t))).join(",");return`${r.op}(${e})`}}function Jd(r,e){return r instanceof W?(function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&nt(n.value,s.value)})(r,e):r instanceof ee?(function(n,s){return s instanceof ee&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,c)=>i&&Jd(o,s.filters[c])),!0):!1})(r,e):void M(19439)}function Yd(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function Xd(r){return r instanceof W?(function(t){return`${t.field.canonicalString()} ${t.op} ${tr(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(Xd).join(" ,")+"}"})(r):"Filter"}class yy extends W{constructor(e,t,n){super(e,t,n),this.key=N.fromName(n.referenceValue)}matches(e){const t=N.comparator(e.key,this.key);return this.matchesComparison(t)}}class Iy extends W{constructor(e,t){super(e,"in",t),this.keys=Zd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Ey extends W{constructor(e,t){super(e,"not-in",t),this.keys=Zd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Zd(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((n=>N.fromName(n.referenceValue)))}class Ty extends W{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ms(t)&&ds(t.arrayValue,this.value)}}class ef extends W{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ds(this.value.arrayValue,t)}}class wy extends W{constructor(e,t){super(e,"not-in",t)}matches(e){if(ds(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ds(this.value.arrayValue,t)}}class vy extends W{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ms(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>ds(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function va(r,e=null,t=[],n=[],s=null,i=null,o=null){return new Ay(r,e,t,n,s,i,o)}function yn(r){const e=L(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>wa(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),Yi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>tr(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>tr(n))).join(",")),e.Te=t}return e.Te}function Ss(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!_y(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Jd(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Pl(r.startAt,e.startAt)&&Pl(r.endAt,e.endAt)}function bi(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ri(r,e){return r.filters.filter((t=>t instanceof W&&t.field.isEqual(e)))}function Cl(r,e,t){let n=ci,s=!0;for(const i of Ri(r,e)){let o=ci,c=!0;switch(i.op){case"<":case"<=":o=py(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=ci}Sl({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Sl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Vl(r,e,t){let n=Ct,s=!0;for(const i of Ri(r,e)){let o=Ct,c=!0;switch(i.op){case">=":case">":o=gy(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Ct}bl({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];bl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function tf(r,e,t,n,s,i,o,c){return new mr(r,e,t,n,s,i,o,c)}function bs(r){return new mr(r)}function Dl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Sy(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function nf(r){return r.collectionGroup!==null}function Zr(r){const e=L(r);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new te(ae.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new ps(i,n))})),t.has(ae.keyField().canonicalString())||e.Ie.push(new ps(ae.keyField(),n))}return e.Ie}function Le(r){const e=L(r);return e.Ee||(e.Ee=by(e,Zr(r))),e.Ee}function by(r,e){if(r.limitType==="F")return va(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ps(s.field,i)}));const t=r.endAt?new nr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new nr(r.startAt.position,r.startAt.inclusive):null;return va(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Aa(r,e){const t=r.filters.concat([e]);return new mr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Ry(r,e){const t=r.explicitOrderBy.concat([e]);return new mr(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Pi(r,e,t){return new mr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function ro(r,e){return Ss(Le(r),Le(e))&&r.limitType===e.limitType}function rf(r){return`${yn(Le(r))}|lt:${r.limitType}`}function Fn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>Xd(s))).join(", ")}]`),Yi(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>tr(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>tr(s))).join(",")),`Target(${n})`})(Le(r))}; limitType=${r.limitType})`}function Rs(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):N.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of Zr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,c,u){const h=Rl(o,c,u);return o.inclusive?h<=0:h<0})(n.startAt,Zr(n),s)||n.endAt&&!(function(o,c,u){const h=Rl(o,c,u);return o.inclusive?h>=0:h>0})(n.endAt,Zr(n),s))})(r,e)}function sf(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function of(r){return(e,t)=>{let n=!1;for(const s of Zr(r)){const i=Py(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Py(r,e,t){const n=r.field.isKeyField()?N.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Ft(u,h):M(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){bn(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return Fd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy=new se(N.comparator);function Me(){return Cy}const af=new se(N.comparator);function zr(...r){let e=af;for(const t of r)e=e.insert(t.key,t);return e}function cf(r){let e=af;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Xe(){return es()}function uf(){return es()}function es(){return new dt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const Vy=new se(N.comparator),Dy=new te(N.comparator);function K(...r){let e=Dy;for(const t of r)e=e.add(t);return e}const ky=new te(z);function nc(){return ky}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:os(e)?"-0":e}}function lf(r){return{integerValue:""+r}}function Ny(r,e){return Rd(e)?lf(e):rc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(){this._=void 0}}function xy(r,e,t){return r instanceof gs?(function(s,i){const o={fields:{[qd]:{stringValue:Bd},[zd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Xa(i)&&(i=to(i)),i&&(o.fields[jd]=i),{mapValue:o}})(t,e):r instanceof sr?df(r,e):r instanceof ir?ff(r,e):(function(s,i){const o=hf(s,i),c=kl(o)+kl(s.Ae);return Ea(o)&&Ea(s.Ae)?lf(c):rc(s.serializer,c)})(r,e)}function Oy(r,e,t){return r instanceof sr?df(r,e):r instanceof ir?ff(r,e):t}function hf(r,e){return r instanceof _s?(function(n){return Ea(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class gs extends so{}class sr extends so{constructor(e){super(),this.elements=e}}function df(r,e){const t=mf(e);for(const n of r.elements)t.some((s=>nt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class ir extends so{constructor(e){super(),this.elements=e}}function ff(r,e){let t=mf(e);for(const n of r.elements)t=t.filter((s=>!nt(s,n)));return{arrayValue:{values:t}}}class _s extends so{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function kl(r){return oe(r.integerValue||r.doubleValue)}function mf(r){return ms(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t){this.field=e,this.transform=t}}function Ly(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof sr&&s instanceof sr||n instanceof ir&&s instanceof ir?Wn(n.elements,s.elements,nt):n instanceof _s&&s instanceof _s?nt(n.Ae,s.Ae):n instanceof gs&&s instanceof gs})(r.transform,e.transform)}class Fy{constructor(e,t){this.version=e,this.transformResults=t}}class Ne{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ne}static exists(e){return new Ne(void 0,e)}static updateTime(e){return new Ne(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class io{}function pf(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new oo(r.key,Ne.none()):new pr(r.key,r.data,Ne.none());{const t=r.data,n=De.empty();let s=new te(ae.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new zt(r.key,n,new Be(s.toArray()),Ne.none())}}function Uy(r,e,t){r instanceof pr?(function(s,i,o){const c=s.value.clone(),u=xl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):r instanceof zt?(function(s,i,o){if(!hi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=xl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(gf(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ts(r,e,t,n){return r instanceof pr?(function(i,o,c,u){if(!hi(i.precondition,o))return c;const h=i.value.clone(),f=Ol(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof zt?(function(i,o,c,u){if(!hi(i.precondition,o))return c;const h=Ol(i.fieldTransforms,u,o),f=o.data;return f.setAll(gf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(r,e,t,n):(function(i,o,c){return hi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(r,e,t)}function By(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=hf(n.transform,s||null);i!=null&&(t===null&&(t=De.empty()),t.set(n.field,i))}return t||null}function Nl(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Wn(n,s,((i,o)=>Ly(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class pr extends io{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class zt extends io{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function gf(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function xl(r,e,t){const n=new Map;F(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,Oy(o,c,t[s]))}return n}function Ol(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,xy(i,o,e))}return n}class oo extends io{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class _f extends io{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Uy(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ts(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ts(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=uf();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=pf(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(U.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&Wn(this.mutations,e.mutations,((t,n)=>Nl(t,n)))&&Wn(this.baseMutations,e.baseMutations,((t,n)=>Nl(t,n)))}}class ic{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return Vy})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new ic(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,Q;function jy(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function yf(r){if(r===void 0)return le("GRPC error has no .code"),P.UNKNOWN;switch(r){case fe.OK:return P.OK;case fe.CANCELLED:return P.CANCELLED;case fe.UNKNOWN:return P.UNKNOWN;case fe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case fe.INTERNAL:return P.INTERNAL;case fe.UNAVAILABLE:return P.UNAVAILABLE;case fe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case fe.NOT_FOUND:return P.NOT_FOUND;case fe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case fe.ABORTED:return P.ABORTED;case fe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case fe.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(Q=fe||(fe={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y=new Nt([4294967295,4294967295],0);function Ml(r){const e=zy().encode(r),t=new hd;return t.update(e),new Uint8Array(t.digest())}function Ll(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nt([t,n],0),new Nt([s,i],0)]}class ac{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new $r(`Invalid padding: ${t}`);if(n<0)throw new $r(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new $r(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new $r(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Nt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Nt.fromNumber(n)));return s.compare($y)===1&&(s=new Nt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Ml(e),[n,s]=Ll(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new ac(i,s,t);return n.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Ml(e),[n,s]=Ll(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.be(o)}}be(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class $r extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Cs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ps(U.min(),s,new se(z),Me(),K())}}class Cs{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Cs(n,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t,n,s){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=s}}class If{constructor(e,t){this.targetId=e,this.Ce=t}}class Ef{constructor(e,t,n=de.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Fl{constructor(){this.ve=0,this.Fe=Ul(),this.Me=de.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=K(),t=K(),n=K();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}})),new Cs(this.Me,this.xe,e,t,n)}Ke(){this.Oe=!1,this.Fe=Ul()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Gy{constructor(e){this.Ge=e,this.ze=new Map,this.je=Me(),this.He=Xs(),this.Je=Xs(),this.Ze=new se(z)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.Ke(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:M(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(bi(i))if(n===0){const o=new N(i.path);this.et(t,o,ue.newNoDocument(o,U.min()))}else F(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=ut(n).toUint8Array()}catch(u){if(u instanceof Ud)return gn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new ac(o,s,i)}catch(u){return gn(u instanceof $r?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&bi(c.target)){const u=new N(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,ue.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.Ke())}}));let n=K();this.Je.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Ps(e,t,this.Ze,this.je,n);return this.je=Me(),this.He=Xs(),this.Je=Xs(),this.Ze=new se(z),s}Ye(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,n),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.qe(t,1):s.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Fl,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new te(z),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new te(z),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Fl),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Xs(){return new se(N.comparator)}function Ul(){return new se(N.comparator)}const Ky={asc:"ASCENDING",desc:"DESCENDING"},Hy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wy={and:"AND",or:"OR"};class Qy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Sa(r,e){return r.useProto3Json||Yi(e)?e:{value:e}}function or(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Tf(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function Jy(r,e){return or(r,e.toTimestamp())}function Pe(r){return F(!!r,49232),U.fromTimestamp((function(t){const n=ct(t);return new Z(n.seconds,n.nanos)})(r))}function cc(r,e){return ba(r,e).canonicalString()}function ba(r,e){const t=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function wf(r){const e=X.fromString(r);return F(Df(e),10190,{key:e.toString()}),e}function Ci(r,e){return cc(r.databaseId,e.path)}function ln(r,e){const t=wf(e);if(t.get(1)!==r.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new N(Sf(t))}function vf(r,e){return cc(r.databaseId,e)}function Af(r){const e=wf(r);return e.length===4?X.emptyPath():Sf(e)}function Ra(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Sf(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Bl(r,e,t){return{name:Ci(r,e),fields:t.value.mapValue.fields}}function Yy(r,e,t){const n=ln(r,e.name),s=Pe(e.updateTime),i=e.createTime?Pe(e.createTime):U.min(),o=new De({mapValue:{fields:e.fields}}),c=ue.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Xy(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),de.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),de.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:yf(h.code);return new D(f,h.message||"")})(o);t=new Ef(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=ln(r,n.document.name),i=Pe(n.document.updateTime),o=n.document.createTime?Pe(n.document.createTime):U.min(),c=new De({mapValue:{fields:n.document.fields}}),u=ue.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new di(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=ln(r,n.document),i=n.readTime?Pe(n.readTime):U.min(),o=ue.newNoDocument(s,i),c=n.removedTargetIds||[];t=new di([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=ln(r,n.document),i=n.removedTargetIds||[];t=new di([],i,s,null)}else{if(!("filter"in e))return M(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new qy(s,i),c=n.targetId;t=new If(c,o)}}return t}function Vi(r,e){let t;if(e instanceof pr)t={update:Bl(r,e.key,e.value)};else if(e instanceof oo)t={delete:Ci(r,e.key)};else if(e instanceof zt)t={update:Bl(r,e.key,e.data),updateMask:sI(e.fieldMask)};else{if(!(e instanceof _f))return M(16599,{dt:e.type});t={verify:Ci(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const c=o.transform;if(c instanceof gs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof sr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ir)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof _s)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw M(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Jy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)})(r,e.precondition)),t}function Pa(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?Ne.updateTime(Pe(i.updateTime)):i.exists!==void 0?Ne.exists(i.exists):Ne.none()})(e.currentDocument):Ne.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new gs;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new sr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new ir(f)}else"increment"in c?u=new _s(o,c.increment):M(16584,{proto:c});const h=ae.fromServerFormat(c.fieldPath);return new My(h,u)})(r,s))):[];if(e.update){e.update.name;const s=ln(r,e.update.name),i=new De({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const h=u.fieldPaths||[];return new Be(h.map((f=>ae.fromServerFormat(f))))})(e.updateMask);return new zt(s,i,o,t,n)}return new pr(s,i,t,n)}if(e.delete){const s=ln(r,e.delete);return new oo(s,t)}if(e.verify){const s=ln(r,e.verify);return new _f(s,t)}return M(1463,{proto:e})}function Zy(r,e){return r&&r.length>0?(F(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?Pe(s.updateTime):Pe(i);return o.isEqual(U.min())&&(o=Pe(i)),new Fy(o,s.transformResults||[])})(t,e)))):[]}function bf(r,e){return{documents:[vf(r,e.path)]}}function Rf(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=vf(r,s);const i=(function(h){if(h.length!==0)return Vf(ee.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(_){return{field:Un(_.field),direction:tI(_.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Sa(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function Pf(r){let e=Af(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const _=Cf(p);return _ instanceof ee&&tc(_)?_.getFilters():[_]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((_=>(function(V){return new ps(Bn(V.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(_)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let _;return _=typeof p=="object"?p.value:p,Yi(_)?null:_})(t.limit));let u=null;t.startAt&&(u=(function(p){const _=!!p.before,R=p.values||[];return new nr(R,_)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const _=!p.before,R=p.values||[];return new nr(R,_)})(t.endAt)),tf(e,s,o,i,c,"F",u,h)}function eI(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Cf(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Bn(t.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Bn(t.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Bn(t.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Bn(t.unaryFilter.field);return W.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(t){return W.create(Bn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>Cf(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(t.compositeFilter.op))})(r):M(30097,{filter:r})}function tI(r){return Ky[r]}function nI(r){return Hy[r]}function rI(r){return Wy[r]}function Un(r){return{fieldPath:r.canonicalString()}}function Bn(r){return ae.fromServerFormat(r.fieldPath)}function Vf(r){return r instanceof W?(function(t){if(t.op==="=="){if(Al(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NAN"}};if(vl(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Al(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NAN"}};if(vl(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Un(t.field),op:nI(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((s=>Vf(s)));return n.length===1?n[0]:{compositeFilter:{op:rI(t.op),filters:n}}})(r):M(54877,{filter:r})}function sI(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Df(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function kf(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,t,n,s,i=U.min(),o=U.min(),c=de.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new st(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new st(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e){this.yt=e}}function iI(r,e){let t;if(e.document)t=Yy(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=N.fromSegments(e.noDocument.path),s=En(e.noDocument.readTime);t=ue.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M(56709);{const n=N.fromSegments(e.unknownDocument.path),s=En(e.unknownDocument.version);t=ue.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new Z(s[0],s[1]);return U.fromTimestamp(i)})(e.readTime)),t}function ql(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Di(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:Ci(i,o.key),fields:o.data.value.mapValue.fields,updateTime:or(i,o.version.toTimestamp()),createTime:or(i,o.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:In(e.version)};else{if(!e.isUnknownDocument())return M(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:In(e.version)}}return n}function Di(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function In(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function En(r){const e=new Z(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function nn(r,e){const t=(e.baseMutations||[]).map((i=>Pa(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>Pa(r.yt,i))),s=Z.fromMillis(e.localWriteTimeMs);return new sc(e.batchId,s,t,n)}function Gr(r){const e=En(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?En(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const o=i.documents.length;return F(o===1,1966,{count:o}),Le(bs(Af(i.documents[0])))})(r.query):(function(i){return Le(Pf(i))})(r.query),new st(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,de.fromBase64String(r.resumeToken))}function xf(r,e){const t=In(e.snapshotVersion),n=In(e.lastLimboFreeSnapshotVersion);let s;s=bi(e.target)?bf(r.yt,e.target):Rf(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:yn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Of(r){const e=Pf({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Pi(e,e.limit,"L"):e}function Yo(r,e){return new oc(e.largestBatchId,Pa(r.yt,e.overlayMutation))}function jl(r,e){const t=e.path.lastSegment();return[r,Se(e.path.popLast()),t]}function zl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:In(n.readTime),documentKey:Se(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{getBundleMetadata(e,t){return $l(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:En(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return $l(e).put((function(s){return{bundleId:s.id,createTime:In(Pe(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Gl(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:Of(i.bundledQuery),readTime:En(i.readTime)}})(n)}))}saveNamedQuery(e,t){return Gl(e).put((function(s){return{name:s.name,readTime:In(Pe(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function $l(r){return _e(r,Xi)}function Gl(r){return _e(r,Zi)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new ao(e,n)}getOverlay(e,t){return Mr(e).get(jl(this.userId,t)).next((n=>n?Yo(this.serializer,n):null))}getOverlays(e,t){const n=Xe();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const c=new oc(t,o);s.push(this.bt(e,c))})),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(Se(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Mr(e).X(_a,c))})),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=Xe(),i=Se(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Mr(e).H(_a,o).next((c=>{for(const u of c){const h=Yo(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=Xe();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Mr(e).ee({index:Nd,range:c},((u,h,f)=>{const p=Yo(this.serializer,h);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()})).next((()=>i))}bt(e,t){return Mr(e).put((function(s,i,o){const[c,u,h]=jl(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Vi(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Mr(r){return _e(r,eo)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{St(e){return _e(e,Ja)}getSessionToken(e){return this.St(e).get("sessionToken").next((t=>{const n=t==null?void 0:t.value;return n?de.fromUint8Array(n):de.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),os(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=ct(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(ut(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?Gd(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):no(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):M(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,c;const n=e.fields||{};this.Ft(t,53);const s=er,i=((c=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(oe(i)),this.Ot(s,t),this.Ct(n[s],t)}qt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),N.fromName(e).path.forEach((n=>{this.Ft(t,60),this.$t(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}rn.Wt=new rn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=255;function cI(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function Kl(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=cI(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class uI{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ht(n.value),n=t.next();this.Jt()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ht(n);else if(n<2048)this.Ht(960|n>>>6),this.Ht(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ht(480|n>>>12),this.Ht(128|63&n>>>6),this.Ht(128|63&n);else{const s=t.codePointAt(0);this.Ht(240|s>>>18),this.Ht(128|63&s>>>12),this.Ht(128|63&s>>>6),this.Ht(128|63&s)}}this.Jt()}Yt(e){const t=this.en(e),n=Kl(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=Kl(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Nn),this.sn(255)}_n(){this.an(Nn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Nn?(this.sn(Nn),this.sn(0)):this.sn(t)}Ht(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Nn?(this.an(Nn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Jt(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class lI{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class hI{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Lr{constructor(){this.cn=new uI,this.ascending=new lI(this.cn),this.descending=new hI(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.In=s}En(){const e=this.In.length,t=e===0||this.In[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.In,0),t!==e?n.set([0],this.In.length):++n[n.length-1],new sn(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:fi(this.Tn),directionalValue:fi(this.In),orderedDocumentKey:fi(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Et(r,e){let t=r.hn-e.hn;return t!==0?t:(t=Hl(r.Tn,e.Tn),t!==0?t:(t=Hl(r.In,e.In),t!==0?t:N.comparator(r.Pn,e.Pn)))}function Hl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function fi(r){return sd()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function Wl(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class Ql{constructor(e){this.Vn=new te(((t,n)=>ae.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(F(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=ma(e);if(t!==void 0&&!this.pn(t))return!1;const n=Zt(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}bn(){if(this.fn)return null;let e=new te(ae.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new ii(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ii(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ii(n.field,n.dir==="asc"?0:1)));return new wi(wi.UNKNOWN_ID,this.collectionId,t,is.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(r){var t,n;if(F(r instanceof W||r instanceof ee,20012),r instanceof W){if(r instanceof ef){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map((i=>W.create(r.field,"==",i))))||[];return ee.create(s,"or")}return r}const e=r.filters.map((s=>Mf(s)));return ee.create(e,r.op)}function dI(r){if(r.getFilters().length===0)return[];const e=Da(Mf(r));return F(Lf(e),7391),Ca(e)||Va(e)?[e]:e.getFilters()}function Ca(r){return r instanceof W}function Va(r){return r instanceof ee&&tc(r)}function Lf(r){return Ca(r)||Va(r)||(function(t){if(t instanceof ee&&Ta(t)){for(const n of t.getFilters())if(!Ca(n)&&!Va(n))return!1;return!0}return!1})(r)}function Da(r){if(F(r instanceof W||r instanceof ee,34018),r instanceof W)return r;if(r.filters.length===1)return Da(r.filters[0]);const e=r.filters.map((n=>Da(n)));let t=ee.create(e,r.op);return t=ki(t),Lf(t)?t:(F(t instanceof ee,64498),F(rr(t),40251),F(t.filters.length>1,57927),t.filters.reduce(((n,s)=>uc(n,s))))}function uc(r,e){let t;return F(r instanceof W||r instanceof ee,38388),F(e instanceof W||e instanceof ee,25473),t=r instanceof W?e instanceof W?(function(s,i){return ee.create([s,i],"and")})(r,e):Jl(r,e):e instanceof W?Jl(e,r):(function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),rr(s)&&rr(i))return Yd(s,i.getFilters());const o=Ta(s)?s:i,c=Ta(s)?i:s,u=o.filters.map((h=>uc(h,c)));return ee.create(u,"or")})(r,e),ki(t)}function Jl(r,e){if(rr(e))return Yd(e,r.getFilters());{const t=e.filters.map((n=>uc(r,n)));return ee.create(t,"or")}}function ki(r){if(F(r instanceof W||r instanceof ee,11850),r instanceof W)return r;const e=r.getFilters();if(e.length===1)return ki(e[0]);if(Qd(r))return r;const t=e.map((s=>ki(s))),n=[];return t.forEach((s=>{s instanceof W?n.push(s):s instanceof ee&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(){this.Sn=new lc}addToCollectionParentIndex(e,t){return this.Sn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve(Fe.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve(Fe.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class lc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new te(X.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="IndexedDbIndexManager",Zs=new Uint8Array(0);class mI{constructor(e,t){this.databaseId=t,this.Dn=new lc,this.Cn=new dt((n=>yn(n)),((n,s)=>Ss(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:n,parent:Se(s)};return Xl(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Id(t),""],!1,!0);return Xl(e).H(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(Ye(o.parent))}return n}))}addFieldIndex(e,t){const n=Fr(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=On(e);return i.next((c=>{o.put(zl(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Fr(e),s=On(e),i=xn(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Fr(e),n=xn(e),s=On(e);return t.X().next((()=>n.X())).next((()=>s.X()))}createTargetIndexes(e,t){return v.forEach(this.vn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new Ql(n).bn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=xn(e);let s=!0;const i=new Map;return v.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=K();const c=[];return v.forEach(i,((u,h)=>{C(Yl,`Using index ${(function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map((ne=>`${ne.fieldPath}:${ne.kind}`)).join(",")}`})(u)} to execute ${yn(t)}`);const f=(function(q,ne){const J=ma(ne);if(J===void 0)return null;for(const Y of Ri(q,J.fieldPath))switch(Y.op){case"array-contains-any":return Y.value.arrayValue.values||[];case"array-contains":return[Y.value]}return null})(h,u),p=(function(q,ne){const J=new Map;for(const Y of Zt(ne))for(const E of Ri(q,Y.fieldPath))switch(E.op){case"==":case"in":J.set(Y.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return J.set(Y.fieldPath.canonicalString(),E.value),Array.from(J.values())}return null})(h,u),_=(function(q,ne){const J=[];let Y=!0;for(const E of Zt(ne)){const g=E.kind===0?Cl(q,E.fieldPath,q.startAt):Vl(q,E.fieldPath,q.startAt);J.push(g.value),Y&&(Y=g.inclusive)}return new nr(J,Y)})(h,u),R=(function(q,ne){const J=[];let Y=!0;for(const E of Zt(ne)){const g=E.kind===0?Vl(q,E.fieldPath,q.endAt):Cl(q,E.fieldPath,q.endAt);J.push(g.value),Y&&(Y=g.inclusive)}return new nr(J,Y)})(h,u),V=this.Mn(u,h,_),x=this.Mn(u,h,R),O=this.xn(u,h,p),$=this.On(u.indexId,f,V,_.inclusive,x,R.inclusive,O);return v.forEach($,(B=>n.Z(B,t.limit).next((q=>{q.forEach((ne=>{const J=N.fromSegments(ne.documentKey);o.has(J)||(o=o.add(J),c.push(J))}))}))))})).next((()=>c))}return v.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=dI(ee.create(e.filters,"and")).map((n=>va(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const _=t?this.Nn(t[p/h]):Zs,R=this.Bn(e,_,n[p%h],s),V=this.Ln(e,_,i[p%h],o),x=c.map((O=>this.Bn(e,_,O,!0)));f.push(...this.createRange(R,V,x))}return f}Bn(e,t,n,s){const i=new sn(e,N.empty(),t,n);return s?i:i.En()}Ln(e,t,n,s){const i=new sn(e,N.empty(),t,n);return s?i.En():i}Fn(e,t){const n=new Ql(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let n=2;const s=this.vn(t);return v.forEach(s,(i=>this.Fn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(u){let h=new te(ae.comparator),f=!1;for(const p of u.filters)for(const _ of p.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const p of u.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}kn(e,t){const n=new Lr;for(const s of Zt(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);rn.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new Lr;return rn.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const n=new Lr;return rn.Wt.Dt(fs(this.databaseId,t),n.ln((function(i){const o=Zt(i);return o.length===0?0:o[o.length-1].kind})(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new Lr);let i=0;for(const o of Zt(e)){const c=n[i++];for(const u of s)if(this.qn(t,o.fieldPath)&&ms(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);rn.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new Lr;u.seed(c.un()),rn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}qn(e,t){return!!e.filters.find((n=>n instanceof W&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Fr(e),s=On(e);return(t?n.H(ga,IDBKeyRange.bound(t,t)):n.H()).next((i=>{const o=[];return v.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,p){const _=p?new is(p.sequenceNumber,new Fe(En(p.readTime),new N(Ye(p.documentKey)),p.largestBatchId)):is.empty(),R=f.fields.map((([V,x])=>new ii(ae.fromServerFormat(V),x)));return new wi(f.indexId,f.collectionGroup,R,_)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Fr(e),i=On(e);return this.Wn(e).next((o=>s.H(ga,IDBKeyRange.bound(t,t)).next((c=>v.forEach(c,(u=>i.put(zl(u.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?v.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),v.forEach(c,(u=>this.Qn(e,s,u).next((h=>{const f=this.Gn(i,u);return h.isEqual(f)?v.resolve():this.zn(e,i,u,h,f)})))))))}))}jn(e,t,n,s){return xn(e).put(s.Rn(this.uid,this.Kn(n,t.key),t.key))}Hn(e,t,n,s){return xn(e).delete(s.An(this.uid,this.Kn(n,t.key),t.key))}Qn(e,t,n){const s=xn(e);let i=new te(Et);return s.ee({index:kd,range:IDBKeyRange.only([n.indexId,this.uid,fi(this.Kn(n,t))])},((o,c)=>{i=i.add(new sn(n.indexId,t,Wl(c.arrayValue),Wl(c.directionalValue)))})).next((()=>i))}Gn(e,t){let n=new te(Et);const s=this.kn(t,e);if(s==null)return n;const i=ma(t);if(i!=null){const o=e.data.field(i.fieldPath);if(ms(o))for(const c of o.arrayValue.values||[])n=n.add(new sn(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new sn(t.indexId,e.key,Zs,s));return n}zn(e,t,n,s,i){C(Yl,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,h,f,p,_){const R=u.getIterator(),V=h.getIterator();let x=kn(R),O=kn(V);for(;x||O;){let $=!1,B=!1;if(x&&O){const q=f(x,O);q<0?B=!0:q>0&&($=!0)}else x!=null?B=!0:$=!0;$?(p(O),O=kn(V)):B?(_(x),x=kn(R)):(x=kn(R),O=kn(V))}})(s,i,Et,(c=>{o.push(this.jn(e,t,n,c))}),(c=>{o.push(this.Hn(e,t,n,c))})),v.waitFor(o)}Wn(e){let t=1;return On(e).ee({index:Dd,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,c)=>Et(o,c))).filter(((o,c,u)=>!c||Et(o,u[c-1])!==0));const s=[];s.push(e);for(const o of n){const c=Et(o,e),u=Et(o,t);if(c===0)s[0]=e.En();else if(c>0&&u<0)s.push(o),s.push(o.En());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Jn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Zs,N.empty()),u=s[o+1].An(this.uid,Zs,N.empty());i.push(IDBKeyRange.bound(c,u))}return i}Jn(e,t){return Et(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Zl)}getMinOffset(e,t){return v.mapArray(this.vn(t),(n=>this.Fn(e,n).next((s=>s||M(44426))))).next(Zl)}}function Xl(r){return _e(r,us)}function xn(r){return _e(r,Yr)}function Fr(r){return _e(r,Qa)}function On(r){return _e(r,Jr)}function Zl(r){F(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Ka(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Fe(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ff=41943040;class Ae{static withCacheSize(e){return new Ae(e,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(r,e,t){const n=r.store(qe),s=r.store(Jn),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},((f,p,_)=>(c++,_.delete())));i.push(u.next((()=>{F(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const p=Pd(e,f.key.path,t.batchId);i.push(s.delete(p)),h.push(f.key)}return v.waitFor(i).next((()=>h))}function Ni(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ae.DEFAULT_COLLECTION_PERCENTILE=10,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ae.DEFAULT=new Ae(Ff,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ae.DISABLED=new Ae(-1,0,0);class co{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){F(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new co(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).ee({index:on,range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=qn(e),o=Tt(e);return o.add({}).next((c=>{F(typeof c=="number",49019);const u=new sc(c,t,n,s),h=(function(R,V,x){const O=x.baseMutations.map((B=>Vi(R.yt,B))),$=x.mutations.map((B=>Vi(R.yt,B)));return{userId:V,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:O,mutations:$}})(this.serializer,this.userId,u),f=[];let p=new te(((_,R)=>z(_.canonicalString(),R.canonicalString())));for(const _ of s){const R=Pd(this.userId,_.key.path,c);p=p.add(_.key.path.popLast()),f.push(o.put(h)),f.push(i.put(R,j_))}return p.forEach((_=>{f.push(this.indexManager.addToCollectionParentIndex(e,_))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),v.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return Tt(e).get(t).next((n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),nn(this.serializer,n)):null))}Xn(e,t){return this.Zn[t]?v.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Tt(e).ee({index:on,range:s},((o,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n,47524,{Yn:n}),i=nn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=cn;return Tt(e).ee({index:on,range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,cn],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).H(on,t).next((n=>n.map((s=>nn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=oi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return qn(e).ee({range:s},((o,c,u)=>{const[h,f,p]=o,_=Ye(f);if(h===this.userId&&t.path.isEqual(_))return Tt(e).get(p).next((R=>{if(!R)throw M(61480,{er:o,batchId:p});F(R.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:R.userId,batchId:p}),i.push(nn(this.serializer,R))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);const s=[];return t.forEach((i=>{const o=oi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=qn(e).ee({range:c},((h,f,p)=>{const[_,R,V]=h,x=Ye(R);_===this.userId&&i.path.isEqual(x)?n=n.add(V):p.done()}));s.push(u)})),v.waitFor(s).next((()=>this.tr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=oi(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new te(z);return qn(e).ee({range:o},((u,h,f)=>{const[p,_,R]=u,V=Ye(_);p===this.userId&&n.isPrefixOf(V)?V.length===s&&(c=c.add(R)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Tt(e).get(i).next((o=>{if(o===null)throw M(35274,{batchId:i});F(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(nn(this.serializer,o))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return Uf(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return qn(e).ee({range:n},((i,o,c)=>{if(i[0]===this.userId){const u=Ye(i[1]);s.push(u)}else c.done()})).next((()=>{F(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Bf(e,this.userId,t)}ir(e){return qf(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:cn,lastStreamToken:""}))}}function Bf(r,e,t){const n=oi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return qn(r).ee({range:i,Y:!0},((c,u,h)=>{const[f,p,_]=c;f===e&&p===s&&(o=!0),h.done()})).next((()=>o))}function Tt(r){return _e(r,qe)}function qn(r){return _e(r,Jn)}function qf(r){return _e(r,as)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Tn(0)}static ar(){return new Tn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const n=new Tn(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>U.fromTimestamp(new Z(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Mn(e).delete(t.targetId))).next((()=>this.ur(e))).next((n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return Mn(e).ee(((o,c)=>{const u=Gr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Mn(e).ee(((n,s)=>{const i=Gr(s);t(i)}))}ur(e){return th(e).get(Si).next((t=>(F(t!==null,2888),t)))}cr(e,t){return th(e).put(Si,t)}lr(e,t){return Mn(e).put(xf(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const n=yn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Mn(e).ee({range:s,index:Vd},((o,c,u)=>{const h=Gr(c);Ss(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=At(e);return t.forEach((o=>{const c=Se(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))})),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=At(e);return v.forEach(t,(i=>{const o=Se(i.path);return v.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=At(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=At(e);let i=K();return s.ee({range:n,Y:!0},((o,c,u)=>{const h=Ye(o[1]),f=new N(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=Se(t.path),s=IDBKeyRange.bound([n],[Id(n)],!1,!0);let i=0;return At(e).ee({index:Wa,Y:!0,range:s},(([o,c],u,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return Mn(e).get(t).next((n=>n?Gr(n):null))}}function Mn(r){return _e(r,Yn)}function th(r){return _e(r,un)}function At(r){return _e(r,Xn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="LruGarbageCollector",jf=1048576;function rh([r,e],[t,n]){const s=z(r,t);return s===0?z(e,n):s}class gI{constructor(e){this.Pr=e,this.buffer=new te(rh),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();rh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zf{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){C(nh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jt(t)?C(nh,"Ignoring IndexedDB error during garbage collection: ",t):await qt(t)}await this.Ar(3e5)}))}}class _I{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return v.resolve(ke.ce);const n=new gI(t);return this.Vr.forEachTarget(e,(s=>n.Er(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>n.Er(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(eh)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),eh):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(n=p,c=Date.now(),this.removeTargets(e,n,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((p=>(h=Date.now(),Ln()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function $f(r,e){return new _I(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e,t){this.db=e,this.garbageCollector=$f(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((n,s)=>t(s)))}addReference(e,t,n){return ei(e,n)}removeReference(e,t,n){return ei(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return ei(e,t)}wr(e,t){return(function(s,i){let o=!1;return qf(s).te((c=>Bf(s,c,i).next((u=>(u&&(o=!0),v.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,U.min()),At(e).delete((function(p){return[0,Se(p.path)]})(o)))))}));s.push(u)}})).next((()=>v.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return ei(e,t)}yr(e,t){const n=At(e);let s,i=ke.ce;return n.ee({index:Wa},(([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==ke.ce&&t(new N(Ye(s)),i),i=h,s=u):i=ke.ce})).next((()=>{i!==ke.ce&&t(new N(Ye(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ei(r,e){return At(r).put((function(n,s){return{targetId:0,path:Se(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(){this.changes=new dt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Yt(e).put(n)}removeEntry(e,t,n){return Yt(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Di(o),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.br(e,n))))}getEntry(e,t){let n=ue.newInvalidDocument(t);return Yt(e).ee({index:ai,range:IDBKeyRange.only(Ur(t))},((s,i)=>{n=this.Sr(t,i)})).next((()=>n))}Dr(e,t){let n={size:0,document:ue.newInvalidDocument(t)};return Yt(e).ee({index:ai,range:IDBKeyRange.only(Ur(t))},((s,i)=>{n={document:this.Sr(t,i),size:Ni(i)}})).next((()=>n))}getEntries(e,t){let n=Me();return this.Cr(e,t,((s,i)=>{const o=this.Sr(s,i);n=n.insert(s,o)})).next((()=>n))}vr(e,t){let n=Me(),s=new se(N.comparator);return this.Cr(e,t,((i,o)=>{const c=this.Sr(i,o);n=n.insert(i,c),s=s.insert(i,Ni(o))})).next((()=>({documents:n,Fr:s})))}Cr(e,t,n){if(t.isEmpty())return v.resolve();let s=new te(oh);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Ur(s.first()),Ur(s.last())),o=s.getIterator();let c=o.getNext();return Yt(e).ee({index:ai,range:i},((u,h,f)=>{const p=N.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&oh(c,p)<0;)n(c,null),c=o.getNext();c&&c.isEqual(p)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Ur(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Di(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Yt(e).H(IDBKeyRange.bound(c,u,!0)).next((h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Me();for(const p of h){const _=this.Sr(N.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);_.isFoundDocument()&&(Rs(t,_)||s.has(_.key))&&(f=f.insert(_.key,_))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Me();const o=ih(t,n),c=ih(t,Fe.max());return Yt(e).ee({index:Cd,range:IDBKeyRange.bound(o,c,!0)},((u,h,f)=>{const p=this.Sr(N.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new EI(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return sh(e).get(pa).next((t=>(F(!!t,20021),t)))}br(e,t){return sh(e).put(pa,t)}Sr(e,t){if(t){const n=iI(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ue.newInvalidDocument(e)}}function Kf(r){return new II(r)}class EI extends Gf{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new dt((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new te(((i,o)=>z(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=ql(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Ni(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=ql(this.Mr.serializer,o.convertToNoDocument(U.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:n,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function sh(r){return _e(r,cs)}function Yt(r){return _e(r,Ai)}function Ur(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ih(r,e){const t=e.documentKey.path.toArray();return[r,Di(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function oh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=z(t[i],n[i]),s)return s;return s=z(t.length,n.length),s||(s=z(t[t.length-2],n[n.length-2]),s||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&ts(n.mutation,s,Be.empty(),Z.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,K()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=K()){const s=Xe();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=zr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=Xe();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,K())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,n,s){let i=Me();const o=es(),c=(function(){return es()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof zt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ts(f.mutation,h,f.mutation.getFieldMask(),Z.now())):o.set(h.key,Be.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new TI(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=es();let s=new se(((o,c)=>o-c)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Be.empty();f=c.applyToLocalView(h,f),n.set(u,f);const p=(s.get(c.batchId)||K()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,p=uf();f.forEach((_=>{if(!i.has(_)){const R=pf(t.get(_),n.get(_));R!==null&&p.set(_,R),i=i.add(_)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return v.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return Sy(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):nf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(Xe());let c=Qn,u=i;return o.next((h=>v.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next((_=>{u=u.insert(f,_)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,K()))).next((f=>({batchId:c,changes:cf(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new N(t)).next((n=>{let s=zr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=zr();return this.indexManager.getCollectionParents(e,i).next((c=>v.forEach(c,(u=>{const h=(function(p,_){return new mr(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((p,_)=>{o=o.insert(p,_)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ue.newInvalidDocument(f)))}));let c=zr();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&ts(f.mutation,h,Be.empty(),Z.now()),Rs(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return v.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Pe(s.createTime)}})(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:Of(s.bundledQuery),readTime:Pe(s.readTime)}})(t)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(){this.overlays=new se(N.comparator),this.Lr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Xe();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.bt(e,t,i)})),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=Xe(),i=t.length+1,o=new N(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new se(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Xe(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Xe(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return v.resolve(c)}bt(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new oc(t,n));let i=this.Lr.get(t);i===void 0&&(i=K(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(){this.kr=new te(Ie.Kr),this.qr=new te(Ie.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new Ie(e,t);this.kr=this.kr.add(n),this.qr=this.qr.add(n)}$r(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Wr(new Ie(e,t))}Qr(e,t){e.forEach((n=>this.removeReference(n,t)))}Gr(e){const t=new N(new X([])),n=new Ie(t,e),s=new Ie(t,e+1),i=[];return this.qr.forEachInRange([n,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new N(new X([])),n=new Ie(t,e),s=new Ie(t,e+1);let i=K();return this.qr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Ie(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ie{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return N.comparator(e.key,t.key)||z(e.Hr,t.Hr)}static Ur(e,t){return z(e.Hr,t.Hr)||N.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new te(Ie.Kr)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new sc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Jr=this.Jr.add(new Ie(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(o)}lookupMutationBatch(e,t){return v.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?cn:this.Yn-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ie(t,0),s=new Ie(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,s],(o=>{const c=this.Zr(o.Hr);i.push(c)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);return t.forEach((s=>{const i=new Ie(s,0),o=new Ie(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,o],(c=>{n=n.add(c.Hr)}))})),v.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;N.isDocumentKey(i)||(i=i.child(""));const o=new Ie(new N(i),0);let c=new te(z);return this.Jr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Hr)),!0)}),o),v.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((n=>{const s=this.Zr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){F(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Jr;return v.forEach(t.mutations,(s=>{const i=new Ie(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=n}))}nr(e){}containsKey(e,t){const n=new Ie(t,0),s=this.Jr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(e){this.ti=e,this.docs=(function(){return new se(N.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():ue.newInvalidDocument(t))}getEntries(e,t){let n=Me();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ue.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Me();const o=t.path,c=new N(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Ka(vd(f),n)<=0||(s.has(f.key)||Rs(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){M(9500)}ni(e,t){return v.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new RI(this)}getSize(e){return v.resolve(this.size)}}class RI extends Gf{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)})),v.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e){this.persistence=e,this.ri=new dt((t=>yn(t)),Ss),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new hc,this.targetCount=0,this.oi=Tn._r()}forEachTarget(e,t){return this.ri.forEach(((n,s)=>t(s))),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),v.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Tn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.lr(t),v.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),v.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t){this._i={},this.overlays={},this.ai=new ke(0),this.ui=!1,this.ui=!0,this.ci=new AI,this.referenceDelegate=e(this),this.li=new PI(this),this.indexManager=new fI,this.remoteDocumentCache=(function(s){return new bI(s)})((n=>this.referenceDelegate.hi(n))),this.serializer=new Nf(t),this.Pi=new wI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new vI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new SI(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const s=new CI(this.ai.next());return this.referenceDelegate.Ti(),n(s).next((i=>this.referenceDelegate.Ii(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ei(e,t){return v.or(Object.values(this._i).map((n=>()=>n.containsKey(e,t))))}}class CI extends Sd{constructor(e){super(),this.currentSequenceNumber=e}}class uo{constructor(e){this.persistence=e,this.Ri=new hc,this.Ai=null}static Vi(e){return new uo(e)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.di,(n=>{const s=N.fromPath(n);return this.mi(e,s).next((i=>{i||t.removeEntry(s,U.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class xi{constructor(e,t){this.persistence=e,this.fi=new dt((n=>Se(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=$f(this,t)}static Vi(e,t){return new xi(e,t)}Ti(){}Ii(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}pr(e){let t=0;return this.mr(e,(n=>{t++})).next((()=>t))}mr(e,t){return v.forEach(this.fi,((n,s)=>this.wr(e,n,s).next((i=>i?v.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(n++,i.removeEntry(o,U.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ui(e.data.value)),t}wr(e,t,n){return v.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e){this.serializer=e}k(e,t,n,s){const i=new Ji("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(As)})(e),(function(u){u.createObjectStore(as,{keyPath:q_}),u.createObjectStore(qe,{keyPath:_l,autoIncrement:!0}).createIndex(on,yl,{unique:!0}),u.createObjectStore(Jn)})(e),ah(e),(function(u){u.createObjectStore(en)})(e));let o=v.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(Xn),u.deleteObjectStore(Yn),u.deleteObjectStore(un)})(e),ah(e)),o=o.next((()=>(function(u){const h=u.store(un),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put(Si,f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(u,h){return h.store(qe).H().next((p=>{u.deleteObjectStore(qe),u.createObjectStore(qe,{keyPath:_l,autoIncrement:!0}).createIndex(on,yl,{unique:!0});const _=h.store(qe),R=p.map((V=>_.put(V)));return v.waitFor(R)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(Zn,{keyPath:J_})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.gi(i)))),n<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(cs)})(e),this.pi(i))))),n<7&&s>=7&&(o=o.next((()=>this.yi(i)))),n<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.bi(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(Xi,{keyPath:Y_})})(e),(function(u){u.createObjectStore(Zi,{keyPath:X_})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(u){const h=u.createObjectStore(eo,{keyPath:iy});h.createIndex(_a,oy,{unique:!1}),h.createIndex(Nd,ay,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(u){const h=u.createObjectStore(Ai,{keyPath:z_});h.createIndex(ai,$_),h.createIndex(Cd,G_)})(e))).next((()=>this.Si(e,i))).next((()=>e.deleteObjectStore(en)))),n<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Qa,{keyPath:Z_,autoIncrement:!0}).createIndex(ga,ey,{unique:!1}),u.createObjectStore(Jr,{keyPath:ty}).createIndex(Dd,ny,{unique:!1}),u.createObjectStore(Yr,{keyPath:ry}).createIndex(kd,sy,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore(Jr).clear()})).next((()=>{t.objectStore(Yr).clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(Ja,{keyPath:cy})})(e)}))),n<18&&s>=18&&sd()&&(o=o.next((()=>{t.objectStore(Jr).clear()})).next((()=>{t.objectStore(Yr).clear()}))),o}pi(e){let t=0;return e.store(en).ee(((n,s)=>{t+=Ni(s)})).next((()=>{const n={byteSize:t};return e.store(cs).put(pa,n)}))}gi(e){const t=e.store(as),n=e.store(qe);return t.H().next((s=>v.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,cn],[i.userId,i.lastAcknowledgedBatchId]);return n.H(on,o).next((c=>v.forEach(c,(u=>{F(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=nn(this.serializer,u);return Uf(e,i.userId,h).next((()=>{}))}))))}))))}yi(e){const t=e.store(Xn),n=e.store(en);return e.store(un).get(Si).next((s=>{const i=[];return n.ee(((o,c)=>{const u=new X(o),h=(function(p){return[0,Se(p)]})(u);i.push(t.get(h).next((f=>f?v.resolve():(p=>t.put({targetId:0,path:Se(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>v.waitFor(i)))}))}wi(e,t){e.createObjectStore(us,{keyPath:Q_});const n=t.store(us),s=new lc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Se(u)})}};return t.store(en).ee({Y:!0},((o,c)=>{const u=new X(o);return i(u.popLast())})).next((()=>t.store(Jn).ee({Y:!0},(([o,c,u],h)=>{const f=Ye(c);return i(f.popLast())}))))}bi(e){const t=e.store(Yn);return t.ee(((n,s)=>{const i=Gr(s),o=xf(this.serializer,i);return t.put(o)}))}Si(e,t){const n=t.store(en),s=[];return n.ee(((i,o)=>{const c=t.store(Ai),u=(function(p){return p.document?new N(X.fromString(p.document.name).popFirst(5)):p.noDocument?N.fromSegments(p.noDocument.path):p.unknownDocument?N.fromSegments(p.unknownDocument.path):M(36783)})(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>v.waitFor(s)))}Di(e,t){const n=t.store(qe),s=Kf(this.serializer),i=new dc(uo.Vi,this.serializer.yt);return n.H().next((o=>{const c=new Map;return o.forEach((u=>{let h=c.get(u.userId)??K();nn(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),v.forEach(c,((u,h)=>{const f=new Ee(h),p=ao.wt(this.serializer,f),_=i.getIndexManager(f),R=co.wt(f,this.serializer,_,i.referenceDelegate);return new Hf(s,R,p,_).recalculateAndSaveOverlaysForDocumentKeys(new ya(t,ke.ce),u).next()}))}))}}function ah(r){r.createObjectStore(Xn,{keyPath:H_}).createIndex(Wa,W_,{unique:!0}),r.createObjectStore(Yn,{keyPath:"targetId"}).createIndex(Vd,K_,{unique:!0}),r.createObjectStore(un)}const wt="IndexedDbPersistence",Xo=18e5,Zo=5e3,ea="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",DI="main";class fc{constructor(e,t,n,s,i,o,c,u,h,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=_=>Promise.resolve(),!fc.v())throw new D(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new yI(this,s),this.Ki=t+DI,this.serializer=new Nf(u),this.qi=new xt(this.Ki,this.xi,new VI(this.serializer)),this.ci=new aI,this.li=new pI(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Kf(this.serializer),this.Pi=new oI,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&le(wt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,ea);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new ke(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.qi&&this.qi.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ti(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Hi(e))).next((t=>this.isPrimary&&!t?this.Ji(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(jt(e))return C(wt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C(wt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Br(e).get(Dn).next((t=>v.resolve(this.Xi(t))))}Yi(e){return ti(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Xo)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=_e(t,Zn);return n.H().next((s=>{const i=this.ns(s,Xo),o=s.filter((c=>i.indexOf(c)===-1));return v.forEach(o,(c=>n.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.Mi?v.resolve(!0):Br(e).get(Dn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Zo)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,ea);return!1}}return!(!this.networkEnabled||!this.inForeground)||ti(e).H().next((n=>this.ns(n,Zo).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&C(wt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[As,Zn],(e=>{const t=new ya(e,ke.ce);return this.Ji(t).next((()=>this.Yi(t)))})),this.qi.close(),this.ls()}ns(e,t){return e.filter((n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>ti(e).H().next((t=>this.ns(t,Xo).map((n=>n.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return co.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new mI(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return ao.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){C(wt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?hy:u===17?Ld:u===16?ly:u===15?Ya:u===14?Md:u===13?Od:u===12?uy:u===11?xd:void M(60245)})(this.xi);let o;return this.qi.runTransaction(e,s,i,(c=>(o=new ya(c,this.ai?this.ai.next():ke.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Hi(o))).next((u=>{if(!u)throw le(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(P.FAILED_PRECONDITION,Ad);return n(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>n(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Br(e).get(Dn).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Zo)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(P.FAILED_PRECONDITION,ea)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Br(e).put(Dn,t)}static v(){return xt.v()}Ji(e){const t=Br(e);return t.get(Dn).next((n=>this.Xi(n)?(C(wt,"Releasing primary lease."),t.delete(Dn)):v.resolve()))}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(le(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;rd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return C(wt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return le(wt,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){le("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Br(r){return _e(r,As)}function ti(r){return _e(r,Zn)}function Wf(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Is=s}static Es(e,t){let n=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new mc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return rd()?8:bd(ge())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new kI;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,n,s){return n.documentReadCount<this.Vs?(Ln()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Fn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(Ln()<=H.DEBUG&&C("QueryEngine","Query:",Fn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Ln()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Fn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Le(t))):v.resolve())}gs(e,t){if(Dl(t))return v.resolve(null);let n=Le(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Pi(t,null,"F"),n=Le(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=K(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.bs(t,c);return this.Ss(t,h,o,u.readTime)?this.gs(e,Pi(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,n,s){return Dl(t)||s.isEqual(U.min())?v.resolve(null):this.fs.getDocuments(e,n).next((i=>{const o=this.bs(t,i);return this.Ss(t,o,n,s)?v.resolve(null):(Ln()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Fn(t)),this.Ds(e,o,t,wd(s,Qn)).next((c=>c)))}))}bs(e,t){let n=new te(of(e));return t.forEach(((s,i)=>{Rs(e,i)&&(n=n.add(i))})),n}Ss(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return Ln()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Fn(t)),this.fs.getDocumentsMatchingQuery(e,t,Fe.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc="LocalStore",NI=3e8;class xI{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new se(z),this.Fs=new dt((i=>yn(i)),Ss),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Hf(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function Jf(r,e,t,n){return new xI(r,e,t,n)}async function Yf(r,e){const t=L(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],c=[];let u=K();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function OI(r,e){const t=L(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const p=h.batch,_=p.keys();let R=v.resolve();return _.forEach((V=>{R=R.next((()=>f.getEntry(u,V))).next((x=>{const O=h.docVersions.get(V);F(O!==null,48541),x.version.compareTo(O)<0&&(p.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))}))})),R.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=K();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Xf(r){const e=L(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function MI(r,e){const t=L(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,p)=>{const _=s.get(p);if(!_)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,p))));let R=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?R=R.withResumeToken(de.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),s=s.insert(p,R),(function(x,O,$){return x.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=NI?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(_,R,f)&&c.push(t.li.updateTargetData(i,R))}));let u=Me(),h=K();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(LI(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!n.isEqual(U.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return v.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=s,i)))}function LI(r,e,t){let n=K(),s=K();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=Me();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C(pc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function FI(r,e){const t=L(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=cn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Oi(r,e){const t=L(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.li.getTargetData(n,e).next((i=>i?(s=i,v.resolve(s)):t.li.allocateTargetId(n).next((o=>(s=new st(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n}))}async function ar(r,e,t){const n=L(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!jt(o))throw o;C(pc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function ka(r,e,t){const n=L(r);let s=U.min(),i=K();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const p=L(u),_=p.Fs.get(f);return _!==void 0?v.resolve(p.vs.get(_)):p.li.getTargetData(h,f)})(n,o,Le(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:K()))).next((c=>(tm(n,sf(e),c),{documents:c,ks:i})))))}function Zf(r,e){const t=L(r),n=L(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,e).next((o=>o?o.target:null))))}function em(r,e){const t=L(r),n=t.Ms.get(e)||U.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.xs.getAllFromCollectionGroup(s,e,wd(n,Qn),Number.MAX_SAFE_INTEGER))).then((s=>(tm(t,e,s),s)))}function tm(r,e,t){let n=r.Ms.get(e)||U.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Ms.set(e,n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="firestore_clients";function ch(r,e){return`${nm}_${r}_${e}`}const rm="firestore_mutations";function uh(r,e,t){let n=`${rm}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const sm="firestore_targets";function ta(r,e){return`${sm}_${r}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="SharedClientState";class Mi{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static $s(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new D(s.error.code,s.error.message))),o?new Mi(e,t,s.state,i):(le(Je,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ns{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new D(n.error.code,n.error.message))),i?new ns(e,n.state,s):(le(Je,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Li{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=nc();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=Rd(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new Li(e,i):(le(Je,`Failed to parse client data for instance '${e}': ${t}`),null)}}class gc{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new gc(t.clientId,t.onlineState):(le(Je,`Failed to parse online state: ${e}`),null)}}class Na{constructor(){this.activeTargetIds=nc()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class na{constructor(e,t,n,s,i){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Hs.bind(this),this.Js=new se(z),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=ch(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Js=this.Js.insert(this.zs,new Na),this.eo=new RegExp(`^${nm}_${o}_([^_]*)$`),this.no=new RegExp(`^${rm}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${sm}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const n of e){if(n===this.zs)continue;const s=this.getItem(ch(this.persistenceKey,n));if(s){const i=Li.$s(n,s);i&&(this.Js=this.Js.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const n=this._o(t);n&&this.ao(n)}for(const n of this.Zs)this.Hs(n);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Js)}isActiveQueryTarget(e){let t=!1;return this.Js.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(ta(this.persistenceKey,e));if(s){const i=ns.$s(e,s);i&&(n=i.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(ta(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.lo(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return C(Je,"READ",e,t),t}setItem(e,t){C(Je,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){C(Je,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(C(Je,"EVENT",t.key,t.newValue),t.key===this.Xs)return void le("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const n=this.Eo(t.key);return this.Ro(n,null)}{const n=this.Ao(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(t.key)){if(t.newValue!==null){const n=this.Vo(t.key,t.newValue);if(n)return this.mo(n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(t.key===this.io){if(t.newValue!==null){const n=this._o(t.newValue);if(n)return this.ao(n)}}else if(t.key===this.Ys){const n=(function(i){let o=ke.ce;if(i!=null)try{const c=JSON.parse(i);F(typeof c=="number",30636,{yo:i}),o=c}catch(c){le(Je,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);n!==ke.ce&&this.sequenceNumberHandler(n)}else if(t.key===this.so){const n=this.wo(t.newValue);await Promise.all(n.map((s=>this.syncEngine.bo(s))))}}}else this.Zs.push(t)}))}}get ho(){return this.Js.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const s=new Mi(this.currentUser,e,t,n),i=uh(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=uh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const s=ta(this.persistenceKey,e),i=new ns(e,t,n);this.setItem(s,i.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Eo(e);return Li.$s(n,t)}Vo(e,t){const n=this.no.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Mi.$s(new Ee(i),s,t)}fo(e,t){const n=this.ro.exec(e),s=Number(n[1]);return ns.$s(s,t)}_o(e){return gc.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.So(e.batchId,e.state,e.error);C(Je,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Js.insert(e,t):this.Js.remove(e),s=this.uo(this.Js),i=this.uo(n),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Js=n}))}ao(e){this.Js.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=nc();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class im{constructor(){this.vo=new Na,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Na,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh="ConnectivityMonitor";class hh{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){C(lh,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){C(lh,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni=null;function xa(){return ni===null?ni=(function(){return 268435456+Math.round(2147483648*Math.random())})():ni++,"0x"+ni.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="RestConnection",BI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class qI{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===hs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=xa(),c=this.Qo(e,t.toUriEncodedString());C(ra,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=Sn(h);return this.zo(e,c,u,n,f).then((p=>(C(ra,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw gn(ra,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",n),p}))}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+fr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const n=BI[e];let s=`${this.qo}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve="WebChannelConnection",qr=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class jn extends qI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!jn.c_){const e=pd();qr(e,md.STAT_EVENT,(t=>{t.stat===da.PROXY?C(ve,"STAT_EVENT: detected buffering proxy"):t.stat===da.NOPROXY&&C(ve,"STAT_EVENT: detected no buffering proxy")})),jn.c_=!0}}zo(e,t,n,s,i){const o=xa();return new Promise(((c,u)=>{const h=new dd;h.setWithCredentials(!0),h.listenOnce(fd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case si.NO_ERROR:const p=h.getResponseJson();C(ve,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case si.TIMEOUT:C(ve,`RPC '${e}' ${o} timed out`),u(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case si.HTTP_ERROR:const _=h.getStatus();if(C(ve,`RPC '${e}' ${o} failed with status:`,_,"response text:",h.getResponseText()),_>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const V=R==null?void 0:R.error;if(V&&V.status&&V.message){const x=(function($){const B=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN})(V.status);u(new D(x,V.message))}else u(new D(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new D(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{C(ve,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);C(ve,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=xa(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");C(ve,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.I_(f);let p=!1,_=!1;const R=new jI({Ho:V=>{_?C(ve,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(p||(C(ve,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),C(ve,`RPC '${e}' stream ${s} sending:`,V),f.send(V))},Jo:()=>f.close()});return qr(f,jr.EventType.OPEN,(()=>{_||(C(ve,`RPC '${e}' stream ${s} transport opened.`),R.i_())})),qr(f,jr.EventType.CLOSE,(()=>{_||(_=!0,C(ve,`RPC '${e}' stream ${s} transport closed`),R.o_(),this.E_(f))})),qr(f,jr.EventType.ERROR,(V=>{_||(_=!0,gn(ve,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),R.o_(new D(P.UNAVAILABLE,"The operation could not be completed")))})),qr(f,jr.EventType.MESSAGE,(V=>{var x;if(!_){const O=V.data[0];F(!!O,16349);const $=O,B=($==null?void 0:$.error)||((x=$[0])==null?void 0:x.error);if(B){C(ve,`RPC '${e}' stream ${s} received error:`,B);const q=B.status;let ne=(function(E){const g=fe[E];if(g!==void 0)return yf(g)})(q),J=B.message;q==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&gn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ne===void 0&&(ne=P.INTERNAL,J="Unknown error status: "+q+" with message "+B.message),_=!0,R.o_(new D(ne,J)),f.close()}else C(ve,`RPC '${e}' stream ${s} received:`,O),R.__(O)}})),jn.u_(),setTimeout((()=>{R.s_()}),0),R}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return gd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zI(r){return new jn(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(){return typeof window<"u"?window:null}function mi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(r){return new Qy(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jn.c_=!1;class am{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&C("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="PersistentStream";class cm{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.b_=n,this.S_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new am(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(le(t.toString()),le("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new D(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{n((()=>this.listener.Zo()))})),this.stream.Yo((()=>{n((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.H_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return C(dh,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(C(dh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class $I extends cm{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Xy(this.serializer,e),n=(function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?Pe(o.readTime):U.min()})(e);return this.listener.J_(t,n)}Z_(e){const t={};t.database=Ra(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=bi(u)?{documents:bf(i,u)}:{query:Rf(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Tf(i,o.resumeToken);const h=Sa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){c.readTime=or(i,o.snapshotVersion.toTimestamp());const h=Sa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=eI(this.serializer,e);n&&(t.labels=n),this.K_(t)}X_(e){const t={};t.database=Ra(this.serializer),t.removeTarget=e,this.K_(t)}}class GI extends cm{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Zy(e.writeResults,e.commitTime),n=Pe(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Ra(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Vi(this.serializer,n)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KI{}class HI extends KI{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,ba(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(P.UNKNOWN,i.toString())}))}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,ba(t,n),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function WI(r,e,t,n){return new HI(r,e,t,n)}class QI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(le(t),this.aa=!1):C("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn="RemoteStore";class JI{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{n.enqueueAndForget((async()=>{Rn(this)&&(C(wn,"Restarting streams for network reachability change."),await(async function(u){const h=L(u);h.Ea.add(4),await Vs(h),h.Va.set("Unknown"),h.Ea.delete(4),await ho(h)})(this))}))})),this.Va=new QI(n,s)}}async function ho(r){if(Rn(r))for(const e of r.Ra)await e(!0)}async function Vs(r){for(const e of r.Ra)await e(!1)}function fo(r,e){const t=L(r);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ic(t)?yc(t):_r(t).O_()&&_c(t,e))}function cr(r,e){const t=L(r),n=_r(t);t.Ia.delete(e),n.O_()&&um(t,e),t.Ia.size===0&&(n.O_()?n.L_():Rn(t)&&t.Va.set("Unknown"))}function _c(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}_r(r).Z_(e)}function um(r,e){r.da.$e(e),_r(r).X_(e)}function yc(r){r.da=new Gy({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ia.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),_r(r).start(),r.Va.ua()}function Ic(r){return Rn(r)&&!_r(r).x_()&&r.Ia.size>0}function Rn(r){return L(r).Ea.size===0}function lm(r){r.da=void 0}async function YI(r){r.Va.set("Online")}async function XI(r){r.Ia.forEach(((e,t)=>{_c(r,e)}))}async function ZI(r,e){lm(r),Ic(r)?(r.Va.ha(e),yc(r)):r.Va.set("Unknown")}async function eE(r,e,t){if(r.Va.set("Online"),e instanceof Ef&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.da.removeTarget(c))})(r,e)}catch(n){C(wn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Fi(r,n)}else if(e instanceof di?r.da.Xe(e):e instanceof If?r.da.st(e):r.da.tt(e),!t.isEqual(U.min()))try{const n=await Xf(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(de.EMPTY_BYTE_STRING,f.snapshotVersion)),um(i,u);const p=new st(f.target,u,h,f.sequenceNumber);_c(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){C(wn,"Failed to raise snapshot:",n),await Fi(r,n)}}async function Fi(r,e,t){if(!jt(e))throw e;r.Ea.add(1),await Vs(r),r.Va.set("Offline"),t||(t=()=>Xf(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{C(wn,"Retrying IndexedDB access"),await t(),r.Ea.delete(1),await ho(r)}))}function hm(r,e){return e().catch((t=>Fi(r,t,e)))}async function gr(r){const e=L(r),t=Ut(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:cn;for(;tE(e);)try{const s=await FI(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,nE(e,s)}catch(s){await Fi(e,s)}dm(e)&&fm(e)}function tE(r){return Rn(r)&&r.Ta.length<10}function nE(r,e){r.Ta.push(e);const t=Ut(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function dm(r){return Rn(r)&&!Ut(r).x_()&&r.Ta.length>0}function fm(r){Ut(r).start()}async function rE(r){Ut(r).ra()}async function sE(r){const e=Ut(r);for(const t of r.Ta)e.ea(t.mutations)}async function iE(r,e,t){const n=r.Ta.shift(),s=ic.from(n,e,t);await hm(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await gr(r)}async function oE(r,e){e&&Ut(r).Y_&&await(async function(n,s){if((function(o){return jy(o)&&o!==P.ABORTED})(s.code)){const i=n.Ta.shift();Ut(n).B_(),await hm(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await gr(n)}})(r,e),dm(r)&&fm(r)}async function fh(r,e){const t=L(r);t.asyncQueue.verifyOperationInProgress(),C(wn,"RemoteStore received new credentials");const n=Rn(t);t.Ea.add(3),await Vs(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ho(t)}async function Oa(r,e){const t=L(r);e?(t.Ea.delete(2),await ho(t)):e||(t.Ea.add(2),await Vs(t),t.Va.set("Unknown"))}function _r(r){return r.ma||(r.ma=(function(t,n,s){const i=L(t);return i.sa(),new $I(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:YI.bind(null,r),Yo:XI.bind(null,r),t_:ZI.bind(null,r),J_:eE.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),Ic(r)?yc(r):r.Va.set("Unknown")):(await r.ma.stop(),lm(r))}))),r.ma}function Ut(r){return r.fa||(r.fa=(function(t,n,s){const i=L(t);return i.sa(),new GI(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:rE.bind(null,r),t_:oE.bind(null,r),ta:sE.bind(null,r),na:iE.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await gr(r)):(await r.fa.stop(),r.Ta.length>0&&(C(wn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ze,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new Ec(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Tc(r,e){if(le("AsyncQueue",`${e}: ${r}`),jt(r))return new D(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{static emptySet(e){return new zn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||N.comparator(t.key,n.key):(t,n)=>N.comparator(t.key,n.key),this.keyedMap=zr(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof zn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new zn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(){this.ga=new se(N.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class ur{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new ur(e,t,zn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class cE{constructor(){this.queries=ph(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=L(t),i=s.queries;s.queries=ph(),i.forEach(((o,c)=>{for(const u of c.ba)u.onError(n)}))})(this,new D(P.ABORTED,"Firestore shutting down"))}}function ph(){return new dt((r=>rf(r)),ro)}async function wc(r,e){const t=L(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.Da()&&(n=2):(i=new aE,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Tc(o,`Initialization of query '${Fn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.ba.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Ac(t)}async function vc(r,e){const t=L(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.ba.indexOf(e);o>=0&&(i.ba.splice(o,1),i.ba.length===0?s=e.Da()?0:1:!i.Sa()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function uE(r,e){const t=L(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.ba)c.Fa(s)&&(n=!0);o.wa=s}}n&&Ac(t)}function lE(r,e,t){const n=L(r),s=n.queries.get(e);if(s)for(const i of s.ba)i.onError(t);n.queries.delete(e)}function Ac(r){r.Ca.forEach((e=>{e.next()}))}var Ma,gh;(gh=Ma||(Ma={})).Ma="default",gh.Cache="cache";class Sc{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new ur(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.Ka||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=ur.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ma.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e){this.key=e}}class pm{constructor(e){this.key=e}}class hE{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=K(),this.mutatedKeys=K(),this.eu=of(e),this.tu=new zn(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new mh,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const _=s.get(f),R=Rs(this.query,p)?p:null,V=!!_&&this.mutatedKeys.has(_.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let O=!1;_&&R?_.data.isEqual(R.data)?V!==x&&(n.track({type:3,doc:R}),O=!0):this.su(_,R)||(n.track({type:2,doc:R}),O=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(c=!0)):!_&&R?(n.track({type:0,doc:R}),O=!0):_&&!R&&(n.track({type:1,doc:_}),O=!0,(u||h)&&(c=!0)),O&&(R?(o=o.add(R),i=x?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,Ss:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,p)=>(function(R,V){const x=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:O})}};return x(R)-x(V)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new ur(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new mh,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=K(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))}));const t=[];return e.forEach((n=>{this.Ya.has(n)||t.push(new pm(n))})),this.Ya.forEach((n=>{e.has(n)||t.push(new mm(n))})),t}cu(e){this.Za=e.ks,this.Ya=K();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ur.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const yr="SyncEngine";class dE{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class fE{constructor(e){this.key=e,this.hu=!1}}class mE{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new dt((c=>rf(c)),ro),this.Iu=new Map,this.Eu=new Set,this.Ru=new se(N.comparator),this.Au=new Map,this.Vu=new hc,this.du={},this.mu=new Map,this.fu=Tn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function pE(r,e,t=!0){const n=mo(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await gm(n,e,t,!0),s}async function gE(r,e){const t=mo(r);await gm(t,e,!0,!1)}async function gm(r,e,t,n){const s=await Oi(r.localStore,Le(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await bc(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&fo(r.remoteStore,s),c}async function bc(r,e,t,n,s){r.pu=(p,_,R)=>(async function(x,O,$,B){let q=O.view.ru($);q.Ss&&(q=await ka(x.localStore,O.query,!1).then((({documents:E})=>O.view.ru(E,q))));const ne=B&&B.targetChanges.get(O.targetId),J=B&&B.targetMismatches.get(O.targetId)!=null,Y=O.view.applyChanges(q,x.isPrimaryClient,ne,J);return La(x,O.targetId,Y.au),Y.snapshot})(r,p,_,R);const i=await ka(r.localStore,e,!0),o=new hE(e,i.ks),c=o.ru(i.documents),u=Cs.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);La(r,t,h.au);const f=new dE(e,t,o);return r.Tu.set(e,f),r.Iu.has(t)?r.Iu.get(t).push(e):r.Iu.set(t,[e]),h.snapshot}async function _E(r,e,t){const n=L(r),s=n.Tu.get(e),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter((o=>!ro(o,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await ar(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&cr(n.remoteStore,s.targetId),lr(n,s.targetId)})).catch(qt)):(lr(n,s.targetId),await ar(n.localStore,s.targetId,!0))}async function yE(r,e){const t=L(r),n=t.Tu.get(e),s=t.Iu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),cr(t.remoteStore,n.targetId))}async function IE(r,e,t){const n=Vc(r);try{const s=await(function(o,c){const u=L(o),h=Z.now(),f=c.reduce(((R,V)=>R.add(V.key)),K());let p,_;return u.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let V=Me(),x=K();return u.xs.getEntries(R,f).next((O=>{V=O,V.forEach((($,B)=>{B.isValidDocument()||(x=x.add($))}))})).next((()=>u.localDocuments.getOverlayedDocuments(R,V))).next((O=>{p=O;const $=[];for(const B of c){const q=By(B,p.get(B.key).overlayedDocument);q!=null&&$.push(new zt(B.key,q,Hd(q.value.mapValue),Ne.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,$,c)})).next((O=>{_=O;const $=O.applyToLocalDocumentSet(p,x);return u.documentOverlayCache.saveOverlays(R,O.batchId,$)}))})).then((()=>({batchId:_.batchId,changes:cf(p)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new se(z)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(n,s.batchId,t),await $t(n,s.changes),await gr(n.remoteStore)}catch(s){const i=Tc(s,"Failed to persist write");t.reject(i)}}async function _m(r,e){const t=L(r);try{const n=await MI(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?F(o.hu,14607):s.removedDocuments.size>0&&(F(o.hu,42227),o.hu=!1))})),await $t(t,n,e)}catch(n){await qt(n)}}function _h(r,e,t){const n=L(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=L(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,p)=>{for(const _ of p.ba)_.va(c)&&(h=!0)})),h&&Ac(u)})(n.eventManager,e),s.length&&n.Pu.J_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function EE(r,e,t){const n=L(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new se(N.comparator);o=o.insert(i,ue.newNoDocument(i,U.min()));const c=K().add(i),u=new Ps(U.min(),new Map,new se(z),o,c);await _m(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),Cc(n)}else await ar(n.localStore,e,!1).then((()=>lr(n,e,t))).catch(qt)}async function TE(r,e){const t=L(r),n=e.batch.batchId;try{const s=await OI(t.localStore,e);Pc(t,n,null),Rc(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await $t(t,s)}catch(s){await qt(s)}}async function wE(r,e,t){const n=L(r);try{const s=await(function(o,c){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((p=>(F(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Pc(n,e,t),Rc(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await $t(n,s)}catch(s){await qt(s)}}function Rc(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Pc(r,e,t){const n=L(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function lr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Iu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Iu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((n=>{r.Vu.containsKey(n)||ym(r,n)}))}function ym(r,e){r.Eu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(cr(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),Cc(r))}function La(r,e,t){for(const n of t)n instanceof mm?(r.Vu.addReference(n.key,e),vE(r,n)):n instanceof pm?(C(yr,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||ym(r,n.key)):M(19791,{wu:n})}function vE(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Eu.has(n)||(C(yr,"New document in limbo: "+t),r.Eu.add(n),Cc(r))}function Cc(r){for(;r.Eu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Eu.values().next().value;r.Eu.delete(e);const t=new N(X.fromString(e)),n=r.fu.next();r.Au.set(n,new fE(t)),r.Ru=r.Ru.insert(t,n),fo(r.remoteStore,new st(Le(bs(t.path)),n,"TargetPurposeLimboResolution",ke.ce))}}async function $t(r,e,t){const n=L(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{o.push(n.pu(u,e,t).then((h=>{var f;if((h||t)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=mc.Es(u.targetId,h);i.push(p)}})))})),await Promise.all(o),n.Pu.J_(s),await(async function(u,h){const f=L(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>v.forEach(h,(_=>v.forEach(_.Ts,(R=>f.persistence.referenceDelegate.addReference(p,_.targetId,R))).next((()=>v.forEach(_.Is,(R=>f.persistence.referenceDelegate.removeReference(p,_.targetId,R)))))))))}catch(p){if(!jt(p))throw p;C(pc,"Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const R=f.vs.get(_),V=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(V);f.vs=f.vs.insert(_,x)}}})(n.localStore,i))}async function AE(r,e){const t=L(r);if(!t.currentUser.isEqual(e)){C(yr,"User change. New user:",e.toKey());const n=await Yf(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new D(P.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await $t(t,n.Ns)}}function SE(r,e){const t=L(r),n=t.Au.get(e);if(n&&n.hu)return K().add(n.key);{let s=K();const i=t.Iu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function bE(r,e){const t=L(r),n=await ka(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&La(t,e.targetId,s.au),s}async function RE(r,e){const t=L(r);return em(t.localStore,e).then((n=>$t(t,n)))}async function PE(r,e,t,n){const s=L(r),i=await(function(c,u){const h=L(c),f=L(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(p=>f.Xn(p,u).next((_=>_?h.localDocuments.getDocuments(p,_):v.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await gr(s.remoteStore):t==="acknowledged"||t==="rejected"?(Pc(s,e,n||null),Rc(s,e),(function(c,u){L(L(c).mutationQueue).nr(u)})(s.localStore,e)):M(6720,"Unknown batchState",{bu:t}),await $t(s,i)):C(yr,"Cannot apply mutation batch with id: "+e)}async function CE(r,e){const t=L(r);if(mo(t),Vc(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await yh(t,n.toArray());t.gu=!0,await Oa(t.remoteStore,!0);for(const i of s)fo(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Iu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then((()=>(lr(t,o),ar(t.localStore,o,!0)))),cr(t.remoteStore,o)})),await s,await yh(t,n),(function(o){const c=L(o);c.Au.forEach(((u,h)=>{cr(c.remoteStore,h)})),c.Vu.zr(),c.Au=new Map,c.Ru=new se(N.comparator)})(t),t.gu=!1,await Oa(t.remoteStore,!1)}}async function yh(r,e,t){const n=L(r),s=[],i=[];for(const o of e){let c;const u=n.Iu.get(o);if(u&&u.length!==0){c=await Oi(n.localStore,Le(u[0]));for(const h of u){const f=n.Tu.get(h),p=await bE(n,f);p.snapshot&&i.push(p.snapshot)}}else{const h=await Zf(n.localStore,o);c=await Oi(n.localStore,h),await bc(n,Im(h),o,!1,c.resumeToken)}s.push(c)}return n.Pu.J_(i),s}function Im(r){return tf(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function VE(r){return(function(t){return L(L(t).persistence).hs()})(L(r).localStore)}async function DE(r,e,t,n){const s=L(r);if(s.gu)return void C(yr,"Ignoring unexpected query state notification.");const i=s.Iu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await em(s.localStore,sf(i[0])),c=Ps.createSynthesizedRemoteEventForCurrentChange(e,t==="current",de.EMPTY_BYTE_STRING);await $t(s,o,c);break}case"rejected":await ar(s.localStore,e,!0),lr(s,e,n);break;default:M(64155,t)}}async function kE(r,e,t){const n=mo(r);if(n.gu){for(const s of e){if(n.Iu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){C(yr,"Adding an already active target "+s);continue}const i=await Zf(n.localStore,s),o=await Oi(n.localStore,i);await bc(n,Im(i),o.targetId,!1,o.resumeToken),fo(n.remoteStore,o)}for(const s of t)n.Iu.has(s)&&await ar(n.localStore,s,!1).then((()=>{cr(n.remoteStore,s),lr(n,s)})).catch(qt)}}function mo(r){const e=L(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=_m.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=SE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=EE.bind(null,e),e.Pu.J_=uE.bind(null,e.eventManager),e.Pu.yu=lE.bind(null,e.eventManager),e}function Vc(r){const e=L(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=TE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=wE.bind(null,e),e}class ys{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=lo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Jf(this.persistence,new Qf,e.initialUser,this.serializer)}Cu(e){return new dc(uo.Vi,this.serializer)}Du(e){return new im}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ys.provider={build:()=>new ys};class NE extends ys{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof xi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new zf(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new dc((n=>xi.Vi(n,t)),this.serializer)}}class Em extends ys{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Vc(this.xu.syncEngine),await gr(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return Jf(this.persistence,new Qf,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new zf(n,e.asyncQueue,t)}Mu(e,t){const n=new U_(t,this.persistence);return new F_(e.asyncQueue,n)}Cu(e){const t=Wf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new fc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,om(),mi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new im}}class xE extends Em{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof na&&(this.sharedClientState.syncEngine={So:PE.bind(null,t),Do:DE.bind(null,t),Co:kE.bind(null,t),hs:VE.bind(null,t),bo:RE.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async n=>{await CE(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(e){const t=om();if(!na.v(t))throw new D(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Wf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new na(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Is{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>_h(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=AE.bind(null,this.syncEngine),await Oa(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new cE})()}createDatastore(e){const t=lo(e.databaseInfo.databaseId),n=zI(e.databaseInfo);return WI(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,c){return new JI(n,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>_h(this.syncEngine,t,0)),(function(){return hh.v()?new hh:new UI})())}createSyncEngine(e,t){return(function(s,i,o,c,u,h,f){const p=new mE(s,i,o,c,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=L(s);C(wn,"RemoteStore shutting down."),i.Ea.add(5),await Vs(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Is.provider={build:()=>new Is};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):le("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt="FirestoreClient";class OE{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=Ee.UNAUTHENTICATED,this.clientId=Ga.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{C(Bt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(C(Bt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ze;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Tc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function sa(r,e){r.asyncQueue.verifyOperationInProgress(),C(Bt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Yf(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Ih(r,e){r.asyncQueue.verifyOperationInProgress();const t=await ME(r);C(Bt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>fh(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>fh(e.remoteStore,s))),r._onlineComponents=e}async function ME(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C(Bt,"Using user provided OfflineComponentProvider");try{await sa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;gn("Error using user provided cache. Falling back to memory cache: "+t),await sa(r,new ys)}}else C(Bt,"Using default OfflineComponentProvider"),await sa(r,new NE(void 0));return r._offlineComponents}async function Tm(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C(Bt,"Using user provided OnlineComponentProvider"),await Ih(r,r._uninitializedComponentsProvider._online)):(C(Bt,"Using default OnlineComponentProvider"),await Ih(r,new Is))),r._onlineComponents}function LE(r){return Tm(r).then((e=>e.syncEngine))}async function Ui(r){const e=await Tm(r),t=e.eventManager;return t.onListen=pE.bind(null,e.syncEngine),t.onUnlisten=_E.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=gE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=yE.bind(null,e.syncEngine),t}function FE(r,e,t,n){const s=new Dc(n),i=new Sc(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>wc(await Ui(r),i))),()=>{s.Nu(),r.asyncQueue.enqueueAndForget((async()=>vc(await Ui(r),i)))}}function UE(r,e,t={}){const n=new Ze;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Dc({next:_=>{f.Nu(),o.enqueueAndForget((()=>vc(i,p)));const R=_.docs.has(c);!R&&_.fromCache?h.reject(new D(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&_.fromCache&&u&&u.source==="server"?h.reject(new D(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Sc(bs(c.path),f,{includeMetadataChanges:!0,Ka:!0});return wc(i,p)})(await Ui(r),r.asyncQueue,e,t,n))),n.promise}function BE(r,e,t={}){const n=new Ze;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Dc({next:_=>{f.Nu(),o.enqueueAndForget((()=>vc(i,p))),_.fromCache&&u.source==="server"?h.reject(new D(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Sc(c,f,{includeMetadataChanges:!0,Ka:!0});return wc(i,p)})(await Ui(r),r.asyncQueue,e,t,n))),n.promise}function qE(r,e){const t=new Ze;return r.asyncQueue.enqueueAndForget((async()=>IE(await LE(r),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jE="ComponentProvider",Eh=new Map;function zE(r,e,t,n,s){return new fy(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,wm(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm="firestore.googleapis.com",Th=!0;class wh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=vm,this.ssl=Th}else this.host=e.host,this.ssl=e.ssl??Th;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ff;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<jf)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}O_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=wm(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class po{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new wh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new wh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new S_;switch(n.type){case"firstParty":return new C_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Eh.get(t);n&&(C(jE,"Removing Datastore"),Eh.delete(t),n.terminate())})(this),Promise.resolve()}}function $E(r,e,t,n={}){var h;r=$e(r,po);const s=Sn(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&(qa(`https://${c}`),td("Firestore",!0)),i.host!==vm&&i.host!==c&&gn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:n};if(!Mt(u,o)&&(r._setSettings(u),n.mockUserToken)){let f,p;if(typeof n.mockUserToken=="string")f=n.mockUserToken,p=Ee.MOCK_USER;else{f=Zp(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const _=n.mockUserToken.sub||n.mockUserToken.user_id;if(!_)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ee(_)}r._authCredentials=new b_(new yd(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ft(this.firestore,e,this._query)}}class he{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ot(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(vs(t,he._jsonSchema))return new he(e,n||null,new N(X.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:me("string",he._jsonSchemaVersion),referencePath:me("string")};class Ot extends ft{constructor(e,t,n){super(e,t,bs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new N(e))}withConverter(e){return new Ot(this.firestore,e,this._path)}}function cv(r,e,...t){if(r=Ce(r),Ed("collection","path",e),r instanceof po){const n=X.fromString(e,...t);return dl(n),new Ot(r,null,n)}{if(!(r instanceof he||r instanceof Ot))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return dl(n),new Ot(r.firestore,null,n)}}function uv(r,e,...t){if(r=Ce(r),arguments.length===1&&(e=Ga.newId()),Ed("doc","path",e),r instanceof po){const n=X.fromString(e,...t);return hl(n),new he(r,null,new N(n))}{if(!(r instanceof he||r instanceof Ot))throw new D(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return hl(n),new he(r.firestore,r instanceof Ot?r.converter:null,new N(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh="AsyncQueue";class Ah{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new am(this,"async_queue_retry"),this._c=()=>{const n=mi();n&&C(vh,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=mi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=mi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Ze;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!jt(e))throw e;C(vh,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,le("INTERNAL UNHANDLED ERROR: ",Sh(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Ec.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:Sh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Sh(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class vn extends po{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Ah,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ah(e),this._firestoreClient=void 0,await e}}}function lv(r,e,t){t||(t=hs);const n=Wi(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(Mt(i,e))return s;throw new D(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<jf)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Sn(e.host)&&qa(e.host),n.initialize({options:e,instanceIdentifier:t})}function hv(r,e){const t=typeof r=="object"?r:cd(),n=typeof r=="string"?r:hs,s=Wi(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=Yp("firestore");i&&$E(s,...i)}return s}function go(r){if(r._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||GE(r),r._firestoreClient}function GE(r){var n,s,i,o;const e=r._freezeSettings(),t=zE(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new OE(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ue(de.fromBase64String(e))}catch(t){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ue(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ue._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(vs(e,Ue._jsonSchema))return Ue.fromBase64String(e.bytes)}}Ue._jsonSchemaVersion="firestore/bytes/1.0",Ue._jsonSchema={type:me("string",Ue._jsonSchemaVersion),bytes:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:et._jsonSchemaVersion}}static fromJSON(e){if(vs(e,et._jsonSchema))return new et(e.latitude,e.longitude)}}et._jsonSchemaVersion="firestore/geoPoint/1.0",et._jsonSchema={type:me("string",et._jsonSchemaVersion),latitude:me("number"),longitude:me("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ge._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(vs(e,Ge._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ge(e.vectorValues);throw new D(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ge._jsonSchemaVersion="firestore/vectorValue/1.0",Ge._jsonSchema={type:me("string",Ge._jsonSchemaVersion),vectorValues:me("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE=/^__.*__$/;class HE{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new pr(e,this.data,t,this.fieldTransforms)}}function bm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class kc{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new kc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Bi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(bm(this.dataSource)&&KE.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class WE{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||lo(e)}createContext(e,t,n,s=!1){return new kc({dataSource:e,methodName:t,targetDoc:n,path:ae.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Rm(r){const e=r._freezeSettings(),t=lo(r._databaseId);return new WE(r._databaseId,!!e.ignoreUndefinedProperties,t)}function QE(r,e,t,n,s,i={}){const o=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);Vm("Data must be an object, but it was:",o,n);const c=Pm(n,o);let u,h;if(i.merge)u=new Be(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const _=Ds(e,p,t);if(!o.contains(_))throw new D(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);ZE(f,_)||f.push(_)}u=new Be(f),h=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=o.fieldTransforms;return new HE(new De(c),u,h)}function JE(r,e,t,n=!1){return Nc(t,r.createContext(n?4:3,e))}function Nc(r,e){if(Cm(r=Ce(r)))return Vm("Unsupported field value:",e,r),Pm(r,e);if(r instanceof Sm)return(function(n,s){if(!bm(s.dataSource))throw s.createError(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const c of n){let u=Nc(c,s.childContextForArray(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=Ce(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Ny(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:or(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:or(s.serializer,i)}}if(n instanceof et)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ue)return{bytesValue:Tf(s.serializer,n._byteString)};if(n instanceof he){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:cc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ge)return(function(o,c){const u=o instanceof Ge?o.toArray():o;return{mapValue:{fields:{[Za]:{stringValue:ec},[er]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.createError("VectorValues must only contain numeric values.");return rc(c.serializer,f)}))}}}}}})(n,s);if(kf(n))return n._toProto(s.serializer);throw s.createError(`Unsupported field value: ${Qi(n)}`)})(r,e)}function Pm(r,e){const t={};return Fd(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):bn(r,((n,s)=>{const i=Nc(s,e.childContextForField(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Cm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof et||r instanceof Ue||r instanceof he||r instanceof Sm||r instanceof Ge||kf(r))}function Vm(r,e,t){if(!Cm(t)||!Td(t)){const n=Qi(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function Ds(r,e,t){if((e=Ce(e))instanceof Am)return e._internalPath;if(typeof e=="string")return XE(r,e);throw Bi("Field path arguments must be of type string or ",r,!1,void 0,t)}const YE=new RegExp("[~\\*/\\[\\]]");function XE(r,e,t){if(e.search(YE)>=0)throw Bi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Am(...e.split("."))._internalPath}catch{throw Bi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Bi(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new D(P.INVALID_ARGUMENT,c+r+u)}function ZE(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{convertValue(e,t="none"){switch(Lt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return bn(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[er].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>oe(o.doubleValue)));return new Ge(t)}convertGeoPoint(e){return new et(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=to(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ls(e));default:return null}}convertTimestamp(e){const t=ct(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);F(Df(n),9688,{name:e});const s=new _n(n.get(1),n.get(3)),i=new N(n.popFirst(5));return s.isEqual(t)||le(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc extends eT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ue(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}const bh="@firebase/firestore",Rh="4.11.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Ds("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class tT extends Dm{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function km(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Oc{}class Mc extends Oc{}function dv(r,e,...t){let n=[];e instanceof Oc&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof Lc)).length,c=i.filter((u=>u instanceof _o)).length;if(o>1||o>0&&c>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class _o extends Mc{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new _o(e,t,n)}_apply(e){const t=this._parse(e);return Nm(e._query,t),new ft(e.firestore,e.converter,Aa(e._query,t))}_parse(e){const t=Rm(e.firestore);return(function(i,o,c,u,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Vh(p,f);const V=[];for(const x of p)V.push(Ch(u,i,x));_={arrayValue:{values:V}}}else _=Ch(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Vh(p,f),_=JE(c,o,p,f==="in"||f==="not-in");return W.create(h,f,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function fv(r,e,t){const n=e,s=Ds("where",r);return _o._create(s,n,t)}class Lc extends Oc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Lc(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Nm(o,u),o=Aa(o,u)})(e._query,t),new ft(e.firestore,e.converter,Aa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Fc extends Mc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Fc(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ps(i,o)})(e._query,this._field,this._direction);return new ft(e.firestore,e.converter,Ry(e._query,t))}}function mv(r,e="asc"){const t=e,n=Ds("orderBy",r);return Fc._create(n,t)}class Uc extends Mc{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Uc(e,t,n)}_apply(e){return new ft(e.firestore,e.converter,Pi(e._query,this._limit,this._limitType))}}function pv(r){return Uc._create("limit",r,"F")}function Ch(r,e,t){if(typeof(t=Ce(t))=="string"){if(t==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!nf(e)&&t.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!N.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return fs(r,new N(n))}if(t instanceof he)return fs(r,t._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qi(t)}.`)}function Vh(r,e){if(!Array.isArray(r)||r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Nm(r,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function nT(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class rT{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=oT(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function gv(r){return new rT(r)}class sT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Is.provider,this._offlineComponentProvider={build:t=>new Em(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class iT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Is.provider,this._offlineComponentProvider={build:t=>new xE(t,e==null?void 0:e.cacheSizeBytes)}}}function oT(r){return new sT(r==null?void 0:r.forceOwnership)}function _v(){return new iT}class Kr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hn extends Dm{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new pi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Ds("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",hn._jsonSchema={type:me("string",hn._jsonSchemaVersion),bundleSource:me("string","DocumentSnapshot"),bundleName:me("string"),bundle:me("string")};class pi extends hn{data(e={}){return super.data(e)}}class dn{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Kr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new pi(this._firestore,this._userDataWriter,n.key,n,new Kr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new pi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new pi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:aT(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=dn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ga.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function aT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dn._jsonSchemaVersion="firestore/querySnapshot/1.0",dn._jsonSchema={type:me("string",dn._jsonSchemaVersion),bundleSource:me("string","QuerySnapshot"),bundleName:me("string"),bundle:me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(r){r=$e(r,he);const e=$e(r.firestore,vn),t=go(e);return UE(t,r._key).then((n=>Om(e,r,n)))}function Iv(r){r=$e(r,ft);const e=$e(r.firestore,vn),t=go(e),n=new xc(e);return km(r._query),BE(t,r._query).then((s=>new dn(e,n,r,s)))}function Ev(r,e,t){r=$e(r,he);const n=$e(r.firestore,vn),s=nT(r.converter,e,t),i=Rm(n);return xm(n,[QE(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Ne.none())])}function Tv(r){return xm($e(r.firestore,vn),[new oo(r._key,Ne.none())])}function wv(r,...e){var h,f,p;r=Ce(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Ph(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Ph(e[n])){const _=e[n];e[n]=(h=_.next)==null?void 0:h.bind(_),e[n+1]=(f=_.error)==null?void 0:f.bind(_),e[n+2]=(p=_.complete)==null?void 0:p.bind(_)}let i,o,c;if(r instanceof he)o=$e(r.firestore,vn),c=bs(r._key.path),i={next:_=>{e[n]&&e[n](Om(o,r,_))},error:e[n+1],complete:e[n+2]};else{const _=$e(r,ft);o=$e(_.firestore,vn),c=_._query;const R=new xc(o);i={next:V=>{e[n]&&e[n](new dn(o,R,_,V))},error:e[n+1],complete:e[n+2]},km(r._query)}const u=go(o);return FE(u,c,s,i)}function xm(r,e){const t=go(r);return qE(t,e)}function Om(r,e,t){const n=t.docs.get(e._key),s=new xc(r);return new hn(r,s,e._key,n,new Kr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){A_(dr),Hn(new mn("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new vn(new R_(n.getProvider("auth-internal")),new V_(o,n.getProvider("app-check-internal")),my(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),kt(bh,Rh,e),kt(bh,Rh,"esm2020")})();var cT="firebase",uT="12.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(cT,uT,"app");function Mm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lT=Mm,Lm=new Ts("auth","Firebase",Mm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi=new ja("@firebase/auth");function hT(r,...e){qi.logLevel<=H.WARN&&qi.warn(`Auth (${dr}): ${r}`,...e)}function gi(r,...e){qi.logLevel<=H.ERROR&&qi.error(`Auth (${dr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(r,...e){throw qc(r,...e)}function Ke(r,...e){return qc(r,...e)}function Bc(r,e,t){const n={...lT(),[e]:t};return new Ts("auth","Firebase",n).create(e,{appName:r.name})}function fn(r){return Bc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function dT(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&rt(r,"argument-error"),Bc(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function qc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Lm.create(r,...e)}function j(r,e,...t){if(!r)throw qc(e,...t)}function it(r){const e="INTERNAL ASSERTION FAILED: "+r;throw gi(e),new Error(e)}function lt(r,e){r||it(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function fT(){return Dh()==="http:"||Dh()==="https:"}function Dh(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fT()||sg()||"connection"in navigator)?navigator.onLine:!0}function pT(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,t){this.shortDelay=e,this.longDelay=t,lt(t>e,"Short delay should be less than long delay!"),this.isMobile=ng()||ig()}get(){return mT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(r,e){lt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;it("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;it("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;it("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],yT=new ks(3e4,6e4);function zc(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Ir(r,e,t,n,s={}){return Um(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=ws({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return rg()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&Sn(r.emulatorConfig.host)&&(h.credentials="include"),Fm.fetch()(await Bm(r,r.config.apiHost,t,c),h)})}async function Um(r,e,t){r._canInitEmulator=!1;const n={...gT,...e};try{const s=new ET(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ri(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ri(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ri(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw ri(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Bc(r,f,h);rt(r,f)}}catch(s){if(s instanceof ht)throw s;rt(r,"network-request-failed",{message:String(s)})}}async function IT(r,e,t,n,s={}){const i=await Ir(r,e,t,n,s);return"mfaPendingCredential"in i&&rt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Bm(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?jc(r.config,s):`${r.config.apiScheme}://${s}`;return _T.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class ET{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ke(this.auth,"network-request-failed")),yT.get())})}}function ri(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=Ke(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TT(r,e){return Ir(r,"POST","/v1/accounts:delete",e)}async function ji(r,e){return Ir(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function wT(r,e=!1){const t=Ce(r),n=await t.getIdToken(e),s=$c(n);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:rs(ia(s.auth_time)),issuedAtTime:rs(ia(s.iat)),expirationTime:rs(ia(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ia(r){return Number(r)*1e3}function $c(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return gi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Jh(t);return s?JSON.parse(s):(gi("Failed to decode base64 JWT payload"),null)}catch(s){return gi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function kh(r){const e=$c(r);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Es(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof ht&&vT(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function vT({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=rs(this.lastLoginAt),this.creationTime=rs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(r){var p;const e=r.auth,t=await r.getIdToken(),n=await Es(r,ji(e,{idToken:t}));j(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?qm(s.providerUserInfo):[],o=bT(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ua(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function ST(r){const e=Ce(r);await zi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bT(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function qm(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RT(r,e){const t=await Um(r,{},async()=>{const n=ws({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Bm(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&Sn(r.emulatorConfig.host)&&(u.credentials="include"),Fm.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function PT(r,e){return Ir(r,"POST","/v2/accounts:revokeToken",zc(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):kh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=kh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await RT(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new $n;return n&&(j(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(j(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $n,this.toJSON())}_performRefresh(){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(r,e){j(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ze{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new AT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ua(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Es(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wT(this,e)}reload(){return ST(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await zi(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(fn(this.auth));const e=await this.getIdToken();return await Es(this,TT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:_,isAnonymous:R,providerData:V,stsTokenManager:x}=t;j(p&&x,e,"internal-error");const O=$n.fromJSON(this.name,x);j(typeof p=="string",e,"internal-error"),vt(n,e.name),vt(s,e.name),j(typeof _=="boolean",e,"internal-error"),j(typeof R=="boolean",e,"internal-error"),vt(i,e.name),vt(o,e.name),vt(c,e.name),vt(u,e.name),vt(h,e.name),vt(f,e.name);const $=new ze({uid:p,auth:e,email:s,emailVerified:_,displayName:n,isAnonymous:R,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:O,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&($.providerData=V.map(B=>({...B}))),u&&($._redirectEventId=u),$}static async _fromIdTokenResponse(e,t,n=!1){const s=new $n;s.updateFromServerResponse(t);const i=new ze({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await zi(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?qm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new $n;c.updateFromIdToken(n);const u=new ze({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ua(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=new Map;function ot(r){lt(r instanceof Function,"Expected a class definition");let e=Nh.get(r);return e?(lt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Nh.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}jm.type="NONE";const xh=jm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(r,e,t){return`firebase:${r}:${e}:${t}`}class Gn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=_i(this.userKey,s.apiKey,i),this.fullPersistenceKey=_i("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ji(this.auth,{idToken:e}).catch(()=>{});return t?ze._fromGetAccountInfoResponse(this.auth,t,e):null}return ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Gn(ot(xh),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||ot(xh);const o=_i(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const _=await ji(e,{idToken:f}).catch(()=>{});if(!_)break;p=await ze._fromGetAccountInfoResponse(e,_,f)}else p=ze._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Gn(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Gn(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Km(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Wm(e))return"Blackberry";if(Qm(e))return"Webos";if($m(e))return"Safari";if((e.includes("chrome/")||Gm(e))&&!e.includes("edge/"))return"Chrome";if(Hm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function zm(r=ge()){return/firefox\//i.test(r)}function $m(r=ge()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gm(r=ge()){return/crios\//i.test(r)}function Km(r=ge()){return/iemobile/i.test(r)}function Hm(r=ge()){return/android/i.test(r)}function Wm(r=ge()){return/blackberry/i.test(r)}function Qm(r=ge()){return/webos/i.test(r)}function Gc(r=ge()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function CT(r=ge()){var e;return Gc(r)&&!!((e=window.navigator)!=null&&e.standalone)}function VT(){return og()&&document.documentMode===10}function Jm(r=ge()){return Gc(r)||Hm(r)||Qm(r)||Wm(r)||/windows phone/i.test(r)||Km(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ym(r,e=[]){let t;switch(r){case"Browser":t=Oh(ge());break;case"Worker":t=`${Oh(ge())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${dr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kT(r,e={}){return Ir(r,"GET","/v2/passwordPolicy",zc(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT=6;class xT{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??NT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Mh(this),this.idTokenSubscription=new Mh(this),this.beforeStateQueue=new DT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ot(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await Gn.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ji(this,{idToken:e}),n=await ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(je(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await zi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=pT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(fn(this));const t=e?Ce(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(fn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(fn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ot(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kT(this),t=new xT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ts("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await PT(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ot(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Gn.create(this,[ot(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ym(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&hT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function yo(r){return Ce(r)}class Mh{constructor(e){this.auth=e,this.observer=null,this.addObserver=dg(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function MT(r){Kc=r}function LT(r){return Kc.loadJS(r)}function FT(){return Kc.gapiScript}function UT(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BT(r,e){const t=Wi(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Mt(i,e??{}))return s;rt(s,"already-initialized")}return t.initialize({options:e})}function qT(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(ot);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function jT(r,e,t){const n=yo(r);j(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Xm(e),{host:o,port:c}=zT(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){j(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),j(Mt(h,n.config.emulator)&&Mt(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,Sn(o)?(qa(`${i}//${o}${u}`),td("Auth",!0)):$T()}function Xm(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function zT(r){const e=Xm(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:Lh(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:Lh(o)}}}function Lh(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function $T(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return it("not implemented")}_getIdTokenResponse(e){return it("not implemented")}_linkToIdToken(e,t){return it("not implemented")}_getReauthenticationResolver(e){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(r,e){return IT(r,"POST","/v1/accounts:signInWithIdp",zc(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT="http://localhost";class An extends Zm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new An(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new An(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Kn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Kn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kn(e,t)}buildRequest(){const e={requestUri:GT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ws(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns extends Hc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends Ns{constructor(){super("facebook.com")}static credential(e){return An._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends Ns{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return An._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return bt.credential(t,n)}catch{return null}}}bt.GOOGLE_SIGN_IN_METHOD="google.com";bt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Ns{constructor(){super("github.com")}static credential(e){return An._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rt.credential(e.oauthAccessToken)}catch{return null}}}Rt.GITHUB_SIGN_IN_METHOD="github.com";Rt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends Ns{constructor(){super("twitter.com")}static credential(e,t){return An._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Pt.credential(t,n)}catch{return null}}}Pt.TWITTER_SIGN_IN_METHOD="twitter.com";Pt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await ze._fromIdTokenResponse(e,n,s),o=Fh(n);return new hr({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Fh(n);return new hr({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Fh(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends ht{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,$i.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new $i(e,t,n,s)}}function ep(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$i._fromErrorAndOperation(r,i,e,n):i})}async function KT(r,e,t=!1){const n=await Es(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return hr._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HT(r,e,t=!1){const{auth:n}=r;if(je(n.app))return Promise.reject(fn(n));const s="reauthenticate";try{const i=await Es(r,ep(n,s,e,r),t);j(i.idToken,n,"internal-error");const o=$c(i.idToken);j(o,n,"internal-error");const{sub:c}=o;return j(r.uid===c,n,"user-mismatch"),hr._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&rt(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WT(r,e,t=!1){if(je(r.app))return Promise.reject(fn(r));const n="signIn",s=await ep(r,n,e),i=await hr._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}function QT(r,e,t,n){return Ce(r).onIdTokenChanged(e,t,n)}function JT(r,e,t){return Ce(r).beforeAuthStateChanged(e,t)}function vv(r,e,t,n){return Ce(r).onAuthStateChanged(e,t,n)}function Av(r){return Ce(r).signOut()}const Gi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Gi,"1"),this.storage.removeItem(Gi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YT=1e3,XT=10;class np extends tp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);VT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,XT):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},YT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}np.type="LOCAL";const ZT=np;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp extends tp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rp.type="SESSION";const sp=rp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Io(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await ew(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Io.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Wc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(_.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return window}function nw(r){tt().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(){return typeof tt().WorkerGlobalScope<"u"&&typeof tt().importScripts=="function"}async function rw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sw(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function iw(){return ip()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op="firebaseLocalStorageDb",ow=1,Ki="firebaseLocalStorage",ap="fbase_key";class xs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Eo(r,e){return r.transaction([Ki],e?"readwrite":"readonly").objectStore(Ki)}function aw(){const r=indexedDB.deleteDatabase(op);return new xs(r).toPromise()}function Ba(){const r=indexedDB.open(op,ow);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Ki,{keyPath:ap})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Ki)?e(n):(n.close(),await aw(),e(await Ba()))})})}async function Uh(r,e,t){const n=Eo(r,!0).put({[ap]:e,value:t});return new xs(n).toPromise()}async function cw(r,e){const t=Eo(r,!1).get(e),n=await new xs(t).toPromise();return n===void 0?null:n.value}function Bh(r,e){const t=Eo(r,!0).delete(e);return new xs(t).toPromise()}const uw=800,lw=3;class cp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ba(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>lw)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ip()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Io._getInstance(iw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await rw(),!this.activeServiceWorker)return;this.sender=new tw(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ba();return await Uh(e,Gi,"1"),await Bh(e,Gi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Uh(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>cw(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Bh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Eo(s,!1).getAll();return new xs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}cp.type="LOCAL";const hw=cp;new ks(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(r,e){return e?ot(e):(j(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc extends Zm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function dw(r){return WT(r.auth,new Qc(r),r.bypassAuthState)}function fw(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),HT(t,new Qc(r),r.bypassAuthState)}async function mw(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),KT(t,new Qc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dw;case"linkViaPopup":case"linkViaRedirect":return mw;case"reauthViaPopup":case"reauthViaRedirect":return fw;default:rt(this.auth,"internal-error")}}resolve(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=new ks(2e3,1e4);async function Sv(r,e,t){if(je(r.app))return Promise.reject(Ke(r,"operation-not-supported-in-this-environment"));const n=yo(r);dT(r,e,Hc);const s=up(n,t);return new an(n,"signInViaPopup",e,s).executeNotNull()}class an extends lp{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){lt(this.filter.length===1,"Popup operations only handle one event");const e=Wc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pw.get())};e()}}an.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw="pendingRedirect",yi=new Map;class _w extends lp{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=yi.get(this.auth._key());if(!e){try{const n=await yw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}yi.set(this.auth._key(),e)}return this.bypassAuthState||yi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yw(r,e){const t=Tw(e),n=Ew(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Iw(r,e){yi.set(r._key(),e)}function Ew(r){return ot(r._redirectPersistence)}function Tw(r){return _i(gw,r.config.apiKey,r.name)}async function ww(r,e,t=!1){if(je(r.app))return Promise.reject(fn(r));const n=yo(r),s=up(n,e),o=await new _w(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw=600*1e3;class Aw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!hp(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ke(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vw&&this.cachedEventUids.clear(),this.cachedEventUids.has(qh(e))}saveEventToCache(e){this.cachedEventUids.add(qh(e)),this.lastProcessedEventTime=Date.now()}}function qh(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function hp({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Sw(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hp(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bw(r,e={}){return Ir(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pw=/^https?/;async function Cw(r){if(r.config.emulator)return;const{authorizedDomains:e}=await bw(r);for(const t of e)try{if(Vw(t))return}catch{}rt(r,"unauthorized-domain")}function Vw(r){const e=Fa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Pw.test(t))return!1;if(Rw.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dw=new ks(3e4,6e4);function jh(){const r=tt().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function kw(r){return new Promise((e,t)=>{var s,i,o;function n(){jh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jh(),t(Ke(r,"network-request-failed"))},timeout:Dw.get()})}if((i=(s=tt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=tt().gapi)!=null&&o.load)n();else{const c=UT("iframefcb");return tt()[c]=()=>{gapi.load?n():t(Ke(r,"network-request-failed"))},LT(`${FT()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ii=null,e})}let Ii=null;function Nw(r){return Ii=Ii||kw(r),Ii}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw=new ks(5e3,15e3),Ow="__/auth/iframe",Mw="emulator/auth/iframe",Lw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Uw(r){const e=r.config;j(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?jc(e,Mw):`https://${r.config.authDomain}/${Ow}`,n={apiKey:e.apiKey,appName:r.name,v:dr},s=Fw.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${ws(n).slice(1)}`}async function Bw(r){const e=await Nw(r),t=tt().gapi;return j(t,r,"internal-error"),e.open({where:document.body,url:Uw(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Lw,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=Ke(r,"network-request-failed"),c=tt().setTimeout(()=>{i(o)},xw.get());function u(){tt().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jw=500,zw=600,$w="_blank",Gw="http://localhost";class zh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Kw(r,e,t,n=jw,s=zw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...qw,width:n.toString(),height:s.toString(),top:i,left:o},h=ge().toLowerCase();t&&(c=Gm(h)?$w:t),zm(h)&&(e=e||Gw,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[R,V])=>`${_}${R}=${V},`,"");if(CT(h)&&c!=="_self")return Hw(e||"",c),new zh(null);const p=window.open(e||"",c,f);j(p,r,"popup-blocked");try{p.focus()}catch{}return new zh(p)}function Hw(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww="__/auth/handler",Qw="emulator/auth/handler",Jw=encodeURIComponent("fac");async function $h(r,e,t,n,s,i){j(r.config.authDomain,r,"auth-domain-config-required"),j(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:dr,eventId:s};if(e instanceof Hc){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",hg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Ns){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${Jw}=${encodeURIComponent(u)}`:"";return`${Yw(r)}?${ws(c).slice(1)}${h}`}function Yw({config:r}){return r.emulator?jc(r,Qw):`https://${r.authDomain}/${Ww}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa="webStorageSupport";class Xw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sp,this._completeRedirectFn=ww,this._overrideRedirectResult=Iw}async _openPopup(e,t,n,s){var o;lt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await $h(e,t,n,Fa(),s);return Kw(e,i,Wc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await $h(e,t,n,Fa(),s);return nw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(lt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Bw(e),n=new Aw(e);return t.register("authEvent",s=>(j(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(oa,{type:oa},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[oa];i!==void 0&&t(!!i),rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jm()||$m()||Gc()}}const Zw=Xw;var Gh="@firebase/auth",Kh="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nv(r){Hn(new mn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ym(r)},h=new OT(n,s,i,u);return qT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Hn(new mn("auth-internal",e=>{const t=yo(e.getProvider("auth").getImmediate());return(n=>new ev(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(Gh,Kh,tv(r)),kt(Gh,Kh,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=300,sv=ed("authIdTokenMaxAge")||rv;let Hh=null;const iv=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>sv)return;const s=t==null?void 0:t.token;Hh!==s&&(Hh=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function bv(r=cd()){const e=Wi(r,"auth");if(e.isInitialized())return e.getImmediate();const t=BT(r,{popupRedirectResolver:Zw,persistence:[hw,ZT,sp]}),n=ed("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=iv(i.toString());JT(t,o,()=>o(t.currentUser)),QT(t,c=>o(c))}}const s=Xh("auth");return s&&jT(t,`http://${s}`),t}function ov(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}MT({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=Ke("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",ov().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nv("Browser");export{bt as G,lv as a,_v as b,bv as c,Iv as d,cv as e,Tv as f,hv as g,uv as h,f_ as i,Sv as j,vv as k,pv as l,wv as m,yv as n,mv as o,gv as p,dv as q,Av as r,Ev as s,fv as w};

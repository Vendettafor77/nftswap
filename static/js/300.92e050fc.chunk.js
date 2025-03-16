/*! For license information please see 300.92e050fc.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunknftswap=self.webpackChunknftswap||[]).push([[300],{1300:(t,e,n)=>{n.d(e,{secp256k1:()=>Ft});var r={};n.r(r),n.d(r,{aK:()=>z,e8:()=>b,DO:()=>E,dJ:()=>F,OG:()=>P,My:()=>B,Ph:()=>q,lX:()=>R,Id:()=>H,fg:()=>V,qj:()=>C,aT:()=>I,r4:()=>U,aY:()=>m,x:()=>j,lq:()=>N,z:()=>L,zW:()=>x,Q5:()=>D});var o=n(7619),i=n(5092);function s(t,e,n){return t&e^t&n^e&n}class f extends i.Vw{constructor(t,e,n,r){super(),this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=(0,i.O8)(this.buffer)}update(t){(0,o.CC)(this);const{view:e,buffer:n,blockLen:r}=this,s=(t=(0,i.ZJ)(t)).length;for(let o=0;o<s;){const f=Math.min(r-this.pos,s-o);if(f!==r)n.set(t.subarray(o,o+f),this.pos),this.pos+=f,o+=f,this.pos===r&&(this.process(e,0),this.pos=0);else{const e=(0,i.O8)(t);for(;r<=s-o;o+=r)this.process(e,o)}}return this.length+=t.length,this.roundClean(),this}digestInto(t){(0,o.CC)(this),(0,o.Ht)(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:r,isLE:s}=this;let{pos:f}=this;e[f++]=128,this.buffer.subarray(f).fill(0),this.padOffset>r-f&&(this.process(n,0),f=0);for(let o=f;o<r;o++)e[o]=0;!function(t,e,n,r){if("function"===typeof t.setBigUint64)return t.setBigUint64(e,n,r);const o=BigInt(32),i=BigInt(4294967295),s=Number(n>>o&i),f=Number(n&i),a=r?4:0,u=r?0:4;t.setUint32(e+a,s,r),t.setUint32(e+u,f,r)}(n,r-8,BigInt(8*this.length),s),this.process(n,0);const a=(0,i.O8)(t),u=this.outputLen;if(u%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=u/4,l=this.get();if(c>l.length)throw new Error("_sha2: outputLen bigger than state");for(let o=0;o<c;o++)a.setUint32(4*o,l[o],s)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:n,length:r,finished:o,destroyed:i,pos:s}=this;return t.length=r,t.pos=s,t.finished=o,t.destroyed=i,r%e&&t.buffer.set(n),t}}const a=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),u=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),c=new Uint32Array(64);class l extends f{constructor(){super(64,32,8,!1),this.A=0|u[0],this.B=0|u[1],this.C=0|u[2],this.D=0|u[3],this.E=0|u[4],this.F=0|u[5],this.G=0|u[6],this.H=0|u[7]}get(){const{A:t,B:e,C:n,D:r,E:o,F:i,G:s,H:f}=this;return[t,e,n,r,o,i,s,f]}set(t,e,n,r,o,i,s,f){this.A=0|t,this.B=0|e,this.C=0|n,this.D=0|r,this.E=0|o,this.F=0|i,this.G=0|s,this.H=0|f}process(t,e){for(let i=0;i<16;i++,e+=4)c[i]=t.getUint32(e,!1);for(let s=16;s<64;s++){const t=c[s-15],e=c[s-2],n=(0,i.Ow)(t,7)^(0,i.Ow)(t,18)^t>>>3,r=(0,i.Ow)(e,17)^(0,i.Ow)(e,19)^e>>>10;c[s]=r+c[s-7]+n+c[s-16]|0}let{A:n,B:r,C:o,D:f,E:u,F:l,G:h,H:d}=this;for(let w=0;w<64;w++){const t=d+((0,i.Ow)(u,6)^(0,i.Ow)(u,11)^(0,i.Ow)(u,25))+((g=u)&l^~g&h)+a[w]+c[w]|0,e=((0,i.Ow)(n,2)^(0,i.Ow)(n,13)^(0,i.Ow)(n,22))+s(n,r,o)|0;d=h,h=l,l=u,u=f+t|0,f=o,o=r,r=n,n=t+e|0}var g;n=n+this.A|0,r=r+this.B|0,o=o+this.C|0,f=f+this.D|0,u=u+this.E|0,l=l+this.F|0,h=h+this.G|0,d=d+this.H|0,this.set(n,r,o,f,u,l,h,d)}roundClean(){c.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const h=(0,i.ld)((()=>new l));class d extends i.Vw{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,(0,o.sd)(t);const n=(0,i.ZJ)(e);if(this.iHash=t.create(),"function"!==typeof this.iHash.update)throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,s=new Uint8Array(r);s.set(n.length>r?t.create().update(n).digest():n);for(let o=0;o<s.length;o++)s[o]^=54;this.iHash.update(s),this.oHash=t.create();for(let o=0;o<s.length;o++)s[o]^=106;this.oHash.update(s),s.fill(0)}update(t){return(0,o.CC)(this),this.iHash.update(t),this}digestInto(t){(0,o.CC)(this),(0,o.DO)(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:n,finished:r,destroyed:o,blockLen:i,outputLen:s}=this;return t.finished=r,t.destroyed=o,t.blockLen=i,t.outputLen=s,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const g=(t,e,n)=>new d(t,e).update(n).digest();g.create=(t,e)=>new d(t,e);const w=BigInt(0),p=BigInt(1),y=BigInt(2);function m(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&"Uint8Array"===t.constructor.name}function E(t){if(!m(t))throw new Error("Uint8Array expected")}function b(t,e){if("boolean"!==typeof e)throw new Error(t+" boolean expected, got "+e)}const v=Array.from({length:256},((t,e)=>e.toString(16).padStart(2,"0")));function B(t){E(t);let e="";for(let n=0;n<t.length;n++)e+=v[t[n]];return e}function x(t){const e=t.toString(16);return 1&e.length?"0"+e:e}function A(t){if("string"!==typeof t)throw new Error("hex string expected, got "+typeof t);return""===t?w:BigInt("0x"+t)}const S={_0:48,_9:57,A:65,F:70,a:97,f:102};function O(t){return t>=S._0&&t<=S._9?t-S._0:t>=S.A&&t<=S.F?t-(S.A-10):t>=S.a&&t<=S.f?t-(S.a-10):void 0}function I(t){if("string"!==typeof t)throw new Error("hex string expected, got "+typeof t);const e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const r=new Uint8Array(n);for(let o=0,i=0;o<n;o++,i+=2){const e=O(t.charCodeAt(i)),n=O(t.charCodeAt(i+1));if(void 0===e||void 0===n){const e=t[i]+t[i+1];throw new Error('hex string expected, got non-hex character "'+e+'" at index '+i)}r[o]=16*e+n}return r}function q(t){return A(B(t))}function R(t){return E(t),A(B(Uint8Array.from(t).reverse()))}function N(t,e){return I(t.toString(16).padStart(2*e,"0"))}function L(t,e){return N(t,e).reverse()}function C(t,e,n){let r;if("string"===typeof e)try{r=I(e)}catch(i){throw new Error(t+" must be hex string or Uint8Array, cause: "+i)}else{if(!m(e))throw new Error(t+" must be hex string or Uint8Array");r=Uint8Array.from(e)}const o=r.length;if("number"===typeof n&&o!==n)throw new Error(t+" of length "+n+" expected, got "+o);return r}function H(){let t=0;for(let n=0;n<arguments.length;n++){const e=n<0||arguments.length<=n?void 0:arguments[n];E(e),t+=e.length}const e=new Uint8Array(t);for(let n=0,r=0;n<arguments.length;n++){const t=n<0||arguments.length<=n?void 0:arguments[n];e.set(t,r),r+=t.length}return e}const k=t=>"bigint"===typeof t&&w<=t;function U(t,e,n){return k(t)&&k(e)&&k(n)&&e<=t&&t<n}function z(t,e,n,r){if(!U(e,n,r))throw new Error("expected valid "+t+": "+n+" <= n < "+r+", got "+e)}function F(t){let e;for(e=0;t>w;t>>=p,e+=1);return e}const P=t=>(y<<BigInt(t-1))-p,Z=t=>new Uint8Array(t),T=t=>Uint8Array.from(t);function V(t,e,n){if("number"!==typeof t||t<2)throw new Error("hashLen must be a number");if("number"!==typeof e||e<2)throw new Error("qByteLen must be a number");if("function"!==typeof n)throw new Error("hmacFn must be a function");let r=Z(t),o=Z(t),i=0;const s=()=>{r.fill(1),o.fill(0),i=0},f=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n(o,r,...e)},a=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z();o=f(T([0]),t),r=f(),0!==t.length&&(o=f(T([1]),t),r=f())},u=()=>{if(i++>=1e3)throw new Error("drbg: tried 1000 values");let t=0;const n=[];for(;t<e;){r=f();const e=r.slice();n.push(e),t+=r.length}return H(...n)};return(t,e)=>{let n;for(s(),a(t);!(n=e(u()));)a();return s(),n}}const _={bigint:t=>"bigint"===typeof t,function:t=>"function"===typeof t,boolean:t=>"boolean"===typeof t,string:t=>"string"===typeof t,stringOrUint8Array:t=>"string"===typeof t||m(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>"function"===typeof t&&Number.isSafeInteger(t.outputLen)};function D(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=(e,n,r)=>{const o=_[n];if("function"!==typeof o)throw new Error("invalid validator function");const i=t[e];if((!r||void 0!==i)&&!o(i,t))throw new Error("param "+String(e)+" is invalid. Expected "+n+", got "+i)};for(const[o,i]of Object.entries(e))r(o,i,!1);for(const[o,i]of Object.entries(n))r(o,i,!0);return t}function j(t){const e=new WeakMap;return function(n){const r=e.get(n);if(void 0!==r)return r;for(var o=arguments.length,i=new Array(o>1?o-1:0),s=1;s<o;s++)i[s-1]=arguments[s];const f=t(n,...i);return e.set(n,f),f}}const K=BigInt(0),M=BigInt(1),G=BigInt(2),W=BigInt(3),Y=BigInt(4),J=BigInt(5),Q=BigInt(8);function X(t,e){const n=t%e;return n>=K?n:e+n}function $(t,e,n){if(e<K)throw new Error("invalid exponent, negatives unsupported");if(n<=K)throw new Error("invalid modulus");if(n===M)return K;let r=M;for(;e>K;)e&M&&(r=r*t%n),t=t*t%n,e>>=M;return r}function tt(t,e,n){let r=t;for(;e-- >K;)r*=r,r%=n;return r}function et(t,e){if(t===K)throw new Error("invert: expected non-zero number");if(e<=K)throw new Error("invert: expected positive modulus, got "+e);let n=X(t,e),r=e,o=K,i=M,s=M,f=K;for(;n!==K;){const t=r/n,e=r%n,a=o-s*t,u=i-f*t;r=n,n=e,o=s,i=f,s=a,f=u}if(r!==M)throw new Error("invert: does not exist");return X(o,e)}function nt(t){if(t%Y===W){const e=(t+M)/Y;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}if(t%Q===J){const e=(t-J)/Q;return function(t,n){const r=t.mul(n,G),o=t.pow(r,e),i=t.mul(n,o),s=t.mul(t.mul(i,G),o),f=t.mul(i,t.sub(s,t.ONE));if(!t.eql(t.sqr(f),n))throw new Error("Cannot find square root");return f}}return function(t){const e=(t-M)/G;let n,r,o;for(n=t-M,r=0;n%G===K;n/=G,r++);for(o=G;o<t&&$(o,e,t)!==t-M;o++)if(o>1e3)throw new Error("Cannot find square root: likely non-prime P");if(1===r){const e=(t+M)/Y;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}const i=(n+M)/G;return function(t,s){if(t.pow(s,e)===t.neg(t.ONE))throw new Error("Cannot find square root");let f=r,a=t.pow(t.mul(t.ONE,o),n),u=t.pow(s,i),c=t.pow(s,n);for(;!t.eql(c,t.ONE);){if(t.eql(c,t.ZERO))return t.ZERO;let e=1;for(let r=t.sqr(c);e<f&&!t.eql(r,t.ONE);e++)r=t.sqr(r);const n=t.pow(a,M<<BigInt(f-e-1));a=t.sqr(n),u=t.mul(u,n),c=t.mul(c,a),f=e}return u}}(t)}const rt=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function ot(t,e){const n=void 0!==e?e:t.toString(2).length;return{nBitLength:n,nByteLength:Math.ceil(n/8)}}function it(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(t<=K)throw new Error("invalid field: expected ORDER > 0, got "+t);const{nBitLength:o,nByteLength:i}=ot(t,e);if(i>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let s;const f=Object.freeze({ORDER:t,isLE:n,BITS:o,BYTES:i,MASK:P(o),ZERO:K,ONE:M,create:e=>X(e,t),isValid:e=>{if("bigint"!==typeof e)throw new Error("invalid field element: expected bigint, got "+typeof e);return K<=e&&e<t},is0:t=>t===K,isOdd:t=>(t&M)===M,neg:e=>X(-e,t),eql:(t,e)=>t===e,sqr:e=>X(e*e,t),add:(e,n)=>X(e+n,t),sub:(e,n)=>X(e-n,t),mul:(e,n)=>X(e*n,t),pow:(t,e)=>function(t,e,n){if(n<K)throw new Error("invalid exponent, negatives unsupported");if(n===K)return t.ONE;if(n===M)return e;let r=t.ONE,o=e;for(;n>K;)n&M&&(r=t.mul(r,o)),o=t.sqr(o),n>>=M;return r}(f,t,e),div:(e,n)=>X(e*et(n,t),t),sqrN:t=>t*t,addN:(t,e)=>t+e,subN:(t,e)=>t-e,mulN:(t,e)=>t*e,inv:e=>et(e,t),sqrt:r.sqrt||(e=>(s||(s=nt(t)),s(f,e))),invertBatch:t=>function(t,e){const n=new Array(e.length),r=e.reduce(((e,r,o)=>t.is0(r)?e:(n[o]=e,t.mul(e,r))),t.ONE),o=t.inv(r);return e.reduceRight(((e,r,o)=>t.is0(r)?e:(n[o]=t.mul(e,n[o]),t.mul(e,r))),o),n}(f,t),cmov:(t,e,n)=>n?e:t,toBytes:t=>n?L(t,i):N(t,i),fromBytes:t=>{if(t.length!==i)throw new Error("Field.fromBytes: expected "+i+" bytes, got "+t.length);return n?R(t):q(t)}});return Object.freeze(f)}function st(t){if("bigint"!==typeof t)throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function ft(t){const e=st(t);return e+Math.ceil(e/2)}const at=BigInt(0),ut=BigInt(1);function ct(t,e){const n=e.negate();return t?n:e}function lt(t,e){if(!Number.isSafeInteger(t)||t<=0||t>e)throw new Error("invalid window size, expected [1.."+e+"], got W="+t)}function ht(t,e){lt(t,e);return{windows:Math.ceil(e/t)+1,windowSize:2**(t-1)}}function dt(t,e){if(!Array.isArray(t))throw new Error("array expected");t.forEach(((t,n)=>{if(!(t instanceof e))throw new Error("invalid point at index "+n)}))}function gt(t,e){if(!Array.isArray(t))throw new Error("array of scalars expected");t.forEach(((t,n)=>{if(!e.isValid(t))throw new Error("invalid scalar at index "+n)}))}const wt=new WeakMap,pt=new WeakMap;function yt(t){return pt.get(t)||1}function mt(t){return D(t.Fp,rt.reduce(((t,e)=>(t[e]="function",t)),{ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"})),D(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...ot(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}function Et(t){void 0!==t.lowS&&b("lowS",t.lowS),void 0!==t.prehash&&b("prehash",t.prehash)}const{Ph:bt,aT:vt}=r;class Bt extends Error{constructor(){super(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")}}const xt={Err:Bt,_tlv:{encode:(t,e)=>{const{Err:n}=xt;if(t<0||t>256)throw new n("tlv.encode: wrong tag");if(1&e.length)throw new n("tlv.encode: unpadded data");const r=e.length/2,o=x(r);if(o.length/2&128)throw new n("tlv.encode: long form length too big");const i=r>127?x(o.length/2|128):"";return x(t)+i+o+e},decode(t,e){const{Err:n}=xt;let r=0;if(t<0||t>256)throw new n("tlv.encode: wrong tag");if(e.length<2||e[r++]!==t)throw new n("tlv.decode: wrong tlv");const o=e[r++];let i=0;if(!!(128&o)){const t=127&o;if(!t)throw new n("tlv.decode(long): indefinite length not supported");if(t>4)throw new n("tlv.decode(long): byte length is too big");const s=e.subarray(r,r+t);if(s.length!==t)throw new n("tlv.decode: length bytes not complete");if(0===s[0])throw new n("tlv.decode(long): zero leftmost byte");for(const e of s)i=i<<8|e;if(r+=t,i<128)throw new n("tlv.decode(long): not minimal encoding")}else i=o;const s=e.subarray(r,r+i);if(s.length!==i)throw new n("tlv.decode: wrong value length");return{v:s,l:e.subarray(r+i)}}},_int:{encode(t){const{Err:e}=xt;if(t<At)throw new e("integer: negative integers are not allowed");let n=x(t);if(8&Number.parseInt(n[0],16)&&(n="00"+n),1&n.length)throw new e("unexpected DER parsing assertion: unpadded hex");return n},decode(t){const{Err:e}=xt;if(128&t[0])throw new e("invalid signature integer: negative");if(0===t[0]&&!(128&t[1]))throw new e("invalid signature integer: unnecessary leading zero");return bt(t)}},toSig(t){const{Err:e,_int:n,_tlv:r}=xt,o="string"===typeof t?vt(t):t;E(o);const{v:i,l:s}=r.decode(48,o);if(s.length)throw new e("invalid signature: left bytes after parsing");const{v:f,l:a}=r.decode(2,i),{v:u,l:c}=r.decode(2,a);if(c.length)throw new e("invalid signature: left bytes after parsing");return{r:n.decode(f),s:n.decode(u)}},hexFromSig(t){const{_tlv:e,_int:n}=xt,r=e.encode(2,n.encode(t.r))+e.encode(2,n.encode(t.s));return e.encode(48,r)}},At=BigInt(0),St=BigInt(1),Ot=(BigInt(2),BigInt(3));BigInt(4);function It(t){const e=function(t){const e=mt(t);D(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:n,Fp:r,a:o}=e;if(n){if(!r.eql(o,r.ZERO))throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if("object"!==typeof n||"bigint"!==typeof n.beta||"function"!==typeof n.splitScalar)throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...e})}(t),{Fp:n}=e,r=it(e.n,e.nBitLength),o=e.toBytes||((t,e,r)=>{const o=e.toAffine();return H(Uint8Array.from([4]),n.toBytes(o.x),n.toBytes(o.y))}),i=e.fromBytes||(t=>{const e=t.subarray(1);return{x:n.fromBytes(e.subarray(0,n.BYTES)),y:n.fromBytes(e.subarray(n.BYTES,2*n.BYTES))}});function s(t){const{a:r,b:o}=e,i=n.sqr(t),s=n.mul(i,t);return n.add(n.add(s,n.mul(t,r)),o)}if(!n.eql(n.sqr(e.Gy),s(e.Gx)))throw new Error("bad generator point: equation left != right");function f(t){const{allowedPrivateKeyLengths:n,nByteLength:r,wrapPrivateKey:o,n:i}=e;if(n&&"bigint"!==typeof t){if(m(t)&&(t=B(t)),"string"!==typeof t||!n.includes(t.length))throw new Error("invalid private key");t=t.padStart(2*r,"0")}let s;try{s="bigint"===typeof t?t:q(C("private key",t,r))}catch(f){throw new Error("invalid private key, expected hex or "+r+" bytes, got "+typeof t)}return o&&(s=X(s,i)),z("private key",s,St,i),s}function a(t){if(!(t instanceof l))throw new Error("ProjectivePoint expected")}const u=j(((t,e)=>{const{px:r,py:o,pz:i}=t;if(n.eql(i,n.ONE))return{x:r,y:o};const s=t.is0();null==e&&(e=s?n.ONE:n.inv(i));const f=n.mul(r,e),a=n.mul(o,e),u=n.mul(i,e);if(s)return{x:n.ZERO,y:n.ZERO};if(!n.eql(u,n.ONE))throw new Error("invZ was invalid");return{x:f,y:a}})),c=j((t=>{if(t.is0()){if(e.allowInfinityPoint&&!n.is0(t.py))return;throw new Error("bad point: ZERO")}const{x:r,y:o}=t.toAffine();if(!n.isValid(r)||!n.isValid(o))throw new Error("bad point: x or y not FE");const i=n.sqr(o),f=s(r);if(!n.eql(i,f))throw new Error("bad point: equation left != right");if(!t.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0}));class l{constructor(t,e,r){if(this.px=t,this.py=e,this.pz=r,null==t||!n.isValid(t))throw new Error("x required");if(null==e||!n.isValid(e))throw new Error("y required");if(null==r||!n.isValid(r))throw new Error("z required");Object.freeze(this)}static fromAffine(t){const{x:e,y:r}=t||{};if(!t||!n.isValid(e)||!n.isValid(r))throw new Error("invalid affine point");if(t instanceof l)throw new Error("projective point not allowed");const o=t=>n.eql(t,n.ZERO);return o(e)&&o(r)?l.ZERO:new l(e,r,n.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(t){const e=n.invertBatch(t.map((t=>t.pz)));return t.map(((t,n)=>t.toAffine(e[n]))).map(l.fromAffine)}static fromHex(t){const e=l.fromAffine(i(C("pointHex",t)));return e.assertValidity(),e}static fromPrivateKey(t){return l.BASE.multiply(f(t))}static msm(t,e){return function(t,e,n,r){if(dt(n,t),gt(r,e),n.length!==r.length)throw new Error("arrays of points and scalars must have equal length");const o=t.ZERO,i=F(BigInt(n.length)),s=i>12?i-3:i>4?i-2:i?2:1,f=(1<<s)-1,a=new Array(f+1).fill(o);let u=o;for(let c=Math.floor((e.BITS-1)/s)*s;c>=0;c-=s){a.fill(o);for(let e=0;e<r.length;e++){const t=r[e],o=Number(t>>BigInt(c)&BigInt(f));a[o]=a[o].add(n[e])}let t=o;for(let e=a.length-1,n=o;e>0;e--)n=n.add(a[e]),t=t.add(n);if(u=u.add(t),0!==c)for(let e=0;e<s;e++)u=u.double()}return u}(l,r,t,e)}_setWindowSize(t){d.setWindowSize(this,t)}assertValidity(){c(this)}hasEvenY(){const{y:t}=this.toAffine();if(n.isOdd)return!n.isOdd(t);throw new Error("Field doesn't support isOdd")}equals(t){a(t);const{px:e,py:r,pz:o}=this,{px:i,py:s,pz:f}=t,u=n.eql(n.mul(e,f),n.mul(i,o)),c=n.eql(n.mul(r,f),n.mul(s,o));return u&&c}negate(){return new l(this.px,n.neg(this.py),this.pz)}double(){const{a:t,b:r}=e,o=n.mul(r,Ot),{px:i,py:s,pz:f}=this;let a=n.ZERO,u=n.ZERO,c=n.ZERO,h=n.mul(i,i),d=n.mul(s,s),g=n.mul(f,f),w=n.mul(i,s);return w=n.add(w,w),c=n.mul(i,f),c=n.add(c,c),a=n.mul(t,c),u=n.mul(o,g),u=n.add(a,u),a=n.sub(d,u),u=n.add(d,u),u=n.mul(a,u),a=n.mul(w,a),c=n.mul(o,c),g=n.mul(t,g),w=n.sub(h,g),w=n.mul(t,w),w=n.add(w,c),c=n.add(h,h),h=n.add(c,h),h=n.add(h,g),h=n.mul(h,w),u=n.add(u,h),g=n.mul(s,f),g=n.add(g,g),h=n.mul(g,w),a=n.sub(a,h),c=n.mul(g,d),c=n.add(c,c),c=n.add(c,c),new l(a,u,c)}add(t){a(t);const{px:r,py:o,pz:i}=this,{px:s,py:f,pz:u}=t;let c=n.ZERO,h=n.ZERO,d=n.ZERO;const g=e.a,w=n.mul(e.b,Ot);let p=n.mul(r,s),y=n.mul(o,f),m=n.mul(i,u),E=n.add(r,o),b=n.add(s,f);E=n.mul(E,b),b=n.add(p,y),E=n.sub(E,b),b=n.add(r,i);let v=n.add(s,u);return b=n.mul(b,v),v=n.add(p,m),b=n.sub(b,v),v=n.add(o,i),c=n.add(f,u),v=n.mul(v,c),c=n.add(y,m),v=n.sub(v,c),d=n.mul(g,b),c=n.mul(w,m),d=n.add(c,d),c=n.sub(y,d),d=n.add(y,d),h=n.mul(c,d),y=n.add(p,p),y=n.add(y,p),m=n.mul(g,m),b=n.mul(w,b),y=n.add(y,m),m=n.sub(p,m),m=n.mul(g,m),b=n.add(b,m),p=n.mul(y,b),h=n.add(h,p),p=n.mul(v,b),c=n.mul(E,c),c=n.sub(c,p),p=n.mul(E,y),d=n.mul(v,d),d=n.add(d,p),new l(c,h,d)}subtract(t){return this.add(t.negate())}is0(){return this.equals(l.ZERO)}wNAF(t){return d.wNAFCached(this,t,l.normalizeZ)}multiplyUnsafe(t){const{endo:r,n:o}=e;z("scalar",t,At,o);const i=l.ZERO;if(t===At)return i;if(this.is0()||t===St)return this;if(!r||d.hasPrecomputes(this))return d.wNAFCachedUnsafe(this,t,l.normalizeZ);let{k1neg:s,k1:f,k2neg:a,k2:u}=r.splitScalar(t),c=i,h=i,g=this;for(;f>At||u>At;)f&St&&(c=c.add(g)),u&St&&(h=h.add(g)),g=g.double(),f>>=St,u>>=St;return s&&(c=c.negate()),a&&(h=h.negate()),h=new l(n.mul(h.px,r.beta),h.py,h.pz),c.add(h)}multiply(t){const{endo:r,n:o}=e;let i,s;if(z("scalar",t,St,o),r){const{k1neg:e,k1:o,k2neg:f,k2:a}=r.splitScalar(t);let{p:u,f:c}=this.wNAF(o),{p:h,f:g}=this.wNAF(a);u=d.constTimeNegate(e,u),h=d.constTimeNegate(f,h),h=new l(n.mul(h.px,r.beta),h.py,h.pz),i=u.add(h),s=c.add(g)}else{const{p:e,f:n}=this.wNAF(t);i=e,s=n}return l.normalizeZ([i,s])[0]}multiplyAndAddUnsafe(t,e,n){const r=l.BASE,o=(t,e)=>e!==At&&e!==St&&t.equals(r)?t.multiply(e):t.multiplyUnsafe(e),i=o(this,e).add(o(t,n));return i.is0()?void 0:i}toAffine(t){return u(this,t)}isTorsionFree(){const{h:t,isTorsionFree:n}=e;if(t===St)return!0;if(n)return n(l,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:t,clearCofactor:n}=e;return t===St?this:n?n(l,this):this.multiplyUnsafe(e.h)}toRawBytes(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return b("isCompressed",t),this.assertValidity(),o(l,this,t)}toHex(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return b("isCompressed",t),B(this.toRawBytes(t))}}l.BASE=new l(e.Gx,e.Gy,n.ONE),l.ZERO=new l(n.ZERO,n.ONE,n.ZERO);const h=e.nBitLength,d=(g=l,w=e.endo?Math.ceil(h/2):h,{constTimeNegate:ct,hasPrecomputes:t=>1!==yt(t),unsafeLadder(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g.ZERO,r=t;for(;e>at;)e&ut&&(n=n.add(r)),r=r.double(),e>>=ut;return n},precomputeWindow(t,e){const{windows:n,windowSize:r}=ht(e,w),o=[];let i=t,s=i;for(let f=0;f<n;f++){s=i,o.push(s);for(let t=1;t<r;t++)s=s.add(i),o.push(s);i=s.double()}return o},wNAF(t,e,n){const{windows:r,windowSize:o}=ht(t,w);let i=g.ZERO,s=g.BASE;const f=BigInt(2**t-1),a=2**t,u=BigInt(t);for(let c=0;c<r;c++){const t=c*o;let r=Number(n&f);n>>=u,r>o&&(r-=a,n+=ut);const l=t,h=t+Math.abs(r)-1,d=c%2!==0,g=r<0;0===r?s=s.add(ct(d,e[l])):i=i.add(ct(g,e[h]))}return{p:i,f:s}},wNAFUnsafe(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:g.ZERO;const{windows:o,windowSize:i}=ht(t,w),s=BigInt(2**t-1),f=2**t,a=BigInt(t);for(let u=0;u<o;u++){const t=u*i;if(n===at)break;let o=Number(n&s);if(n>>=a,o>i&&(o-=f,n+=ut),0===o)continue;let c=e[t+Math.abs(o)-1];o<0&&(c=c.negate()),r=r.add(c)}return r},getPrecomputes(t,e,n){let r=wt.get(e);return r||(r=this.precomputeWindow(e,t),1!==t&&wt.set(e,n(r))),r},wNAFCached(t,e,n){const r=yt(t);return this.wNAF(r,this.getPrecomputes(r,t,n),e)},wNAFCachedUnsafe(t,e,n,r){const o=yt(t);return 1===o?this.unsafeLadder(t,e,r):this.wNAFUnsafe(o,this.getPrecomputes(o,t,n),e,r)},setWindowSize(t,e){lt(e,w),pt.set(t,e),wt.delete(t)}});var g,w;return{CURVE:e,ProjectivePoint:l,normPrivateKeyToScalar:f,weierstrassEquation:s,isWithinCurveOrder:function(t){return U(t,St,e.n)}}}function qt(t){const e=function(t){const e=mt(t);return D(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}(t),{Fp:n,n:r}=e,o=n.BYTES+1,i=2*n.BYTES+1;function s(t){return X(t,r)}function f(t){return et(t,r)}const{ProjectivePoint:a,normPrivateKeyToScalar:u,weierstrassEquation:c,isWithinCurveOrder:l}=It({...e,toBytes(t,e,r){const o=e.toAffine(),i=n.toBytes(o.x),s=H;return b("isCompressed",r),r?s(Uint8Array.from([e.hasEvenY()?2:3]),i):s(Uint8Array.from([4]),i,n.toBytes(o.y))},fromBytes(t){const e=t.length,r=t[0],s=t.subarray(1);if(e!==o||2!==r&&3!==r){if(e===i&&4===r){return{x:n.fromBytes(s.subarray(0,n.BYTES)),y:n.fromBytes(s.subarray(n.BYTES,2*n.BYTES))}}throw new Error("invalid Point, expected length of "+o+", or uncompressed "+i+", got "+e)}{const t=q(s);if(!U(t,St,n.ORDER))throw new Error("Point is not on curve");const e=c(t);let o;try{o=n.sqrt(e)}catch(f){const t=f instanceof Error?": "+f.message:"";throw new Error("Point is not on curve"+t)}return 1===(1&r)!==((o&St)===St)&&(o=n.neg(o)),{x:t,y:o}}}}),h=t=>B(N(t,e.nByteLength));function d(t){return t>r>>St}const g=(t,e,n)=>q(t.slice(e,n));class w{constructor(t,e,n){this.r=t,this.s=e,this.recovery=n,this.assertValidity()}static fromCompact(t){const n=e.nByteLength;return t=C("compactSignature",t,2*n),new w(g(t,0,n),g(t,n,2*n))}static fromDER(t){const{r:e,s:n}=xt.toSig(C("DER",t));return new w(e,n)}assertValidity(){z("r",this.r,St,r),z("s",this.s,St,r)}addRecoveryBit(t){return new w(this.r,this.s,t)}recoverPublicKey(t){const{r:r,s:o,recovery:i}=this,u=v(C("msgHash",t));if(null==i||![0,1,2,3].includes(i))throw new Error("recovery id invalid");const c=2===i||3===i?r+e.n:r;if(c>=n.ORDER)throw new Error("recovery id 2 or 3 invalid");const l=0===(1&i)?"02":"03",d=a.fromHex(l+h(c)),g=f(c),w=s(-u*g),p=s(o*g),y=a.BASE.multiplyAndAddUnsafe(d,w,p);if(!y)throw new Error("point at infinify");return y.assertValidity(),y}hasHighS(){return d(this.s)}normalizeS(){return this.hasHighS()?new w(this.r,s(-this.s),this.recovery):this}toDERRawBytes(){return I(this.toDERHex())}toDERHex(){return xt.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return I(this.toCompactHex())}toCompactHex(){return h(this.r)+h(this.s)}}const p={isValidPrivateKey(t){try{return u(t),!0}catch(e){return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const t=ft(e.n);return function(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=t.length,o=st(e),i=ft(e);if(r<16||r<i||r>1024)throw new Error("expected "+i+"-1024 bytes of input, got "+r);const s=X(n?R(t):q(t),e-M)+M;return n?L(s,o):N(s,o)}(e.randomBytes(t),e.n)},precompute(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.BASE;return e._setWindowSize(t),e.multiply(BigInt(3)),e}};function y(t){const e=m(t),n="string"===typeof t,r=(e||n)&&t.length;return e?r===o||r===i:n?r===2*o||r===2*i:t instanceof a}const E=e.bits2int||function(t){if(t.length>8192)throw new Error("input is too large");const n=q(t),r=8*t.length-e.nBitLength;return r>0?n>>BigInt(r):n},v=e.bits2int_modN||function(t){return s(E(t))},x=P(e.nBitLength);function A(t){return z("num < 2^"+e.nBitLength,t,At,x),N(t,e.nByteLength)}function S(t,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:O;if(["recovered","canonical"].some((t=>t in o)))throw new Error("sign() legacy options not supported");const{hash:i,randomBytes:c}=e;let{lowS:h,prehash:g,extraEntropy:p}=o;null==h&&(h=!0),t=C("msgHash",t),Et(o),g&&(t=C("prehashed msgHash",i(t)));const y=v(t),m=u(r),b=[A(m),A(y)];if(null!=p&&!1!==p){const t=!0===p?c(n.BYTES):p;b.push(C("extraEntropy",t))}const B=H(...b),x=y;return{seed:B,k2sig:function(t){const e=E(t);if(!l(e))return;const n=f(e),r=a.BASE.multiply(e).toAffine(),o=s(r.x);if(o===At)return;const i=s(n*s(x+o*m));if(i===At)return;let u=(r.x===o?0:2)|Number(r.y&St),c=i;return h&&d(i)&&(c=function(t){return d(t)?s(-t):t}(i),u^=1),new w(o,c,u)}}}const O={lowS:e.lowS,prehash:!1},k={lowS:e.lowS,prehash:!1};return a.BASE._setWindowSize(8),{CURVE:e,getPublicKey:function(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return a.fromPrivateKey(t).toRawBytes(e)},getSharedSecret:function(t,e){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(y(t))throw new Error("first arg must be private key");if(!y(e))throw new Error("second arg must be public key");return a.fromHex(e).multiply(u(t)).toRawBytes(n)},sign:function(t,n){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:O;const{seed:o,k2sig:i}=S(t,n,r),s=e;return V(s.hash.outputLen,s.nByteLength,s.hmac)(o,i)},verify:function(t,n,r){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:k;const i=t;n=C("msgHash",n),r=C("publicKey",r);const{lowS:u,prehash:c,format:l}=o;if(Et(o),"strict"in o)throw new Error("options.strict was renamed to lowS");if(void 0!==l&&"compact"!==l&&"der"!==l)throw new Error("format must be compact or der");const h="string"===typeof i||m(i),d=!h&&!l&&"object"===typeof i&&null!==i&&"bigint"===typeof i.r&&"bigint"===typeof i.s;if(!h&&!d)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let g,p;try{if(d&&(g=new w(i.r,i.s)),h){try{"compact"!==l&&(g=w.fromDER(i))}catch(O){if(!(O instanceof xt.Err))throw O}g||"der"===l||(g=w.fromCompact(i))}p=a.fromHex(r)}catch(I){return!1}if(!g)return!1;if(u&&g.hasHighS())return!1;c&&(n=e.hash(n));const{r:y,s:E}=g,b=v(n),B=f(E),x=s(b*B),A=s(y*B),S=a.BASE.multiplyAndAddUnsafe(p,x,A)?.toAffine();return!!S&&s(S.x)===y},ProjectivePoint:a,Signature:w,utils:p}}function Rt(t){return{hash:t,hmac:function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return g(t,e,(0,i.Id)(...r))},randomBytes:i.po}}const Nt=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),Lt=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Ct=BigInt(1),Ht=BigInt(2),kt=(t,e)=>(t+e/Ht)/e;function Ut(t){const e=Nt,n=BigInt(3),r=BigInt(6),o=BigInt(11),i=BigInt(22),s=BigInt(23),f=BigInt(44),a=BigInt(88),u=t*t*t%e,c=u*u*t%e,l=tt(c,n,e)*c%e,h=tt(l,n,e)*c%e,d=tt(h,Ht,e)*u%e,g=tt(d,o,e)*d%e,w=tt(g,i,e)*g%e,p=tt(w,f,e)*w%e,y=tt(p,a,e)*p%e,m=tt(y,f,e)*w%e,E=tt(m,n,e)*c%e,b=tt(E,s,e)*g%e,v=tt(b,r,e)*u%e,B=tt(v,Ht,e);if(!zt.eql(zt.sqr(B),t))throw new Error("Cannot find square root");return B}const zt=it(Nt,void 0,void 0,{sqrt:Ut}),Ft=function(t,e){const n=e=>qt({...t,...Rt(e)});return{...n(e),create:n}}({a:BigInt(0),b:BigInt(7),Fp:zt,n:Lt,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const e=Lt,n=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-Ct*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),o=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),i=n,s=BigInt("0x100000000000000000000000000000000"),f=kt(i*t,e),a=kt(-r*t,e);let u=X(t-f*n-a*o,e),c=X(-f*r-a*i,e);const l=u>s,h=c>s;if(l&&(u=e-u),h&&(c=e-c),u>s||c>s)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:l,k1:u,k2neg:h,k2:c}}}},h);BigInt(0);Ft.ProjectivePoint}}]);
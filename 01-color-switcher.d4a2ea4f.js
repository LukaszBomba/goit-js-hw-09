const t=document.querySelector("body"),e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let n=null;e.addEventListener("click",(()=>{n=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.style.background=e}),1e3)})),r.addEventListener("click",(()=>{clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.d4a2ea4f.js.map

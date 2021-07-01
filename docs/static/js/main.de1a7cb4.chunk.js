(this.webpackJsonpfly=this.webpackJsonpfly||[]).push([[0],{71:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var r,a,c,s=n(0),u=n.n(s),i=n(8),o=n.n(i),l=(n(71),n(47)),j=n(15),b=n.n(j),p=n(26),f=n(23),d=n(42),h=n(43),x=n(127),O=n(119),v=n(128),g=n(129),m=n(117),y=n(126),k=n(6),S=h.a.form(r||(r=Object(d.a)(["\n    display: flex;\n    flex-direction: column;\n"]))),C=h.a.div(a||(a=Object(d.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    margin-bottom: 20px;\n\n    & > *.MuiFormControl-root {\n        min-width: 45%;\n    }\n"]))),w=h.a.div(c||(c=Object(d.a)(["\n    display: flex;\n    justify-content: center;\n    margin-bottom: 20px;\n"]))),D=function(e){var t=e.getFlightData,n=Object(s.useState)(function(e){var t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0"),r=e.getFullYear();return"".concat(r,"-").concat(t,"-").concat(n)}(new Date("Thu Jul 11 2021 22:11:18 GMT+0200"))),r=Object(f.a)(n,2),a=r[0],c=r[1],u=Object(s.useState)(""),i=Object(f.a)(u,2),o=i[0],l=i[1],j=Object(s.useState)(""),b=Object(f.a)(j,2),p=b[0],d=b[1],h=Object(s.useState)("EUR"),D=Object(f.a)(h,2),U=D[0],F=D[1];return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(S,{onSubmit:function(e){return e.preventDefault()},children:[Object(k.jsxs)(C,{children:[Object(k.jsx)(x.a,{type:"date",label:"Departure Date",defaultValue:a,onChange:function(e){return c(e.target.value)}}),Object(k.jsxs)(m.a,{children:[Object(k.jsx)(v.a,{shrink:!0,children:"Currency"}),Object(k.jsxs)(y.a,{value:U,onChange:function(e){return F(e.target.value)},children:[Object(k.jsx)(g.a,{value:"EUR",children:"EUR"}),Object(k.jsx)(g.a,{value:"USD",children:"USD"}),Object(k.jsx)(g.a,{value:"UAH",children:"UAH"}),Object(k.jsx)(g.a,{value:"RUB",children:"RUB"})]})]})]}),Object(k.jsxs)(C,{children:[Object(k.jsx)(x.a,{label:"From",value:o,onChange:function(e){return l(e.target.value)}}),Object(k.jsx)(x.a,{label:"To",value:p,onChange:function(e){return d(e.target.value)}})]})]}),Object(k.jsx)(w,{children:Object(k.jsx)(O.a,{onClick:function(){return t({departureDate:a,from:o,to:p,currency:U})},variant:"contained",color:"primary",children:"Find"})})]})},U=n(123),F=n(125),I=n(121),P=n(122),N=n(124),J=n(120),M=n(118),R=function(e){var t=e.carrier,n=e.currencies,r=e.quotes,a=e.places,c=t.CarrierId,s=t.Name,u=n[0].Symbol,i=r.filter((function(e){return e.OutboundLeg.CarrierIds[0]===c}));return Object(k.jsxs)(J.a,{children:[Object(k.jsxs)(I.a,{children:[s," (",a.from.replace("-sky",""),"/",a.to.replace("-sky",""),")"]}),Object(k.jsxs)(I.a,{children:[i.map((function(e){return e.MinPrice})).join(", ")," ",u]})]})},T=function(e){var t=e.flightData,n=t.Carriers,r=t.Currencies,a=t.Quotes,c=t.Places;return n?Object(k.jsx)(P.a,{component:M.a,children:Object(k.jsxs)(U.a,{"aria-label":"simple table",children:[Object(k.jsx)(N.a,{children:Object(k.jsxs)(J.a,{children:[Object(k.jsx)(I.a,{children:"Name"}),Object(k.jsx)(I.a,{children:"Price"})]})}),Object(k.jsx)(F.a,{children:n.map((function(e){return Object(k.jsx)(R,{currencies:r,carrier:e,quotes:a,places:c},e.CarrierId)}))})]})}):null},q=function(){var e=Object(p.a)(b.a.mark((function e(t,n){var r,a,c,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=localStorage.getItem("countries"),a=r?JSON.parse(r):[],!(c=a.find((function(e){return e.countryName===t})))){e.next=5;break}return e.abrupt("return",c.results);case 5:return e.next=7,fetch("".concat(n).concat(t),{headers:{"x-rapidapi-key":"c37641f051mshe682881ca808e3ep1b0ba1jsne813ccecdbfb","x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",useQueryString:!0}}).then((function(e){return e.json()})).then((function(e){return e.Places})).catch((function(){return alert("No such country"),[]}));case 7:return(s=e.sent).length&&(a.some((function(e){return e.CountryName===t}))||(a.push({countryName:t,results:s}),localStorage.setItem("countries",JSON.stringify(a)))),e.abrupt("return",s);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=(n(79),"en-US"),B=function(e){return"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/".concat("UA","/").concat(e,"/").concat(A,"/?query=")},E=function(){var e=Object(s.useState)({}),t=Object(f.a)(e,2),n=t[0],r=t[1],a=function(){var e=Object(p.a)(b.a.mark((function e(t,n){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,q(t,B(n));case 4:return r=e.sent,e.abrupt("return",null===r||void 0===r?void 0:r[0]);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),c=function(){var e=Object(p.a)(b.a.mark((function e(t,n){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,q(t,B(n));case 4:return r=e.sent,e.abrupt("return",null===r||void 0===r?void 0:r[0]);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),u=function(){var e=Object(p.a)(b.a.mark((function e(t){var n,s,u,i,o,j;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.departureDate,s=t.from,u=t.to,i=t.currency,e.next=3,a(s,i);case 3:return o=e.sent,e.next=6,c(u,i);case 6:if(j=e.sent,n&&o&&j&&i){e.next=9;break}return e.abrupt("return");case 9:fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/".concat("UA","/").concat(i,"/").concat(A,"/").concat(null===o||void 0===o?void 0:o.PlaceId,"/").concat(null===j||void 0===j?void 0:j.PlaceId,"/").concat(n),{headers:{"x-rapidapi-key":"ab45838c7cmsh9ac1edb62d199a4p1e3ca7jsnc9b68cdbfc9f","x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",useQueryString:!0}}).then((function(e){return e.json()})).then((function(e){return r(Object(l.a)(Object(l.a)({},e),{},{Places:{from:o.PlaceId,to:j.PlaceId}}))}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(k.jsxs)("div",{className:"app",children:[Object(k.jsx)(D,{getFlightData:u}),Object(k.jsx)(T,{flightData:n})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,131)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};o.a.render(Object(k.jsx)(u.a.StrictMode,{children:Object(k.jsx)(E,{})}),document.getElementById("root")),L()}},[[80,1,2]]]);
//# sourceMappingURL=main.de1a7cb4.chunk.js.map
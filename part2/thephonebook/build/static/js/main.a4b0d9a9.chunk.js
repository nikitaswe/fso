(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{44:function(e,n,t){},45:function(e,n,t){"use strict";t.r(n);var r=t(19),c=t.n(r),o=t(20),a=t(10),u=t(3),i=t(1),s=t(0),l=function(e){var n=e.filter,t=e.onChange;return Object(s.jsxs)("div",{children:["filter shown with: ",Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.name,t=e.number,r=e.onSubmit,c=e.onChangeName,o=e.onChangeNumber;return Object(s.jsxs)("form",{onSubmit:r,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:n,onChange:c})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:t,onChange:o})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.id,t=e.name,r=e.number,c=e.deletePerson;return Object(s.jsxs)("li",{children:[t," ",r," ",Object(s.jsx)("button",{onClick:function(){return c(n)},children:"delete"})]})},j=function(e){var n=e.persons,t=e.filter,r=e.deletePerson;return Object(s.jsx)("div",{children:Object(s.jsx)("ul",{children:n.map((function(e){var n=e.name,c=e.id,o=e.number;return n.toLowerCase().includes(t)&&Object(s.jsx)(b,{id:c,name:n,number:o,deletePerson:r},c)}))})})},f=t(5),m=t.n(f),h="/api/persons",O={getAll:function(){return m.a.get(h).then((function(e){return e.data}))},createPerson:function(e){return m.a.post(h,e).then((function(e){return e.data}))},deletePerson:function(e){return m.a.delete(h+"/".concat(e))},editPerson:function(e){return m.a.put(h+"/".concat(e.id),e).then((function(e){return e.data}))}},v=function(e){var n=e.message,t=e.styleName;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},x=function(){var e=Object(i.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(i.useState)(""),b=Object(u.a)(c,2),f=b[0],m=b[1],h=Object(i.useState)(""),x=Object(u.a)(h,2),p=x[0],g=x[1],w=Object(i.useState)(""),C=Object(u.a)(w,2),P=C[0],N=C[1],S=Object(i.useState)(null),y=Object(u.a)(S,2),k=y[0],T=y[1],A=Object(i.useState)(null),D=Object(u.a)(A,2),E=D[0],J=D[1];Object(i.useEffect)((function(){O.getAll().then((function(e){r(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(v,{message:k,styleName:"success"}),Object(s.jsx)(v,{message:E,styleName:"error"}),Object(s.jsx)(l,{filter:P,onChange:function(e){return N(e.target.value)}}),Object(s.jsx)("h3",{children:"Add new"}),Object(s.jsx)(d,{name:f,number:p,onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f}));if(n){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){var c=Object(a.a)(Object(a.a)({},n),{},{number:p});O.editPerson(c).then((function(e){T("Number for '".concat(e.name,"' has changed to '").concat(e.number,"' ")),setTimeout((function(){T(null)}),5e3),r(t.map((function(n){return n.name===e.name?e:n}))),m(""),g("")})).catch((function(e){J("Contact '".concat(n.name,"' was already deleted from server")),setTimeout((function(){J(null)}),5e3),r(t.filter((function(e){return e.id!==n.id})))}))}}else{var u={name:f,number:p};O.createPerson(u).then((function(e){T("Added '".concat(e.name,"'")),setTimeout((function(){T(null)}),5e3),r(t.concat(e)),m(""),g("")})).catch((function(e){console.log(e.response.data.error),J(e.response.data.error),setTimeout((function(){J(null)}),8e3),r(Object(o.a)(t))}))}},onChangeName:function(e){return m(e.target.value)},onChangeNumber:function(e){return g(e.target.value)}}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(j,{persons:t,filter:P,deletePerson:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&O.deletePerson(e).then((function(n){var c=t.filter((function(n){return n.id!==e}));r(c)})).catch((function(e){J("Contact '".concat(n,"' was already deleted from server")),setTimeout((function(){J(null)}),5e3),r(t.filter((function(e){return e.name!==n})))}))}})]})};t(44);c.a.render(Object(s.jsx)(x,{}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.a4b0d9a9.chunk.js.map
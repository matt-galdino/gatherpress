(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.element,n=window.wp.i18n,a=window.wp.data,r=window.wp.components,s=window.wp.plugins,i=window.wp.editPost,o=window.moment;var l=e.n(o);const c=window.wp.apiFetch;var m=e.n(c);function d(){(0,a.dispatch)("core/editor").editPost({meta:{_non_existing_meta:!0}})}function u(e){if("object"==typeof GatherPress)return e.split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}function p(e,t){if("object"!=typeof GatherPress)return;const n=e.split("."),a=n.pop();n.reduce(((e,t)=>{var n;return null!==(n=e[t])&&void 0!==n?n:e[t]={}}),GatherPress)[a]=t}const g="YYYY-MM-DDTHH:mm:ss",_="YYYY-MM-DD HH:mm:ss",v="MMMM D, YYYY h:mm a",E=(e=u("event_datetime.timezone"))=>l().tz.zone(e)?e:(0,n.__)("GMT","gatherpress"),f=(e="")=>{const t=/^(\+|-)(\d{2}):(00|15|30|45)$/,n=e.replace(t,"$1");return n!==e?"UTC"+n+parseInt(e.replace(t,"$2")).toString()+e.replace(t,"$3").replace("00","").replace("15",".25").replace("30",".5").replace("45",".75"):e},h=l().tz(E()).add(1,"day").set("hour",18).set("minute",0).set("second",0).format(g),S=l().tz(h,E()).add(2,"hours").format(g),T=(e,t=null)=>{!function(e){const t=l().tz(u("event_datetime.datetime_end"),E()).valueOf(),n=l().tz(e,E()).valueOf();if(n>=t){const e=l().tz(n,E()).add(2,"hours").format(g);w(e)}}(e),p("event_datetime.datetime_start",e),"function"==typeof t&&t(e),d()},w=(e,t=null)=>{!function(e){const t=l().tz(u("event_datetime.datetime_start"),E()).valueOf(),n=l().tz(e,E()).valueOf();if(n<=t){const e=l().tz(n,E()).subtract(2,"hours").format(g);T(e)}}(e),p("event_datetime.datetime_end",e),null!==t&&t(e),d()},P=(e,t=!1)=>{for(const[n,a]of Object.entries(e)){let e=n;t&&(e+=t);const r=new CustomEvent(e,{detail:a});dispatchEvent(r)}};function b(){return"gp_event"===(0,a.select)("core/editor").getCurrentPostType()}function z(){const e=l()(u("event_datetime.datetime_end"));return l().tz(E()).valueOf()>e.tz(E()).valueOf()}function D(){const e="gp_event_past",t=(0,a.dispatch)("core/notices");t.removeNotice(e),z()&&t.createNotice("warning",(0,n.__)("This event has already past.","gatherpress"),{id:e,isDismissible:!1})}const O=window.wp.date,y=e=>{const{dateTimeStart:t}=e;return l().tz(t,E()).format(v)},C=e=>{const{dateTimeEnd:t}=e;return l().tz(t,E()).format(v)},k=e=>{const{dateTimeStart:n,setDateTimeStart:a}=e,s=(0,O.getSettings)(),i=/a(?!\\)/i.test(s.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,t.createElement)(r.DateTimePicker,{currentDate:n,onChange:e=>T(e,a),is12Hour:i})},x=e=>{const{dateTimeEnd:n,setDateTimeEnd:a}=e,s=(0,O.getSettings)(),i=/a(?!\\)/i.test(s.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,t.createElement)(r.DateTimePicker,{currentDate:n,onChange:e=>w(e,a),is12Hour:i})},N=e=>{const{dateTimeStart:a,setDateTimeStart:s}=e;return(0,t.useEffect)((()=>{s(l().tz((()=>{let e=u("event_datetime.datetime_start");return e=""!==e?l().tz(e,E()).format(g):h,p("event_datetime.datetime_start",e),e})(),E()).format(g)),P({setDateTimeStart:a}),D()})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.Flex,null,(0,t.createElement)(r.FlexItem,null,(0,n.__)("Start","gatherpress")),(0,t.createElement)(r.FlexItem,null,(0,t.createElement)(r.Dropdown,{position:"bottom left",renderToggle:({isOpen:e,onToggle:n})=>(0,t.createElement)(r.Button,{onClick:n,"aria-expanded":e,isLink:!0},(0,t.createElement)(y,{dateTimeStart:a})),renderContent:()=>(0,t.createElement)(k,{dateTimeStart:a,setDateTimeStart:s})}))))},Y=e=>{const{dateTimeEnd:a,setDateTimeEnd:s}=e;return(0,t.useEffect)((()=>{s(l().tz((()=>{let e=u("event_datetime.datetime_end");return e=""!==e?l().tz(e,E()).format(g):S,p("event_datetime.datetime_end",e),e})(),E()).format(g)),P({setDateTimeEnd:a}),D()})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.Flex,null,(0,t.createElement)(r.FlexItem,null,(0,n.__)("End","gatherpress")),(0,t.createElement)(r.FlexItem,null,(0,t.createElement)(r.Dropdown,{position:"bottom left",renderToggle:({isOpen:e,onToggle:n})=>(0,t.createElement)(r.Button,{onClick:n,"aria-expanded":e,isLink:!0},(0,t.createElement)(C,{dateTimeEnd:a})),renderContent:()=>(0,t.createElement)(x,{dateTimeEnd:a,setDateTimeEnd:s})}))))},M=e=>{const{timezone:a,setTimezone:s}=e,i=u("timezone_choices");return(0,t.useEffect)((()=>{s(u("event_datetime.timezone"))}),[s]),(0,t.useEffect)((()=>{P({setTimezone:u("event_datetime.timezone")})})),(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.SelectControl,{label:(0,n.__)("Time Zone","gatherpress"),value:f(a),onChange:e=>{e=((e="")=>{const t=/^UTC(\+|-)(\d+)(.\d+)?$/,n=e.replace(t,"$1");if(n!==e){const a=e.replace(t,"$2").padStart(2,"0");let r=e.replace(t,"$3");return""===r&&(r=":00"),r=r.replace(".25",":15").replace(".5",":30").replace(".75",":45"),n+a+r}return e})(e),s(e),p("event_datetime.timezone",e),d()}},Object.keys(i).map((e=>(0,t.createElement)("optgroup",{key:e,label:e},Object.keys(i[e]).map((n=>(0,t.createElement)("option",{key:n,value:n},i[e][n]))))))))};(0,a.subscribe)((function(){const e=(0,a.select)("core/editor").isSavingPost(),t=(0,a.select)("core/editor").isAutosavingPost();b()&&e&&!t&&m()({path:"/gatherpress/v1/event/datetime/",method:"POST",data:{post_id:u("post_id"),datetime_start:l().tz(u("event_datetime.datetime_start"),E()).format(_),datetime_end:l().tz(u("event_datetime.datetime_end"),E()).format(_),timezone:u("event_datetime.timezone"),_wpnonce:u("nonce")}}).then((()=>{!function(){const e="gp_event_communcation",t=(0,a.dispatch)("core/notices");t.removeNotice(e),"publish"!==(0,a.select)("core/editor").getEditedPostAttribute("status")||z()||t.createNotice("success",(0,n.__)("Update members about this event via email?","gatherpress"),{id:e,isDismissible:!0,actions:[{onClick:()=>{P({setOpen:!0})},label:(0,n.__)("Create Message","gatherpress")}]})}()}))}));const j=()=>{const[e,a]=(0,t.useState)(),[r,s]=(0,t.useState)(),[i,o]=(0,t.useState)();return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("section",null,(0,t.createElement)("h3",null,(0,n.__)("Date & time","gatherpress")),(0,t.createElement)(N,{dateTimeStart:e,setDateTimeStart:a}),(0,t.createElement)(Y,{dateTimeEnd:r,setDateTimeEnd:s})),(0,t.createElement)("section",null,(0,t.createElement)(M,{timezone:i,setTimezone:o})))},A=()=>{const[e,s]=(0,t.useState)("No venue selected."),[i,o]=(0,t.useState)(""),[l,c]=(0,t.useState)(""),[m,d]=(0,t.useState)(""),[u,p]=(0,t.useState)(!1),[g,_]=(0,t.useState)(""),v=(0,a.useDispatch)("core/editor").editPost,{unlockPostSaving:E}=(0,a.useDispatch)("core/editor"),f=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("_gp_venue"))),h=(0,a.useSelect)((e=>e("core").getEntityRecord("taxonomy","_gp_venue",f))),S=h?.slug.replace(/^_/,""),[T,w]=(0,t.useState)(""),b=f+":"+T,z=(0,a.useSelect)((e=>e("core").getEntityRecords("postType","gp_venue",{per_page:1,slug:T})));(0,t.useEffect)((()=>{var e,t,a,r,i;let l={};if(T&&Array.isArray(z)){var m;const e=null!==(m=z[0]?.meta?._venue_information)&&void 0!==m?m:"{}";var u;e&&(l=JSON.parse(e),l.name=null!==(u=z[0]?.title.rendered)&&void 0!==u?u:"")}const p=null!==(e=l?.name)&&void 0!==e?e:(0,n.__)("No venue selected.","gatherpress"),g=null!==(t=l?.fullAddress)&&void 0!==t?t:"",v=null!==(a=l?.phoneNumber)&&void 0!==a?a:"",E=null!==(r=l?.website)&&void 0!==r?r:"";w(S),_(null!==(i=String(b))&&void 0!==i?i:""),s(p),o(g),c(v),d(E),P({setName:p,setFullAddress:g,setPhoneNumber:v,setWebsite:E,setIsOnlineEventTerm:"online-event"===T})}),[T,z]);let D=(0,a.useSelect)((e=>e("core").getEntityRecords("taxonomy","_gp_venue",{per_page:-1,context:"view"})),[]);return D?(D=D.map((e=>({label:e.name,value:e.id+":"+e.slug.replace(/^_/,"")}))),D.unshift({value:":",label:(0,n.__)("Choose a venue","gatherpress")})):D=[],(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(r.SelectControl,{label:(0,n.__)("Venue Selector","gatherpress"),value:g,onChange:e=>{(e=>{_(e);const t=""!==(e=e.split(":"))[0]?[e[0]]:[];v({_gp_venue:t}),w(e[1]),E()})(e)},options:D}))},F=()=>(0,t.createElement)("section",null,(0,t.createElement)(A,null)),$=()=>{const{editPost:e,unlockPostSaving:s}=(0,a.useDispatch)("core/editor"),i=(0,a.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta")._online_event_link)),[o,l]=(0,t.useState)(i);return((e,t=!1)=>{for(const[n,a]of Object.entries(e)){let e=n;t&&(e+=t),addEventListener(e,(e=>{a(e.detail)}),!1)}})({setOnlineEventLink:l},u("post_id")),(0,t.createElement)(r.TextControl,{label:(0,n.__)("Online event link","gatherpress"),value:o,placeholder:(0,n.__)("Add link to online event","gatherpress"),onChange:t=>{(t=>{e({meta:{_online_event_link:t}}),l(t),P({setOnlineEventLink:t},u("post_id")),s()})(t)}})},L=()=>(0,t.createElement)("section",null,(0,t.createElement)($,null));(0,s.registerPlugin)("gp-event-settings",{render:()=>b()&&(0,t.createElement)(i.PluginDocumentSettingPanel,{name:"gp-event-settings",title:(0,n.__)("Event settings","gatherpress"),initialOpen:!0,className:"gp-event-settings"},(0,t.createElement)(r.__experimentalVStack,{spacing:6},(0,t.createElement)(j,null),(0,t.createElement)(F,null),(0,t.createElement)(L,null)))}),(0,a.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-event-settings/gp-event-settings"),(0,s.registerPlugin)("gp-venue-settings",{render:()=>"gp_venue"===(0,a.select)("core/editor").getCurrentPostType()&&(0,t.createElement)(i.PluginDocumentSettingPanel,{name:"gp-venue-settings",title:(0,n.__)("Venue settings","gatherpress"),initialOpen:!0,className:"gp-venue-settings"},(0,t.createElement)(r.__experimentalVStack,{spacing:6}))}),(0,a.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-venue-settings/gp-venue-settings")})();
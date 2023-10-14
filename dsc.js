var window = window ?? self;
const settings = new Map()
var node = document.createElement('p');
var prevWidth = window.innerWidth;

var powerIO =           { on: 'true', listener: [node], className: [''], name: 'Power', innerHTML: '' }
var shortsIO =          { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-shelf-renderer','style-scope ytd-reel-shelf-renderer'], listenerID: ['content','content'], name: 'Shorts', innerHTML: 'Shorts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var shortsVideosIO =    { on: 'true', listener: [node], className: ['yt-simple-endpoint inline-block style-scope ytd-thumbnail'], listenerID: ['content'], name: 'Shorts Videos', innerHTML: '/shorts/', waitFunction: waitForMut, deleteFunction: removeByHREF }
var shortsSidebarIO =   { on: 'true', listener: [node,node], className: ['yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer','yt-simple-endpoint style-scope ytd-guide-entry-renderer'], listenerID: ['content','sections'], name: 'Shorts Sidebar', innerHTML: '', title: 'Shorts', id: 'endpoint', waitFunction: waitForMut, deleteFunction: removeByTitle }
var communityIO =       { on: 'true', listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['content'], name: 'Community', innerHTML: 'Latest YouTube posts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var breakingNewsIO =    { on: 'true', listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['content'], name: 'Breaking News', innerHTML: 'Breaking news', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var sidebarExtendedIO=  { on: 'true', listener: [node], className: ['ytd-app'], name: 'Sidebar Extended', buttonID: 'guide-button', removeAttributes: ['guide-persistent-and-visible','opened','mini-guide-visible'], outerHTML: 'ytd-mini-guide-renderer', id: 'contentContainer', waitFunction: waitForSidebarExtended, deleteFunction: removeSidebarExtended }
var sidebarMiniIO=      { on: 'true', listener: [node], className: ['ytd-mini-guide-renderer'], listenerID: ['content'], name: 'Sidebar Mini', removeAttributes: ['mini-guide-visible'], waitFunction: waitForMut, deleteFunction: removeClassDisplay }
var headerIO =          { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-grid-renderer','style-scope ytd-search'], listenerID: ['primary','content'], name: 'Header', innerHTML: '', id: 'header', waitFunction: waitForMut, deleteFunction: removeHeader }

settings.set("powerIO",powerIO)
settings.set("shortsIO",shortsIO)
settings.set("shortsVideosIO",shortsVideosIO)
settings.set("shortsSidebarIO",shortsSidebarIO)
settings.set("communityIO",communityIO)
settings.set("breakingNewsIO",breakingNewsIO)
settings.set("sidebarExtendedIO",sidebarExtendedIO)
settings.set("sidebarMiniIO",sidebarMiniIO)
settings.set("headerIO",headerIO)

async function getStorage(key){
    var storage = await chrome.storage.local.get(key).then((result) => { return result[key] });
    return storage;
}

async function setStorage(key, value){ await chrome.storage.local.set({[key]: value}) }

async function awaitStorage(IO){
    IO.on = (await getStorage(IO.name) != null) ? await getStorage(IO.name) : true
}

function removeHeader(IO,className){
    const elements = document.getElementsByClassName(className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].id == IO.id){
            console.log("Removing " + IO.name + " at " + elements[element].parentNode.className)
            elements[element].parentNode.removeChild(elements[element]);
            return true;
        }
    }
    // Slower for some reason, leaving to debug later
    // let elem = document.getElementById(IO.id)
    // if(elem && elem.parentNode){
    //     console.log("Removing " + IO.name + " at " + elem.parentNode.className)
    //     elem.parentNode.removeChild(elem)
    //     return true;
    // }
}

function removeByTitle(IO, className){
    let elements = document.getElementsByClassName(className)
    for(ele in elements){
        if(elements[ele].id == IO.id && elements[ele].title == IO.title){
            elements[ele].remove()
            return true;
        }
    }
}

function removeByHREF(IO, className){
    const elements = document.getElementsByClassName(className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].href && elements[element].href.match(IO.innerHTML)){
            console.log("Removing "+ IO.name+" at "+ elements[element].parentNode.className)
            // ytd-video-renderer -> div.id dismissable -> ytd-thumbnail -> current element
            elements[element].parentNode.parentNode.parentNode.remove()
        }
    }
}

function removeByInnerHTML(IO,className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        if(elements[elem].innerHTML != null && elements[elem].innerHTML.match(IO.innerHTML)){
            elements[elem].parentNode.parentNode.parentNode.remove();
            break; // break if only one section available per load
        }
    }
}

function removeSidebarExtended(IO, element){
    let attributeRemoved = false;
    // Removing extension button
    if(document.getElementById(IO.buttonID) != null) {document.getElementById(IO.buttonID).classList.add("emptyDSC")}
    // Removing opened attribute from contentContainer element
    if(document.getElementById(IO.id)){ removeAttributeIO(IO,1,document.getElementById(IO.id)) }
    // Removing guide-persistent-and-visible from ytd-app
    attributeRemoved = (removeAttributeIO(IO,0,element)) 
    // Removing mini-guide-visible from ytd-app
    if(settings.get("sidebarMiniIO").on) { removeAttributeIO(IO,2,element) }
    if(attributeRemoved){ console.log("Removing " + IO.name) }
    return attributeRemoved;
}

function removeAttributeIO(IO, i, element){
    if(element.getAttribute){
        let attribute = element.getAttribute(IO.removeAttributes[i])
        element.removeAttribute(IO.removeAttributes[i])
        if(attribute != null) { return true; }
    }
    return false;
}

function removeClassDisplay(IO){
    let elements = document.getElementsByClassName(IO.className[0])
    for(elem in elements){
        if(elements[elem].classList){
            console.log("Adding empty class to "+IO.className[0])
            // Adding no display to element
            elements[elem].classList.add("emptyDSC")
            // Removing mini-guide-visible attribute from ytd-app element
            if(IO.removeAttributes){ 
                let ytd = document.getElementById("content").parentNode
                removeAttributeIO(IO,0,ytd)
            }
            return true; // deletes element once (remove this so it doesn't prevent space issues)
        }
    }
}

function preDisconnect(listener){
    if(listener.disconnect != null){ listener.disconnect() }
}

function checkToDisconnect(listener,on){
    if(settings.get("powerIO").on == false || on == false){
        listener.disconnect();
        return true;
    }
    return false;
}

function waitForMut(IO){
    for(let i = 0; i < IO.listener.length; i++){
        IO.deleteFunction(IO,IO.className[i])
        preDisconnect(IO.listener[i])
        IO.listener[i] = new MutationObserver(function() {
            if(checkToDisconnect(IO.listener[i], IO.on)) { return; }
            if(IO.deleteFunction(IO,IO.className[i])) { IO.listener[i].disconnect() }
        });
        try{
            waitForObserverID(IO.listenerID[i]).then((element) => {
                IO.listener[i].observe(element, { childList: true, subtree: true });
            });
        } catch { console.log("Body not loaded yet.") };
    }
}

function waitForSidebarExtended(IO){
    // Checking if we can hide the element needed, otherwise we'll wait for mutation
    if( document.getElementsByTagName(IO.className[0])[0] != null){
        IO.deleteFunction(IO, document.getElementsByTagName(IO.className[0])[0])
    }
    preDisconnect(IO.listener[0])
    IO.listener[0] = new MutationObserver(() => {
        if (checkToDisconnect(IO.listener[0],IO.on)){ return; }
        if( document.getElementsByTagName(IO.className[0])[0] != null){
            IO.deleteFunction(IO, document.getElementsByTagName(IO.className[0])[0])
        }
    });
    try{
        waitForObserver(IO.className[0]).then((element) =>{
            IO.listener[0].observe(element, {attributeFilter: [IO.removeAttributes[0],IO.removeAttributes[1],IO.removeAttributes[2]]})
        })
    } catch { console.log("Body not loaded yet.") };
}

function waitForObserverID(listenerID){
    return new Promise(resolve => {
        let ele = document.getElementById(listenerID)
        if (ele){ return resolve(ele); }
        const observer = new MutationObserver(() => {
            let ele = document.getElementById(listenerID)
            if (ele) {
                observer.disconnect();
                return resolve(ele);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function waitForObserver(name){
    return new Promise(resolve => {
        let ele = document.getElementsByTagName(name)[0]
        if (ele){ return resolve(ele); }
        const observer = new MutationObserver(() => {
            let ele = document.getElementsByTagName(name)[0]
            if (ele) {
                observer.disconnect();
                return resolve(ele);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

async function waitForDocument(){
    return new Promise(resolve => {
        const list = new MutationObserver(function() {
            if(document.body){
                list.disconnect()
                resolve();
            }
        });
        try{
            list.observe(document, { childList: true, subtree: true });
        } catch { console.log("Document not loaded yet.") };
    });
}

function deleteIO(){
    for (const [key, value] of settings.entries()) {
        if(value.name != "Power"){
            if(value.on == true){ value.waitFunction(value) }
        }
    }
}

async function resetValues(){
    for (const [key, value] of settings.entries()) {
        value.on = (await getStorage(value.name) != null) ? await getStorage(value.name) : true
    }
}

async function startup(){
    for (const [key, value] of settings.entries()) {
        await awaitStorage(value)   // loading settings
    }
    if(settings.get("powerIO").on == true){
        deleteIO()                  // implementing
    }
}

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        await setStorage(key,newValue)
        await resetValues();
        if(newValue == true){
            if(key == "Power"){ deleteIO() }
            else if(settings.get("powerIO").on == true){
                for (const [key2, value] of settings.entries()) {
                    if(value.name == key){ value.waitFunction(value) }
                }
            }
        }
    }
});

window.onunload = function() {
    console.log("Disconnecting listeners");
    for (const [key, value] of settings.entries()) {
        for(let i = 0; i < value.listener.length; i++){
            if(value.listener[i].disconnect){
                value.listener[i].disconnect();
            }
        }
    }
    return;
}

waitForDocument().then(() => {
    startup()
})
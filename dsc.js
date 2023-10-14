var window = window ?? self;
const settings = new Map()
var node = document.createElement('p');
var prevWidth = window.innerWidth;

var powerIO =           { on: 'true', listener: [node], className: [''], name: 'Power', innerHTML: '' }
var shortsIO =          { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-shelf-renderer','style-scope ytd-reel-shelf-renderer'], listenerID: ['contents','contents'], higherClass: ['',''], name: 'Shorts', innerHTML: 'Shorts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var shortsVideosIO =    { on: 'true', listener: [node], className: ['yt-simple-endpoint inline-block style-scope ytd-thumbnail'], listenerID: ['contents'], higherClass: ['.style-scope.ytd-item-section-renderer'], name: 'Shorts Videos', innerHTML: '/shorts/', waitFunction: waitForMut, deleteFunction: removeByHREF }
var shortsSidebarIO =   { on: 'true', listener: [node,node], className: ['yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer','yt-simple-endpoint style-scope ytd-guide-entry-renderer'], listenerID: ['items','sections'], higherClass: ['',''], name: 'Shorts Sidebar', innerHTML: '', title: 'Shorts', id: 'endpoint', waitFunction: waitForMut, deleteFunction: removeByTitle }
var communityIO =       { on: 'true', listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['contents'], higherClass: [''], name: 'Community', innerHTML: 'Latest YouTube posts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var breakingNewsIO =    { on: 'true', listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['title'], higherClass: [''], name: 'Breaking News', innerHTML: 'Breaking news', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var sidebarExtendedIO=  { on: 'true', listener: [node], className: ['tp-yt-app-drawer','ytd-app','style-scope ytd-app','style-scope ytd-rich-section-renderer','video-badge style-scope ytd-rich-grid-media'], higherClass: ['',''], name: 'Sidebar Extended', buttonID: 'guide-button', removeAttributes: ['guide-persistent-and-visible','opened','mini-guide-visible'], outerHTML: 'ytd-mini-guide-renderer', id: 'contentContainer', waitFunction: waitForSidebarExtended, deleteFunction: removeSidebarExtended } //yt-uix-sessionlink ytp-title-fullerscreen-link
var sidebarMiniIO=      { on: 'true', listener: [node], className: ['ytd-mini-guide-renderer'], listenerID: ['content'], higherClass: [''], name: 'Sidebar Mini', removeAttributes: ['mini-guide-visible'], waitFunction: waitForMut, deleteFunction: addEmptyClass }
var headerIO =          { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-grid-renderer','style-scope ytd-search'], higherClass: ['',''], name: 'Header', innerHTML: '', id: 'header', waitFunction: waitForMultiMut, deleteFunction: removeHeader, deleteMutFunction: removeHeaderMut }

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
        }
    }
}

function removeHeaderMut(IO, i, mutations){
    for(mut in mutations){
        if(mutations[mut].target.className == IO.className[i] && mutations[mut].target.id == IO.id){
            console.log("Removing " + IO.name + " at " + mutations[mut].target.parentNode.className)
            mutations[mut].target.parentNode.removeChild(mutations[mut].target);
            // We can disconnect as it only loads once but will keep running to future proof
        }
    }
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

function removeByHREF(IO, className, higherClass){
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
    let elements = document.getElementsByTagName("span")
    for(ele in elements){
        if(elements[ele].className == className && elements[ele].innerHTML.match(IO.innerHTML)){
            console.log("Removing " + IO.name + " at " + elements[ele].className)
            // On search pages
            if(className.match("ytd-reel-shelf")){
                // ytd-reel-shelf-renderer -> div.id title-container -> h2 -> current span element
                elements[ele].parentNode.parentNode.parentNode.remove();
            }
            // On home/subscription pages
            else{
                // ytd-rich-section-renderer -> div.id content -> ytd-rich-shelf-renderer->
                // div.id dismissable -> div.id rich-shelf-header-container -> div.id rich-shelf-header ->
                // h2 -> div.id title-container -> div.id title-text -> current span element
                elements[ele].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
            }
            break; // break outer if only one section available per webpage
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

function addEmptyClass(IO){
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

function waitForMultiMut(IO) {
    for(let i = 0; i < IO.listener.length; i++){
        IO.deleteFunction(IO,IO.className[i])
        preDisconnect(IO.listener[i])
        IO.listener[i] = new MutationObserver(mutations => {
            if(checkToDisconnect(IO.listener[i],IO.on)) { return; }
            IO.deleteMutFunction(IO, i, mutations)
        });
        try{
            IO.listener[i].observe(document.body, { childList: true, subtree: true });
        } catch { console.log("Body not loaded yet.") };
    }
}

function waitForMut(IO){
    for(let i = 0; i < IO.listener.length; i++){
        IO.deleteFunction(IO,IO.className[i],IO.higherClass[i])
        preDisconnect(IO.listener[i])
        IO.listener[i] = new MutationObserver(function() {
            if(checkToDisconnect(IO.listener[i], IO.on)) { return; }
            if(IO.deleteFunction(IO,IO.className[i],IO.higherClass[i])) { IO.listener[i].disconnect()}
        });
        try{
            IO.listener[i].observe(document.body, { childList: true, subtree: true });
        } catch { console.log("Body not loaded yet.") };
    }
}

function waitForSidebarExtended(IO){
    // Checking if we can hide the element needed, otherwise we'll wait for mutation
    if( document.getElementsByTagName(IO.className[1])[0] != null){
        IO.deleteFunction(IO, document.getElementsByTagName(IO.className[1])[0])
    }
    preDisconnect(IO.listener[0])
    IO.listener[0] = new MutationObserver(mutations => {
        if (checkToDisconnect(IO.listener[0],IO.on)){ return; }
        for(mut in mutations){
            // Looking for changes to style-scope ytd-app, style-scope ytd-rich-section-renderer, and video-badge style-scope ytd-rich-grid-media
            // to remove guide attributes from ytd-app element that prevent the page from taking up the sidebar space
            if(IO.className[4] == mutations[mut].target.classList ||
                IO.className[2] == mutations[mut].target.classList ||
                (IO.className[3] == mutations[mut].target.classList && "content" == mutations[mut].target.id)){
                if( document.getElementsByTagName(IO.className[1])[0] != null){
                    IO.deleteFunction(IO, document.getElementsByTagName(IO.className[1])[0])
                }
            }
            // Looking for mutations from mini-guide that will trigger resizing page
            if(mutations[mut].target.className == IO.className[2]){
                if(mutations[mut].target.parentNode && mutations[mut].target.parentNode.parentNode){ 
                    attributeRemoved = IO.deleteFunction(IO, mutations[mut].target.parentNode.parentNode)
                }
            }
        }
    });
    try{
        IO.listener[0].observe(document.body, { childList: true, subtree: true });
    } catch { console.log("Body not loaded yet.") };
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

window.addEventListener('resize', function() {
    if (window.innerWidth != prevWidth ) {
        prevWidth = window.innerWidth;
        if(settings.get("powerIO").on == true && settings.get("sidebarExtendedIO").on){
            settings.get("sidebarExtendedIO").waitFunction(settings.get("sidebarExtendedIO"))
        }
    }
}, true);

waitForDocument().then(() => {
    startup()
})
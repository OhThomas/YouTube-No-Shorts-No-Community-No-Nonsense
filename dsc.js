var window = window ?? self;
let removeShortSidebar = '[aria-label="Shorts"]';
let removeShortSidebarExtended = '[title="Shorts"]';
const settings = new Map()

var powerIO =       { on: 'true', listener: '', className: '', name: 'Power', innerHTML: '' }
var shortsIO =      { on: 'true', listener: '', className: 'style-scope ytd-rich-section-renderer', name: 'Shorts', innerHTML: 'Shorts', deleteFunction: deleteSection }
var communityIO =   { on: 'true', listener: '', className: 'style-scope ytd-rich-section-renderer', name: 'Community', innerHTML: 'Latest YouTube posts', deleteFunction: deleteSection }
var breakingNewsIO ={ on: 'true', listener: '', className: 'style-scope ytd-rich-shelf-renderer', name: 'Breaking News', innerHTML: 'Breaking news', deleteFunction: deleteSection }
var sidebarIO =     { on: 'true', listener: '', listener2: '', className: '', name: 'Sidebar', innerHTML: '', ariaLabel: '[aria-label="Shorts"]', title: '[title="Shorts"]', deleteFunction: deleteSidebar }
var headerIO =      { on: 'true', listener: '', className: 'style-scope ytd-rich-grid-renderer', name: 'Header', innerHTML: '', id: 'header', deleteFunction: deleteHeader }

settings.set("powerIO",powerIO)
settings.set("shortsIO",shortsIO)
settings.set("communityIO",communityIO)
settings.set("breakingNewsIO",breakingNewsIO)
settings.set("sidebarIO",sidebarIO)
settings.set("headerIO",headerIO)

async function getStorage(key){
    var storage = await chrome.storage.local.get(key).then((result) => { return result[key] });
    return storage;
}

async function setStorage(key, value){ await chrome.storage.local.set({[key]: value}) }

async function awaitStorage(IO){
    IO.on = (await getStorage(IO.name) != null) ? await getStorage(IO.name) : true
}

function removeByQuery(query){
    let element = document.querySelector(query);
    if(element != null) { 
        element.remove()
        console.log("Removing " + query)
        return true 
    }
    return false;
}

function removeHeader(IO){
    const elements = document.getElementsByClassName(IO.className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].id == IO.id){
            console.log("Removing " + elements[element].parentNode.className)
            elements[element].parentNode.removeChild(elements[element]);
        }
    }
}

function removeByInnerHTML(IO){
    let classElement = document.getElementsByClassName(IO.className)
    for(let child = 0; child < classElement.length; child++){
        let div = classElement[child].getElementsByTagName("span")
        for(let gchild = 0; gchild < div.length; gchild++){
            if(div[gchild].innerHTML == IO.innerHTML){
                console.log("Removing " + classElement[child].className)
                classElement[child].remove(div)
                child--
                break; // break outer if only one section available per webpage
            }
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

async function waitForDocument(){
    new Promise(resolve => {
        var observer = new MutationObserver(function() {
            if (document.body) {
                observer.disconnect();
                resolve()
            }
        });
        observer.observe(document.documentElement, {childList: true});
    });
}

function waitForMultiMut(IO) {
    preDisconnect(IO.listener)
    IO.listener = new MutationObserver(mutations => {
        if(checkToDisconnect(IO.listener,IO.on)) { return; }

        for(mut in mutations){
            if(mutations[mut].target.className == IO.className){
                removeHeader(settings.get("headerIO"))
                // We can disconnect as it only loads once but will keep running to future proof
            }
        }
    });
    IO.listener.observe(document.body, { childList: true, subtree: true });
}

function waitForQuery(IO, selector) {
    if(selector == IO.title){
        preDisconnect(IO.listener2)
        IO.listener2 = new MutationObserver(function() {
            if(checkToDisconnect(IO.listener2, IO.on)) { return; }
            if(removeByQuery(selector)){ }//IO.listener2.disconnect(); }
        });
        IO.listener2.observe(document.body, { childList: true, subtree: true });
    }
    else{
        preDisconnect(IO.listener)
        IO.listener = new MutationObserver(function() {
            if(checkToDisconnect(IO.listener, IO.on)) { return; }
            if(removeByQuery(selector)){ IO.listener.disconnect(); }
        });
        IO.listener.observe(document.body, { childList: true, subtree: true });
    }
}

function waitForInnerHTML(IO) {
    preDisconnect(IO.listener)
    IO.listener = new MutationObserver(function() {
        if(checkToDisconnect(IO.listener,IO.on)) { return; }
        removeByInnerHTML(IO)
    });
    IO.listener.observe(document.body, { childList: true, subtree: true });
}

function deleteSection(IO){
    removeByInnerHTML(IO)
    waitForInnerHTML(IO)
}

function deleteQuery(query){
    removeByQuery(query)
    waitForQuery(settings.get("sidebarIO"),query)
}

function deleteSidebar(){
    deleteQuery(settings.get("sidebarIO").title)
    deleteQuery(settings.get("sidebarIO").ariaLabel)
}

function deleteHeader(){
    removeHeader(settings.get("headerIO"))
    waitForMultiMut(settings.get("headerIO"))
}

async function resetValues(){
    for (const [key, value] of settings.entries()) {
        value.on = (await getStorage(value.name) != null) ? await getStorage(value.name) : true
    }
}

function deleteIO(){
    for (const [key, value] of settings.entries()) {
        if(value.name != "Power"){
            if(value.on == true){ value.deleteFunction(value) }
        }
    }
}

async function startup(){
    await waitForDocument()         // waiting for page to load
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

            if(settings.get("powerIO").on == true){
                for (const [key2, value] of settings.entries()) {
                    if(value.name == key){ value.deleteFunction(value) }
                }
            }
        }
    }
});

startup()
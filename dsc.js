var window = window ?? self;
const settings = new Map()
var node = document.createElement('p');

var powerIO =       { on: 'true', listener: [node], className: [''], name: 'Power', innerHTML: '' }
var shortsIO =      { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-section-renderer','style-scope ytd-reel-shelf-renderer'], higherClass: ['',''], name: 'Shorts', innerHTML: 'Shorts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var shortsVideosIO ={ on: 'true', listener: [node], className: ['style-scope ytd-video-renderer'], higherClass: ['.style-scope.ytd-item-section-renderer'], name: 'Shorts Videos', innerHTML: '/shorts/', waitFunction: waitForMut, deleteFunction: removeByHREF }
var communityIO =   { on: 'true', listener: [node], className: ['style-scope ytd-rich-section-renderer'], higherClass: [''], name: 'Community', innerHTML: 'Latest YouTube posts', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var breakingNewsIO ={ on: 'true', listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], higherClass: [''], name: 'Breaking News', innerHTML: 'Breaking news', waitFunction: waitForMut, deleteFunction: removeByInnerHTML }
var sidebarIO =     { on: 'true', listener: [node,node], className: ['[aria-label="Shorts"]','[title="Shorts"]'], higherClass: ['',''], name: 'Sidebar', innerHTML: '', waitFunction: waitForMut, deleteFunction: removeByQuery }
var headerIO =      { on: 'true', listener: [node,node], className: ['style-scope ytd-rich-grid-renderer','style-scope ytd-search'], higherClass: ['',''], name: 'Header', innerHTML: '', id: 'header', waitFunction: waitForMultiMut, deleteFunction: removeHeader }

settings.set("powerIO",powerIO)
settings.set("shortsIO",shortsIO)
settings.set("shortsVideosIO",shortsVideosIO)
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

function removeByQuery(IO,className){
    let element = document.querySelector(className);
    if(element != null) { 
        element.remove()
        console.log("Removing " + IO.name + " at " + className)
        return true 
    }
    return false;
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

function removeByHREF(IO, className, higherClass){
    const elements = document.getElementsByClassName(className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].href && elements[element].href.match(IO.innerHTML)){
            console.log("Removing "+ IO.name+" at "+ elements[element].parentNode.className)

            // splitting url incase they shorten it without domain when we find higher class by href tag
            let string = elements[element].href.split(IO.innerHTML)[1];
            string = IO.innerHTML+string
            let elem = document.querySelector('[href="'+string+'"]').closest(higherClass)
            if(elem == null){ elem = document.querySelector('[href="'+elements[element].href+'"]').closest(higherClass)}
            if(elem != null){ elem.remove() }
        }
    }
}

function removeByInnerHTML(IO,className){
    let classElement = document.getElementsByClassName(className)
    for(let child = 0; child < classElement.length; child++){
        let div = classElement[child].getElementsByTagName("span")
        for(let gchild = 0; gchild < div.length; gchild++){
            if(div[gchild].innerHTML.match(IO.innerHTML)){
                console.log("Removing " + IO.name + " at " + classElement[child].className)
                classElement[child].parentNode.remove()
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

function waitForMultiMut(IO) {
    for(let i = 0; i < IO.listener.length; i++){
        IO.deleteFunction(IO,IO.className[i])
        preDisconnect(IO.listener[i])
        IO.listener[i] = new MutationObserver(mutations => {
            if(checkToDisconnect(IO.listener[i],IO.on)) { return; }

            for(mut in mutations){
                if(mutations[mut].target.className == IO.className[i]){
                    IO.deleteFunction(IO,IO.className[i])
                    // We can disconnect as it only loads once but will keep running to future proof
                }
            }
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
            IO.deleteFunction(IO,IO.className[i],IO.higherClass[i])
        });
        try{
            IO.listener[i].observe(document.body, { childList: true, subtree: true });
        } catch { console.log("Body not loaded yet.") };
    }
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

startup()
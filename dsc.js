var window = window ?? self;
const settings = new Map()
var node = document.createElement('p');
const emptyDSC = "emptyDSC"

var powerIO =           { on: true, listener: [node], className: [''], name: 'Power', innerHTML: '' }
var shortsIO =          { on: true, listener: [node,node], className: ['style-scope ytd-rich-shelf-renderer','style-scope ytd-reel-shelf-renderer'], listenerID: ['content','content'], name: 'Shorts', innerHTML: 'Shorts', observerFunction: [waitForObserverID,waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByInnerHTML,removeByInnerHTML], restoreFunction: [restoreByInnerHTML,restoreByInnerHTML]  }
var shortsVideosIO =    { on: true, listener: [node], className: ['yt-simple-endpoint inline-block style-scope ytd-thumbnail'], listenerID: ['content'], name: 'Shorts Videos', innerHTML: '/shorts/', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByHREF], restoreFunction: [restoreByHREF] }
var shortsSidebarIO =   { on: true, listener: [node,node], className: ['yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer','yt-simple-endpoint style-scope ytd-guide-entry-renderer'], listenerID: ['content','sections'], name: 'Shorts Sidebar', innerHTML: '', title: 'Shorts', id: 'endpoint', observerFunction: [waitForObserverID,waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByTitle,removeByTitle], restoreFunction: [restoreByTitle,restoreByTitle] }
var communityIO =       { on: true, listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['content'], name: 'Community', innerHTML: 'Latest YouTube posts', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByInnerHTML], restoreFunction: [restoreByInnerHTML] }
var breakingNewsIO =    { on: true, listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['content'], name: 'Breaking News', innerHTML: 'Breaking news', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByInnerHTML], restoreFunction: [restoreByInnerHTML]  }
var communityTrendingIO={ on: true, listener: [node], className: ['style-scope ytd-rich-shelf-renderer'], listenerID: ['content'], name: 'Community Trending', innerHTML: 'Trending', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByInnerHTML], restoreFunction: [restoreByInnerHTML]  }
var sidebarExtendedIO=  { on: true, listener: [node], className: ['ytd-app'], name: 'Sidebar Extended', drawerID: 'guide', buttonID: 'guide-button', removeAttributes: ['guide-persistent-and-visible','opened','mini-guide-visible'], outerHTML: 'ytd-mini-guide-renderer', id: 'contentContainer', observerFunction: [waitForObserver], waitFunction: waitForSidebarExtended, deleteFunction: [removeSidebarExtended], restoreFunction: [restoreSidebarExtended] }
var sidebarMiniIO=      { on: true, listener: [node], className: ['ytd-mini-guide-renderer'], listenerID: ['content'], name: 'Sidebar Mini', removeAttributes: ['mini-guide-visible'], checkAttributes: ['guide-persistent-and-visible'], observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeClassDisplay], restoreFunction: [restoreClassDisplay] }
var headerTopicsIO =    { on: true, listener: [node,node], className: ['style-scope ytd-rich-grid-renderer','style-scope ytd-search'], listenerID: ['content','content'], name: 'Header Topics', innerHTML: '', id: 'header', observerFunction: [waitForObserverID,waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeHeader,removeHeader], restoreFunction: [restoreHeader,restoreHeader] }
var headerRelatedIO     ={ on: true, listener: [node], className: ['yt-related-chip-cloud-renderer'], listenerID: ['content'], name: 'Header Related', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByName], restoreFunction: [restoreByName] }
var headerNotificationIO={ on: true, listener: [node], className: ['ytd-notification-topbar-button-renderer'], listenerID: ['buttons'], name: 'Header Notification', innerHTML: '', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByName], restoreFunction: [restoreByName] }
var headerUploadIO      ={ on: true, listener: [node], className: ['ytd-topbar-menu-button-renderer'], listenerID: ['buttons'], name: 'Header Upload', innerHTML: '', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByName], restoreFunction: [restoreByName] }
var headerVoiceIO       ={ on: true, listener: [node], className: ['voice-search-button'], listenerID: ['center'], id: 'voice-search-button', name: 'Header Voice', innerHTML: '', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByID], restoreFunction: [restoreByID] }
var descrDownloadIO     ={ on: true, listener: [node], className: ['ytd-download-button-renderer'], listenerID: ['content'], name: 'Description Download', innerHTML: '', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByName], restoreFunction: [restoreByName] }
var descShareIO         ={ on: true, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading'], listenerID: ['content'], ariaLabel: 'Share', name: 'Description Share', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel]  }
var descClipIO          ={ on: true, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading'], listenerID: ['content'], ariaLabel: 'Clip', name: 'Description Clip', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel] }
var descPlaylistIO      ={ on: false, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading'], listenerID: ['content'], ariaLabel: 'Save to playlist', name: 'Description Playlist', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel] }
var descPopupIO         ={ on: true, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button'], ariaLabel: 'More actions', listenerID: ['content'], name: 'Description Popup', observerFunction: [waitForObserverID], waitFunction: waitForMut,  deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel] }
var descThanksIO        ={ on: true, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading'], ariaLabel: 'Thanks', listenerID: ['content'], name: 'Description Thanks', observerFunction: [waitForObserverID], waitFunction: waitForMut,  deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel]  }
var descJoinIO          ={ on: true, listener: [node], className: ['yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m'], ariaLabel: 'Join this channel', listenerID: ['content'], name: 'Description Join', observerFunction: [waitForObserverID], waitFunction: waitForMut,  deleteFunction: [removeByAriaLabel], restoreFunction: [restoreByAriaLabel]  }
var descOfferIO         ={ on: true, listener: [node], className: ['offer'], listenerID: ['content'], id: 'offer-module', name: 'Description Offer', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByID], restoreFunction: [restoreByID] }
var descLikeIO          ={ on: false, listener: [node], className: ['ytd-segmented-like-dislike-button-renderer'], listenerID: ['content'], name: 'Description Like', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByName], restoreFunction: [restoreByName] }
var descMetadataIO      ={ on: true, listener: [node], className: ['ytd-metadata-row-container-renderer'], listenerID: ['content'], id: 'offer-module', name: 'Description Metadata', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByNameAll], restoreFunction: [restoreByNameAll] }
var descBoxIO           ={ on: false, listener: [node], className: ['box'], listenerID: ['content','content'], id: 'description-inner', name: 'Description Box', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByIDParent], restoreFunction: [restoreByIDParent]}
var moviesSectionsIO    ={ on: true, listener: [node], className: ['yt-simple-endpoint style-scope ytd-rich-shelf-renderer'], higherClasses: ['ytd-rich-section-renderer'], listenerID: ['center'], name: 'Movies Sections', title: 'Free Primetime movies', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeByClassTitle], restoreFunction: [restoreByClassTitle] }
var moviesBuyIO         ={ on: true, listener: [node], className: ['badge badge-style-type-ypc style-scope ytd-badge-supported-renderer style-scope ytd-badge-supported-renderer'], higherClasses: ['ytd-rich-item-renderer','ytd-grid-movie-renderer','ytd-grid-show-renderer','ytd-grid-video-renderer'], listenerID: ['content'], name: 'Movies Buy', innerHTML: 'Free with ads', observerFunction: [waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeMoviesBuy], restoreFunction: [restoreMoviesBuy] }
var moviesFreeIO        ={ on: false, listener: [node,node], className: ['badge badge-style-type-ypc style-scope ytd-badge-supported-renderer style-scope ytd-badge-supported-renderer','badge badge-style-type-simple style-scope ytd-badge-supported-renderer style-scope ytd-badge-supported-renderer'], higherClasses: ['ytd-rich-item-renderer','ytd-grid-movie-renderer','ytd-grid-show-renderer','ytd-grid-video-renderer'], listenerID: ['content','content'], name: 'Movies Free', innerHTML: 'Free with ads', observerFunction: [waitForObserverID,waitForObserverID], waitFunction: waitForMut, deleteFunction: [removeMovies,removeMoviesByRating], restoreFunction: [restoreMovies,restoreMoviesByRating] }

settings.set("powerIO",powerIO)
settings.set("shortsIO",shortsIO)
settings.set("shortsVideosIO",shortsVideosIO)
settings.set("shortsSidebarIO",shortsSidebarIO)
settings.set("communityIO",communityIO)
settings.set("breakingNewsIO",breakingNewsIO)
settings.set("communityTrendingIO",communityTrendingIO)
settings.set("sidebarExtendedIO",sidebarExtendedIO)
settings.set("sidebarMiniIO",sidebarMiniIO)
settings.set("headerTopicsIO",headerTopicsIO)
settings.set("headerRelatedIO",headerRelatedIO)
settings.set("headerNotificationIO",headerNotificationIO)
settings.set("headerUploadIO",headerUploadIO)
settings.set("headerVoiceIO",headerVoiceIO)
settings.set("descrDownloadIO",descrDownloadIO)
settings.set("descrShareIO",descShareIO)
settings.set("descrClipIO",descClipIO)
settings.set("descPlaylistIO",descPlaylistIO)
settings.set("descPopupIO",descPopupIO)
settings.set("descThanksIO",descThanksIO)
settings.set("descJoinIO",descJoinIO)
settings.set("descOfferIO",descOfferIO)
settings.set("descLikeIO",descLikeIO)
settings.set("descMetadataIO",descMetadataIO)
settings.set("descBoxIO",descBoxIO)
settings.set("moviesSectionsIO",moviesSectionsIO)
settings.set("moviesBuyIO",moviesBuyIO)
settings.set("moviesFreeIO",moviesFreeIO)

async function getStorage(key){
    var storage = await chrome.storage.local.get(key).then((result) => { return result[key] });
    return storage;
}

async function setStorage(key, value){ await chrome.storage.local.set({[key]: value}) }

async function awaitStorage(IO){
    IO.on = (await getStorage(IO.name) != null) ? await getStorage(IO.name) : IO.on
}

function removeHeader(IO,className){
    const elements = document.getElementsByClassName(className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].id == IO.id){
            console.log("Removing " + IO.name + " at " + elements[element].parentNode.className)
            elements[element].classList.add(emptyDSC)
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
            console.log("Removing " + IO.name + " at " + className)
            elements[ele].classList.add(emptyDSC)
            return true;
        }
    }
}

function removeByHREF(IO, className){
    const elements = document.getElementsByClassName(className);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].href && elements[element].href.match(IO.innerHTML) && !elements[element].parentNode.parentNode.parentNode.classList.contains(emptyDSC)){
            console.log("Removing "+ IO.name+" at "+ elements[element].parentNode.className)
            // ytd-video-renderer -> div.id dismissable -> ytd-thumbnail -> current element
            elements[element].parentNode.parentNode.parentNode.classList.add(emptyDSC)
        }
    }
}

function removeMovies(IO, className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        if(elements[elem].innerHTML && elements[elem].innerHTML.match(IO.innerHTML) && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing " + IO.name + " at " + className)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.add(emptyDSC); break; }
            }
            elements[elem].classList.add(emptyDSC)
        }
    }
}

function removeMoviesBuy(IO, className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        if(elements[elem].innerHTML && !elements[elem].innerHTML.match(IO.innerHTML) && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing " + IO.name + " at " + className)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.add(emptyDSC); break; }
            }
            elements[elem].classList.add(emptyDSC)
        }
    }
}

function removeMoviesByRating(IO,className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        if(elements[elem].parentNode && elements[elem].parentNode.children[0] && elements[elem].parentNode.children[0].classList == elements[elem].classList && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing " + IO.name + " at " + className)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.add(emptyDSC); break; }
            }
            elements[elem].classList.add(emptyDSC)
        }
    }
}

function removeByClassTitle(IO, className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        if(elements[elem].title && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing " + IO.name + " at " + className)
            elements[elem].closest(IO.higherClasses[0]).classList.add(emptyDSC)
            elements[elem].classList.add(emptyDSC)
        }
    }
}

function removeByInnerHTML(IO, className){
    let elements = document.getElementsByClassName(className)
    for (elem in elements){
        // On search pages
        if(className == IO.className[1]){
            if(elements[elem].innerHTML != null && elements[elem].innerHTML.match(IO.innerHTML) && !elements[elem].parentNode.classList.contains(emptyDSC)){
                console.log("Removing " + IO.name + " at " + className)
                elements[elem].parentNode.classList.add(emptyDSC)
                break; // break if only one section available per load
            }
        }
        // On home/subscription pages
        else{
            if(elements[elem].innerHTML != null && elements[elem].innerHTML.match(IO.innerHTML) && !elements[elem].parentNode.parentNode.parentNode.classList.contains(emptyDSC)){
                console.log("Removing " + IO.name + " at " + className)
                elements[elem].parentNode.parentNode.parentNode.classList.add(emptyDSC)
                break; // break if only one section available per load
            }
        }
    }
}

function removeByName(IO, className){
    let element = document.getElementsByTagName(className)[0]
    if(element && !element.classList.contains(emptyDSC)){
        console.log("Removing "+ IO.name + " at " + className)
        element.classList.add(emptyDSC)
        return true;
    }
}

function removeByNameAll(IO, className){
    let elements = document.getElementsByTagName(className)
    let ret = false;
    for(element in elements){
        if(elements[element].classList && !elements[element].classList.contains(emptyDSC)){
            console.log("Removing "+ IO.name + " at " + className)
            elements[element].classList.add(emptyDSC)
            ret = true;
        }
    }
    return ret;
}

function removeByID(IO, className){
    let element = document.getElementById(IO.id)
    if(element && !element.classList.contains(emptyDSC)){
        console.log("Removing "+ IO.name + " at " + className)
        element.classList.add(emptyDSC)
        return true;
    }
}

function removeByIDParent(IO, className){
    let element = document.getElementById(IO.id)
    if(element && element.parentNode && !element.parentNode.classList.contains(emptyDSC)){
        console.log("Removing "+ IO.name + " at " + className)
        element.parentNode.classList.add(emptyDSC)
        return true;
    }
}

function removeByAriaLabel(IO, className){
    let elements = document.getElementsByClassName(className)
    for(let elem in elements){
        if(elements[elem].ariaLabel && elements[elem].ariaLabel == IO.ariaLabel &&
            elements[elem].classList && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing "+ IO.name + " at " + className)
            elements[elem].classList.add(emptyDSC)
            return true;
        }
    }
}

function removeSidebarExtended(IO, element){
    let attributeRemoved = false;
    // Removing extension button
    if(document.getElementById(IO.buttonID) != null) {document.getElementById(IO.buttonID).classList.add(emptyDSC)}
    // Removing opened attribute from contentContainer element
    if(document.getElementById(IO.id)){ removeAttributeIO(IO,1,document.getElementById(IO.id)) }
    // Removing opened attribute from tp-yt-app-drawer element
    if(document.getElementById(IO.drawerID)){ removeAttributeIO(IO,1,document.getElementById(IO.drawerID)) }
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
            elements[elem].classList.add(emptyDSC)
            // Removing mini-guide-visible attribute from ytd-app element
            if(IO.removeAttributes){ 
                let ytd = document.getElementById("content").parentNode
                removeAttributeIO(IO,0,ytd)
            }
            return true; // deletes element once (remove this so it doesn't prevent space issues)
        }
    }
}

function restoreByInnerHTML(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for (elem in elements){
        if(elements[elem].innerHTML != null && elements[elem].innerHTML.match(IO.innerHTML)){
            console.log("Removing empty class from "+ IO.className[i])
            elements[elem].parentNode.parentNode.parentNode.classList.remove(emptyDSC)
            // break;
        }
    }
}

function restoreMovies(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for (elem in elements){
        if(elements[elem].innerHTML && elements[elem].innerHTML.match(IO.innerHTML) && elements[elem].classList.contains(emptyDSC)){
            console.log("Removing empty class from " + IO.name)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.remove(emptyDSC); break; }
            }
            elements[elem].classList.remove(emptyDSC)
        }
    }
}

function restoreMoviesBuy(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for (elem in elements){
        if(elements[elem].innerHTML && !elements[elem].innerHTML.match(IO.innerHTML) && elements[elem].classList.contains(emptyDSC)){
            console.log("Removing empty class from " + IO.name)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.remove(emptyDSC); break; }
            }
            elements[elem].classList.remove(emptyDSC)
        }
    }
}

function restoreMoviesByRating(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for (elem in elements){
        if(elements[elem].parentNode && elements[elem].parentNode.children[0] && elements[elem].parentNode.children[0].classList == elements[elem].classList && !elements[elem].classList.contains(emptyDSC)){
            console.log("Removing empty class from " + IO.name)
            for(let i = 0; i < IO.higherClasses.length; i++){
                let higher = elements[elem].closest(IO.higherClasses[i])
                if(higher != null) { higher.classList.remove(emptyDSC); break; }
            }
            elements[elem].classList.remove(emptyDSC)
        }
    }
}

function restoreByClassTitle(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for (elem in elements){
        if(elements[elem].title && elements[elem].classList.contains(emptyDSC)){
            console.log("Removing empty class from " + IO.name)
            let closestElem = elements[elem].closest(IO.higherClasses[i])
            if(closestElem && closestElem.classList) { closestElem.classList.remove(emptyDSC) }
            elements[elem].classList.remove(emptyDSC)
        }
    }
}

function restoreByHREF(IO,i){
    const elements = document.getElementsByClassName(IO.className[i]);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].href && elements[element].href.match(IO.innerHTML)){
            console.log("Removing empty class from "+ IO.className[i])
            // ytd-video-renderer -> div.id dismissable -> ytd-thumbnail -> current element
            elements[element].parentNode.parentNode.parentNode.classList.remove(emptyDSC)
        }
    }
}

function restoreHeader(IO,i){
    const elements = document.getElementsByClassName(IO.className[i]);
    for(let element= 0; element < elements.length; element++){
        if(elements[element].id == IO.id){
            console.log("Removing empty class from " + IO.className[i])
            elements[element].classList.remove(emptyDSC)
            break;
        }
    }
}

function restoreByTitle(IO,i){
    let elements = document.getElementsByClassName(IO.className[i])
    for(ele in elements){
        if(elements[ele].id == IO.id && elements[ele].title == IO.title){
            console.log("Removing empty class from "+IO.className[i])
            elements[ele].classList.remove(emptyDSC)
            break;
        }
    }
}

function restoreByName(IO,i){
    let element = document.getElementsByTagName(IO.className[i])[0]
    if (element && element.classList.contains(emptyDSC)){
        console.log("Removing empty class from "+IO.className[i])
        element.classList.remove(emptyDSC)
    }
}

function restoreByNameAll(IO,i){
    let elements = document.getElementsByTagName(IO.className[i])
    for(let element in elements){
        if(elements[element].classList && elements[element].classList.contains(emptyDSC)){
            console.log("Removing empty class from "+IO.className[i])
            elements[element].classList.remove(emptyDSC)
        }
    }
}

function restoreByID(IO,i){
    let element = document.getElementById(IO.id)
    if (element && element.classList.contains(emptyDSC)){
        console.log("Removing empty class from "+IO.name)
        element.classList.remove(emptyDSC)
    }
}

function restoreByIDParent(IO,i){
    let element = document.getElementById(IO.id)
    if (element && element.parentNode && element.parentNode.classList.contains(emptyDSC)){
        console.log("Removing empty class from "+IO.name)
        element.parentNode.classList.remove(emptyDSC)
    }
}

function restoreByAriaLabel(IO, i){
    let elements = document.getElementsByClassName(IO.className[i])
    for(let elem in elements){
        if(elements[elem].ariaLabel && elements[elem].ariaLabel == IO.ariaLabel &&
            elements[elem].classList && elements[elem].classList.contains(emptyDSC)){
            console.log("Removing empty class from "+IO.name)
            elements[elem].classList.remove(emptyDSC)
        }
    }
}

function restoreSidebarExtended(IO,i){
    // Restoring button
    if(document.getElementById(IO.buttonID) != null) {
        console.log("Removing empty class from "+IO.name)
        document.getElementById(IO.buttonID).classList.remove(emptyDSC)
    }
    // Adding mini-visible to ytd-app if not on
    if(settings.get("sidebarMiniIO").on == false) { document.getElementsByTagName(IO.className[0])[0].setAttribute(IO.removeAttributes[2],"") }//removeAttributeIO(IO,2,) }
}

function restoreClassDisplay(IO,i){
    let elements = document.getElementsByClassName(IO.className[0])
    for(elem in elements){
        if(elements[elem].classList){
            console.log("Removing empty class from "+IO.className[0])
            // Removing empty display
            elements[elem].classList.remove(emptyDSC)
            // Add mini-guide-visible attribute from ytd-app element
            let ytd = document.getElementById("content").parentNode
            if(!ytd.hasAttribute(IO.checkAttributes[0])){ ytd.setAttribute(IO.removeAttributes[0],"") }
            return true;
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
        IO.deleteFunction[i](IO,IO.className[i])
        preDisconnect(IO.listener[i])
        IO.listener[i] = new MutationObserver(function() {
            if(checkToDisconnect(IO.listener[i], IO.on)) { return; }
            if(IO.deleteFunction[i](IO,IO.className[i])) { IO.listener[i].disconnect() }
        });
        try{
            IO.observerFunction[i](IO.listenerID[i]).then((element) => {
                IO.listener[i].observe(element, { childList: true, subtree: true });
            });
        } catch { console.log("Body not loaded yet.") };
    }
}

function waitForSidebarExtended(IO){
    // Checking if we can hide the element needed, otherwise we'll wait for mutation
    if( document.getElementsByTagName(IO.className[0])[0] != null){
        IO.deleteFunction[0](IO, document.getElementsByTagName(IO.className[0])[0])
    }
    preDisconnect(IO.listener[0])
    IO.listener[0] = new MutationObserver(() => {
        if (checkToDisconnect(IO.listener[0],IO.on)){ return; }
        if( document.getElementsByTagName(IO.className[0])[0] != null){
            IO.deleteFunction[0](IO, document.getElementsByTagName(IO.className[0])[0])
        }
    });
    try{
        IO.observerFunction[0](IO.className[0]).then((element) =>{
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

function restoreIO(){
    for (const [key, value] of settings.entries()) {
        if(value.name != "Power"){
            if(value.on == true){ 
                for(let i = 0; i < value.restoreFunction.length; i++){ value.restoreFunction[i](value,i) } 
            }
        }
    }
}

async function resetValues(){
    for (const [key, value] of settings.entries()) {
        value.on = (await getStorage(value.name) != null) ? await getStorage(value.name) : value.on
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
        await resetValues();
        if(newValue == true){
            if(key == "Power"){ deleteIO() }
            else if(settings.get("powerIO").on == true){
                for (const [key2, value] of settings.entries()) {
                    value.on = newValue
                    if(value.name == key){ value.waitFunction(value) }
                }
            }
        }
        else{
            if(key == "Power"){ restoreIO() }
            else if(settings.get("powerIO").on == true){
                for (const [key2, value] of settings.entries()) {
                    if(value.name == key){ 
                        for(let i = 0; i < value.restoreFunction.length; i++){ value.restoreFunction[i](value,i) } 
                    }
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
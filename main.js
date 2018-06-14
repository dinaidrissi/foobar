"use strict";
// variabel for at hente Json - dataer
let data;

// Loader hjememside med det samme med getAllData functionen.
document.addEventListener("DOMContentLoaded", getAllData);

// Kalder på både FooBar.getData(true); og FooBar.getData();
function getAllData(){
    showData();
    getBeertypes();
}

// Kalder på alle function der er FooBar.getData(true); som viser alt data uden Description.
function showData(){
    let json = FooBar.getData(true);
    data = JSON.parse(json);
    console.log(data);
    showBarInfo(data.bar);
    bartendersInfo(data.bartenders);
    showQueue(data.queueData);
    showServing(data.serving);
    showStorage(data.storages);
    showStorageInfo(data.storageInfos);
    showTaps(data.tap);
    
   
    
   
}

// Kalder på alle function der er FooBar.getData(); som viser alle dataer.  
function getBeertypes(){
    let json = FooBar.getData();
    data = JSON.parse(json);
    //console.log(data);
    showBeertypes(data.beertypes);
    // modal_luk(lukModal);
    animate(data.animating);
    onLoad(data.menu);
}

// loader siden for hver 10 sek for showData();
setInterval(function(){
    showData();
}, 10000);

function onLoad(menu) {

   
 
     function toggleMenu() {
         document.querySelector(".burger").classList.toggle("change");
         document.querySelector("nav").classList.toggle("show");
     }
     document.querySelector(".burger").addEventListener("click", toggleMenu);
     document.querySelector("ul").addEventListener("click", toggleMenu);
 
      }

 




// Function der kører svg Line der animerer fra x1,y1 til x2,y2
document.querySelector("line").addEventListener("load", animate);
//console.log(document.querySelector("line"))

function animate(animating){
          document.querySelector("line").style.strokeDashoffset = 0;
      }

// henter dataer ind for bar.name og bar.closeTime
function showBarInfo(bar){
    document.querySelector(".name").textContent = bar.name;
    document.querySelector(".closeTime").textContent = "Close at " + bar.closingTime;
    console.log(bar.name);   
}

// henter dataer ind for og forEach på data.bartenders
function bartendersInfo(bartenders){
    
    document.querySelector("#bartendersInfo").innerHTML = "";
    console.log(bartenders.length);
    document.querySelector(".antal").textContent = bartenders.length;

    data.bartenders.forEach(function(bartender){
        
        let bartendersTemplate = document.querySelector("#bartendersTemplate").content;
        let bartendersInfo = document.querySelector("#bartendersInfo");
       

        let klon = bartendersTemplate.cloneNode(true);
        
        klon.querySelector(".bartendersName").textContent = bartender.name;
        //klon.querySelector(".status").textContent = bartender.status;
        
        console.log(bartender.status);
   
       

        // if bartender.status = "working" change color to red 
        if (bartender.status == "WORKING"){
            const status = "WORKING";
        let imgsss = document.createElement('img');
        imgsss.src="/img/"+ status +".png";         
        bartendersInfo.appendChild(imgsss);
    
           //klon.querySelector(".status_show").style.backgroundColor="red";
        }else if(bartender.status == "READY"){
          
           const statusReady = "READY";
           let imgssss = document.createElement('img');
          imgssss.src="/img/"+ statusReady +".png";         
          bartendersInfo.appendChild(imgssss);
        }

        // else turn green
        bartendersInfo.appendChild(klon);
       
    });
   
}

// henter dataer ind for queue og meter animation = data.queue.lenght
function showQueue(queueData){
    document.querySelector(".queueNumber").textContent = data.queue.length;
    /* set radius for all circles */
    let r = 50;
    let circles = document.querySelectorAll('.circle');
    let total_circles = circles.length;
    for (let i = 0; i < total_circles; i++) {
        circles[i].setAttribute('r', r);
    } 

    /* set meter's wrapper dimension */
    let meter_dimension = (r * 2) + 100;
    let wrapper = document.querySelector('#wrapper');
    wrapper.style.width = meter_dimension + 'px';
    wrapper.style.height = meter_dimension + 'px';
    /* add strokes to circles  */
    let cf = 2 * Math.PI * r;
    let semi_cf = cf / 2;
    let semi_cf_1by3 = semi_cf / 3;
    let semi_cf_2by3 = semi_cf_1by3 * 2;
    document.querySelector('#outline_curves')
    .setAttribute('stroke-dasharray', semi_cf + ',' + cf);
    document.querySelector('#low')
    .setAttribute('stroke-dasharray', semi_cf + ',' + cf);
    document.querySelector('#avg')
    .setAttribute('stroke-dasharray', semi_cf_2by3 + ',' + cf);
    document.querySelector('#high')
    .setAttribute('stroke-dasharray', semi_cf_1by3 + ',' + cf);
    document.querySelector('#outline_ends')
    .setAttribute('stroke-dasharray', 2 + ',' + (semi_cf - 2));
    document.querySelector('#mask')
    .setAttribute('stroke-dasharray', semi_cf + ',' + cf);
    /*bind range slider event*/
    let slider = document.querySelector('#slider');
    // var lbl = document.querySelector("#lbl");
    let mask = document.querySelector('#mask');
    let meter_needle =  document.querySelector('#meter_needle');

        document.querySelector("#queueInfo").innerHTML = "";

        let queueTemplate = document.querySelector("#queueTemplate").content;
        let queueInfo = document.querySelector("#queueInfo");
        let klon_queue = queueTemplate.cloneNode(true);


    let meter_value = semi_cf - ((data.queue.length * semi_cf) / 15);
    mask.setAttribute('stroke-dasharray', meter_value + ',' + cf);
    meter_needle.style.transform = 'rotate(' + (270 + ((data.queue.length * 180) / 15)) + 'deg)';

    queueInfo.appendChild(klon_queue);

}

// data.serving.length = serving_text og data.serving.order = bestillinger
function showServing(serving){
    
   document.querySelector("#servingInfo").innerHTML = "";
   document.querySelector(".servingNumber").textContent = serving.length;

   data.serving.forEach(function(serverOrder){

       let servingTemplate = document.querySelector("#servingTemplate").content;
       let servingInfo = document.querySelector("#servingInfo");
       let klon_serving = servingTemplate.cloneNode(true);
   
       
       klon_serving.querySelector(".idNumber").textContent = "Id number " + serverOrder.id ;
       klon_serving.querySelector(".order").textContent = "- " + serverOrder.order.join(", ");
       
       console.log(serving.length);
       let br = document.createElement('br');
       servingInfo.appendChild(br);
   
       servingInfo.appendChild(klon_serving);
   });
 
}

// viser de rå data.storage
function showStorageInfo(storageInfos){
        document.querySelector(".storageNumber").textContent = data.storage.length;
    document.querySelector("#storageInfo").innerHTML = "";
        data.storage.forEach(function(storageInfo){
    let storageTemplate = document.querySelector("#storageTemplate").content;
    let storageInfomation = document.querySelector("#storageInfo");

    let klon_storage = storageTemplate.cloneNode(true);

    klon_storage.querySelector(".storageAmounth").textContent = storageInfo.amount;
    klon_storage.querySelector(".storageName").textContent = storageInfo.name + " :";

    storageInfomation.appendChild(klon_storage);
        });
}

// henter hver keg-img forEach storage.amonth 
function showStorage(storages){

    let kegHolder = document.querySelector("#storageKeg");
    kegHolder.innerHTML = "";

    data.storage.forEach(function(anKeg){

        const name = anKeg.name;
        const amount = anKeg.amount;
        

        // gentag 'amount' gange
        for(let i=0; i < amount; i++) {
            let img = document.createElement('img');
        img.src="/img/"+name+".png";         
            kegHolder.appendChild(img);
        }
    
        
        let br = document.createElement('br');
        kegHolder.appendChild(br);
        

        let hr = document.createElement('hr');
        kegHolder.appendChild(hr);


    });


    
}

// henter tap-img, loader Strokeanimation ved click og kalder på glassAnimation
let imgss = document.createElement('img');
function showTaps(tap){
    document.querySelector(".tapsNumber").textContent = data.taps.length;
    document.querySelector("#tapsInfo").innerHTML="";
    document.querySelector("#tapsGlass").innerHTML="";

    data.taps.forEach(function(oneTap){
        let tapsTemplate = document.querySelector("#tapAnimationTemplate").content;
        let tapsInfo = document.querySelector("#tapsInfo");
        let klon_tap = tapsTemplate.cloneNode(true);
        const beer = oneTap.beer;


      
        let imgss = document.createElement('img');
        imgss.src="/img/taps/"+beer+".svg"; 
        imgss.dataset.svgTap=oneTap.id;
            
        klon_tap.firstElementChild.appendChild(imgss);
        klon_tap.querySelector(".svgcontainer1").classList.add("svgTap"+oneTap.id);
        
        //load the tap animation
        imgss.addEventListener("click", startStrokeAnimation);

        
        glassAnimation(oneTap);
    
        document.querySelector("#tapsInfo").appendChild(klon_tap);

    });
    


}   
// starter animation
function startStrokeAnimation(){
    let tapId = this.dataset.svgTap;
    console.log("works");
    //stroke animation start
    document.querySelector(`.svgTap${tapId} .tapLine`).style.strokeDashoffset = 0;
    document.querySelector(`.svgTap${tapId} .tapLine`).addEventListener("transitionend", endStrokeAnimation);
  //  endStrokeAnimation(data.endAnimation);
    //if the level == 2500 then full up the glass
    //else level*100/2500
}

// slutter animation ved transitionend
function endStrokeAnimation(){
    let tapId = this.dataset.svgTap;
    console.log("worksss", this)
    this.style.strokeDashoffset = 100;

}

// Henter oneGlass.level, oneGlass.capacity og kører animationen for glasset
function glassAnimation(oneGlass){
    
    let tapsTemplate = document.querySelector("#tapsTemplate").content;
    let tapsInfo = document.querySelector("#tapsGlass");
    
    // console.log(tapFill + "yes");

        let klon_glass = tapsTemplate.cloneNode(true);
        let tapFill = klon_glass.querySelector(".st6");
        klon_glass.querySelector(".level").textContent = oneGlass.level + "    /";
        klon_glass.querySelector(".capacity").textContent = oneGlass.capacity;
        //if level == 2500 be fill whole up
        //height skal være 84 hvis level = 2500 og 0 er level=0
        let forhold=oneGlass.level/2500;
        let height=84*forhold;

        tapFill.setAttribute("y", 97+(84-height) );
    tapFill.style.height=`${height}px`;
    tapFill.style.fill="#549DEB";

 //else if change the fill acoording to level-data: level/2500 

 tapsGlass.appendChild(klon_glass);


 

  
}

// henter beertype-img, beertype.name, beertype.category og beertype.alc   
let beerTypes;
function showBeertypes(beertypes){
    document.querySelector(".beertypesNumber").textContent = data.beertypes.length;
    document.querySelector("#beertypesInfo").innerHTML = "";
    data.beertypes.forEach(function(beertype){
let beertypesTemplate = document.querySelector("#beertypesTemplate").content;
let beertypesInfo = document.querySelector("#beertypesInfo");
//let beerImg = document.querySelector("#beerImg");

beerTypes=beertypes;

let klon_beertype = beertypesTemplate.cloneNode(true);
const names = beertype.name;


//     let imgs = document.createElement('img');
//    imgs.src="/img/beers/"+names+".png";         
//     beerImg.appendChild(imgs);

klon_beertype.querySelector("img").src="/img/beers/"+names+".png";
klon_beertype.querySelector(".beertypesName").textContent = beertype.name;
klon_beertype.querySelector(".alc").textContent = beertype.alc;
klon_beertype.querySelector(".category").textContent = beertype.category;
klon_beertype.querySelector("button").addEventListener("click", seDetaljer_klik);
klon_beertype.querySelector("button").setAttribute("data-id",beertype.name);

beertypesInfo.appendChild(klon_beertype);
    });

}

document.querySelector(".modal_window button").addEventListener("click", modal_luk);



    function modal_luk(){
        console.log("LUK!");
        document.querySelector(".modal_window").style.visibility ="hidden";
       
    }

    function seDetaljer_klik(openModal){
       
        let mit_id = openModal.currentTarget.getAttribute("data-id");
        console.log("klik kun id:", mit_id);

        let single_view = beerTypes.find(function(element){
            return element.name == mit_id;
        });
        console.log("et element fra json", single_view);
        document.querySelector(".modal_window").style.visibility = "visible";
        document.querySelector(".modal_window .bigName").textContent = single_view.name;
        document.querySelector(".modal_window .bigCategory").textContent = single_view.category;
        document.querySelector(".modal_window .bigAlc").textContent = single_view.alc;
        document.querySelector(".modal_window .aroma").textContent = single_view.description.aroma;
        document.querySelector(".modal_window .appearance").textContent = single_view.description.appearance;
        document.querySelector(".modal_window .flavor").textContent = single_view.description.flavor;
        document.querySelector(".modal_window .mouthfeel").textContent = single_view.description.mouthfeel;
        document.querySelector(".modal_window .overallImpression").textContent = single_view.description.overallImpression;

    }



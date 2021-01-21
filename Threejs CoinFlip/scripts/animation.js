

var screenWidth = 300;
var screenHeight = 300;
var scene, camera, renderer, coin;
var headsortails =0;
var spinCounter =0;
var spinActivatedTails=false;
var spinActivatedHeads=false;
var superSpin = false;
var spinResults;
var winAmount;


function init(){
    

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, screenWidth/screenHeight, 0.1, 1000);

    var pointLight = new THREE.PointLight( 0xFFFFFF, 2);
    pointLight.position.set( 200, 250, 600 );
    pointLight.castShadow = true;
    scene.add( pointLight );

 
    const top_texture = new THREE.TextureLoader().load("./images/heads_texture.gif")
    const bottom_texture = new THREE.TextureLoader().load("./images/tails_texture.gif")

    var materials = [
        new THREE.MeshPhongMaterial( { color: 0xFFD700  } ),
        new THREE.MeshPhongMaterial( {  map: top_texture } ),
        new THREE.MeshPhongMaterial(  {  map: bottom_texture })
    ];


    var geometry = new THREE.CylinderGeometry(3,3,0.4,100);
    coin = new THREE.Mesh(geometry,materials)


    coin.scale.set(2,2,2)
    coin.rotation.x = 1.81;//=>-1.35
    coin.rotation.y = 1.6

    scene.add(coin);

    camera.position.z = 9.5;
    camera.position.y = -1;
    camera.rotation.x=.2
    
    //create render and append it to document body
    renderer = new THREE.WebGLRenderer({ canvas: coinCanvas,alpha:true } );
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize(screenWidth, screenHeight);

     animate();

}



function changeToTails(){

    makeHidden("message_output")
    if(headsortails===spinResults){}
    else{
    if(headsortails===1){}
  
    else if(headsortails===0){
        spinActivatedTails=true;
        headsortails = 1;    
    }   }

}


function changeToHeads(){
    makeHidden("message_output")

    if(headsortails===0){}
    else if(headsortails===1){
        spinActivatedHeads=true;
        headsortails = 0;    
    }    

}



function makeHidden(objId){

    let message = document.getElementById(objId);
    if( message.style.visibility==="visible"){ message.style.visibility="hidden"; }
}



function animate(){
    requestAnimationFrame(animate);
   

   if(spinActivatedTails){ spinActivatedTails= spin(headsortails,coin,spinActivatedTails,1.55,.1,false);}
   if(spinActivatedHeads){ spinActivatedHeads= spin(headsortails,coin,spinActivatedHeads,1.55,.1,false);}

   if(superSpin){superSpin =spin(spinResults,coin,superSpin,1.55*4,5,true);}

   updateHeadsTailsButtons(headsortails) 
   renderer.render(scene, camera);


}


function spin(HT,obj,spinActivated,rotate,speed,sSpin){


  if(spinCounter<rotate){
    obj.rotation.z+=speed;
    spinCounter+=.05

  }
  else{
        if(HT===1){obj.rotation.z=rotate*2;}
        else if(HT===0){obj.rotation.z=0;}

        if(sSpin&&HT===1){ obj.rotation.z=3.1000000000000014;}
        else if(sSpin&&HT===0){obj.rotation.z=0;}
         spinCounter=0;
         spinActivated=false;

         if(sSpin&&HT===headsortails){
            updateWinLoseMessage("You Win "+web3.utils.fromWei(winAmount,"ether")+" ETH! YIPPY!")
            spinResults=null;
         }

         else if(sSpin&&HT!==headsortails){
            console.log("got so close")
            updateWinLoseMessage("You Lose!")
         }

    }

    return spinActivated;


}



window.addEventListener('resize', onResize, false);
function onResize() {
  let width;
  let height;


  if(window.innerWidth>300)  {width = 300;}
  else if(window.innerWidth<200)  {width = window.innerWidth;}
  else{width = window.innerWidth;}

  if(window.innerHeight>300)  {height = 300;}
  else if( window.innerHeight<200)  {height =window.innerHeight;}
  else{height = window.innerHeight;}

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

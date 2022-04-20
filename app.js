
function shuffle (array) {
    var i=0,j=0,temp=null;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      
      temp=array[i].x;
      array[i].x=array[j].x;
      array[j].x=temp;
    }
    return array;
  }
  
  
  function randVal(min, max) {
      return (Math.floor(Math.random()*(max - min + 1) + min));
  }
  function randFloat(min, max) {
      return (Math.random()*(max - min + 1) + min);
  }
  
  
  function start(){
      myCanvas=document.getElementById("myCanvas");
      ctx=myCanvas.getContext("2d");
      var widthRatio=0.9;
      var heightRatio=0.50;
  
      myCanvas.width = window.innerWidth*widthRatio;
      myCanvas.height = window.innerHeight*heightRatio;
      
      var barSettings={
          width:25,
          heightMultiplier:20,
          margin:7
          
      }
      var delay={
         checkSortDelay:1000,
         swapAnimationDelay:33,
         swapTimeoutDelay:1500
      }
       document.getElementById("animSpeed").onchange=function(){
         delay.swapAnimationDelay=Math.abs(document.getElementById("animSpeed").value); delay.swapTimeoutDelay=(barSettings.width+barSettings.margin)*delay.swapAnimationDelay+700;
          //alert(delay.swapTimeoutDelay);
      }
       
      var swapInterval=null;
      var swappingFlag=false;
      var colorsArray=["yellow","black","red","green","blue","orange","purple","lightgreen","pink"]
      var barsArray=[];
      
      document.getElementById("shuffleArray").onclick=function(){
          barsArray=shuffle(barsArray);
          drawBars();
      }
     
   function descending(a,b){return a<b;}
   function ascending(a,b){return a>b;}
    document.getElementById("bubbleSort").onclick=function(){
          document.getElementById("shuffleArray").disabled=true;
          document.getElementById("bubbleSort").disabled=true;
         document.getElementById("selectOrder").disabled=true;
          func=document.getElementById("selectOrder").value;
          bubbleSort(barsArray,eval(func));
          
          sortInterval=setInterval(function(){
              sorted=true;
              for(i=0;i<barsArray.length-1;i++){
                 if(barsArray[i].x>barsArray[i+1].x){
                     sorted=false;
                 }
              }
              if(sorted){
                 clearInterval(sortInterval);
                 document.getElementById("shuffleArray").disabled=false; document.getElementById("bubbleSort").disabled=false; document.getElementById("selectOrder").disabled=false; document.getElementById("info").innerHTML="All Done!";
              }
          },delay.checkSortDelay);
          
      }
      
      xBuffer=barSettings.margin*2;
      for(i=1;i<10;i++){
          barsArray.push({
              value:i,
              width:barSettings.width,
              height:barSettings.heightMultiplier*i,
              x:xBuffer,
              y:myCanvas.height-barSettings.heightMultiplier*i-10,
              color:colorsArray[i%colorsArray.length]
          });
          xBuffer+=barSettings.width+barSettings.margin;
      }
      
      function drawBars(){
          ctx.fillStyle="lightblue"; ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
          xBuffer=barSettings.margin*2;
          for(i=0;i<barsArray.length;i++){
              bar=barsArray[i];
              ctx.beginPath();
              ctx.fillStyle=bar.color;
              ctx.rect(bar.x,bar.y,bar.width,bar.height);
              
              ctx.fill(); 
              ctx.font="20px Times New Roman";
              ctx.fillStyle="black"; ctx.fillText(bar.value,bar.x+barSettings.width/4,bar.y-barSettings.margin);
              ctx.closePath();
              
          }
      }
      
      function swapBars(barA,barB,compFunc){
  
          function swapAnimation(){
                   
              if((barA.x>=xB || barB.x<=xA) || (xFakeA>=xB || xFakeB<=xA)){
                  clearInterval(swapInterval);
                  swapInterval=null;
                  swappingFlag=false;
                  barA.color=cA;
                  barB.color=cB;
              }
              else{
                  if(compFunc(barA.value,barB.value)){
                      barA.x++;
                      barB.x--;
                  }
                  xFakeA++;
                  xFakeB--;
              }
              drawBars();
          }
          
          if(!swapInterval){
              xA=barA.x;
              xB=barB.x;
              xFakeA=barA.x;
              xFakeB=barB.x;
              cA=barA.color;
              cB=barB.color;
              swapColor=(compFunc(barA.value,barB.value)? "white":"gray");
              barA.color=swapColor;
              barB.color=swapColor;
              swappingFlag=true;
             document.getElementById("info").innerHTML=barA.value + ((document.getElementById("selectOrder").value=="ascending")? " > ":" < ") + barB.value + ((compFunc(barA.value,barB.value))? " --> SWAP!":" --> NO SWAP!");
              swapInterval=setInterval(swapAnimation ,delay.swapAnimationDelay);
          }
          else{
              setTimeout(swapBars.bind(null,barA,barB,compFunc),delay.swapTimeoutDelay);
          }
          //swapInterval=setInterval(swapAnimation.bind(null,barsArray[0],barsArray[1]),33);
      }
      
      function bubbleSort(a,compFunc){
          var swapped;
          //do
           for(j=0;j<a.length-1;j++){
              swapped = false;
              for (var i=0; i < a.length-1-j; i++) {
              // run one less iteration each round as the right side is already sorted
              
              //document.getElementById("debug").innerHTML+=a[i].value+" > "+a[i+1].value+" "+((a[i].value > a[i+1].value)? "V":"X")+";\n";
                  //if (a[i].value > a[i+1].value) 
                  swapBars(a[i],a[i+1],compFunc);
                  if(compFunc(a[i].value,a[i+1].value))
                  {
                      var temp = a[i];
                      a[i] = a[i+1];
                      a[i+1] = temp;
                      
                      swapped = true;
                  }
              }
              if(!swapped){
              // no swaps were made in the inner loop --> all sorted
                 break; 
              }
          }// while (swapped);
      }
      drawBars();
  }
  
  window.onload=start;
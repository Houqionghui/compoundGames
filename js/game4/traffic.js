let trafficBox = document.getElementsByClassName('trafficBox')[0];
let btn = document.getElementById('btn');
let customs = 30; //要经过的30个红绿灯
let topic=1;//第几个空滤的
let imgs = ['./img/game4/sjbj1.png', './img/game4/sjbj2.png', './img/game4/sjbj3.png', './img/game4/sjbj4.png'];
let i = 0;
trafficBox.style.background = "#adc4f8 url(./img/game4/sjbj1.png) bottom center";   //设置图片的初始图片为该路径的图片
trafficBox.style.backgroundSize = '100%';
trafficBox.style.backgroundRepeat = 'no-repeat';
var randomItem = ''
function time() {
  // i++;
  // i = i % 4;  
  // console.log(imgs[i]); 
  randomItem = imgs[Math.floor(Math.random() * imgs.length)];
   console.log(randomItem);
  if(randomItem=='./img/game4/sjbj1.png'){
    trafficBox.style.background = " #adc4f8 url(" + randomItem + ") no-repeat bottom center";
  }else if(randomItem=='./img/game4/sjbj2.png'){
    trafficBox.style.background = " #b7bfb1 url(" + randomItem + ") no-repeat bottom center";
  }else if(randomItem=='./img/game4/sjbj3.png'){
    trafficBox.style.background = " #dec6c0 url(" + randomItem + ") no-repeat bottom center";
  }else if(randomItem=='./img/game4/sjbj4.png'){
    trafficBox.style.background = " #c9dde9 url(" + randomItem + ") no-repeat bottom center";
  }
  // trafficBox.style.background = "url(" + randomItem + ") no-repeat top center";
  trafficBox.style.backgroundSize = '100%';
  // trafficBox.style.backgroundRepeat = 'no-repeat';
  // trafficBox.setAttribute('data-img',randomItem);
}

let trafficLight = document.getElementById('trafficLight');
console.log(trafficLight);

let traff = trafficLight.getElementsByTagName('div');
console.log(traff);

let trafficStyle = '';
function clickEvent() {
  btn.addEventListener('click', function () {
    customs--;
    topic++;
    red.innerText=topic;
    console.log(customs);
    if (customs <= 0) {
      setTimeout(function () {
        $('.trafficBox').fadeOut(500)
        $('#guess').fadeIn(500)
        guess();
      }, 1000);

    } else {
      setInterval(time(), 2000);
      for (let i = 0; i < traff.length; i++) {
        trafficStyle = traff[i];
        if (randomItem == imgs[0]) {
          trafficLight.className = 'img1';
          trafficStyle.className = 'circle1';
        } else if (randomItem == imgs[1]) {
          trafficLight.className = 'img2';
          trafficStyle.className = 'circle2';
        } else if (randomItem == imgs[2]) {
          trafficLight.className = 'img4';
          trafficStyle.className = 'circle2';
        } else if (randomItem == imgs[3]) {
          trafficLight.className = 'img3';
          trafficStyle.className = 'circle3';
        }
      }
      circleRed.style.backgroundColor = '#cccccc';
      circleGreen.style.backgroundColor = '#cccccc';
      $('input[type=radio][name="DoorCt"]:checked').attr("checked", false);
      let result = document.getElementsByClassName('result')[0];
      result.style.display = 'none';
    }
  }), false
}
clickEvent();
// setInterval(time, 2000);//循环调用time1()函数，时间间隔为2000ms
//setInterval()函数，按照指定的周期（按毫秒计）来调用函数或表达式
let circleRed = document.getElementById("circle_red");
let circleGreen = document.getElementById("circle_green");
// 切换红绿灯
function setColora(color) {
  circleRed.style.backgroundColor = color; //红灯
}
function setColorb(color) {
  circleGreen.style.backgroundColor = color;//绿灯
}
let arr=[];
let sliceArr=[];
function startWork() {
  let radio = document.getElementsByName("DoorCt");
  let list=document.getElementsByClassName('list')[0];
  let history=list.getElementsByTagName('li');
  for (let i = 0; i < radio.length; i++) {
    radio[i].onclick=function(){
      let number = Math.floor((Math.random() * 2) + 1);
      if (number == 1) {
        arr.push('red');
        console.log(arr);
        
        setTimeout(() => {
          setColora("red");        
          circleGreen.style.backgroundColor = '#cccccc';
        }, 1000)
      } else if (number == 2) {
        arr.push('green');
        console.log(arr);       
        setTimeout(() => {
          setColorb("green");
          circleRed.style.backgroundColor = '#cccccc';
        }, 1000)
      }

      // 两个变量 一个选题 一个选元素 每次重新生成选题索引的时候 选题变量就+1
      for (let i = 0; i < arr.length; i++) {
        let a=topic-1;
        for (let i = 0; i < history.length; i++) {   
          if(a>=9){
            sliceArr = arr.slice(-10);
            console.log(sliceArr);
            setTimeout(function(){
              history[i].style.background=sliceArr[i];     
            },2000)
            
          }else{
            setTimeout(function(){
              history[a].style.background=arr[a];     
            },2000)
           
          }
          // console.log(history[a]);          
          
          
        }
    
    }
    
      getValue(number);
    }
   
  }
}
startWork()
let num = 0;
let second = 0;//节省的秒数
function getValue(number) {
  let resultText = document.getElementsByClassName('result_text')[0];
  let result = document.getElementsByClassName('result')[0];
  let radio = document.getElementsByName("DoorCt");
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      if (number == radio[i].value) {
        setTimeout(function () {
          result.style.display = 'block';
        }, 2000);
        num++;
        second += 30;
        let html = '';
        html += `
      <div class="acquisition">恭喜您猜对了，获得1积分！</div>
      `;
        resultText.innerHTML = html;
      } else {
        let str = '';
        str += `
      <div class="defeated">很遗憾没猜中!</div>
      `;
        setTimeout(function () {
          result.style.display = 'block';
        }, 2000);
        resultText.innerHTML = str;
      }
    }
  }
}

// 最后页
function guess() {
  let guess = document.getElementsByClassName('guessText')[0];
  let html = '';
  html += `
  <div class="result_spare">在这一单中，您一共猜对了${num}次<br>一共节省了${second}秒<br>共获得${num}积分！</div>
  `;
  guess.innerHTML = html;
}

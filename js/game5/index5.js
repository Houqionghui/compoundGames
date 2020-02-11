
  let homePageBtn = document.getElementsByClassName('homePage_btn')[0];
  homePageBtn.onclick = function () {
    setTimeout(function () {
      $('.homePage').fadeOut(500)
      $('.order').fadeIn(500)
      refresh();  
      amimat();
    }, 1000)
  }

  let number=7;
let greensData=[
  {
    "id":1,
    greens:['鱼香肉片',"辣子鸡丁","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
  {
    "id":2,
    greens:['丁香鸭',"水煮肉片","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
  {
    "id":3,
    greens:['可乐鸡翅',"地三鲜","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
  {
    "id":4,
    greens:['蚝油生菜',"辣子鸡丁","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
  {
    "id":5,
    greens:['鱼香肉片',"芦笋煎黄菜","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
  {
    "id":6,
    greens:['鱼香肉片',"辣子鸡丁","米饭*2"],
    money:['30','25','3',],
    total:'48'
  },
]
let quizList=''
$.get('./json/game5/data.json').then(function (res) {
  quizList = res;
  console.log(quizList);
})
let award=[]; //奖励积分
// let penalize=35;//惩罚积分
let integral=''; //奖励或罚款的积分
let takeOut=''; //选择的A外卖或B外卖
let text='' //准点奖励或晚点罚款
let condition='';//路况 准点或晚点
function refresh(){
  number--;
  console.log(number);

  if(number<=0){
    // let indent = Math.floor((Math.random() * 2) + 1); //随机选择A或B订单
    // console.log(indent);
    let indent=2;
    if(indent==1){
      // let num = Math.floor((Math.random() * 2) + 1);
      takeOut='A'
      let num=1;
      if(num==1){
        integral=award[Math.floor((Math.random()*award.length))];
        text='准点奖励'
        condition='准点'
      }else{
        integral=35; 
        text='晚点罚款'
        condition='晚点';
      }
    }else if(indent==2){
      takeOut='B'
      let num = Math.floor((Math.random() * 2) + 1);
      if(num==1){
        integral=75;
        text='准点奖励';
        condition='准点'
        
      }else{
        integral=65;
        text='晚点罚款';
        condition='晚点';
      }
    //  let punish=[]
    }
    setTimeout(function () {
      $('.order').fadeOut(500)
      $('.initPage').fadeIn(500)
      initPage();  
      $('.orderForm').addClass('animated heartBeat ');
      setTimeout(function(){
        $('.orderForm').removeClass('heartBeat');
    }, 1000);   
    }, 2000)
   
  }else{
    let box=document.getElementById('box');
    let buttonA=document.getElementById('buttonA');
    let buttonB=document.getElementById('buttonB');
    let probability=document.getElementsByClassName('probability')[0]
    let questions = greensData.splice(Math.floor(greensData.length * Math.random()), 1)[0];
    let question = quizList.splice(0, 1)[0];
    let html='';
    html+=`
    <ul class="clearfix">
    <li>
      <div class="dishName">${questions.greens[0]}</div>
      <div class="dishMoney">${questions.money[0]}元</div>
    </li>
    <li>
      <div class="dishName">${questions.greens[1]}</div>
      <div class="dishMoney">${questions.money[1]}元</div>
    </li>
    <li>
      <div class="dishName">${questions.greens[2]}*2</div>
      <div class="dishMoney">${questions.money[2]}元</div>
    </li>
  </ul> 
   <div class="total">
  <div>小计</div>
  <div class="dishMoney">${questions.total}元</div>
  </div>
    `;
    box.innerHTML=html;
    let str='';
    str+=`
    <div>50%准点：奖${question.reward[0]}积分</div>
    <div>50%晚点：罚${question.reward[1]}积分</div>
    `;
    probability.innerHTML=str;
    buttonA.onclick=function(){
      award.push(question.reward[0]);
      console.log(award);
      setTimeout(refresh, 50)
      amimat();
    }
    buttonB.onclick=function(){
      setTimeout(refresh, 50)
      amimat();
    }
    
  }

}

function initPage(){
let orderForm=document.getElementsByClassName('orderForm')[0];
console.log();

let html='';
html+=`
<div class="context">
  <div>地图导航告诉你，实际发生的情况是${condition}</div>
  <div>您选择了送${takeOut}外卖</div>
  <div>得到了${text}${integral}积分</div>
</div>
`;
orderForm.innerHTML=html; 
}

function amimat(){
  $('.orderB').addClass('animated rotateInDownRight ');
  setTimeout(function(){
      $('.orderB').removeClass('rotateInDownRight');
  }, 1000);
  $('.orderA').addClass('animated rotateInDownRight ');
  setTimeout(function(){
      $('.orderA').removeClass('rotateInDownRight');
  }, 1000);

}


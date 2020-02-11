(function(){
  let Tconvert='';//输入的今天要兑换的钱
  let Moneyconvert=''//兑换得到的钱
  let hebdomadVal='';//一周后要兑换的钱;
  let Hmoney='';//一周后兑换的得到的钱
function oneOnblu() {
  let todayInput=document.getElementsByClassName('todayInput')[0]; //今天要兑换的积分
  let Tmoney=document.getElementsByClassName('Tmoney')[0]; //今天得到的钱
  let hebdomadInput=document.getElementsByClassName('hebdomadInput')[0];//一周后兑换的积分
  let MoneyHebdomad=document.getElementsByClassName('MoneyHebdomad')[0];//一周后兑换的积分
  todayInput.onblur=function(){
     Tconvert=todayInput.value;
    let onvertVal = Tconvert.replace(/[^\d]/g, '');
    if (onvertVal !== Tconvert) {
      alert('输入数字')
    }else{
      Moneyconvert=Tconvert*1;
      todayInput.value=Tconvert+'积分'
      Tmoney.value = Moneyconvert+'元';
    }
  }
  hebdomadInput.onblur=function(){
      hebdomadVal=hebdomadInput.value;
  let hebdData = hebdomadVal.replace(/[^\d]/g, '');
      if(hebdData!==hebdomadVal){
        alert('输入数字')
      }else{
        hebdomadInput.value=hebdomadVal+'积分';
        let Amoney=hebdomadVal*1.1
        let Mconsequence = Amoney.toFixed(2);
        MoneyHebdomad.value=Mconsequence+'元'
      }
  }
} 
oneOnblu();
function confirm(){
let ensure=document.getElementsByClassName('btn')[0];
ensure.addEventListener('click',function(){
  if(Tconvert=='' || hebdomadVal==''){
    alert('请输入要兑换的积分')
  }else{
    setTimeout(function () {
      $('.timePreferences').fadeOut(500)
      $('.award').fadeIn(500)
    }, 50)
  }
 
},false)
}
confirm();


function present(){
  let WesternVal='';
  let ThreeWeeksVal='';
let WesternInput=document.getElementsByClassName('WesternInput')[0]; //两周后要兑换的积分
let WesternMoney=document.getElementsByClassName('WesternMoney')[0]; //两周后要兑换的积分
let ThreeWeeksInput=document.getElementsByClassName('ThreeWeeksInput')[0];//三周后要兑换的积分
let ThreeWeeksMoney=document.getElementsByClassName('ThreeWeeksMoney')[0];
WesternInput.onblur=function(){
  WesternVal=WesternInput.value;
  console.log(WesternVal);   
  let Westerndata = WesternVal.replace(/[^\d]/g, '');
  if(WesternVal!==Westerndata){
    alert('请输入数字')
  }else{
    let Omoney=WesternVal*1;
    WesternMoney.value=Omoney+'元'
  }
}
ThreeWeeksInput.onblur=function(){
  ThreeWeeksVal=ThreeWeeksInput.value;
  let ThreeWeeksdata=ThreeWeeksVal.replace(/[^\d]/g, '');
  if(ThreeWeeksVal!==ThreeWeeksdata){
    alert('请输入数字');
  }else{
    let Weeksmoney=WesternVal*1.1;
    let quence = Weeksmoney.toFixed(2);
        ThreeWeeksMoney.value=quence+'元';
  }
}


}
present();

})()
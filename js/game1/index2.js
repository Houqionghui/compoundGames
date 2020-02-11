; (function () {
  let next = null;

  // 页面初始化
  function init() {
    $renderTemplte();
    next = $generateNextFn();

    bindEvent();
  }

  // 绑定事件处理函数
  function bindEvent() {
    const nextBtn = document.querySelector('#next');
    nextBtn.addEventListener('click', nextStepFn, false);
  }
  const docWrap = document.body.querySelector('.mainPage');
  // 点击下一步按钮
  function nextStepFn() {
    const vnext = next.next();
    if (vnext.value && !vnext.done) {
      let val = $('input[name="dining"]:checked').val(); 
      console.log(val);
      console.log(vnext.value.common);  
      console.log(vnext.value.options);     
       aa(vnext.value);
      $renderProbability(vnext.value);
    } else {
      console.log('已经是最后一题了')
    
    }
  }
  // 设置概率文本
  function $setProbability(normal, team) {
    return `
    <div class="probabilitys">接到普通订单概率为${normal}, 团体订单概率为${team}</div>
    `
  }


  // 设置单选框
  function $setTemplate(optionsA, optionsB) {
    return `
    <div class="question">
      <div class="answer" data-index="1" id="a1">
        <label for="options_A">
          <input id="options_A" type="radio" value="A" name="dining" />
          <span>${optionsA}</span>
        </label>
      </div>
      <div class="answer" data-index="2" id="a2">
        <label for="options_B">
          <input id="options_B" type="radio" value="B" name="dining"/>
          <span>${optionsB}</span>
        </label>
      </div>
    </div>`
  }

  // 渲染概率文本
  function $renderProbability(value) {
    const dataArr = value.common;
    const docWrap = document.querySelector('.probability');
    docWrap.innerHTML = $setProbability(dataArr[0], dataArr[1]);
    
  }

  function aa(value){
    // console.log(value);
    const Arr = value.options;
    const docWrap = document.body.querySelector('.mainPage');
     docWrap.innerHTML = $setTemplate(Arr[0], Arr[1]);
  }

  // 渲染单选框
  function $renderTemplte() {
    // const data = [{
    //   "id": "1",
    //   "options": [
    //     "A餐厅,普通16积分，团体20积分",
    //     "B餐厅,普通1积分，团体38.5积分"
    //   ],
    // }];
    // const options = data[0].options;
    // const docWrap = document.body.querySelector('.mainPage');
    // docWrap.innerHTML = $setTemplate(options[0], options[1]);
  }

  // 生成器
  function* $generateNextFn() {
    const data = probability = [
      {
        "id": "1",
        "common": [
          "10%",
          "90%",
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ]
      },
      {
        "id": "2",
        "common": [
          "20%",
          "80%"
        ], "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "3",
        "common": [
          "30%",
          "70%",
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "4",
        "common": [
          "40%",
          "60%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "5",
        "common": [
          "50%",
          "50%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],

      },
      {
        "id": "6",
        "common": [
          "60%",
          "40%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "7",
        "common": [
          "70%",
          "30%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "8",
        "common": [
          "80%",
          "20%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
      {
        "id": "9",
        "common": [
          "90%",
          "10%"
        ],
        "options": [
          "A餐厅,普通16积分，团体20积分",
          "B餐厅,普通1积分，团体38.5积分"
        ],
      },
    ],
      lens = data.length;

    // 从第二个开始渲染 因为第一个在页面初始化时就有了
    for (let i = 1; i < lens; i++) {
      yield data[i]
    }
  }
  init();
}());


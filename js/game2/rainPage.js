
let redCount = 0; //接到的订单个数
let indentRatio = 0 //红包比例
let quizList = null;
let quizleft = 3  //转到结果页的
let numb = 0;
let arr = []; 	//循环数据后,存到这里
let num = 0;
let addIntegral = 0;
let proportionLen = 0; //记录掉下来多少个订单
let bar_width = 0; //进度条
let g = function (id) {
    return document.getElementById(id);
};
let ua = navigator.userAgent.toLowerCase();
let el = g('box'),
    redIdArr = [],
    redAmountArr = [],
    allAmount = 0;
let rain = new redPack({
    el: el,         // 容器
    //chance: 0.5,  // 几率,暂时不要
    speed: 10,      // 速度，越小越快
    density: 300,   //  红包密度，越小越多
    callback: function (e) {  // 点击红包的回调
        redIdArr.push(e.target.getAttribute('redId'));
        redAmountArr.push(e.target.getAttribute('redAmount'));
        redCount++;
        // 抢到红包的个数
        // g('redCount').innerText = redCount;
        // console.log(redCount);
        //接到的红包比例
        proportionLen = sessionStorage.getItem('key');
        let aa = redCount / proportionLen;
        b = aa.toFixed(2);
        indentRatio = b.slice(2, 4);
        console.log(indentRatio);
    }
});


function onbtn() {
    $('.button').click(function () {
        setTimeout(function () {
            $('.start').fadeOut(500)
            $('.indent').fadeIn(500)
            grow();
        }, 30)
    })
}
onbtn();
function grow() {
    let bar = document.getElementById('plan_bar');
    let counts = document.getElementById('count');
    let timers = setInterval(function () {
        if (bar_width < 100) {
            bar_width++;
            bar.style.width = bar_width + '%';
            counts.innerHTML = bar_width;
            if (bar_width == 100) {
                setTimeout(function () {
                    document.querySelector('#plan_box').style.display = 'none';
                    rain.ajax({
                        method: 'GET',
                        url: './json/dataa.json',
                        success: function (res) {
                            var data = JSON.parse(res);
                            rain.start(data);
                        }
                    });

                }, 1000)
            }
        } else {
            clearInterval(timers);
        }
    }, 30)
}
let counts = 20;
// timer = setInterval(Count, 1000);
function Count(){
    let timer = setInterval(function () {
        if (bar_width == 100) {
            g('countDown').innerText = counts;
            counts--;
            if (counts < 0) {
                clearInterval(timer);
                rain.stop();
                rain.clear();
                // showPop();
                setTimeout(function () {
                    $('.indent').fadeOut(500)
                    $('.mainPage').fadeIn(500)
                    refresh()
                }, 1000)
            }
        }
    }, 1000)
}

Count();
function showPop() {
    // g('mask').style.display = 'block';
    // g('pop').style.display = 'block';
    // g('redCount1').innerText = redCount;

    // // 计算红包总金额
    // function sum(arr) {
    //     if(arr.length===0){
    //         return 0;
    //     }
    //     else if(arr.length===1){
    //             allAmount += Number(arr[0]);
    //         return allAmount;
    //     }
    //     else{
    //         for(var i=0;i<arr.length;i++){
    //             allAmount += Number(arr[i]);
    //         }
    //         return allAmount;
    //     }
    // }
    // sum(redAmountArr);
    // 添加到dom上
    // g('allAmount').innerText = (allAmount).toFixed(2);
}


$.get('./json/data.json').then(function (res) {
    quizList = res;
    console.log(quizList);
    
})

//题目更新
function refresh() {
    quizleft--
    if (quizleft < 0) {
        $('.mainPage').fadeOut(500)
        $('.scorePage').fadeIn(500);
        // alert('完成')
        // $('.scorePage .again').css('box-shadow', '0px 6px 10px dimgrey');
        initPage();
    } else {
        numb++;
        let questions = quizList.splice(0, 1)[0];
        arr.length = '';
        arr.push(questions);

        //开始新题目时重置时间
        if (arr[0].options.length == 4) {
            $('.mainPage .qno').html(`
			<div class="question">${arr[0].title}</div>
            <div class="answer" data-index="1" id="a1">A、${arr[0].options[0]}</div>
            <div class="answer" data-index="2" id="a2">B、${arr[0].options[1]}</div>
            <div class="answer" data-index="3" id="a3">C、${arr[0].options[2]}</div>
            <div class="answer" data-index="4" id="a4">D、${arr[0].options[3]}</div>
			`)
        } else if (arr[0].options.length == 5) {
            $('.mainPage .qno').html(`
			<div class="question">${arr[0].title}</div>
            <div class="answer" data-index="1" id="a1">A、${arr[0].options[0]}</div>
            <div class="answer" data-index="2" id="a2">B、${arr[0].options[1]}</div>
            <div class="answer" data-index="3" id="a3">C、${arr[0].options[2]}</div>
            <div class="answer" data-index="3" id="a4">D、${arr[0].options[3]}</div>
            <div class="answerlin"><div class="answer " data-index="3" id="a5">E、${arr[0].options[4]}</div></div>
			`);
        }
        timeleft = 20;
        $('.mainPage .timeout').html('20');
        let countDown = setInterval(function () {
            timeleft--
            $('.mainPage .timeout').html(`${timeleft}`)
            if (timeleft == 0) {
                clearInterval(countDown)
                // $('.mainPage .qno').off('click')  //倒计时结束后,没有选择,就自动选择正确答案
                // $('#a' + question.answer).css('background-color','#92d050')
                setTimeout(refresh, 2000);
            }
        }, 1000)
        $('.mainPage .qno').click(function (e) {

            if (e.target.className == 'answer') {
                clearInterval(countDown);
                $('.mainPage .qno').off('click')
                $('#a' + e.target.dataset.index).css('box-shadow', 'none')
                $('#a' + e.target.dataset.index).css('background-color', '#CDC881')
                let index = e.target.dataset.index;
                if (arr[0].id == 1) {
                    if (index == 1) {
                        check(0, 10)
                    } else if (index == 2) {
                        check(11, 20)
                    } else if (index == 3) {
                        check(21, 30)
                    } else if (index == 4) {
                        check(31, 1000)
                    }
                } else if (arr[0].id == 2) {

                }
                // 接到的红包比例
                if (arr[0].id == 2) {
                    if (index == 1) {
                        ratio(0, 20)
                        //A.0-20%    B. 21%-40%    C. 41%-60%   D.61%-80%  E.81%-100%
                    } else if (index == 2) {
                        ratio(21, 40)
                    } else if (index == 3) {
                        ratio(41, 60)
                    } else if (index == 4) {
                        ratio(61, 80)
                    } else if (index == 5) {
                        ratio(81, 100)
                    }
                }
                setTimeout(refresh, 1000)
            }
        })
    }
}

//判断订单个数是否在区间
function check(m, n) {
    if (redCount >= m && redCount <= n) {
        addIntegral += 5;
        console.log(addIntegral);
    } else {
        return
    }
}
//判断选择的订单比例是否在区间
function ratio(m, n) {
    if (indentRatio >= m && indentRatio <= n) {
        addIntegral += 5;
        console.log(addIntegral);
    }

}
//结果页
function initPage() {
    let total = addIntegral + redCount;
    $('.scorePage .rank').html(`
    <div class="topic">
    <div>你实际上接住了<span>${redCount}</span>个订单，成功接住的比例为<span>${indentRatio}%</span>
    你的表现超过了<span>%</span>的用户。你一共获得了<span>${total}</span>积分！</div>
	</div>
`)
}

    // g('closeBtn').addEventListener('click', function () {
    //     closePop();
    // });
    // function closePop() {
    //     g('mask').style.display = 'none';
    //     g('pop').style.display = 'none';
    // }

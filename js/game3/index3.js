
(function (doc) {
  let input1 = doc.getElementById('input1'),
    input2 = doc.getElementById('input2'),
    input3 = doc.getElementById('input3'),
    input4 = doc.getElementById('input4'),
    pathBtn = doc.getElementById('pathBtn');
  pathA = '', //第一单的B路线获得的积分
    pathB = '', //第二单扣积分
    choice1 = '',
    choice2 = 0,
    onOff = true;
  flag = true;


  function init() {
    incident();
  }
  function incident() {
    // 选择A路线
    input1.onclick = function (e) {
      if (onOff == true) {
        choice1 = 'A';
        console.log(choice1);

        input1.style.background = ' #CF984D';
        input2.style.background = '#C1B19C';
        pathA = 48;
        console.log(pathA);
        onOff = false;
      } else {
        return
      }
    }
    // 选择B路线
    input2.onclick = function (e) {
      if (onOff == true) {
        choice1 = 'B';
        console.log(choice1);
        input2.style.background = ' #CF984D';
        input1.style.background = '#C1B19C';
        onOff = false;
        let arr = [200, 0];
        var rand = Math.random() * 100;
        console.log(rand);
        if (rand <= 25) {
          pathA = arr[0];
          console.log(pathA);
        } else {
          pathA = arr[1];
          console.log(pathA);
        }
      } else {
        return
      }
    }
    // 选择C路线
    input3.onclick = function () {
      if (flag == true) {
        choice2 = 'C';
        input3.style.background = ' #CF984D';
        input4.style.background = '#C1B19C';
        let arr = [200, 0];
        let rand = Math.random() * 100;
        if (rand <= 25) {
          pathB = arr[1];
        } else {
          pathB = arr[0];
        }
        flag = false;
      }
    }
    // 选择D路线
    input4.onclick = function () {
      if (flag == true) {
        choice2 = 'D';
        input4.style.background = ' #CF984D';
        input3.style.background = '#C1B19C';
        pathB = 200;
        console.log(pathB);
        flag = false;
      }
    }
  }

  $('.pathBtn').click(function () {
    console.log(flag);
    console.log(onOff);
    if (flag == false && onOff == false) {
      setTimeout(function () {
        $('.course').fadeOut(500)
        $('#result').fadeIn(500)
        result();
      }, 30)
    } else {
      alert('请选择路线')
    }
  })
  function result() {
    console.log(flag);

    $('.result_context_img').html(`
    <div class="choice">
      你选择的路线是<span>${choice1}</span>,
      <span>${choice2}</span>
      <div class="choice_num">结果得到${pathA}积分,扣掉${pathB}积分</div>
     </div>
    `);
  }
  init();
})(document)
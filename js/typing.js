window.onload = function () {
  //音声
  let type_audio = document.getElementById("type_audio");
  let miss_audio = document.getElementById("miss_audio");
  let down_audio = document.getElementById("down_audio");
  let moveleft_short_audio = document.getElementById("moveleft_short_audio");
  let moveleft_middle_audio = document.getElementById("moveleft_middle_audio");
  let moveleft_long_audio = document.getElementById("moveleft_long_audio");
  let chime_audio = document.getElementById("chime_audio");
  let tear_audio = document.getElementById("tear_audio");

  //
  let waitFLG = false; //改行中
  let arrayString = [];
  let countString = 0;
  let paper_height = 100;
  let paper_top = 260;

  // 初期HTML記述をセット
  let defaultHTML = document.body.innerHTML;

  // 初期化
  function initialize() {
    document.body.innerHTML = defaultHTML;
    waitFLG = false; //改行中
    arrayString = [];
    countString = 0;
    paper_height = 100;
    paper_top = 260;
  }

  //
  document.addEventListener("keydown", judgKey);
  //
  function judgKey(e) {
    let str = e.key;
    if (str == "Escape") {
      //最初から
      addPaper();
      setTimeout(function () {
        tear_audio.play();
        setTimeout(function () {
          initialize();
        }, 510);
      }, 300);
      //   document.location.reload();
      //window.location.reload();
      //   document.getElementById('reload').click();
      // window.location.href = 'js01/typing.html';
    } else if (str == "Enter") {
      //改行キーが押されている場合
      waitFLG = true;
      enter();
    } else if (waitFLG) {
      //textareaが改行処理中の場合:何もなし
    } else if (countString > 23 || str.length > 1 || arrayString.length > 2) {
      //1行の行数を超えている場合
      //印字関連でないキーを押下した場合=キー１つで複数文字を意味する場合
      //早く打ちすぎの時
      miss_audio.play();
    } else {
      //印字できる場合
      type_audio.play();
      arrayString.push(str);

      if (countString == 23) {
        chime_audio.play();
      }
      countString++;

      //配列の１文字目ならtype起動
      if (arrayString.length == 1) {
        type();
      }
    }
  }

  function type() {
    let highlight = document.getElementById("highlight");
    let log = document.getElementById("log");
    setTimeout(function () {
      highlight.classList.remove("highlight-on");
      setTimeout(function () {
        let str = arrayString.shift();
        //印字
        log.textContent += str;
        highlight.classList.add("highlight-on");
        //console.log(arrayString.length);
        if (arrayString.length > 0) {
          type();
        } else {
          return;
        }
      }, 150);
    }, 15);
  }
  function addPaper() {
    let paper = document.getElementById("paper");

    paper_height += 50;
    paper_top -= 50;
    paper.style.height = paper_height + "px";
    paper.style.top = paper_top + "px";
  }

  function enter() {
    let paper = document.getElementById("paper");
    let log = document.getElementById("log");
    let highlight = document.getElementById("highlight");
    let now_text = log.parentElement;
    //入力枠の確保
    //let next_text = now_text.nextElementSibling;
    let next_text = document.createElement("p");
    next_text.classList.add("text");
    now_text.parentElement.append(next_text);

    setTimeout(function () {
      //
      countString = 0;
      paper_height += 50;
      paper_top -= 50;
      //Pタグに転記 Spanタグが消える
      now_text.textContent = log.textContent;
      //
      down_audio.play();
      //紙を増やす+50 ずらす-50
      paper.style.height = paper_height + "px";
      paper.style.top = paper_top + "px";
      // Spanタグを次のpへ移動
      next_text.classList.add("wait"); //文字が透明に変わる
      next_text.innerHTML =
        log.textContent +
        "<span id='log'></span><span id='highlight' class='highlight-on'>_</span>";
      setTimeout(function () {
        highlight.classList.remove("highlight-on");
        let waittime = 0;
        if (log.textContent.length == 0) {
          waittime = 100;
        } else if (log.textContent.length <= 6) {
          moveleft_short_audio.play();
          waittime = 600;
        } else if (log.textContent.length <= 15) {
          moveleft_middle_audio.play();
          waittime = 1200;
        } else {
          moveleft_long_audio.play();
          waittime = 1800;
        }
        setTimeout(function () {
          // sound
          // できれば　SPANタグを後ろから前へ動かす
          next_text.innerHTML =
            "<span id='log'></span><span id='highlight' class='highlight-on'>_</span>";
          highlight.classList.add("highlight-on");
          next_text.classList.toggle("wait"); //文字色が戻る
          waitFLG = false;
        }, waittime);
      }, 500);
    }, 500);
  }
};

// function checkKey()
// {
//     alert(String.fromCharCode(event.keyCode))
// }
// window.document.onkeydown = checkKey;

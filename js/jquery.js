
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

// id="title"に表示
$("#title").typed({
     strings: [
       'アニメーションが表示されるテキスト'
      ],
     typeSpeed: 1 // アニメーションのスピード
});

// 文に改行を含める場合
$("#typed").typed({ strings: ["この文は\n改行されます."] });

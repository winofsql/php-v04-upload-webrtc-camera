// *************************************
// localhost 以外では SSL で処理する
// *************************************
//if ( location.host != "localhost" ) {
//    if ( location.protocol == "http:" ) {
//        location.protocol = "http:"
//    }
//}

// *************************************
// カメラ用変数
// *************************************
// カメラ用 video 要素(DOM オブジェクト)
var camera;
var canvas;

// スマホフロントカメラ用
var options_front = {
    audio: true,
    video: { 
        facingMode: "user" 
    }
};

// スマホ背面カメラ用
var options_back = {
    audio: true,
    video: { 
        facingMode: "environment" 
    }
};

// *************************************
// カメラ参照
// *************************************
function startCamera( options ) {

    if ( typeof navigator.mediaDevices == "undefined" ) {
        alert("https で表示してください");
        return;
    }

    // カメラ表示
    navigator.mediaDevices.getUserMedia(options)
    .then(function(stream){
        // カメラのストリームを表示
        camera.srcObject = stream;

        console.dir("ストリーム開始");

    })
    .catch(function(err){
        // ブラウザで使用を拒否した場合等( 動画で代替 )
        errorVideo();
    });

}

// *************************************
// カメラ(stream) を停止
// *************************************
function stopCamera() {

    var stream = camera.srcObject;
    var tracks;

    try {
        // カメラのみ
        tracks = stream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });
        camera.srcObjectt = null;
    }
    catch (e) {
        console.log(e);
    }

}

// *************************************
// 動画で代替
// *************************************
function errorVideo() {

    toastr.error( "WebRTC を使用できません");

    $("#camera")
        .prop({ 
            "loop" : true, "muted" : true, "controls" : true,
            "src" : "borg-lady.mp4"
        })
        .css({"border": "solid 1px #000"});

}

// *************************************
// 簡易スマホチェック
// *************************************
jQuery.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
toastr.options={"closeButton":false,"debug":false,"newestOnTop":false,"progressBar":false,"positionClass":"toast-bottom-center","preventDuplicates":false,"onclick":null,"showDuration":"300","hideDuration":"1000","timeOut":"3000","extendedTimeOut":"1000","showEasing":"swing","hideEasing":"linear","showMethod":"fadeIn","hideMethod":"fadeOut"};
if ( !$.isMobile ) {
	toastr.options.positionClass = "toast-top-center";
}

// *************************************
// 変数
// *************************************
var copy_count = 0;

// *************************************
// jQuery
// *************************************
$(function(){

    // DOM オブジェクト
    camera = $("#camera").get(0);
    canvas = $("#canvas").get(0);

    // カメラ開始
    startCamera( options_front );

    // *************************************
    // canvas にコピーして画像に変換
    // *************************************
    $("#copy").on( "click", function(){

        $("#result").html("");

        copy_count++;
        if ( copy_count > 3 ) {
            toastr.error("撮影は３枚までです");
            return false;
        }

        $("#canvas").prop({ width: camera.getBoundingClientRect().width, height: camera.getBoundingClientRect().height });

        canvas = $("#canvas").get(0);
        var ctx = canvas.getContext('2d');

        // カメラから キャンバスに静止画を描く
        ctx.drawImage(camera, 0, 0, camera.getBoundingClientRect().width, camera.getBoundingClientRect().height);

        $("<img>").appendTo("#image")
        .prop( {"src": canvas.toDataURL("image/jpeg"), "id": "image"+ copy_count } )
        .css( {"width": "100px", "margin": "10px" } );


    });

    // 画像を保存
    $("#save").on("click",function(){

        // base64 で画像表現
        var jpeg = canvas.toDataURL("image/jpeg")
        // A 要素にセットしてページに追加
        var download = $("<a></a>").appendTo("body").css("display","none");
        // download プロパティをセット
        download.prop({"href" : jpeg, "download": "canvas.jpg" });
        // DOM でクリックしてダウンロードさせる
        download.get(0).click();
        // ページから削除
        download.remove();
    
    });

    // スマホフロントカメラへ切り替え
    $("#front").on("click",function(){

        stopCamera();
        startCamera( options_front );

    });

    // スマホ背面トカメラへ切り替え
    $("#back").on("click",function(){

        stopCamera();
        startCamera( options_back );
    
    });

});

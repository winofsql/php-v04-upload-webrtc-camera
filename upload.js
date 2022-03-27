$(function(){

    // *************************************
    // アップロード処理
    // *************************************
    $("form").submit( function(event){

        // 本来の送信処理はキャンセルする
        event.preventDefault();

        // アップロードする画像があるかどうかのチェック
        if ( $("#image").html() == "" ) {
            options.error("アップロードする画像ファイルを選択して下さい");
            return;
        }

        if ( !confirm("アップロードを開始してもよろしいですか?") ) {
            return;
        }

        // 操作不可に設定
        $("#content input").prop("disabled", true);

        // 結果の表示エリアを全てクリア
        $("#result").html( "" );

        // **************************************
        // ファイルのアップロード
        // **************************************
        console.log("アップロード処理開始");

        var formData = new FormData();

        // 画像データサイズの制限
        formData.append("MAX_FILE_SIZE", 10000000);

        var file_cnt = 0;

        $("#image img").each( function() {

            var base64 = $(this).prop("src");
            var bin = atob(base64.split(',')[1]);
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            var blob = new Blob([buffer.buffer], {type: "application/octet-stream"});

            file_cnt++;
            var file_name = (new Date()).getTime();
            formData.append("image"+file_cnt, blob, file_name +"_"+file_cnt+".dat");

        });

        formData.append("FILE_COUNT", file_cnt );

        $.ajax({
            url: "./upload.php",
            type: "POST",
            data: formData,
            processData: false,  // jQuery がデータを処理しないよう指定
            contentType: false   // jQuery が contentType を設定しないよう指定
        })
        .done(function( data, textStatus ){
            console.log( "status:" + textStatus );
            console.log( "data:" + JSON.stringify(data, null, "    ") );

            // アップロード結果の表示
            $.each(data, function( idx, image ){

                if ( image.error != 0 ) {
                    $("#result").append("<span id=\"result" +idx+"\"></span><b style='color:red'>" + image.name+ " : " + image.result +"</b><br>");
                }
                else {
                    $("#result").append("<span id=\"result" +idx+"\"></span>" + image.name + " : " + image.result + "<br>");
                }

                $( "#result"+idx ).append($("#"+idx).clone());

            });

            // 画像表示のクリア
            $("#image").html("");
            copy_count = 0;

        })
        .fail(function(jqXHR, textStatus, errorThrown ){
            console.log( "status:" + textStatus );
            console.log( "errorThrown:" + errorThrown );
            toastr.info("アップロードに失敗しました");
        })
        .always(function() {

            // 操作不可を解除
            $("#content input").prop("disabled", false);
        })
        ;

    });

});

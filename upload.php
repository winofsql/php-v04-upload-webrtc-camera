<?php
require_once("setting.php");

header( "Content-Type: application/json; charset=utf-8" );

// フォルダが無ければ作成
if ( !is_dir( $image_path ) ) {

    mkdir( $image_path );

}

$cnt = $_POST["FILE_COUNT"] + 0;

for( $i = 0; $i < $cnt; $i++ ) {

    $image_target = "image".($i+1);

    if ( $_FILES[$image_target]["error"] == 0 ) {

        // *************************************
        // 1) 画像フォーマットの取得
        // *************************************
        $type_string = image_type_to_mime_type( exif_imagetype( $_FILES[$image_target]['tmp_name'] ) );

        // *************************************
        // 2) オリジナルファイル名の取得
        // *************************************
        $file = explode(".", $_FILES[$image_target]['name']);

        // *************************************
        // 3) 日本語ファイル名対応
        // *************************************
        $file_name = urlencode( $file[0] );

        // *************************************
        // 4) 保存ファイル名を作成
        //   a) 拡張子決定
        //   b) uniqid() でファイル目をユニーク
        // *************************************
        $target = "";
        if ( $type_string == "image/jpeg" ) {
            $target = uniqid() . "_{$file_name}.jpg";
        }
        if ( $type_string == "image/gif" ) {
            $target = uniqid() . "_{$file_name}.gif";
        }
        if ( $type_string == "image/png" ) {
            $target = uniqid() . "_{$file_name}.png";
        }
        if ( $target == "" ) {
            $_FILES["image"]["result"][] = "アップロードできないフォーマットです";
        }
        else {
            // *************************************
            // アップロードファイルの保存
            // *************************************
            if ( @move_uploaded_file( $_FILES[$image_target]['tmp_name'], "{$image_path}/{$target}" ) ) {
                $_FILES[$image_target]["result"] = "アップロードに成功しました";
            }
            else {
                // なんらかの環境エラー
                $_FILES[$image_target]["result"] = "アップロードに失敗しました";
            }
            
        }
    }
    else {
        switch($_FILES[$image_target]["error"]){
            case 1:
                $_FILES[$image_target]["result"] = "php.ini の upload_max_filesize ディレクティブの値を超えています";
                break;
            case 2:
                $_FILES[$image_target]["result"] = "HTML フォームで指定された MAX_FILE_SIZE を超えています";
                break;
            case 3:
                $_FILES[$image_target]["result"] = "一部のみしかアップロードされていません";
                break;
            case 4:
                $_FILES[$image_target]["result"] = "アップロードされませんでした";
                break;
            case 6:
                $_FILES[$image_target]["result"] = "テンポラリフォルダがありません";
                break;
            case 7:
                $_FILES[$image_target]["result"] = "ディスクへの書き込みに失敗しました";
                break;
            case 8:
                $_FILES[$image_target]["result"] = "PHP の拡張モジュールがファイルのアップロードを中止しました";
                break;
            default:
                $_FILES[$image_target]["result"] = "不明なエラーです";
        }
        
    }

}

print json_encode($_FILES);

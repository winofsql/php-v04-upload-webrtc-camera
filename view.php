<!DOCTYPE html>
<html>
<head>
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
<meta charset="UTF-8">
<title>カメラまたは動画より画像をアップロード</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>

<link rel="stylesheet" href="client.css?_=<?= time() ?>">
<script src="client.js?_=<?= time() ?>"></script>
<script src="camera.js?_=<?= time() ?>"></script>
<script src="upload.js?_=<?= time() ?>"></script>

</head>
<body>
<h3 class="alert alert-primary"><a href="./">カメラまたは動画より画像をアップロード</a></h3>
<div id="content">
    <form enctype="multipart/form-data"
            method="POST">
        <div class="mb-3">
            <video id="camera" autoplay playsinline></video>
            <canvas id="canvas" width="480" height="360"></canvas>
        </div>
        <div class="mb-3">

            <input type="button" class="btn btn-secondary" id="copy" value="静止画">
            <input type="submit" class="btn btn-secondary" id="upload" value="アップロード">
            <a class="btn btn-info " href="<?= $_SERVER["PHP_SELF"] ?>">リロード</a>
        </div>
        <div id="image"></div>
        <div class="mt-3">
            <div id="button">
                <input type="button" class="btn btn-secondary ms-4 me-4 mt-4" value="front" id="front">
                <input type="button" class="btn btn-secondary ms-4 me-4 mt-4" value="back" id="back">
            </div>
        </div>
    </form>
</div>
<div id="result"></div>

</body>
</html>

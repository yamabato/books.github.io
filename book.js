function getBookData(){
    isbn = document.ISBN.isbn.value;
    if (isbn.length==10){
        isbn = isbn10213(isbn);
    }
    url = "https://api.openbd.jp/v1/get?isbn=" + isbn;
    html="<h3>書籍情報</h3><center>"
    html += "<div id=cover_img></div>"
    html += `<label for="title">タイトル:</label>
        <input id="title" class="cp_iptxt" type="text" placeholder="タイトル" value=""><br/>`
    html += `<label for="author">著者:</label>
        <input id="author" class="cp_iptxt" type="text" placeholder="著者" value=""><br/>`
    html += `<label for="publisher">出版社:</label>
        <input id="publisher" class="cp_iptxt" type="text" placeholder="出版社" value=""><br/>`
    html += `<label for="volume">巻数:</label>
        <input id="volume" class="cp_iptxt" type="text" placeholder="巻数" value=""><br/>`
    html += `<label for="series">シリーズ:</label>
        <input id="series" class="cp_iptxt" type="text" placeholder="シリーズ" value=""><br/>`
    html += `<label for="date">出版日:</label>
        <input id="date" class="cp_iptxt" type="text" placeholder="出版日" value=""><br/>`
    html += `<label for="description">詳細:</label>
        <input id="description" class="cp_iptxt" type="text" placeholder="詳細" value=""><br/>`
    html += `<label for="cover">表紙:</label>
        <input id="cover" class="cp_iptxt" type="text" placeholder="表紙" value=""><br/>`
    html += `<input class="btn-flat-border" type="button" onClick="register()" value="登録"/>`
    html += `<input class="btn-flat-border" type="button" onClick="deleteBook()" value="削除"/>`
    html+="</center>"

    $(function(){
        $.getJSON(url, function(data) {
            if(data[0] == null) {
                alert("情報を取得できませんでした");
                console.log("ERROR");
            } else {
                title = data[0].summary.title;
                author = data[0].summary.author;
                publisher = data[0].summary.publisher;
                volume = data[0].summary.volume;
                series = data[0].summary.series;
                pubdate = data[0].summary.pubdate;
                if (data[0].onix.CollateralDetail.TextContent != undefined){
                    description = data[0].onix.CollateralDetail.TextContent[0].Text
                }else{
                    description = "";
                }
                cover = data[0].summary.cover;

                for (t of Object.keys(books)){
                    if (books[t].ISBN == isbn){
                        cover = books[t].cover;
                        title = t;
                        author = books[t].author;
                        publisher = books[t].publisher;
                        volume = books[t].volume;
                        series = books[t].series;
                        pubdate = books[t].date;
                        description = books[t].description;
                        break;
                    }
                }

                if (cover==""){
                    cover = "https://pds.exblog.jp/pds/1/201712/21/39/f0323239_18023139.png";
                }
                
                document.getElementById("cover_img").innerHTML = `<img class="book_cover" src=${cover} alt="表紙"/>`;
                $("#title").val(title);
                $("#author").val(author);
                $("#publisher").val(publisher);
                $("#volume").val(volume);
                $("#series").val(series);
                $("#date").val(pubdate);
                $("#description").val(description);
                $("#cover").val(cover);

            }
        });
    });

    
    document.getElementById("book").innerHTML = html;

}

function isbn10213(isbn10){
    const str = "978" + isbn10.replace("-","").substr(0,9);
    const n = 10 - str.split("").map(s => parseInt(s)).reduce((p, c, i) => p + ((i % 2 === 0) ? c : c * 3)) % 10;
    return str + String(n===10 ? 0:n)
}

function register(){
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    publisher = document.getElementById("publisher").value;
    volume = document.getElementById("volume").value;
    series = document.getElementById("series").value;
    date = document.getElementById("date").value;
    description = document.getElementById("description").value;
    cover = document.getElementById("cover").value;
    isbn = document.getElementById("isbn").value;
    books[title] = {"ISBN":isbn,"author":author,"publisher":publisher,"volume":volume,"series":series,"date":date,"description":description,"cover":cover}
    document.getElementById("book").innerHTML = "";
    document.getElementById("isbn").value = "";
}

function deleteBook(){
    isbn = document.getElementById("isbn").value;
    new_books = {}
    for (title of Object.keys(books)){
        if (books[title].ISBN!=isbn){
            new_books[title] = books[title]
        }
    }
    books = new_books;
    document.getElementById("book").innerHTML = "";
    document.getElementById("isbn").value = "";
}

function download(){
    // 保存するJSONファイルの名前
    const fileName = "book_data.js";
     
    // データをJSON形式の文字列に変換する。
    const data = "books = " + JSON.stringify(books);
     
    // HTMLのリンク要素を生成する。
    const link = document.createElement("a");
     
    // リンク先にJSON形式の文字列データを置いておく。
    link.href = "data:text/plain," + encodeURIComponent(data);
     
    // 保存するJSONファイルの名前をリンクに設定する。
    link.download = fileName;
     
    // ファイルを保存する。
    link.click();
}

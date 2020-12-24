function generateText(title){
    text = "<div class=bookDetail>";
    data = books[title];
    text += `<p font-stype:bold font-size:7px>タイトル</p>${title}<br/>`
    if (data.author!=""){
        text += `<p font-stype:bold font-size:7px>著者</p>${data.author}<br/>`
    }
    if (data.publisher!=""){
        text += `<p font-stype:bold font-size:7px>出版社</p>${data.publisher}<br/>`
    }
    if (data.volume!=""){
        text += `<p font-stype:bold font-size:7px>巻数</p>${data.volume}<br/>`
    }
    if (data.series!=""){
        text += `<p font-stype:bold font-size:7px>シリーズ</p>${data.series}<br/>`
    }
    if (data.date!=""){
        text += `<p font-stype:bold font-size:7px>出版日</p>${data.date}<br/>`
    }
    if (data.description!=""){
        text += `<p font-stype:bold font-size:7px>詳細</p>${data.description}<br/>`
    }
    text += "</div>";

    return text;
}

function makeHTML(books_title){
    list = "<ul>";
    for (title of books_title){
        list += `<li><details><summary><img src=${books[title].cover==""?"https://pds.exblog.jp/pds/1/201712/21/39/f0323239_18023139.png":books[title].cover} alt="表紙"/><p class="title">${title}</p></a></summary>${generateText(title)}</details></li>`;
    }
    list += "</ul>";

    return list;
}

function diff(s1, s2) {
    if (s1 == s2) {
        return 1.0;
    }
    const s1_list = s1.split("").filter(function(x, i, self) {
        return self.indexOf(x) === i;
    });
    const s2_list = s2.split("");

    const s1_list_len = s1_list.length;

    sum = 0;

    for (n = 0; n < s1_list_len; n++) {
        char = s1_list[n];
        sum += s2_list.filter(x => x == char).length;
    }

    return sum / Math.max(s1_list_len, s2_list.length)
}

function match(s1,s2){
    if (diff(s1,s2)>=0.45){
        return true;
    }

    if (s1.includes(s2)){
        return true;
    }
}

function gridList(){
    html = `<h3>${Object.keys(books).length}件を表示中</h3>`
    html += makeHTML(Object.keys(books));
    document.getElementById("covers").innerHTML = html;
}

function search(){
    const word = document.SEARCH.word.value;
    html = "";
    books_title = Object.keys(books);

    const title_checked = document.getElementById("title").checked;
    const author_checked = document.getElementById("author").checked;
    const publisher_checked = document.getElementById("publisher").checked;
    const series_checked = document.getElementById("series").checked;
    const description_checked = document.getElementById("description").checked;
    title_result = [];
    author_result = [];
    publisher_result = [];
    series_result = [];
    description_result = [];

    for (title of books_title){
        if (title_checked && match(title,word)){
            title_result.push(title);
        }
        if (author_checked && match(books[title].author,word)){
            author_result.push(title);
        }
        if (publisher_checked && match(books[title].publisher,word)){
            publisher_result.push(title);
        }
        if (series_checked && match(books[title].series,word)){
            series_result.push(title);
        }
        if (description_checked && match(books[title].description,word)){
            description_result.push(title);
        }
    }

    books_count = Object.keys(books).length + "件";

    if (title_checked){
        if (title_result.length){
            html += `<h3>「タイトル」にヒット(${title_result.length}/${books_count})</h3>`
            html += makeHTML(title_result);
        }else{
            html += `<h3>「タイトル」にヒットなし</h3>`
        }
    }
    if (author_checked){
        if (author_result.length){
            html += `<h3>「著者」にヒット(${author_result.length}/${books_count})</h3>`
            html += makeHTML(author_result);
        }else{
            html += `<h3>「著者」にヒットなし</h3>`
        }
    }
    if (publisher_checked){
        if (publisher_result.length){
            html += `<h3>「出版社」にヒット(${publisher_result.length}/${books_count})</h3>`
            html += makeHTML(publisher_result);
        }else{
            html += `<h3>「出版社」にヒットなし</h3>`
        }
    }
    if (series_checked){
        if (series_result.length){
            html += `<h3>「シリーズ」にヒット(${series_result.length}/${books_count})</h3>`
            html += makeHTML(series_result);
        }else{
            html += `<h3>「シリーズ」にヒットなし</h3>`
        }
    }
    if (description_checked){
        if (description_result.length){
            html += `<h3>「詳細」にヒット(${description_result.length}/${books_count})</h3>`
            html += makeHTML(description_result);
        }else{
            html += `<h3>「詳細」にヒットなし</h3>`
        }
    }
    document.getElementById("covers").innerHTML = html;
    document.getElementById("word").value = "";
}

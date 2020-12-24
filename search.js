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
    alt_image = "data:image/jpeg;base64,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";
    for (title of books_title){
        list += `<li><details><summary><img src=${books[title].cover==""?alt_image:books[title].cover} alt="表紙"/><p class="title">${title}</p></a></summary>${generateText(title)}</details></li>`;
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

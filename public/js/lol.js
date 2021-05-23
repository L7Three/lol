document.getElementById("qk").onclick = function () {
    Array.from(document.getElementsByTagName("input")).forEach(a => a.value = " ");
}

Array.from(document.getElementsByClassName("delete")).forEach(i => {
    i.onclick = function () {
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    }
})

function seek() {
    let query = Array.from(document.getElementsByClassName("queryInput")).map(i => i.value);
    Array.from(document.getElementsByClassName("biao")[0].children[0].children)
        .filter((a, b) => b != 0).filter(i =>
            (query[0] != "" && i.children[0].innerText != query[0]) ||
            (query[1] != "" && i.children[4].innerText != query[1])
        ).forEach(i => i.parentNode.removeChild(i))

}

function R1() {
    document.getElementById("a1").remove();
}

function R2() {
    document.getElementById("a2").remove();
}

function R3() {
    document.getElementById("a3").remove();
}

function success() {
    document.getElementById("end_4").style.display = "none";

    let addName = document.getElementById("add_name").value;
    let addPlace = document.getElementById("add_place").value;
    let addPosition = document.getElementById("add_position").value;
    let addWords = document.getElementById("add_words").value;
    let all =
        `
    <tr id="a1">
    <td >${addName}</td>
    <td >${addPlace}</td>
    <td >${addPosition}</td>
    <td >${addWords}</td>
    <td >
    <button class="c">详情</button>
    <button class="c2">修改</button>
    <button class="c3 delete" onclick="R1()">删除</button>
    <button class="c4">添加图片</button>
    </td>
  </tr>
    `
    document.getElementById("biao").innerHTML += all;
}

function alert() {
    document.getElementById("end_4").style.display = "block";
}

function quit() {
    document.getElementById("end_4").style.display = "none";
}
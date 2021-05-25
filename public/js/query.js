$(function(){
    $('.queryName').click(()=>{
        let message = document.getElementById("queryInput").value
        $.ajax({
            url:"/xdmin/find/"+message,
            type:'POST',
            success:(data) =>{
                document.getElementById('biao').innerHTML =
                data.map(o =>
                    `
                    <tr>
                    <td>${o.title}</td>
                    <td>${o.name}</td>
                    <td>${o.content}</td>
                    <td>${o.create_time}</td>
                    <td>
                        <button class="c">详情</button>
                        <button class="c2">修改</button>
                        <button class="c3  delete" data-id=${o.id}>删除</button>
                        <button class="c4">添加图片</button>
                    </td>
            </tr>
                    `
            ).join("");
            }
        })
    })

    Array.from(document.getElementsByClassName("delete")).forEach(i=>{
            i.onclick = (()=>{
            let id = i.getAttribute('data-id')
            $.ajax({
                url:"/xdmin/del/"+id,
                type:"delete",
                success:function(data){
                    if(data == 'success'){
                        alert('删除成功')
                        $(i).parent().parent().remove()
                    }
                }
            })
        }
            )
    })
});
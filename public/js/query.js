
$(function(){

     //删除
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

   //修改
   Array.from(document.getElementsByClassName('update')).forEach(i => {
    i.onclick = function () {
        let ind = this.getAttribute('data-id1')
        window.location.href = '/xdmin/update/' + ind
    }
})


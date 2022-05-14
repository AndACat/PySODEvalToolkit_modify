function editJsJridData($jsGrid,uid,data) {
    let idx = getJSGridIdx($jsGrid,uid)
    console.log("直接修改grid数据", idx, data)
    $jsGrid.data().JSGrid.data[idx] = data;
    $jsGrid.jsGrid("refresh");
}
function deleteJsJridData($jsjrid,idx) {
    $jsjrid.data().JSGrid.data.splice(idx,1);
    $jsjrid.jsGrid("refresh");
}
function insertJsJridData($jsjrid,data) {
    let d = JSON.parse(data);
    $jsjrid.data().JSGrid.data.splice(0,0,d);
    $jsjrid.jsGrid("refresh");
}
function getJSGridIdx($jsGrid,uid) {
    //得到idx
    let jsGridData = $jsGrid.data().JSGrid.data
    for(let i=0;i<jsGridData.length;++i){
        if(uid == jsGridData[i].uid)
            return i;
    }
    return -1;
}
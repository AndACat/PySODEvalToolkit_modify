let sortResult = null;
let currentPageDataset = "ALLDATASET"
let currentPageMetrics = null
//排名信息
let sortNum={"asdasdsa":5}
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
function sortNumber(item1, item2){
    return item2 - item1
}
function reloadCurrentPage(dataset_name) {
    let url = ""
    let allDatasetMetrics = []
    if (dataset_name == "ALLDATASET"){
        for (let name in pySODEvalToolKitData){
            allDatasetMetrics = allDatasetMetrics.concat(pySODEvalToolKitData[name])
            console.log(",,,", pySODEvalToolKitData[name])
        }
        currentPageMetrics = allDatasetMetrics
    }else{
        currentPageMetrics = pySODEvalToolKitData[dataset_name]
    }
    console.log("全部信息:", pySODEvalToolKitData)
    console.log("仅加载页面数据信息", currentPageMetrics)
    //计算排名信息
    sortNum = getSortResult2(currentPageMetrics)
    /*
    num保存的是前三的数值有哪些
    num2保存的是每个数值排名第几
     */
    for(let v in sortNum){
        for(let n in currentPageMetrics){
            if (currentPageMetrics[n].num != undefined){
                continue
            }
            if(sortNum[v].uid == currentPageMetrics[n].uid){
                console.log(sortNum[v])
                let num = sortNum[v].mae + sortNum[v].maxf + sortNum[v].adpe + sortNum[v].adpf + sortNum[v].avge + sortNum[v].avgf + sortNum[v].maxe + sortNum[v].sm + sortNum[v].wfm
                currentPageMetrics[n].num = num - 8

                let mer = ['mae', 'maxf', 'adpe', 'adpf', 'avge', 'avgf', 'maxe', 'sm', 'wfm']
                let temp = 0
                for(let k in mer){
                    // console.log("sortNum[v][k]",sortNum[v][mer[k]],'***',  v, k)
                    if(sortNum[v][mer[k]] <= 3){
                        temp ++
                    }
                }
                currentPageMetrics[n].num2 = temp
            }
        }
    }

    sortResult = getSortResult(currentPageMetrics)
    $jsGrid = $("#jsGrid")
    $jsGrid.data().JSGrid.data = currentPageMetrics
    $jsGrid.jsGrid("refresh")




}

/*/

Toast.fire({
    icon: 'success',
    title: ''
})

info  error      warning   question
 */
$(document).ready( function () {
    //点击Btn加载每个数据集的指标值
    $(".queryDataset").click(function (){
        let dataset_name = $(this).text()
        reloadCurrentPage(dataset_name)
    })

    //自动加载Method信息
    let methodList = []
    // $.ajax({
    //     url:"/method/query",
    //     dataType: "json",
    //     async: false,
    //     success: function (data) {
    //         methodList = data;
    //     }
    // })
    //自动加载Dataset信息
    // let datasetList = []
    // $.ajax({
    //     url:"/dataset/query",
    //     dataType: "json",
    //     async: false,
    //     success: function (data) {
    //         datasetList = data;
    //         let node = ""
    //         $.each(datasetList, function (idx, val){
    //             node += "<option value='" + val.uid + "'>" + val.name + "</option>"
    //         })
    //         $("#dataset_select_insert").html(node)
    //         $("#dataset_select_edit").html(node)
    //     }
    // })

    //表格插件
    $("#jsGrid").jsGrid({
        //height: "650",
        width: "100%",

        filtering: false,
        editing: false,
        sorting: true,
        inserting: false,


        paging: true,
        pageIndex: 1,
        pageSize: 1000,
        pageButtonCount: 5,
        // pageLoading: true,
        autoload: true,
        pagerFormat: "页数: {first} {prev} {pages} {next} {last}    第 {pageIndex} 页,共 {pageCount} 页",
        pagePrevText: "←",
        pageNextText: "→",
        pageFirstText: "第一页",
        pageLastText: "最后一页",

        confirmDeleting: true,
        deleteConfirm: "确认删除吗",

        noDataContent: "没有数据...",
        loadMessage: "正在加载数据，请稍候......",

        dataType: "json",
        controller: {
            // loadData: function (filter) {
            //     let localData;
            //     $.ajax({
            //         url: "/metrics/query/datasetname/DES",
            //         dataType: "json",
            //         async: false,
            //         success: function (data) {
            //             localData = data;
            //         }
            //     });
            //     return localData;
            // },
            deleteItem: function (item){

            },
            insertItem: function (item){


            },
            updateItem: function (item){

            },
        },
        fields: [{
            title: "数据集名称",
            sorting:false,
            editing:false,
            type: "text",
            width: 15,
            css: "",
            height: 80,
            align: "center",
            filtering: false,
            itemTemplate:function (idx,item) {
                return item.dataset;
            }
        },{
            title: "模型名称",
            type: "text",
            sorting: false,
            width: 15,
            editing: false,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                return item.method;
            },
            insertTemplate:function (value, item){
                let node = "<select id='method_select'>"
                $.each(methodList, function (idx, val){
                    node += "<option selected value='" + val.uid + "'>" + val.name + "</option>"
                })
                node += "</select>"
                return node
            },
            insertValue: function (){
                return $("#method_select").val()
            }
        },{
            name: "mae",
            title: "mae",
            type: "text",
            width: 15,
            sorter: sortNumber,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'mae'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            name: "maxf",
            title: "maxf",
            sorter: sortNumber,
            type: "text",
            width: 15,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'maxf'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            name: "avgf",
            title: "avgf",
            type: "text",
            sorter: sortNumber,
            width: 15,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'avgf'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            name: "adpf",
            title: "adpf",
            type: "text",
            width: 15,
            sorter: sortNumber,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'adpf'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            name: "maxe",
            sorter: sortNumber,
            title: "maxe",
            type: "text",
            width: 15,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'maxe'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        }, {
            name: "avge",
            title: "avge",
            type: "text",
            width: 15,
            height: 80,
            sorter: sortNumber,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'avge'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        }, {
            name: "adpe",
            title: "adpe",
            type: "text",
            width: 15,
            sorter: sortNumber,
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'adpe'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            name:"sm",
            title: "sm",
            sorter: sortNumber,
            type: "text",
            width: 15,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'sm'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        }, {
            name:"wfm",
            title: "wfm",
            type: "text",
            width: 15,
            sorter: sortNumber,
            css: "",
            height: 80,
            align: "center",
            filtering: true,
            itemTemplate:function (idx,item) {
                let field = 'wfm'
                if (sortResult == null){
                    return '<span>' + item[field] + '</span>'
                }else if (item[field] == sortResult[field][0]){
                    return '<span class="num1 big">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][1]){
                    return '<span class="num2 second">' + item[field] + '</span>';
                }else if(item[field] == sortResult[field][2]){
                    return '<span class="num3">' + item[field] + '</span>';
                }else{
                    return '<span>' + item[field] + '</span>'
                }
            }
        },{
            title: "总排名(越小越好)",
            name:"num",
            type: "number",
            width: 20,
            sorting: true,
            sorter: sortNumber,
            height: 80,
            align: "center",
        },{
            title: "前三排名数(越大越好)",
            name:"num2",
            type: "number",
            width: 25,
            sorting: true,
            sorter: sortNumber,
            height: 80,
            align: "center",
        }/*,{
            title:"<button class='jsgrid-button jsgrid-insert-button insertMetrics'></button",
            //type:"control",
            width: 20,
            align: "center",
            sorting: false,
            editing: true,
            itemTemplate: function (value, item) {
                let d = JSON.stringify(item);
                return '<button class="jsgrid-button jsgrid-edit-button editMetrics" data=\'' + d + '\'></button>' +
                    '<button class="jsgrid-button jsgrid-delete-button deleteMetrics" data=\'' + d + '\'></button>';
            }
        }*/]
    });
    // 点击删除
    $(document).on("click",".deleteMetrics",function () {
        if(confirm("确认删除此指标吗?")){
            let data = JSON.parse($(this).attr("data"));
            let uid = data.uid;
            $.ajax({
                url: "/metrics/delete/uid/"+ uid,
                type: "post",
                success: function (data) {
                    if(data.code == 200 || data.code == "200"){
                        let $jsGrid = $("#jsGrid")
                        deleteJsJridData($jsGrid,getJSGridIdx($jsGrid,uid))
                        Toast.fire({
                            icon: 'success',
                            title: '删除成功'
                        })
                    }else{
                        //delete problem error
                        Toast.fire({
                            icon: 'error',
                            title: '删除成功'
                        })
                    }
                }
            })
            console.log("deleteItem item data")
        }
    })

    // 点击插入
    $(document).on("click",".insertMetrics",function (){

        $("#insertModal").modal('show');
    })
    //点击保存插入
    $(document).on("click","#metrics_save_insert",function (){
        let data = getMetricsDataForInsert()
        $.ajax({
            url: "/metrics/insert",
            type: "post",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (data) {
                if(data.code == 200){
                    let $jsGrid = $("#jsGrid")
                    //insertJsJridData($jsGrid,getJSGridIdx($jsGrid,data))
                    Toast.fire({
                        icon: 'success',
                        title: '插入成功, 请刷新页面'
                    })
                    reloadCurrentPage(currentPageDataset)
                }else{
                    //delete problem error
                    Toast.fire({
                        icon: 'error',
                        title: '插入成功'
                    })
                }
            }
        })
    })

    //点击编辑
    $(document).on("click", ".editMetrics", function (){
        //放置数据
        let data = $(this).attr("data");
        let jsonData = JSON.parse(data)
        setMetricsDataForEdit(jsonData)
        $("#editModal").modal('show');
    })
    //点击保存编辑
    $(document).on("click","#metrics_save_edit",function (){
        let result = getMetricsDataForEdit()
        $.ajax({
            url: "/metrics/update",
            type: "post",
            data: JSON.stringify(result),
            contentType: "application/json",
            success: function (data) {
                if(data.code == 200){
                    let $jsGrid = $("#jsGrid")
                    //editJsJridData($jsGrid, result.uid, result)
                    Toast.fire({
                        icon: 'success',
                        title: '修改成功, 请刷新网页'
                    })
                    reloadCurrentPage(currentPageDataset)
                    $("#editModal").modal('hide');
                }else{
                    //delete problem error
                    Toast.fire({
                        icon: 'error',
                        title: '修改失败'
                    })
                }
            }
        })

    })

    reloadCurrentPage(currentPageDataset)
} );

//是为了计算前三数值，而让代码渲染表格颜色的
function getSortResult(data){
    let sortResult = {
        "mae":[],
        "maxf":[],
        "avgf":[],
        "adpf":[],
        "maxe":[],
        "avge":[],
        "adpe":[],
        "sm":[],
        "wfm":[]
    }
    for (let key in sortResult){
        data.sort(function(a, b){
            return b[key] - a[key]
        })
        sortResult[key].push(data[0][key])
        let last = data[0][key]
        if(data.length == 1) continue
        let i = 1
        while (true){
            console.log('-------', data[i])
            if (data[i][key] != data[i-1][key]){
                sortResult[key].push(data[i][key])
                i++
            }else{
                i++
            }
            if(i >= data.length || sortResult[key].length == 3){
                break
            }
        }
        // sortResult[key].push(data[1][key])
        // sortResult[key].push(data[2][key])
    }
    console.log("重新计算排名前三信息", sortResult)
    return sortResult
}
//计算每个数值的排名信息
function getSortResult2(data){
    let copyData = JSON.parse(JSON.stringify(data))
    let sortResult = {
        "mae":[],
        "maxf":[],
        "avgf":[],
        "adpf":[],
        "maxe":[],
        "avge":[],
        "adpe":[],
        "sm":[],
        "wfm":[]
    }
    for (let key in sortResult){
        data.sort(function(a, b){
            return b[key] - a[key]
        })
        // console.log("temp data", data)
        let i = 1
        let num = 1
        // copyData[0][key] = num
        for (let j in copyData){
            if (copyData[j].uid == data[0]['uid']){
                copyData[j][key] = num
                break
            }
        }
        for(let i=1;i<=data.length-1;i++){
            // console.log(data[i][key] == data[i-1][key],"--", data[i][key],"--", data[i-1][key])
            if(data[i][key] == data[i-1][key]){
                for (let j in copyData){
                    if (copyData[j].uid == data[i]['uid']){
                        copyData[j][key] = num
                        break
                    }
                }
                // console.log("赋值copyData[i][key] = num equal |", i, key, num)
            }else{
                num++
                for (let j in copyData){
                    if (copyData[j].uid == data[i]['uid']){
                        copyData[j][key] = num
                        break
                    }
                }
                // console.log("赋值copyData[i][key] = num", i, key, num)
            }
            // console.log("已得到排名汇总结果t", copyData)
        }
    }
    console.log("重新计算全部排名信息", copyData)
    return copyData
}

function setMetricsDataForEdit(data){
    $("#metrics_uid_edit").val("")
    $("#metrics_method_uid_edit").val("")
    $("#dataset_select_edit").val("")
    $("#method_name_edit").val("")
    $("#method_data_edit").val("")
    $("#method_papername_edit").val("")
    $("#method_paperlink_edit").val("")
    $("#method_describes_edit").val("")
    $("#metrics_mae_edit").val("")
    $("#metrics_maxf_edit").val("")
    $("#metrics_avgf_edit").val("")
    $("#metrics_adpf_edit").val("")
    $("#metrics_maxe_edit").val("")
    $("#metrics_avge_edit").val("")
    $("#metrics_adpe_edit").val("")
    $("#metrics_sm_edit").val("")
    $("#metrics_wfm_edit").val("")

    $("#metrics_uid_edit").val(data.uid)
    $("#metrics_method_uid_edit").val(data.method.uid)
    $("#dataset_select_edit").val(data.dataset.uid)
    $("#method_name_edit").val(data.method.name)
    $("#method_data_edit").val(data.method.data)
    $("#method_papername_edit").val(data.method.paperName)
    $("#method_paperlink_edit").val(data.method.paperLink)
    $("#method_describes_edit").val(data.method.describes)
    $("#metrics_mae_edit").val(data.mae)
    $("#metrics_maxf_edit").val(data.maxf)
    $("#metrics_avgf_edit").val(data.avgf)
    $("#metrics_adpf_edit").val(data.adpf)
    $("#metrics_maxe_edit").val(data.maxe)
    $("#metrics_avge_edit").val(data.avge)
    $("#metrics_adpe_edit").val(data.adpe)
    $("#metrics_sm_edit").val(data.sm)
    $("#metrics_wfm_edit").val(data.wfm)
}

function getMetricsDataForEdit(){
    let data = {}

    let method = {}
    method.uid = $("#metrics_method_uid_edit").val()
    method.name = $("#method_name_edit").val()
    method.data = $("#method_data_edit").val()
    method.paperName = $("#method_papername_edit").val()
    method.paperLink = $("#method_paperlink_edit").val()
    method.describes = $("#method_describes_edit").val()
    data['method'] = method;

    let dataset = {}
    dataset.uid = $("#dataset_select_edit").val()
    data['dataset'] = dataset;

    data['uid'] = $("#metrics_uid_edit").val()
    data.mae = $("#metrics_mae_edit").val()
    data.maxf = $("#metrics_maxf_edit").val()
    data.avgf = $("#metrics_avgf_edit").val()
    data.adpf = $("#metrics_adpf_edit").val()
    data.maxe = $("#metrics_maxe_edit").val()
    data.avge = $("#metrics_avge_edit").val()
    data.adpe = $("#metrics_adpe_edit").val()
    data.sm = $("#metrics_sm_edit").val()
    data.wfm = $("#metrics_wfm_edit").val()
    console.log("得到编辑数据结果", data)
    return data
}

function getMetricsDataForInsert(){
    let data = {}
    let method = {}

    method.name = $("#method_name_insert").val()
    method.data = $("#method_data_insert").val()
    method.paperName = $("#method_papername_insert").val()
    method.paperLink = $("#method_paperlink_insert").val()
    method.describes = $("#method_describes_insert").val()
    data['method'] = method;



    data.mae = $("#metrics_mae_insert").val()
    data.maxf = $("#metrics_maxf_insert").val()
    data.avgf = $("#metrics_avgf_insert").val()
    data.adpf = $("#metrics_adpf_insert").val()
    data.maxe = $("#metrics_maxe_insert").val()
    data.avge = $("#metrics_avge_insert").val()
    data.adpe = $("#metrics_adpe_insert").val()
    data.sm = $("#metrics_sm_insert").val()
    data.wfm = $("#metrics_wfm_insert").val()
    console.log("得到插入数据结果", data)
    return data
}



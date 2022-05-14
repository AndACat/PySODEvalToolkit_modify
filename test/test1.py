import uuid

import numpy as np
def getUid():
    return str(uuid.uuid1())

metrics_npy_path = '../output/rgbd_metrics_all.npy'

metrics = dict(np.load(metrics_npy_path, allow_pickle=True).item())
metrics_new = {}

for dataset_name, infos in metrics.items():
    temp = []
    for method_name, metrics_vals in infos.items():
        each_row = {}
        each_row['dataset'] = dataset_name
        each_row['method'] = method_name
        each_row['uid'] = getUid()
        for metrics_name, metrics_val in metrics_vals.items():
            each_row[metrics_name] = metrics_val
        temp.append(each_row)
    metrics_new[dataset_name] = temp
print("转换data信息:", metrics_new)
print("转换成data.js")
with open('../results/htmls2/data.js', mode='w') as f:
    f.write(f"const pySODEvalToolKitData = {metrics_new}\n"
            f"let node = \"<button class='btn btn-info queryDataset'>ALLDATASET</button>&nbsp;&nbsp;\";for(let dataset_name in pySODEvalToolKitData) node += '<button class=\"btn btn-info queryDataset\">' + dataset_name + '</button>&nbsp;&nbsp;';$(\"#dataset_btn\").html(node);"
            )




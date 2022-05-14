# -*- coding: utf-8 -*-

import argparse
import json
import os
from collections import OrderedDict

parser = argparse.ArgumentParser(description="A simple tool for checking your json config file.")
parser.add_argument(
    "-m", "--method-jsons", default=['../json/config_method_others.json', '../json/config_method_ours.json'], help="The json file about all methods."
)
parser.add_argument(
    "-d", "--dataset-jsons", default='../json/config_dataset.json', help="The json file about all datasets."
)
args = parser.parse_args()
total_msgs = []
dataset_json = args.dataset_jsons
print(f"Start to check config file: {dataset_json}")
with open(dataset_json, encoding="utf-8", mode="r") as f:
    datasets_info = json.load(f, object_hook=OrderedDict)  # 有序载入
    for dataset_name, dataset_info in datasets_info.items():
        root = dataset_info['root']
        image_path = dataset_info['image']['path']
        # image_suffix = datasets_info['image']['suffix']
        mask_path = dataset_info['mask']['path']
        # mask_suffix = datasets_info['mask']['suffix']
        if not os.path.exists(image_path):
            print(f"\t{image_path} 不存在")
        if not os.path.exists(mask_path):
            print(f"\t{mask_path} 不存在")
print(f"\tChecking Over!")
print()


for method_json in args.method_jsons:
    print(f"Start to check config file: {method_json}")
    with open(method_json, encoding="utf-8", mode="r") as f:
        methods_info = json.load(f, object_hook=OrderedDict)  # 有序载入
    with open(args.dataset_jsons, encoding="utf-8", mode="r") as f:
        datasets_info = json.load(f, object_hook=OrderedDict)  # 有序载入

    for method_name, method_info in methods_info.items():
        for dataset_name, results_info in method_info.items():
            if results_info is None:
                continue

            dataset_mask_info = datasets_info[dataset_name]["mask"]
            mask_path = dataset_mask_info["path"]
            mask_suffix = dataset_mask_info["suffix"]

            dir_path = results_info["path"]
            file_prefix = results_info.get("prefix", "")
            file_suffix = results_info["suffix"]

            # 校验Method中的文件夹路径
            if not os.path.exists(dir_path):
                print(f"\t{dir_path} 不存在")
                continue
            # 校验Method中的文件夹类型
            elif not os.path.isdir(dir_path):
                print(f"{dir_path} 不是正常的文件夹路径")
                continue
            else:
                # 校验Method中的指定前缀和后缀
                pred_names = [
                    name[len(file_prefix) : -len(file_suffix)]
                    for name in os.listdir(dir_path)
                    if name.startswith(file_prefix) and name.endswith(file_suffix)
                ]
                if len(pred_names) == 0:
                    print(f"{dir_path} 中不包含前缀为{file_prefix}且后缀为{file_suffix}的文件")
                    continue

            mask_names = [
                name[: -len(mask_suffix)]
                for name in os.listdir(mask_path)
                if name.endswith(mask_suffix)
            ]
            intersection_names = set(mask_names).intersection(set(pred_names))
            if len(intersection_names) == 0:
                print(f"{dir_path} 中数据名字与真值 {mask_path} 不匹配")
            elif len(intersection_names) != len(mask_names):
                difference_names = set(mask_names).difference(pred_names)
                print(
                    f"{dir_path} 中数据({len(list(pred_names))})与真值({len(list(mask_names))})不一致"
                )
    print(f"\tChecking Over!")
    print()
print()

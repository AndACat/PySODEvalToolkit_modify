# -*- coding: utf-8 -*-
# @Time    : 2021/3/14
# @Author  : Lart Pang
# @GitHub  : https://github.com/lartpang
import argparse
import ast
import json
import os
import sys
from importlib import import_module


def validate_py_syntax(filename):
    with open(filename, "r", encoding='utf-8') as f:
        content = f.read()
    try:
        ast.parse(content)
    except SyntaxError as e:
        raise SyntaxError("There are syntax errors in config " f"file {filename}: {e}")


def convert_py_to_json(source_config_root, target_config_root):
    if not os.path.isdir(source_config_root):
        raise NotADirectoryError(source_config_root)
    if not os.path.exists(target_config_root):
        os.makedirs(target_config_root)
    else:
        if not os.path.isdir(target_config_root):
            raise NotADirectoryError(target_config_root)

    sys.path.insert(0, source_config_root)
    source_config_files = os.listdir(source_config_root)
    for source_config_file in source_config_files:
        source_config_path = os.path.join(source_config_root, source_config_file)
        if not (os.path.isfile(source_config_path) and source_config_path.endswith(".py")):
            continue
        validate_py_syntax(source_config_path)
        # print(f"Find a valid Python Config File {source_config_path}")

        temp_module_name = os.path.splitext(source_config_file)[0]
        mod = import_module(temp_module_name)

        total_root = {}
        for name, value in mod.__dict__.items():
            if name.endswith('_ROOT') and isinstance(value, str):
                total_root[name] = value

        total_dict = {}
        for name, value in mod.__dict__.items():
            if not name.startswith("_") and isinstance(value, dict):
                for key, val in value.items():
                    if val == "AUTO_PNG":
                        value[key] = dict(path=os.path.join(total_root[name+'_ROOT'], key), suffix='.png')
                    if val == "AUTO_JPG":
                        value[key] = dict(path=os.path.join(total_root[name+'_ROOT'], key), suffix='.jpg')
                total_dict[name] = value

        # delete imported module
        del sys.modules[temp_module_name]

        with open(
            os.path.join(target_config_root, os.path.basename(temp_module_name) + ".json"),
            encoding="utf-8",
            mode="w",
        ) as f:
            json.dump(total_dict, f, indent=2)
        print(f"Successful Convert: {source_config_path} To {os.path.join(target_config_root, os.path.basename(temp_module_name) + '.json')}", end='\n\n')


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--source-py-root", type=str, default='../config')
    parser.add_argument("-o", "--target-json-root", type=str, default='../json')
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    args = get_args()
    convert_py_to_json(
        source_config_root=args.source_py_root, target_config_root=args.target_json_root
    )


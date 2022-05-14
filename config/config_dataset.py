# -*- coding: utf-8 -*-
import os

# 此处只能写绝对路径
_RGBD_SOD_ROOT = r"K:\RGBD_datasets"

LFSD = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "LFSD"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "LFSD", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "LFSD", "Mask"), suffix=".png"),
)
NLPR = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "NLPR"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "NLPR", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "NLPR", "Mask"), suffix=".png"),
    # index_file=os.path.join(_RGBD_SOD_ROOT, "nlpr_test_jw_name_list.lst"),
    # 测试的时候应该使用全部数据来和方法的预测结果计算交集，这样才会测到所有的预测结果，所以就不使用index_file了。
)
NJUD500 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "NJUD500"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD500", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD500", "Mask"), suffix=".png"),
    # index_file=os.path.join(_RGBD_SOD_ROOT, "njud_test_jw_name_list.lst"),
    # 同上
)
NJUD498 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "NJUD498"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD498", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD498", "Mask"), suffix=".png"),
    # index_file=os.path.join(_RGBD_SOD_ROOT, "njud_test_jw_name_list.lst"),
    # 同上
)
NJUD485 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "NJUD485"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD485", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD485", "Mask"), suffix=".png"),
    # index_file=os.path.join(_RGBD_SOD_ROOT, "njud_test_jw_name_list.lst"),
    # 同上
)
NJUD503 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "NJUD503"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD503", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "NJUD503", "Mask"), suffix=".png"),
    # index_file=os.path.join(_RGBD_SOD_ROOT, "njud_test_jw_name_list.lst"),
    # 同上
)
RGBD135 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "RGBD135"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "RGBD135", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "RGBD135", "Mask"), suffix=".png"),
)
SIP = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "SIP"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "SIP", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "SIP", "Mask"), suffix=".png"),
)
SSD = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "SSD"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "SSD", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "SSD", "Mask"), suffix=".png"),
)
STEREO797 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "STEREO797"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "STEREO797", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "STEREO797", "Mask"), suffix=".png"),
)

DUTRGBD = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "DUTRGBD"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "DUTRGBD", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "DUTRGBD", "Mask"), suffix=".png"),
)

STEREO1000 = dict(
    root=os.path.join(_RGBD_SOD_ROOT, "STEREO1000"),
    image=dict(path=os.path.join(_RGBD_SOD_ROOT, "STEREO1000", "Image"), suffix=".jpg"),
    mask=dict(path=os.path.join(_RGBD_SOD_ROOT, "STEREO1000", "Mask"), suffix=".png"),
)

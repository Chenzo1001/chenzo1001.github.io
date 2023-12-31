# 杨羚《基于多特征和图割模型的遥感影像云检测算法研究》笔记


# 思路
## 分类前处理
首先分析云层光谱特征，无论在高分影像上的哪个波段，云层的灰度值都比较高；  
厚云很容易处理；对于薄云可以理解为在原来地物的基础上增加亮度，减少饱和度。为了方便研究云层的光谱特征，此处使用HSL色彩空间。因为HSL色彩空间能够很容易地处理图像上的饱和度和亮度。  
同时，为了突出图像中的云层，发现云层一般具有亮度高而饱和度低的特征，可以使用公式L/S生成突出云层的一幅基底图。同时记得将数据进行归一化处理。  

## 分割提取云区
### 云区分割
现今比较优秀的分割算法有OTSU算法，Sauvola局部二值法等等。

{{< admonition type=info title="相关知识" open=true >}}

基于阈值的分割方法：

即先基于一幅图像计算两种或多种地物分类的阈值灰度，然后直接基于阈值对像素的灰度进行分类。常见的有直接阈值，迭代阈值，三角阈值，最大类间方差法（OTSU）（适用于全局分类）和Sauvola局部二值化算法（适用于局部分类）。依照字面意思都还比较好理解。

其中最大类间方差法就是使得类内方差降到最低，而类间方差达到最大，是现阶段被采用的比较多的一个方法，被认为是阈值分类的最佳方法。Sauvola局部二值化适用于某图像各个局部之间差异较大的情况。局部二值化是动态以每一个像素为中心点，对周围的像素进行分类。这能够很好地适应局部情况多变的状况。此时使用全局分类会导致某些局部的分类效果不佳，这时运用局部二值化就会得到优化。

{{< /admonition >}}

然而OTSU算法用在薄云的检测中容易产生大量噪声点，并且基于单个像素的分类无法顾及周围像素的语义信息。因此引入面向对象的思想，使用SLIC算法均匀选定若干种子点，迭代出若干个超像素块，再对超像素块进行分类。  

{{< admonition type=tip title="创新点" open=true >}}
超像素块可以同时顾及周围像素的语义，使得同语义的像素聚合在一起;同时减少被分类的像素数量，加快分类的速度。

{{< /admonition >}}

### 排除人造地物干扰
对于若干房顶，水泥地等容易产生干扰的高亮地物，经过分析发现这类地物都具有较为明显的纹理特征。于是使用Gabor滤波排除这类人造地物的干扰。此处需要选定若干个不同方向的滤波器。  
先生成若干个方向组合成的Gabor特征图，再采用特征图平滑，强调强线性特征区的明暗条纹；然后进行自动双阈值分割，采用经验阈值和OTSU算法分割。   

### 综合上述两个结果判断云区
综合光谱和纹理特征，确定判定法则，执行算法判断出云区和非云区。此处判定法则为：  
1）若像素点在亮度阈值分割后被检测为非云，则为非云；  
2）若亮度阈值分割判定为云，Gabor判定非云，则为非云；  
3）两者判定均为云，则为云。
为了减少误判情况，判定之后可以采用带限定阈值的膨胀收缩运算，将影像分割为云区，非云区和待分类区域。

## 基于图割模型的云区分割优化



### 经典图割模型
根据Ford and Fulkerson定理，最大流与最小割问题等价。于是可以使用最大流求解图像的最小割。图的权值使用能量函数进行判定。  
能量函数有F^2与F^3两种。此处F2形式能量函数为：$ E(L_1,L_2，...,L_p)=\sum_iE_i(L_i)+\sum_{i<j}E_{ij}(L_i,L_j) $
依此构建出经典图割模型的能量函数：$ E(L)=\lambda R(L)+\Beta(L) $
其中R（L）为区域项，B（L）为边界项。将前景和背景种子点集合分别作为图中的源点S和汇点T，确定每个像素点和S,T之间边的权值。  



## 改进经典图割模型



### 高斯混合模型替代直方图概率模型确定能量函数区域项
Boykov提出的经典模型中，使用直方图概率计算来确定待分类点被分类为前景和后景的惩罚项。而高斯混合模型相对于直方图概率计算，能够更好地描述颜色的变化，特别是微小的差异。所以利用高斯混合模型的方法构建云区和非云区的种子点，对 $ R_p(L_p) $ 的计算方法进行了改进。并且引入概率系数，增加像素标记为前景和背景的惩罚项的差距。

###  引入边缘和纹理信息改进能量函数边界项

将所有波段全部引入色彩信息的计算。边缘检测可以用到梯度Sobel或Robert算子等离散型差分算子计算一阶导数 。其中值得注意的是，计算影像梯度值的基础上可以进行非极大值抑制，采用双阈值限定对检测出的梯度点进行重新筛选```高于上限阈值的点为确定点，低于下限阈值的点直接淘汰，中间的点根据邻域关系进行判断```。纹理特征的判断使用一种改进的HOG特征算子。











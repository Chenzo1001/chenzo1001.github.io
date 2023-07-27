# CPP Notes

## 1.文件读写fstream

fstream成员函数：  
读取或写入指针设置函数void seekg(long position,ios::end/beg/cur)和void seekp(long position,ios::end/beg/cur)  
读取或写入指针读取函数long tellg()和long tellp(),相对于文件头输出字符  
现声明一个fstream类实例f:
### 1.读取文件内容:
1.f.read(char* buff,size_t position);可以将本来不是字符型数据的指针做指针强制转换.  
2.流读取>>,这个以一个空格为分界点.  
3.f.getline(char* buff,size_t length);这是一行一行读取的,遇到\n换行符即停止读取.可以使用:while(f.getline(tmp, size))来读取.除非到末尾,否则getline的结果一直为true(但是getline的返回值类型并不是bool)
### 2.写入文件内容
1.f.write(char* buff, size_t length)和read函数是一个意思.
2.流写入<<,这个直接将前面给出的内容一口气写完.
  

# 2、数据类型转换

## string和int,double等

int atoi(str.c_str());  
double atof(str.c_str());  
string str = std::to_string(number)  
>这里不管是int还是double还是long，unsigned等等都可以使用.要记得
```#include <string>```

## char*和string
string str=ch;
char* ch=str.c_str();

# 三.加密算法

## 1.AES算法全流程：

### 1.预备知识:
AES算法需要如下储备:  
1. S盒代换表和逆S盒代换表
2. 密钥拓展所用的轮常量
3. 16个1 Byte hex密钥(可自定义)
4. 列混合的矩阵  

AES加密对数据具有要求,即数据的长度必须为128或160或192bit.即16字节或20字节或24字节.对于所有的数据(包括位数正好16位的),AES算法提供几种填充方式.一般使用ISO 10126填充办法.即非最后一位填随机数,最后一位填上所有被填充数据的位数.

AES加密中,所有的矩阵相乘都用的是GF(2^8)下的乘法.具体算法如下:  
- 1.定义函数f,使得f(a)=2*a.但是a不得超过2^8,超过的话就mod0x100,然后和0x1b异或.
- 2.一个数a乘以十六进制的另一个数b,如果b等于1,则结果为a,如果b等于2^n,则结果为f(f(f...(a)...))迭代n次.如果b不等于以上任何一种情况,那么将b拆成以上2的各个n次方的和,然后a各与这些2的n次方相乘之后,将所有结果异或,得最终结果.

### 2.加密流程:
#### 1.密钥拓展
```CPP
unsigned short int num = 16;
    while (num < 176)
    {
        if (num % 16 == 0)
        {
            unsigned short int tmp = key[num];
            key[num] = key[num + 1];
            key[num + 1] = key[num + 2];
            key[num + 2] = key[num + 3];
            key[num + 3] = tmp;
            for (int i = num; i < num + 4; i++)
            {
                key[i] = sbox[key[i] & 0xff] ^ con[(num - 16) / 4 + i - num + 1];
                key[i] = key[i] ^ key[i - num];
            }
            num += 4;
        }
        else
        {
            key[num] = key[num - 4] ^ key[num - 16];
            num++;
        }
    }
```
#### 2.S盒代换
根据S盒表,将两位hex数字作为坐标,代换S盒的坐标上的结果.

#### 3.行位移
移动前:-----------------------移动后
- 1  2  3  4----------------1  2  3  4  
  5  6  7  8----------------6  7  8  5  
  9  10 11 12------------11 12 9  10  
  13 14 15 16-----------16 13 14 15

#### 4.列混合
列混合矩阵mix左乘传入的数据mes.左乘的运算规则和线代的矩阵左乘是一样的,但是乘法改为GF(2^8)上的乘法,加法改为异或.

- 附:矩阵左乘运算代码:
```CPP
    short int result[16];
    // 对于被左乘的矩阵mes，m列i行
    for (int m = 0; m < 4; m++)
    {
        for (int i = 0; i < 4; i++)
            result[4 * m + i] = mes[4 * m]*mix[i];

        for (int i = 1; i < 4; i++)
            for (int j = 0; j < 4; j++)
                result[4 * m + j] += mes[4 * m + i]*mix[4 * i + j];
    }
    for (int i = 0; i < 16; i++)
        mes[i] = result[i];
```

#### 5.轮密钥加
即传入的数据矩阵和密钥矩阵进行异或.第n轮就和第n次密钥拓展的结果矩阵进行异或.

#### 6.AES加密.
AES加密时先进行第0轮轮密钥加,然后再循环9次:  
1. S盒代换
2. 行位移
3. 列混合
4. 轮密钥加
最后第11轮,重复上述操作,但是不进行列混合,最后输出结果。
#### 7.AES解密
AES解密的流程完全与加密流程相反，只是S盒使用逆代换表，列混合使用逆列混合矩阵。

# 递归将字符串倒序
如果是char字符串：从头向尾翻转
```CPP
void reverse(char *s)
{
  if (*s)
  {
    char *p = s;
    char c = s[0];
    do {*p = *(p+1); p++;}while(*p);
    reverse(s);
    s[strlen(s)] = c;
  }
}
```
如果用string串：从中间向两边翻转
```CPP
void reverse(string& s)
{
	size_t length = s.length();
	if (length == 0 || length == 1)
		return;
	char s0 = s[0];
	char sl = s[length - 1];
	string p(s, 1, length - 2);
	reverse(p);
	s = sl + p + s0;
	return;
}
```

# 小细节问题

1.要记得m<<2是一个运算式，并不是一个操作符。这个移位并不会将m向高位移动2bit。  

2.string的一个大坑点：在普通情况下，一般char数组是不会存入一些特殊字符的。这个时候char数组转string就没有什么问题。但是在设计加密解密的时候，有时候程序读取的是一些杂乱字符。这个时候char数组里面可能会存有'\0'(char 0)数据。而string=char[]在赋值的时候，默认以'\0'作为结束符。这就导致解密算法程序的string会偏小。这时需要强制赋值:
```C
string str(char* ch, size_t length);
``` 
这个函数不会考虑数组越界问题。有可能将内存里面一些本来不属于char数组的东西给拷进去.  

3.在赋值的时候,一定要注意两个数据的字节大小孰高孰低.如果是低转高,最好使用&取出低字节类型的数据.比如说int= string.c_str()[i]时,int的字节较高,而string转换过来的char数组字节较低.此时int比char高的字节有可能会被char存储一些无用的填充数据.这个时候最好改为:int=string.c_str()[i]&0xff,保证高字节是0.

4.关于运算表达式的问题:`cout << (b=n)`结果为n.也就是说,如果使用`if(b=n)`表达式,那么这个表达式相当于先`b=n`,然后再`if(n)`.n等于0的话就跳过if.并不是说表达式本身的结果为1.

5.&&和||具有短路特性！`(a==1)&&(++b==1)`如果`a!=false`，那么b就不会再执行++操作。a||b同理，这个要特别注意.

6.`sizeof 表达式`表示表达式的结果所占的字节数.

7.cout的`setsprecision(n)`,是指包括小数点的后n位！也就是保留n-1位小数.

8.下面运行的程序，输入“(两个空格)as as”会输出“as as”
```CPP
cin >> ws;//略过空格
getline(cin, s);
cout << s;
```

9.默认形参如果在函数声明中给出，那么在函数定义中就不能再给出默认形参！
```CPP
int add(int x=5, int y=5);//声明中给出了默认形参
...
int add(int x/*=5*/, int y/*=5*/) //这里就不能再给默认形参了！
{    //函数定义 
}
```
声明在前，则必须声明给出默认函数值。声明没给，则定义就不能给。

10.如果一个函数仅以有没有const属性为区别进行重载，那么非常对象调用这个函数时会匹配到没有const属性的那个重载函数。

11.友元关系不能传递和继承，单向起作用。

12.非const的引用只能绑定到普通对象，不能到常对象。

13.
```CPP
typedef char* pstr;
const pstr p;//他不等于const char* pstr！！
```
这说明pstr是一个指向char类型的常量指针，而不是指向char常量的指针！！  
`const int* p`指向int常量的指针  
`int* const p`指向int的常量指针

14.decltype(i)j=2;初始化j的值为2，j的类型和i一致。

15.关于const_cast的操作：如果一个变量一开始就声明为const数组，初始化存入了一些数据，那么这一块内存就已经被定为了只读内存，就算你用const_cast去修改指针，你也无法改动这块的数据。但是如果给一个形参为const char*的函数传入了非const变量，那么这个const属性是函数给的，并不是内存具有的，所以可以在函数内执行const_cast来去除const属性并且进行修改。

16.如果派生类定义了一个与基类成员同名的成员函数，不管两个函数的参数表是否相同，基类的所有重载函数都会被隐藏。解决办法是使用USING。

17.成员函数重载运算符与非~的一个区别在于，成员运算符的左操作数不能实现隐含转换，因为左操作数是调用对象，没办法隐含转换。


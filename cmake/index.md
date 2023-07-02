# CMake Notes

CMake笔记
<!--more-->
# 1.CMakeLists.txt示例

```cmake
cmake_minimum_required (VERSION 3.0)

SET (CMAKE_C_COMPILER D:/Qt/Tools/mingw1120_64/bin/gcc.exe)
SET (CMAKE_CPP_COMPILER D:/Qt/Tools/mingw1120_64/bin/g++.exe)

project(WCAS)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

SET (CMAKE_AUTOMOC ON)
SET (CMAKE_AUTORCC ON)
SET (CMAKE_AUTOUIC ON)

SET (CMAKE_CXX_STANDARD 17)
SET (CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Widgets REQUIRED)
find_package(Qt COMPONENTS sql REQUIRED)
set(CMAKE_PREFIX_PATH D:/Qt/6.4.1/mingw_64)

SET (ui ./src/selflightdlg.ui)
SET(src ./src/WCAS.cpp)
SET(incl ./inc/ensuredlg.h)
include_directories(inc)

QT6_WRAP_UI(uic ${ui})
QT6_WRAP_CPP(HEAD ${incl})
QT6_ADD_RESOURCES(qrcs ./pic/Resource.qrc)

INCLUDE_DIRECTORIES(${CMAKE_CURRENT_BINARY_DIR})

add_executable (WCAS ${HEAD} ${uic} ${qrcs} ${src})
target_link_libraries(${PROJECT_NAME} Qt6::Widgets)
```
{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}


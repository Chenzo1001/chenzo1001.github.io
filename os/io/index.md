# IO


# 关于define的使用

1.在c中是没有inline的。我们可以用define来取代简单inline函数的地位。

```c
#define Square(l) ((l)*(l))
```

2.define一个常量是不需要加等号的。加了等号，预定义的符号前面会带上等号。

3.可以发挥define空宏的解释性意义。比如下列代码：

```c
#define IN
#define OUT
#define OPTIONAL

NTSTATUS
NtLockFile(
    IN HANDLE FileHandle,
    IN HANDLE Event OPTIONAL,
    IN PIO_APC_ROUTINE ApcRoutine OPTIONAL,
    IN PVOID ApcContext OPTIONAL,
    OUT PIO_STATUS_BLOCK IoStatusBlock,
    IN PLARGE_INTEGER ByteOffset,
    IN PLARGE_INTEGER Length,
    IN ULONG Key,
    IN BOOLEAN FailImmediately,
    IN BOOLEAN ExclusiveLock
    )
```

前缀IN，OUT，后缀OPTIONAL等等，在当时没有doxygen的情况下可以将函数参数的意义写清楚。



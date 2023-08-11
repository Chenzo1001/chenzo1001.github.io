# CPU调度


# CPU调度算法

CPU调度算法将一个任务的执行参数用四元数组表示：```T(Q, P, E, D)```。其中Q代表任务释放时间（Realease Time），P代表执行周期（Period）， E代表执行时间（Execution Time），D为周期内任务截止时间（Deadline）。

## Deadline Monotonic CPU Scheduling （截止时间单调调度算法）

DM算法的要求是所有硬时限任务必须在时限之前完成，每个任务具有固定的周期，并且任务互相独立。此算法根据任务的截止时间确定优先级。截止时间越靠前，优先级越高。高优先级的任务会对低优先级的任务进行抢占（preempt），确保任务能够及时完成。但是此算法对于可调度条件的计算复杂度较高。举例说明可以看[GeeksForGeeks](https://www.geeksforgeeks.org/deadline-monotonic-cpu-scheduling/)。

## Earliest Deadline First（最早时限优先调度算法）

EDF算法要求截止时限越靠近，任务优先级越高。但是EDF算法与DM算法的不同之处在于EDF算法不要求任务具有固定周期，根据任务的截止时间动态分配CPU资源。

{{< admonition type=tip title="优点" open=true >}}

EDF算法的优越性在于灵活可变，不要求固定周期;调度效率较高，能够尽可能使用现有的资源。理论上EDF算法的CPU利用率能够达到100%。

{{< /admonition >}}

## Least-Slack-Time-First（最小空闲时间优先调度算法）

LSF算法让CPU尽可能多运行，减少空闲时间以提高运用效率。任务所剩空闲时间越短，优先级越高。

{{< admonition type=note title="缺点" open=true >}}

LSF算法的缺点很明显。

CPU在运行时不可能只执行当前的任务。遇到有紧急任务分配时，CPU必须切换到其他的紧急任务上。执行完紧急任务之后，当前任务的剩余时间可能不足以执行完整个任务。

另外，一个任务在等待时，空闲时间是严格单调递减的。一个任务被执行时，等待任务的空闲时间递减。一旦少于当前执行任务的空闲时间时，CPU被该等待任务抢占。被抢占的任务空闲时间也会递减，这样该任务在一小段时间之后会反抢占CPU，导致频繁的任务切换。CPU的效率会因此大大降低。

{{< /admonition >}}


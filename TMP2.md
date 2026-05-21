
Cache Locality & False Sharing: Understanding L1/L2/L3 cache lines (usually 64 bytes). Knowing how std::hardware_destructive_interference_size prevents false sharing in multithreaded environments.

Custom Allocators: Dynamic memory allocation (malloc/new) is too slow for real-time loops due to heap fragmentation and OS context switches. Master:

Arena / Stack allocators (essential for games/embedded).

Pool allocators (fixed-size block allocation).

Writing a custom C++ allocator compliant with std::allocator_traits.

Virtual Memory & Huge Pages: Understanding Translation Lookaside Buffers (TLB), page faults, and how using Large/Huge Pages minimizes TLB misses in memory-heavy network or game applications.

Data-Oriented Design (DOD): Shifting from typical OOP to DOD. Compare Struct of Arrays (SoA) vs. Array of Structs (AoS) to maximize SIMD efficiency and cache hits.

2. Low-Latency Concurrency & Multithreading
At high performance, standard mutexes are often too slow because they put threads to sleep via the OS kernel.

The C++ Memory Model & Atomics:

Understanding atomic operations (std::atomic).

Mastering memory orderings: memory_order_seq_cst, memory_order_acquire, memory_order_release, and memory_order_relaxed.

Lock-Free Data Structures: How to build lock-free single-producer single-consumer (SPSC) queues using atomic ring buffers.

Spinlocks vs. Mutexes: When to use a busy-wait spinlock vs. a condition variable or mutex.

CPU Thread Affinity: Binding critical threads (like the game render thread or network polling loop) to specific CPU cores to eliminate context-switching overhead.

3. High-Performance Networking (Low-Latency)
For real-time multiplayer games or embedded telemetry, standard synchronous socket code won't cut it.

I/O Multiplexing & Asynchronous Engines: How epoll (Linux) or IOCP (Windows) work. Understanding event-driven architectures like Boost.Asio or tracking modern io_uring developments.

Zero-Copy Networking: Utilizing techniques to pass data from the network interface card (NIC) straight to user space memory without copying bytes across multiple buffers.

Serialization/Deserialization Bottlenecks: Avoiding slow text formats. Familiarize yourself with flat, binary layout protocols like FlatBuffers (heavily used in gaming because it requires zero decoding time) or Protocol Buffers.

User-space TCP/UDP: Understanding why real-time games almost exclusively use customized UDP protocols (with selective reliability) instead of standard TCP to avoid Head-of-Line blocking.

4. Modern C++ Optimization Mechanics
You need to know how to trick—and assist—the compiler into generating the most optimal assembly.

Compile-Time Programming (constexpr / consteval): Moving calculations from runtime to compile time. Using C++20 Concepts to constrain templates and optimize template compilation times.

Move Semantics & Rvalue References: Going deeper into perfect forwarding (std::forward), RVO (Return Value Optimization), and writing **explicit move constructors** to avoid deep copies entirely.

Inlining & Branch Prediction: Understanding how [[likely]] and [[unlikely]] attributes (C++20) assist branch predictors, and how to structure code to avoid pipeline stalls.

Type Erasure Overhead: Knowing the performance costs of std::function (which can cause heap allocations) vs. alternative implementations like std::move_only_function (C++23) or function pointers.

5. System-Level & Embedded-Specific Constraints
Embedded systems require extreme predictability and resource tracking.

Placement new: Constructing an object directly into a pre-allocated memory buffer or memory-mapped I/O registers.

Volatile and Memory-Mapped I/O (MMIO): The correct use of the volatile keyword in embedded environments (to prevent the compiler from optimizing away hardware register reads/writes) and why it is not used for multithreading concurrency.

Object Lifecycle & Determinism: Why std::shared_ptr introduces atomic reference-counting overhead that you might want to avoid in a hot rendering or physics loop, preferring std::unique_ptr or raw observers.

The No-Exceptions Subset: Many game engines (like Unreal) and embedded toolchains explicitly disable C++ exceptions (-fno-exceptions). You need to know how to handle errors safely and performantly using alternative types like std::optional or std::expected (C++23).

6. Profiling & Diagnostics (The Tooling)
You cannot optimize what you cannot measure. Interviewers will want to know how you isolate bottlenecks.

Microbenchmarking: Writing reliable benchmarks (e.g., using Google Benchmark) without letting the compiler optimize away the code you are trying to test.

Sampling Profilers: Experience with tools like perf, Intel VTune, or Tracy Profiler to identify cache misses, branch mispredictions, and CPU hotspots.


Extras:

write about explicit constructors and implicit down casting

Write about conversion operators & explicit conversion operators

Write about templates, concepts & crtp

write about friend methods and classes

Write DOD, SOA

Write about ranges

Write about Design patterns

Write about Big O, amortized time

Write about algorithms, techniques, etc 

DFS - inorder, preorder, postorder traversal

number system, hexidecimal, octal decimal, etc
